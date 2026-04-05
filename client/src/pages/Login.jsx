import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { loginSuccess } from '../store/authSlice';
import { LogIn } from 'lucide-react';

const Login = () => {
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const res = await api.post('/auth/login', { identifier, password });
            
            // Dispatch to Redux
            dispatch(loginSuccess({
                user: { username: res.data.username, completed_topics: res.data.completed_topics },
                token: res.data.token
            }));
            
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to login');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-20 p-8 bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-3xl shadow-[0_0_40px_rgba(0,0,0,0.3)] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 rounded-full blur-[50px] -mr-10 -mt-10"></div>
            
            <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
            <p className="text-gray-400 text-sm mb-8">Sign in to track your mastery progress.</p>
            
            {error && <div className="p-3 bg-red-500/20 border border-red-500/50 text-red-300 rounded-lg text-sm mb-6 font-medium">{error}</div>}
            
            <form onSubmit={handleLogin} className="space-y-5 relative z-10">
                <div>
                    <label className="block text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2">Username or Email</label>
                    <input 
                        type="text" 
                        required
                        value={identifier}
                        onChange={(e) => setIdentifier(e.target.value)}
                        className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-200 transition-all"
                        placeholder="john_doe or john@example.com"
                    />
                </div>
                <div>
                    <label className="block text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2">Password</label>
                    <input 
                        type="password" 
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-200 transition-all"
                        placeholder="••••••••"
                    />
                </div>
                
                <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-800 disabled:opacity-50 text-white rounded-xl transition-all shadow-[0_0_20px_rgba(99,102,241,0.3)] flex items-center justify-center gap-2 font-semibold mt-4"
                >
                    {loading ? 'Authenticating...' : <><LogIn size={18} /> Sign In</>}
                </button>
            </form>
            
            <p className="mt-8 text-center text-sm text-gray-400">
                Don't have an account? <NavLink to="/register" className="text-indigo-400 hover:text-indigo-300 font-semibold underline underline-offset-4 transition-colors">Create one</NavLink>
            </p>
        </div>
    );
};

export default Login;
