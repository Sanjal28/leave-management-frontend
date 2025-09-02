import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import MainLayout from './layouts/MainLayout';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Import all the pages
import ApplyLeavePage from './pages/employee/ApplyLeavePage';
import LeaveHistoryPage from './pages/employee/LeaveHistoryPage';
import LeaveRequestsPage from './pages/manager/LeaveRequestsPage';
import TeamPage from './pages/manager/TeamPage';

function App() {
    const { isAuthenticated } = useSelector((state) => state.auth);

    return (
        <>
            <Router>
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />

                    {/* All protected routes now live inside the MainLayout */}
                    <Route
                        path="/"
                        element={
                            <ProtectedRoute>
                                <MainLayout />
                            </ProtectedRoute>
                        }
                    >
                        {/* The index route now directly renders the smart Dashboard component */}
                        <Route index element={<Dashboard />} />

                        {/* Employee-specific pages */}
                        <Route path="employee/apply" element={<ApplyLeavePage />} />
                        <Route path="employee/history" element={<LeaveHistoryPage />} />

                        {/* Manager-specific pages */}
                        <Route path="manager/requests" element={<LeaveRequestsPage />} />
                        <Route path="manager/team" element={<TeamPage />} />
                    </Route>
                    
                    <Route path="*" element={<Navigate to={isAuthenticated ? "/" : "/login"} />} />
                </Routes>
            </Router>
            <ToastContainer position="bottom-right" autoClose={3000} />
        </>
    );
}

export default App;