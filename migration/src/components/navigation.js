// app/components/NavBar.js
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';


const NavBar = () => {
  const pathname = usePathname();

  return (
    <header>
    <div className="logo">
      <Link href="/" legacyBehavior>
          <img src="logo.png" alt="サイトのロゴ" />
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
