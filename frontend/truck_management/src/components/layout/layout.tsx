import { Outlet } from 'react-router-dom';
import Footer from "./footer";
import Navbar from './navbar';
import { Toaster } from "@/components/ui/sonner"

const Layout: React.FC = () => {  
  return (
    <div className="min-h-screen flex flex-col">
      <div className="fixed top-0 left-0 w-full z-50 mb-6">
        <Navbar />
      </div>
      
      <main className="flex-1 p-4 mt-6">
        <Outlet /> {/* Renders the matched child route */}
        <Toaster />
      </main>
      
      <Footer />
    </div>
  );
};

export default Layout;