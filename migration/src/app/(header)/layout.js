// app/layout.js
import '@/app/globals.css'
import NavBar from '@/components/navigation';

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>地域移住</title>
        <meta name="description" content="" />
        <meta property="og:title" content="" />
        <meta property="og:type" content="" />
        <meta property="og:url" content="" />
        <meta property="og:image" content="" />
        <meta property="og:image:alt" content="" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="icon.png" />
        <link rel="manifest" href="site.webmanifest" />
        <meta name="theme-color" content="#fafafa" />
      </head>
      <body>
        <NavBar />
        {children}
      </body>
    </html>
  );
}

