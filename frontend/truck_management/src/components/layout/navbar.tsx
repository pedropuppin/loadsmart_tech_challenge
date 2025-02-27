import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar"
import { useTheme } from "@/components/theme-provider";
import { LoadsmartLogo } from "@/assets/svg/LoadsmartLogo"
import { Moon, Sun } from "lucide-react"


const Navbar: React.FC = () => {
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
  );
};

export default Navbar