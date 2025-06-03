// app/components/NavBar.js
'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import logo from '@/global/img/logo.png';  // 直接导入 logo 图片

const NavBar = () => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false); // 控制菜单显示

  return (
    <header>
      <div className="logo">
        <Link href="/">
          <Image 
            src={logo}  // 使用导入的图片
            alt="Logo"
            className='logo-img'
            priority
            style={{ cursor: 'pointer' }} // 添加鼠标指针样式
          />
        </Link>
      </div>
      {/* 汉堡按钮 */}
      <button
        className={`mobile-menu-button${menuOpen ? ' active' : ''}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="菜单"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
      <nav>
        <ul className={menuOpen ? 'active' : ''}>
          <li>
            <Link 
              href="/" 
              className={pathname === '/' ? 'active' : ''} onClick={() => setMenuOpen(false)}
            >
              私たちについて
            </Link>
          </li>
          <li>
            <Link 
              href="/chatbot" 
              className={pathname === '/chatbot' ? 'active' : ''} onClick={() => setMenuOpen(false)}
            >
              チャットボット
            </Link>
          </li>
          <li>
            <Link 
              href="/matching" 
              className={pathname === '/matching' ? 'active' : ''} onClick={() => setMenuOpen(false)}
            >
              地域マッチング
            </Link>
          </li>
          <li>
            <Link 
              href="/faq" 
              className={pathname === '/faq' ? 'active' : ''} onClick={() => setMenuOpen(false)}
            >
              よくあるご質問
            </Link>
          </li>
          <li>
            <Link 
              href="/contactus" 
              className={pathname === '/contactus' ? 'active' : ''} onClick={() => setMenuOpen(false)}
            >
              お問い合わせ
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
