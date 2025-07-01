"use client"
import React, { useState, useRef, useEffect } from 'react';
import '../global/css/ChatBot.css';

const ChatBot = () => {
  // 聊天状态管理
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { type: 'bot', content: 'こんにちは！地方移住についてご質問がございましたら、お気軽にお声がけください。' }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId] = useState(() => `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);

  // 拖拽状态管理
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isClient, setIsClient] = useState(false);
  const bubbleRef = useRef(null);
  const chatWindowRef = useRef(null);
  const messagesEndRef = useRef(null);

  // 初始化客户端状态和位置
  useEffect(() => {
    setIsClient(true);
    setPosition({
      x: window.innerWidth - 100,
      y: window.innerHeight - 100
    });
  }, []);

  // 自动滚动到最新消息
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // 拖拽功能实现
  const handleMouseDown = (e) => {
    if (isOpen) return; // 聊天窗口打开时不允许拖拽
    
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;

    const newX = e.clientX - dragStart.x;
    const newY = e.clientY - dragStart.y;

    // 限制在窗口范围内
    const maxX = window.innerWidth - 70;
    const maxY = window.innerHeight - 70;
    
    setPosition({
      x: Math.max(0, Math.min(newX, maxX)),
      y: Math.max(0, Math.min(newY, maxY))
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // 绑定全局鼠标事件
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragStart]);

  // 点击气泡打开/关闭聊天窗口
  const handleBubbleClick = () => {
    if (!isDragging) {
      setIsOpen(!isOpen);
    }
  };

  // 发送消息 - 支持流式响应
  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = { type: 'user', content: inputMessage };
    const currentInput = inputMessage;
    
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      // 创建一个临时的机器人消息用于流式显示
      const tempBotMessageId = Date.now();
      setMessages(prev => [...prev, { 
        id: tempBotMessageId,
        type: 'bot', 
        content: '', 
        isStreaming: true 
      }]);

      // 调用流式API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: currentInput,
          sessionId: sessionId
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      let streamingContent = '';

      while (true) {
        const { done, value } = await reader.read();
        
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n').filter(line => line.trim());

        for (const line of lines) {
          try {
            const data = JSON.parse(line);
            
            if (data.type === 'chunk') {
              streamingContent += data.content;
              
              // 实时更新流式消息
              setMessages(prev => prev.map(msg => 
                msg.id === tempBotMessageId 
                  ? { ...msg, content: streamingContent }
                  : msg
              ));
            } else if (data.type === 'end') {
              // 流式响应结束
              setMessages(prev => prev.map(msg => 
                msg.id === tempBotMessageId 
                  ? { ...msg, isStreaming: false }
                  : msg
              ));
              break;
            } else if (data.type === 'error') {
              // 处理错误
              setMessages(prev => prev.map(msg => 
                msg.id === tempBotMessageId 
                  ? { ...msg, content: data.content, isStreaming: false, isError: true }
                  : msg
              ));
              break;
            }
          } catch (parseError) {
            console.error('Failed to parse stream data:', parseError);
          }
        }
      }

    } catch (error) {
      console.error('Chat API Error:', error);
      
      // 添加错误消息
      setMessages(prev => [...prev, { 
        type: 'bot', 
        content: 'すみません、システムエラーが発生しました。しばらくしてから再度お試しください。',
        isError: true
      }]);
    } finally {
      setIsLoading(false);
    }
  };



  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  // 格式化AI回复文本
  const formatBotMessage = (content) => {
    if (!content) return '';
    
    // 分步处理，避免在链式调用中引用未完成的变量
    let formatted = content;
    
    // 1. 先处理Markdown链接 [text](url) -> <a href="url" target="_blank" rel="noopener noreferrer">text</a>
    formatted = formatted.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, text, url) => {
      // 检查URL长度，超过50字符使用特殊样式
      const className = url.length > 50 ? 'long-url' : 'chat-link';
      return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="${className}">${text}</a>`;
    });
    
    // 2. 处理裸露的长URL（没有markdown格式的直接URL）
    formatted = formatted.replace(/(https?:\/\/[^\s<>"{}|\\^`\[\]]+)/g, (match, url, offset, string) => {
      // 检查URL前后是否已经被包裹在链接标签中
      const beforeMatch = string.substring(Math.max(0, offset - 10), offset);
      const afterMatch = string.substring(offset + match.length, Math.min(string.length, offset + match.length + 10));
      
      if (beforeMatch.includes('href="') || afterMatch.includes('</a>')) {
        return match; // 已经是链接的一部分，不处理
      }
      
      // 对于长URL使用特殊样式，短URL使用普通样式
      const className = url.length > 50 ? 'long-url' : 'chat-link';
      const displayText = url.length > 60 ? url.substring(0, 40) + '...' + url.substring(url.length - 15) : url;
      return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="${className}" title="${url}">${displayText}</a>`;
    });
    
    // 3. 处理双星号加粗 (**text**)
    formatted = formatted.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    
    // 4. 处理数字列表 (1. 内容)
    formatted = formatted.replace(/(\d+\.\s)/g, '\n\n$1');
    
    // 5. 处理星号列表项 (* 内容)
    formatted = formatted.replace(/(\*\s+)([^*\n]+)/g, '\n• $2');
    
    // 6. 处理减号列表项 (- 内容)
    formatted = formatted.replace(/(-\s+)([^-\n]+)/g, '\n• $2');
    
    // 7. 处理冒号后的内容（主要用于分类标题）
    formatted = formatted.replace(/([^:\n]):(?=\s*[^\n])/g, '$1:\n');
    
    // 8. 处理问号和感叹号后的段落
    formatted = formatted.replace(/([？?!！])(\s*)([あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをん例まず福詳])/g, '$1\n\n$3');
    
    // 9. 处理句号后的段落
    formatted = formatted.replace(/([。])(\s*)([１２３４５１-９0-9例まず福あいうえお詳])/g, '$1\n\n$3');
    
    // 10. 处理特殊关键词前的换行
    formatted = formatted.replace(/(例えば|まず|また|さらに|なお|ちなみに|つまり|具体的には|詳細情報)/g, '\n\n$1');
    
    // 11. 多个连续空格转换为单一换行
    formatted = formatted.replace(/\s{2,}/g, ' ');
    
    // 12. 清理多余的换行符
    formatted = formatted.replace(/\n{3,}/g, '\n\n');
    
    // 13. 去除开头和结尾的空白
    formatted = formatted.trim();
    
    return formatted;
  };

  // 渲染格式化的消息内容
  const renderMessageContent = (message) => {
    if (message.type === 'user') {
      return message.content;
    }
    
    const formattedContent = formatBotMessage(message.content);
    
    // 如果包含HTML标签（链接、粗体等），使用dangerouslySetInnerHTML
    if (formattedContent.includes('<')) {
      return (
        <div 
          dangerouslySetInnerHTML={{ __html: formattedContent }}
          className="formatted-content"
        />
      );
    }
    
    // 否则直接返回文本（CSS会处理换行）
    return formattedContent;
  };

  // 只在客户端渲染
  if (!isClient) {
    return null;
  }

  return (
    <>
      {/* 聊天气泡 */}
      <div
        ref={bubbleRef}
        className={`chat-bubble ${isDragging ? 'dragging' : ''}`}
        style={{
          position: 'fixed',
          left: `${position.x}px`,
          top: `${position.y}px`,
          zIndex: 9999
        }}
        onMouseDown={handleMouseDown}
        onClick={handleBubbleClick}
      >
        <div className="bubble-icon">
          💬
        </div>
        {!isOpen && (
          <div className="bubble-notification">
            ご質問ありますか？
          </div>
        )}
      </div>

      {/* 聊天窗口 */}
      {isOpen && (
        <div
          ref={chatWindowRef}
          className="chat-window"
          style={{
            position: 'fixed',
            right: '20px',
            bottom: '20px',
            zIndex: 9998
          }}
        >
          <div className="chat-header">
            <h3>移住サポートチャット</h3>
            <button className="close-btn" onClick={() => setIsOpen(false)}>
              ×
            </button>
          </div>
          
          <div className="chat-messages">
            {messages.map((message, index) => (
              <div key={message.id || index} className={`message ${message.type}`}>
                <div className={`message-content ${message.isStreaming ? 'streaming' : ''} ${message.isError ? 'error' : ''}`}>
                  {renderMessageContent(message)}
                  {message.isStreaming && <span className="streaming-cursor"></span>}
                </div>
              </div>
            ))}
            {isLoading && !messages.some(msg => msg.isStreaming) && (
              <div className="message bot">
                <div className="message-content loading">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="chat-input">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="メッセージを入力してください..."
              disabled={isLoading}
            />
            <button 
              onClick={handleSendMessage}
              disabled={isLoading || !inputMessage.trim()}
            >
              送信
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot; 