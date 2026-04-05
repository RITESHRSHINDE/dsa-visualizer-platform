import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { loginSuccess } from '../store/authSlice';
import { UserPlus } from 'lucide-react';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');
        
        if (password.length < 6) {
           return setError('Password must be at least 6 characters.');
        }

        setLoading(true);

        try {
            const res = await api.post('/auth/register', { username, email, password });
            
            // Dispatch to Redux
            dispatch(loginSuccess({
                user: { username: res.data.username, completed_topics: res.data.completed_topics },
                token: res.data.token
            }));
            
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to register account');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-16 p-8 bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-3xl shadow-[0_0_40px_rgba(0,0,0,0.3)] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-purple-500/20 rounded-full blur-[60px] -mr-10 -mt-10 pointer-events-none"></div>
            
            <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
            <p className="text-gray-400 text-sm mb-8">Join the platform to track algorithmic mastery.</p>
            
            {error && <div className="p-3 bg-red-500/20 border border-red-500/50 text-red-300 rounded-lg text-sm mb-6 font-medium">{error}</div>}
            
            <form onSubmit={handleRegister} className="space-y-4 relative z-10">
                <div>
                    <label className="block text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2">Username</label>
                    <input 
                        type="text" 
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-200 transition-all"
                        placeholder="john_doe"
                    />
                </div>
                <div>
                    <label className="block text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2">Email</label>
                    <input 
                        type="email" 
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-200 transition-all"
                        placeholder="john@example.com"
                    />
                </div>
                <div>
                    <label className="block text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2">Password</label>
                    <input 
                        type="password" 
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-200 transition-all"
                        placeholder="••••••••"
                    />
                </div>
                
                <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full py-3 bg-purple-600 hover:bg-purple-500 disabled:bg-purple-800 disabled:opacity-50 text-white rounded-xl transition-all shadow-[0_0_20px_rgba(168,85,247,0.3)] flex items-center justify-center gap-2 font-semibold mt-6"
                >
                    {loading ? 'Creating Account...' : <><UserPlus size={18} /> Sign Up</>}
                </button>
            </form>
            
            <p className="mt-8 text-center text-sm text-gray-400">
                Already have an account? <NavLink to="/login" className="text-purple-400 hover:text-purple-300 font-semibold underline underline-offset-4 transition-colors">Sign in</NavLink>
            </p>
        </div>
    );
};

export default Register;
