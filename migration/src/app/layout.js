import '@/global/css/style.css'
import React from "react";
import StagewiseWrapper from '@/components/StagewiseToolbar';
import ChatBot from '@/components/ChatBot';

export const metadata = {
  title: '地方移住者サイト',
  description: 'あなたの新しい暮らしがここに',
}

export default function RootLayout({
  children,
}) {
  return (
    <html lang="ja">
      <body>
        {children}
        <StagewiseWrapper />
        <ChatBot />
      </body>
    </html>
  );
}
