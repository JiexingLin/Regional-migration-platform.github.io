from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from typing import Dict, Any, Optional
import sys
import os
import json
import asyncio
from dotenv import load_dotenv

# 加载环境变量
load_dotenv()

from local_migration import JapaneseMigrationAgent
from chat_service import chat_service

app = FastAPI(title="Migration Platform API", version="1.0.0")

# 配置CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Next.js开发服务器
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 请求模型
class MigrationRequest(BaseModel):
    user_profile: Dict[str, Any]

class ChatRequest(BaseModel):
    message: str
    session_id: Optional[str] = "default"
    stream: Optional[bool] = True

class ChatStatusRequest(BaseModel):
    session_id: str

# 初始化Agent
migration_agent = JapaneseMigrationAgent()

@app.post("/api/migration/search")
async def search_migration(request: MigrationRequest):
    """移住地推荐API"""
    try:
        # 使用JapaneseMigrationAgent处理请求
        result = await migration_agent.process_migration_consultation(request.user_profile)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/chat")
async def chat_endpoint(request: ChatRequest):
    """AI聊天API - 支持流式响应"""
    try:
        if request.stream:
            # 流式响应
            async def generate_stream():
                async for chunk in chat_service.generate_streaming_response(
                    request.message, 
                    request.session_id
                ):
                    yield f"data: {json.dumps(chunk, ensure_ascii=False)}\n\n"
            
            return StreamingResponse(
                generate_stream(),
                media_type="text/plain",
                headers={
                    "Cache-Control": "no-cache",
                    "Connection": "keep-alive",
                    "Content-Type": "text/plain; charset=utf-8"
                }
            )
        else:
            # 非流式响应
            response = await chat_service.generate_simple_response(
                request.message, 
                request.session_id
            )
            return {"response": response, "session_id": request.session_id}
            
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Chat service error: {str(e)}")

@app.get("/api/chat/status")
async def chat_status():
    """获取聊天服务状态"""
    try:
        status = chat_service.get_service_status()
        return status
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.delete("/api/chat/session/{session_id}")
async def clear_chat_session(session_id: str):
    """清除指定会话的历史记录"""
    try:
        success = chat_service.clear_session(session_id)
        return {"success": success, "session_id": session_id}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
async def health_check():
    """健康检查端点"""
    return {
        "status": "healthy",
        "services": {
            "migration": "active",
            "chat": "active"
        },
        "version": "1.0.0"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host="127.0.0.1",  # 修改为本地主机
        port=8000,
        reload=True
    ) 