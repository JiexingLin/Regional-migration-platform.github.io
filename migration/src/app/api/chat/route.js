import { NextRequest, NextResponse } from 'next/server';

// Python后端API配置
const PYTHON_API_URL = process.env.PYTHON_API_URL || 'http://127.0.0.1:8000';
const USE_PYTHON_BACKEND = process.env.USE_PYTHON_BACKEND !== 'false';

// 模拟流式AI响应的函数（备用方案）
async function* generateMockResponse(message) {
  const responses = {
    '移住': [
      '地方移住について',
      'お聞かせいただけますか？',
      'どちらの地域に',
      'ご興味がございますか？'
    ],
    '費用': [
      '移住には',
      '初期費用として',
      '100-300万円程度が',
      '目安となります。',
      '地域によって',
      '支援制度もございます。'
    ],
    '仕事': [
      'リモートワークや',
      '地域の求人情報について',
      'お調べいたします。',
      'どのような職種を',
      'お考えですか？'
    ]
  };

  // 找到匹配的关键词
  let selectedResponse = ['ありがとうございます。', '詳しい情報については、', 'お問い合わせフォームからも', 'ご連絡いただけます。'];
  
  for (const [keyword, response] of Object.entries(responses)) {
    if (message.includes(keyword)) {
      selectedResponse = response;
      break;
    }
  }

  // 模拟流式响应
  for (const chunk of selectedResponse) {
    yield {
      type: 'chunk',
      content: chunk
    };
    // 添加延迟来模拟实际的AI响应时间
    await new Promise(resolve => setTimeout(resolve, 200 + Math.random() * 300));
  }
  
  yield { type: 'end' };
}

// 调用Python后端的流式API
async function* callPythonBackend(message, sessionId) {
  try {
    const response = await fetch(`${PYTHON_API_URL}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: message,
        session_id: sessionId,
        stream: true
      }),
    });

    if (!response.ok) {
      throw new Error(`Python backend error: ${response.status}`);
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      
      if (done) break;

      const chunk = decoder.decode(value);
      const lines = chunk.split('\n').filter(line => line.trim());

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          try {
            const data = JSON.parse(line.slice(6));
            yield data;
          } catch (parseError) {
            console.error('Failed to parse Python backend response:', parseError);
          }
        }
      }
    }
  } catch (error) {
    console.error('Python backend call failed:', error);
    // 如果Python后端失败，返回错误消息
    yield {
      type: 'chunk',
      content: 'システムエラーが発生しました。Python APIサーバーとの接続を確認してください。'
    };
    yield { type: 'end', error: true };
  }
}

export async function POST(request) {
  try {
    const { message, sessionId = 'default' } = await request.json();
    
    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    console.log('Chat API called with:', { 
      message: message.substring(0, 50) + '...', 
      sessionId,
      usePythonBackend: USE_PYTHON_BACKEND,
      pythonApiUrl: PYTHON_API_URL
    });

    // 创建流式响应
    const encoder = new TextEncoder();
    
    const stream = new ReadableStream({
      async start(controller) {
        try {
          // 选择使用Python后端或模拟服务
          const responseGenerator = USE_PYTHON_BACKEND 
            ? callPythonBackend(message, sessionId)
            : generateMockResponse(message);

          for await (const chunk of responseGenerator) {
            const data = JSON.stringify(chunk) + '\n';
            controller.enqueue(encoder.encode(data));
          }
          
          controller.close();
        } catch (error) {
          console.error('Stream error:', error);
          
          // 发送错误信息
          const errorData = JSON.stringify({
            type: 'error',
            content: 'システムエラーが発生しました。しばらくしてから再度お試しください。'
          }) + '\n';
          controller.enqueue(encoder.encode(errorData));
          controller.close();
        }
      }
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Transfer-Encoding': 'chunked',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' }, 
      { status: 500 }
    );
  }
}

// 健康检查端点
export async function GET() {
  try {
    // 检查Python后端状态
    const pythonStatus = await fetch(`${PYTHON_API_URL}/api/chat/status`, {
      method: 'GET',
      timeout: 5000
    }).then(res => res.json()).catch(() => ({ status: 'offline' }));

    return NextResponse.json({
      status: 'ok',
      backend: {
        python: pythonStatus,
        url: PYTHON_API_URL,
        enabled: USE_PYTHON_BACKEND
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json({
      status: 'error',
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
} 