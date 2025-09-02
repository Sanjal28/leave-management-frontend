import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import apiService from '../../api/apiService';
import { useSelector } from 'react-redux';
import { format } from 'date-fns';
import { CalendarDaysIcon, PlusCircleIcon, ClockIcon } from '@heroicons/react/24/outline';
import { DashboardShimmer, ListShimmer } from '../../components/Shimmer'; // We'll use our shimmer

const EmployeeDashboard = () => {
    const { user } = useSelector((state) => state.auth);
    const [balance, setBalance] = useState(null);
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // We use Promise.all to fetch both pieces of data concurrently for better performance.
        const fetchData = async () => {
            try {
                const [balanceRes, historyRes] = await Promise.all([
                    apiService.get('/employee/leave-balance'),
                    apiService.get('/employee/leave-history')
                ]);
                setBalance(balanceRes.data);
                // Sort history to show the most recent requests first
                setHistory(historyRes.data.sort((a, b) => new Date(b.requestedDate) - new Date(a.requestedDate)));
            } catch (error) {
                console.error("Failed to fetch employee dashboard data", error);
            } finally {
                // This `finally` block ensures loading is set to false even if the API calls fail.
                // This is the key to fixing the "stuck on loading" bug.
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // Show the shimmer UI while loading
    if (loading) {
        return (
            <div className="space-y-8">
                <div className="h-8 bg-gray-200 rounded w-2/3 animate-pulse"></div>
                <DashboardShimmer />
                <ListShimmer count={3} />
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-fade-in">
            {/* --- Welcome Header --- */}
            <div>
                <h1 className="text-3xl font-bold text-gray-800">Welcome Back!</h1>
                <p className="text-gray-500">Here's your leave summary at a glance.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* --- Main Dashboard Column --- */}
                <div className="lg:col-span-2 space-y-6">
                    {/* --- Leave Balance Card --- */}
                    <div className="bg-gradient-to-br from-indigo-600 to-purple-700 p-8 rounded-xl shadow-2xl text-white">
                        <div className="flex items-center space-x-4">
                            <CalendarDaysIcon className="h-12 w-12" />
                            <div>
                                <p className="text-lg font-medium text-indigo-200">Available Leave Balance</p>
                                <p className="text-5xl font-bold">{balance} Days</p>
                            </div>
                        </div>
                    </div>

                    {/* --- Recent Activity --- */}
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                            <ClockIcon className="h-6 w-6 mr-2 text-gray-500" />
                            Recent Activity
                        </h2>
                        <div className="space-y-4">
                            {history.length > 0 ? history.slice(0, 3).map(req => ( // Show the 3 most recent
                                <div key={req.id} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                                    <div className="flex flex-col sm:flex-row justify-between sm:items-center">
                                        <div>
                                            <p className="font-semibold text-gray-700">{req.reason}</p>
                                            <p className="text-sm text-gray-500">
                                                {format(new Date(req.startDate), 'MMM d')} - {format(new Date(req.endDate), 'MMM d, yyyy')}
                                            </p>
                                        </div>
                                        <span className={`mt-2 sm:mt-0 px-3 py-1 rounded-full text-sm font-semibold 
                                            ${req.status === 'APPROVED' ? 'bg-green-100 text-green-800' :
                                            req.status === 'REJECTED' ? 'bg-red-100 text-red-800' :
                                            'bg-yellow-100 text-yellow-800'}`}>
                                            {req.status}
                                        </span>
                                    </div>
                                </div>
                            )) : <p className="bg-white p-4 rounded-lg shadow-md text-center text-gray-500">No recent leave requests found.</p>}
                        </div>
                    </div>
                </div>

                {/* --- Actions Column --- */}
                <div className="lg:col-span-1">
                    <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
                        <h2 className="text-xl font-bold text-gray-800">Actions</h2>
                        <Link
                            to="/employee/apply"
                            className="w-full flex items-center justify-center space-x-2 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105"
                        >
                            <PlusCircleIcon className="h-6 w-6" />
                            <span>Apply for New Leave</span>
                        </Link>
                         <Link
                            to="/employee/history"
                            className="w-full block text-center text-indigo-600 font-semibold hover:underline"
                        >
                            View All Leave History
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeeDashboard;