import '@/global/css/style.css'
import React from "react";

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
      </body>
    </html>
  );
}
