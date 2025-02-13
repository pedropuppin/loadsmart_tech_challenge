import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/layout';
import Dashboard from './pages/dashboard/dashboard';
import AssignmentList from '@/pages/assignments/assignmentList';
import DriverList from '@/pages/drivers/driverList';
import TruckList from '@/pages/trucks/truckList';
import AssignmentForm from '@/pages/assignments/assignmentForm';
import DriverForm from '@/pages/drivers/driverForm';
import TruckForm from '@/pages/trucks/truckForm';
import DriverFormWrapper from '@/pages/drivers/driverFormWrapper';
import TruckFormWrapper from '@/pages/trucks/truckFormWrapper';
import DriverDetail from './pages/drivers/driverDetail';
import TruckDetail from './pages/trucks/truckDetail';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="assignments" element={<AssignmentList />} />
        <Route path="drivers" element={<DriverList />} />
        <Route path="trucks" element={<TruckList />} />
        <Route path="assignments/new" element={<AssignmentForm />} />
        <Route path="drivers/new" element={<DriverForm />} />
        <Route path="trucks/new" element={<TruckForm />} />
        <Route path="driver/edit/:id" element={<DriverFormWrapper />} />
        <Route path="truck/edit/:id" element={<TruckFormWrapper />} />
        <Route path="drivers/:id" element={<DriverDetail />} />
        <Route path="trucks/:id" element={<TruckDetail />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
