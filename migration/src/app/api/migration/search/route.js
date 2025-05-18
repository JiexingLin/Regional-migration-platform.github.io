// 删除不需要的导入
// import { JapaneseMigrationAgent } from '@/lib/migration';

export async function POST(request) {
  try {
    const { user_profile } = await request.json();
    
    // 转发请求到FastAPI服务器
    const response = await fetch('http://localhost:8000/api/migration/search', {
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
        hint: 'Please make sure the FastAPI server is running on port 8000'
      },
      { status: 500 }
    );
  }
} 