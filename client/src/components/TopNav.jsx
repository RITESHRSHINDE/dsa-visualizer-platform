import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LogIn, UserPlus, LogOut, User } from 'lucide-react';
import { logout } from '../store/authSlice';

const TopNav = () => {
    const { isAuthenticated, user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    return (
        <header className="h-16 bg-gray-900/80 backdrop-blur-md border-b border-gray-800 sticky top-0 z-30 px-6 flex items-center justify-between shadow-sm">
            <div className="flex items-center">
                {/* Mobile placeholder - Sidebar could toggle here */}
                <span className="text-gray-400 text-sm font-semibold tracking-wider md:hidden uppercase">DSA Visualizer</span>
            </div>

            <div className="flex items-center gap-4">
                {isAuthenticated ? (
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 bg-gray-800 px-3 py-1.5 rounded-lg border border-gray-700">
                            <div className="w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center text-white text-xs font-bold shadow-md">
                                {user?.username?.charAt(0).toUpperCase() || 'U'}
                            </div>
                            <span className="text-sm font-medium text-gray-200">{user?.username}</span>
                        </div>
                        <button 
                            onClick={handleLogout}
                            className="text-gray-400 hover:text-red-400 transition-colors p-2 rounded-lg hover:bg-gray-800 flex items-center gap-2 text-sm font-semibold tracking-wider"
                        >
                           <LogOut size={16} /> Logout
                        </button>
                    </div>
                ) : (
                    <div className="flex items-center gap-3">
                        <NavLink 
                            to="/login"
                            className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors flex items-center gap-2"
                        >
                            <LogIn size={16} /> Login
                        </NavLink>
                        <NavLink 
                            to="/register"
                            className="px-4 py-2 text-sm font-medium bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors shadow-lg shadow-indigo-500/20 flex items-center gap-2"
                        >
                            <UserPlus size={16} /> Register
                        </NavLink>
                    </div>
                )}
            </div>
        </header>
    );
};

export default TopNav;
