// app/layout.js
import '@/global/css/style.css'
import NavBar from '@/components/navigation';
// import BackgroundImage from '@/components/BackgroundImage';

export default function HeaderLayout({ children }) {
  return (
    <div className="header-layout">
      
      <div className="content-wrapper">
        <NavBar />
        {children}
      </div>
    </div>
  );
}

