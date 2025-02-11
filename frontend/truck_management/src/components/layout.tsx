import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarCheckboxItem,
} from "@/components/ui/menubar"
import { useTheme } from "@/components/theme-provider";


const Layout: React.FC = () => {
  const { theme, setTheme } = useTheme();
  
  return (
    <div className="min-h-screen flex flex-col">
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger asChild>
              <Link to="/">Dashboard</Link>
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
          
          <MenubarMenu>
            <MenubarTrigger>Theme</MenubarTrigger>
            <MenubarContent>
              <MenubarCheckboxItem
                checked={theme === "light"}
                onClick={() => setTheme("light")}
              >
                Light
              </MenubarCheckboxItem>
            
              <MenubarCheckboxItem
                checked={theme === "dark"}
                onClick={() => setTheme("dark")}
              >
                Dark
              </MenubarCheckboxItem>
              
              <MenubarCheckboxItem
                checked={theme === "system"}
                onClick={() => setTheme("system")}
              >
                System
              </MenubarCheckboxItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      <main className="flex-1 p-4">
        <Outlet /> {/* Renders the matched child route */}
      </main>
    </div>
  );
};

export default Layout;