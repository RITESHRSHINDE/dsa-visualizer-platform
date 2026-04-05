import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopNav from './TopNav';
import Footer from './Footer';

const Layout = () => {
  return (
    <div className="flex h-screen bg-gray-900 text-gray-100 overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <TopNav />
        <main className="flex-1 overflow-y-auto flex flex-col relative w-full h-full">
          <div className="flex-1 p-6 md:p-8 flex flex-col min-h-max">
             <Outlet />
          </div>
          <div className="shrink-0">
            <Footer />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
