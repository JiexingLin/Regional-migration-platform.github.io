const IS_PRODUCTION = process.env.NODE_ENV === 'production';
const PYTHON_API_URL = process.env.PYTHON_API_URL || 'http://127.0.0.1:8000';

export async function POST(request) {
  try {
    const { user_profile } = await request.json();
    
    // 根据环境选择不同的 API 端点
    const apiUrl = IS_PRODUCTION 
      ? `/api/migration/search`  // 生产环境使用标准的 Vercel 函数
      : `${PYTHON_API_URL}/api/migration/search`;  // 开发环境使用本地服务器
    
    // 转发请求到后端服务器
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user_profile })
    });

    // 检查响应类型
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error(`Invalid response type: ${contentType}. Server might not be running.`);
    }

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Server response:', errorText);
      throw new Error(`Server error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return Response.json(data);
    
  } catch (error) {
    console.error('Error in migration search:', error);
    return Response.json(
      { 
        error: 'Internal Server Error', 
        detail: error.message,
        hint: IS_PRODUCTION 
          ? 'Python function error in production environment'
          : 'Please make sure the FastAPI server is running on port 8000'
      },
      { status: 500 }
    );
  }
} 