import React from 'react';
import { useSelector } from 'react-redux';
import { DashboardShimmer } from '../components/Shimmer';
import EmployeeDashboard from './employee/EmployeeDashboard';
import ManagerDashboard from './manager/ManagerDashboard';

const Dashboard = () => {
    // Get the user and loading status from the Redux store
    const { user, isLoading } = useSelector((state) => state.auth);

    // 1. While the user's data is loading (especially on a refresh), show the shimmer UI.
    if (isLoading || !user) {
        return <DashboardShimmer />;
    }

    // 2. Once loaded, check the user's role and render the correct dashboard component directly.
    if (user.role === 'EMPLOYEE') {
        return <EmployeeDashboard />;
    }

    if (user.role === 'MANAGER') {
        return <ManagerDashboard />;
    }

    // 3. Fallback in case the role is not recognized (should not happen in normal flow).
    return <div>Error: User role could not be determined. Please try logging in again.</div>;
};

export default Dashboard;