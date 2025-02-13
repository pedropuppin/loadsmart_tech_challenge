import React, { useMemo } from 'react';
import { Link, Outlet } from 'react-router-dom';
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar"
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner"
import { useTheme } from "@/components/theme-provider";
import { LoadsmartLogo } from "@/components/svg/LoadsmartLogo"
import { Moon, Sun } from "lucide-react"


const Layout: React.FC = () => {
  const { theme, setTheme } = useTheme();
  
  const effectiveTheme = useMemo(() => {
    if (theme === "system") {
      const systemPrefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches
      return systemPrefersDark ? "dark" : "light"
    }
    return theme
  }, [theme])
  
  const isDark = effectiveTheme === "dark"

  const handleClick = () => {
    setTheme(isDark ? "light" : "dark")
  }
  
  const icon = isDark
  ? <Moon className="w-4 h-4" />
  : <Sun className="w-4 h-4" />
  
  return (
    <div className="min-h-screen flex flex-col">
      <div className="fixed top-0 left-0 w-full z-50 mb-6">
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger asChild>
              <Link to="/" className="flex items-center">
                <LoadsmartLogo/>
              </Link>
            </MenubarTrigger>
          </MenubarMenu>
          
          <MenubarMenu>
            <MenubarTrigger asChild>
              <Link to="/drivers">Drivers</Link>
            </MenubarTrigger>
          </MenubarMenu>
          
          <MenubarMenu>
            <MenubarTrigger asChild>
              <Link to="/trucks">Trucks</Link>
            </MenubarTrigger>
          </MenubarMenu>
          
          <MenubarMenu>
            <MenubarTrigger asChild>
              <Link to="/assignments">Assignments</Link>
            </MenubarTrigger>
          </MenubarMenu>
                    
          {/* Theme toggle */}
          <MenubarMenu>
            <MenubarTrigger
              onClick={handleClick}
              className="
                px-2 py-1 
                flex items-center 
                gap-2 
                text-sm font-medium
                hover:bg-secondary/20
                rounded
                transition-colors
              "
            >
              {icon}
            </MenubarTrigger>
          </MenubarMenu>
        </Menubar>
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