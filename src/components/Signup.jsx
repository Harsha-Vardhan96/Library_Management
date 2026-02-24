import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Signup = ({ toggleTheme, isDarkMode, setUsername }) => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [role, setRole] = useState('student');
    const [fullName, setFullName] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        setUsername(fullName);
        // Simulate signup success and navigate to appropriate dashboard
        if (role === 'admin') {
            navigate('/admin-dashboard');
        } else {
            navigate('/dashboard');
        }
    };

    return (
        <div className="relative flex items-center justify-center min-h-screen p-5 overflow-hidden transition-colors duration-500 bg-bg-light">
            {/* Dynamic Background */}
            <div className="bg-shape shape-1 animate-float opacity-30 dark:opacity-10"></div>
            <div className="bg-shape shape-2 animate-float opacity-30 dark:opacity-10"></div>

            {/* Modern Controls */}
            <div className="absolute flex gap-4 z-[100] top-6 right-6">
                <Link
                    to="/"
                    className="flex items-center justify-center w-12 h-12 text-xl transition-all duration-300 border rounded-2xl bg-white/40 dark:bg-white/5 backdrop-blur-xl border-border-color dark:border-white/10 hover:bg-primary hover:text-white hover:scale-110 active:scale-95 shadow-lg"
                    title="Home"
                >
                    🏠
                </Link>
                <button
                    className="flex items-center justify-center w-12 h-12 text-xl transition-all duration-300 border rounded-2xl bg-white/40 dark:bg-white/5 backdrop-blur-xl border-border-color dark:border-white/10 hover:bg-primary hover:text-white hover:scale-110 active:scale-95 shadow-lg"
                    onClick={toggleTheme}
                    title="Toggle Theme"
                >
                    {isDarkMode ? '☀️' : '🌙'}
                </button>
            </div>

            {/* Signup Card */}
            <div className="relative z-10 w-full max-w-md p-10 border shadow-[0_40px_80px_rgba(0,0,0,0.1)] bg-white/60 dark:bg-gray-800/80 backdrop-blur-2xl border-white dark:border-white/5 rounded-3xl animate-popIn">
                <div className="mb-10 text-center">
                    <h1 className="text-4xl font-black tracking-tighter text-text-dark">
                        JOIN <span className="text-accent underline decoration-primary/20">NDLI</span>
                    </h1>
                    <p className="mt-3 text-base text-text-gray font-medium">Create your gateway to digital knowledge</p>
                </div>

                {/* Role Toggle */}
                <div className="mb-8 p-1 bg-gray-50/80 dark:bg-black/20 border border-border-color dark:border-white/5 rounded-2xl flex relative overflow-hidden">
                    <div
                        className={`absolute top-1 bottom-1 w-[48%] bg-accent rounded-xl transition-all duration-500 ease-out shadow-lg shadow-accent/20 ${role === 'admin' ? 'left-[51%]' : 'left-1'}`}
                    ></div>
                    <button
                        type="button"
                        onClick={() => setRole('student')}
                        className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest relative z-10 transition-colors duration-300 ${role === 'student' ? 'text-white' : 'text-text-gray hover:text-text-dark'}`}
                    >
                        Student / Educator
                    </button>
                    <button
                        type="button"
                        onClick={() => setRole('admin')}
                        className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest relative z-10 transition-colors duration-300 ${role === 'admin' ? 'text-white' : 'text-text-gray hover:text-text-dark'}`}
                    >
                        Administrator
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="block text-xs font-black uppercase tracking-widest text-text-gray px-1">Full Name</label>
                        <input
                            type="text"
                            placeholder="John Doe"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className="w-full px-5 py-3.5 text-base transition-all duration-300 border outline-none bg-gray-50/50 dark:bg-black/20 border-border-color dark:border-white/5 rounded-2xl focus:border-accent focus:ring-8 focus:ring-accent/5 text-text-dark placeholder-text-gray/40"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-xs font-black uppercase tracking-widest text-text-gray px-1">Email Address</label>
                        <input
                            type="email"
                            placeholder="user@example.com"
                            className="w-full px-5 py-3.5 text-base transition-all duration-300 border outline-none bg-gray-50/50 dark:bg-black/20 border-border-color dark:border-white/5 rounded-2xl focus:border-accent focus:ring-8 focus:ring-accent/5 text-text-dark placeholder-text-gray/40"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-xs font-black uppercase tracking-widest text-text-gray px-1">Create Password</label>
                        <div className="relative flex items-center group">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                className="w-full px-5 py-3.5 pr-14 text-base transition-all duration-300 border outline-none bg-gray-50/50 dark:bg-black/20 border-border-color dark:border-white/5 rounded-2xl focus:border-accent focus:ring-8 focus:ring-accent/5 text-text-dark placeholder-text-gray/40"
                                required
                            />
                            <button
                                type="button"
                                className="absolute right-5 text-xl text-text-gray hover:text-accent transition-all hover:scale-120"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? '🔒' : '👁️'}
                            </button>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="block text-xs font-black uppercase tracking-widest text-text-gray px-1">Confirm Password</label>
                        <div className="relative flex items-center group">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="••••••••"
                                className="w-full px-5 py-3.5 pr-14 text-base transition-all duration-300 border outline-none bg-gray-50/50 dark:bg-black/20 border-border-color dark:border-white/5 rounded-2xl focus:border-accent focus:ring-8 focus:ring-accent/5 text-text-dark placeholder-text-gray/40"
                                required
                            />
                            <button
                                type="button"
                                className="absolute right-5 text-xl text-text-gray hover:text-accent transition-all hover:scale-120"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                                {showConfirmPassword ? '🔒' : '👁️'}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-4.5 text-sm font-black uppercase tracking-[0.2em] text-white transition-all duration-500 shadow-2xl bg-accent rounded-2xl hover:bg-orange-600 hover:-translate-y-2 hover:shadow-accent/40 active:translate-y-0"
                    >
                        Create Account
                    </button>
                </form>

                <div className="mt-10 text-center">
                    <p className="text-xs font-bold uppercase tracking-widest text-text-gray">
                        Already a member? <Link to="/login" className="text-primary hover:text-accent cursor-pointer transition-colors">Sign In</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Signup;
