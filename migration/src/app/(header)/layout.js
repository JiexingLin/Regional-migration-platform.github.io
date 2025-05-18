// app/layout.js
import '@/app/globals.css'
import NavBar from '@/components/navigation';
import BackgroundImage from '@/components/BackgroundImage';

export default function HeaderLayout({ children }) {
  return (
    <div className="header-layout">
      <BackgroundImage />
      <div className="content-wrapper">
        <NavBar />
        {children}
      </div>
    </div>
  );
}

