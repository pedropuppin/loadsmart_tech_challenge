import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from "@/components/theme-provider"
import AppRoutes from './routes';

const App: React.FC = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;