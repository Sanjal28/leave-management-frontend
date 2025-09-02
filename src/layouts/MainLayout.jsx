import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from '../components/Navbar';
import {
    ChartPieIcon,
    DocumentPlusIcon,
    ClockIcon,
    UserGroupIcon,
    DocumentTextIcon,
    HomeIcon
} from '@heroicons/react/24/outline';

const employeeLinks = [
    { name: 'Dashboard', href: '/', icon: HomeIcon }, // Change this to "/"
    { name: 'Apply for Leave', href: '/employee/apply', icon: DocumentPlusIcon },
    { name: 'Leave History', href: '/employee/history', icon: ClockIcon },
];

const managerLinks = [
    { name: 'Dashboard', href: '/', icon: ChartPieIcon }, // Change this to "/"
    { name: 'Leave Requests', href: '/manager/requests', icon: DocumentTextIcon },
    { name: 'My Team', href: '/manager/team', icon: UserGroupIcon },
];

const MainLayout = () => {
    const { user } = useSelector((state) => state.auth);
    const links = user?.role === 'MANAGER' ? managerLinks : employeeLinks;
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar toggleSidebar={toggleSidebar} />
            <div className="flex">
                {/* Overlay for mobile */}
                {sidebarOpen && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
                        onClick={toggleSidebar}
                    ></div>
                )}

                <aside
                    className={`fixed md:relative inset-y-0 left-0 w-64 bg-white shadow-lg h-screen p-4 transform ${
                        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    } md:translate-x-0 transition-transform duration-300 ease-in-out z-30`}
                >
                    <nav className="mt-8">
                        <ul>
                            {links.map((link) => (
                                <li key={link.name}>
                                    <NavLink
                                        to={link.href}
                                        onClick={() => setSidebarOpen(false)} // Close sidebar on mobile nav click
                                        className={({ isActive }) =>
                                            `flex items-center p-3 my-2 rounded-lg transition-all duration-200 ${
                                                isActive
                                                    ? 'bg-indigo-600 text-white shadow-lg'
                                                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                                            }`
                                        }
                                    >
                                        <link.icon className="h-6 w-6 mr-4" />
                                        <span className="font-semibold">{link.name}</span>
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </aside>

                <main className="flex-1 p-4 sm:p-6 lg:p-8 transition-all duration-300">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default MainLayout;
