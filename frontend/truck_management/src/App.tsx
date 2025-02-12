import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout';
import { ThemeProvider } from "@/components/theme-provider"

// Import pages
import DriverList from './pages/drivers/driverList';
import TruckList from './pages/trucks/truckList';
import AssignmentList from './pages/assignments/assignmentList';
import Dashboard from './pages/dashboard/dashboard';
import DriverForm from './pages/drivers/driverForm';
import TruckForm from './pages/trucks/truckForm';
//import AssignmentForm from './pages/assignments/AssignmentForm';

const App: React.FC = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="drivers" element={<DriverList />} />
            <Route path="/drivers/new" element={<DriverForm />} />
            <Route path="trucks" element={<TruckList />} />
            <Route path="/trucks/new" element={<TruckForm />} />
            <Route path="assignments" element={<AssignmentList />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;