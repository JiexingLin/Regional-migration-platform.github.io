from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Dict, Any
import sys
import os


from local_migration import JapaneseMigrationAgent

app = FastAPI()

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

# 初始化Agent
migration_agent = JapaneseMigrationAgent()

@app.post("/api/migration/search")
async def search_migration(request: MigrationRequest):
    try:
        # 使用JapaneseMigrationAgent处理请求
        result = await migration_agent.process_migration_consultation(request.user_profile)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host="127.0.0.1",  # 修改为本地主机
        port=8000,
        reload=True
    ) 