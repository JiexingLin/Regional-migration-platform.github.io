// app/components/NavBar.js
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import logo from '@/global/logo.png';  // 直接导入 logo 图片

const NavBar = () => {
  const pathname = usePathname();

  return (
    <header>
      <div className="logo">
        <Link href="/">
          <Image 
            src={logo}  // 使用导入的图片
            alt="Logo"
            width={50}
            height={50}
            priority
            style={{ cursor: 'pointer' }} // 添加鼠标指针样式
          />
        </Link>
      </div>
      <nav>
        <ul>
          <li>
            <Link href="/aboutus" legacyBehavior>
              <a className={pathname === '/aboutus' ? 'active' : ''}>私たちについて</a>
            </Link>
          </li>
          <li>
            <Link href="/chatbot" legacyBehavior>
              <a className={pathname === '/chatbot' ? 'active' : ''}>チャットボット</a>
            </Link>
          </li>
          <li>
            <Link href="/matching" legacyBehavior>
              <a className={pathname === '/matching' ? 'active' : ''}>地域マッチング</a>
            </Link>
          </li>
          <li>
            <Link href="/faq" legacyBehavior>
              <a className={pathname === '/faq' ? 'active' : ''}>よくあるご質問</a>
            </Link>
          </li>
          <li>
            <Link href="/contactus" legacyBehavior>
              <a className={pathname === '/contactus' ? 'active' : ''}>お問い合わせ</a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
