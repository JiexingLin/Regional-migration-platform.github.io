from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from local_migration import JapaneseMigrationAgent
import json

app = FastAPI()

# CORS 中间件
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 初始化代理
agent = JapaneseMigrationAgent()

@app.get("/")
async def root():
    return {"message": "Japanese Migration Agent API"}

@app.post("/migration/consultation")
async def migration_consultation(user_profile: dict):
    try:
        result = await agent.process_migration_consultation(user_profile)
        return result
    except Exception as e:
        return {"error": str(e)}

# Vercel 处理器
async def handler(request):
    return await app(request.scope, request.receive, request.send) 