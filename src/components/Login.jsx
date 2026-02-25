import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = ({ toggleTheme, isDarkMode, setUsername }) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState('student');
  const [userInput, setUserInput] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    setUsername(userInput);
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
          to="/dashboard"
          className="flex items-center justify-center w-12 h-12 text-xl transition-all duration-300 border rounded-2xl bg-white/40 dark:bg-white/5 backdrop-blur-xl border-border-color dark:border-white/10 hover:bg-primary hover:text-white hover:scale-110 active:scale-95 shadow-lg"
          title="Dashboard"
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

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md p-12 border shadow-[0_40px_80px_rgba(0,0,0,0.1)] bg-white/60 dark:bg-gray-800/80 backdrop-blur-2xl border-white dark:border-white/5 rounded-3xl animate-popIn">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-black tracking-tighter text-text-dark">
            NDLI <span className="text-accent underline decoration-primary/20">PORTAL</span>
          </h1>
          <p className="mt-4 text-base text-text-gray font-medium">Sign in to your digital library account</p>
        </div>

        {/* Role Selection */}
        <div className="mb-10 p-1 bg-gray-50/80 dark:bg-black/20 border border-border-color dark:border-white/5 rounded-2xl flex relative overflow-hidden">
          <div
            className={`absolute top-1 bottom-1 w-[48%] bg-accent rounded-xl transition-all duration-500 ease-out shadow-lg shadow-accent/20 ${role === 'student' ? 'left-1' : 'left-[51%]'}`}
          ></div>
          <button
            onClick={() => setRole('student')}
            className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest relative z-10 transition-colors duration-300 ${role === 'student' ? 'text-white' : 'text-text-gray hover:text-text-dark'}`}
          >
            Student
          </button>
          <button
            onClick={() => setRole('admin')}
            className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest relative z-10 transition-colors duration-300 ${role === 'admin' ? 'text-white' : 'text-text-gray hover:text-text-dark'}`}
          >
            Admin
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-3">
            <label className="block text-xs font-black uppercase tracking-widest text-text-gray px-1">Email or Username</label>
            <input
              type="text"
              placeholder="user@example.com"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              className="w-full px-6 py-4 text-base transition-all duration-300 border outline-none bg-gray-50/50 dark:bg-black/20 border-border-color dark:border-white/5 rounded-2xl focus:border-accent focus:ring-8 focus:ring-accent/5 text-text-dark placeholder-text-gray/40"
              required
            />
          </div>

          <div className="space-y-3">
            <label className="block text-xs font-black uppercase tracking-widest text-text-gray px-1">Security Password</label>
            <div className="relative flex items-center group">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="w-full px-6 py-4 pr-14 text-base transition-all duration-300 border outline-none bg-gray-50/50 dark:bg-black/20 border-border-color dark:border-white/5 rounded-2xl focus:border-accent focus:ring-8 focus:ring-accent/5 text-text-dark placeholder-text-gray/40"
                required
              />
              <button
                type="button"
                className="absolute right-5 text-xl text-text-gray hover:text-accent transition-all hover:scale-125"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? '🔒' : '👁️'}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest">
            <label className="flex items-center gap-3 cursor-pointer text-text-gray hover:text-text-dark transition-colors">
              <input type="checkbox" className="w-4 h-4 rounded-lg border-border-color text-accent focus:ring-0" defaultChecked />
              <span>Keep me logged in</span>
            </label>
            <a href="#" className="text-primary hover:text-accent transition-colors">Recover?</a>
          </div>

          <button
            type="submit"
            className="w-full py-5 text-sm font-black uppercase tracking-[0.2em] text-white transition-all duration-500 shadow-2xl bg-accent rounded-2xl hover:bg-orange-600 hover:-translate-y-2 hover:shadow-accent/40 active:translate-y-0"
          >
            Authenticate
          </button>
        </form>

        <div className="mt-12 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-text-gray">
            New to NDLI? <Link to="/signup" className="text-primary hover:text-accent cursor-pointer transition-colors">Create Account</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
