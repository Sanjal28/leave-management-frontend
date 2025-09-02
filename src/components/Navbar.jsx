import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../features/auth/authSlice';
import { Bars3Icon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';

const Navbar = ({ toggleSidebar }) => {
    const { isAuthenticated, user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    return (
        <nav className="bg-white shadow-md sticky top-0 z-20">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center space-x-4">
                         {isAuthenticated && (
                            <button onClick={toggleSidebar} className="md:hidden text-gray-600 hover:text-indigo-600">
                                <Bars3Icon className="h-6 w-6" />
                            </button>
                        )}
                        <Link to="/" className="text-2xl font-bold text-indigo-600">
                            LeaveApp
                        </Link>
                    </div>
                    <div>
                        {isAuthenticated ? (
                            <div className="flex items-center space-x-4">
                                <div className="hidden sm:block text-right">
                                    <p className="font-semibold text-gray-800">{user?.email}</p>
                                    <p className="text-xs text-gray-500 uppercase font-bold">{user?.role}</p>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-3 rounded-lg transition-all duration-200"
                                >
                                    <ArrowRightOnRectangleIcon className="h-5 w-5" />
                                    <span className="hidden sm:inline">Logout</span>
                                </button>
                            </div>
                        ) : (
                             <div className="space-x-2">
                                <Link to="/login" className="font-semibold text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md">Login</Link>
                                <Link to="/register" className="font-semibold text-white bg-indigo-600 hover:bg-indigo-700 px-3 py-2 rounded-md">Register</Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
