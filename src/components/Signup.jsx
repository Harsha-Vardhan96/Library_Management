import React, { useState, useCallback, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, GraduationCap, Microscope, Briefcase, Theater } from "lucide-react";
// eslint-disable-next-line no-unused-vars
import { motion, useMotionValue, useAnimationFrame, useTransform } from "framer-motion";

const animationStyles = `
  @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
  @keyframes slide-up { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes slide-right { from { opacity: 0; transform: translateX(-30px); } to { opacity: 1; transform: translateX(0); } }
  @keyframes slide-left { from { opacity: 0; transform: translateX(30px); } to { opacity: 1; transform: translateX(0); } }
  @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-20px); } }

  .animate-fade-in { animation: fade-in 0.8s ease-out forwards; }
  .animate-slide-up { animation: slide-up 0.6s ease-out forwards; }
  .animate-slide-right { animation: slide-right 0.8s ease-out forwards; }
  .animate-slide-left { animation: slide-left 0.8s ease-out forwards; }
  .animate-float { animation: float 6s ease-in-out infinite; }
  
  .delay-100 { animation-delay: 100ms; }
  .delay-200 { animation-delay: 200ms; }
  .delay-300 { animation-delay: 300ms; }
  .delay-400 { animation-delay: 400ms; }
  .delay-500 { animation-delay: 500ms; }
  .delay-600 { animation-delay: 600ms; }
`;

export function GradientText({
    children,
    className = '',
    colors = ['#5227FF', '#FF9FFC', '#B19EEF'],
    animationSpeed = 8,
    showBorder = false,
    direction = 'horizontal',
    pauseOnHover = false,
    yoyo = true
}) {
    const [isPaused, setIsPaused] = useState(false);
    const progress = useMotionValue(0);
    const elapsedRef = useRef(0);
    const lastTimeRef = useRef(null);

    const animationDuration = animationSpeed * 1000;

    useAnimationFrame(time => {
        if (isPaused) {
            lastTimeRef.current = null;
            return;
        }

        if (lastTimeRef.current === null) {
            lastTimeRef.current = time;
            return;
        }

        const deltaTime = time - lastTimeRef.current;
        lastTimeRef.current = time;
        elapsedRef.current += deltaTime;

        if (yoyo) {
            const fullCycle = animationDuration * 2;
            const cycleTime = elapsedRef.current % fullCycle;

            if (cycleTime < animationDuration) {
                progress.set((cycleTime / animationDuration) * 100);
            } else {
                progress.set(100 - ((cycleTime - animationDuration) / animationDuration) * 100);
            }
        } else {
            progress.set((elapsedRef.current / animationDuration) * 100);
        }
    });

    useEffect(() => {
        elapsedRef.current = 0;
        progress.set(0);
    }, [animationSpeed, progress, yoyo]);

    const backgroundPosition = useTransform(progress, p => {
        if (direction === 'horizontal') {
            return `${p}% 50%`;
        } else if (direction === 'vertical') {
            return `50% ${p}%`;
        } else {
            return `${p}% 50%`;
        }
    });

    const handleMouseEnter = useCallback(() => {
        if (pauseOnHover) setIsPaused(true);
    }, [pauseOnHover]);

    const handleMouseLeave = useCallback(() => {
        if (pauseOnHover) setIsPaused(false);
    }, [pauseOnHover]);

    const gradientAngle =
        direction === 'horizontal' ? 'to right' : direction === 'vertical' ? 'to bottom' : 'to bottom right';
    const gradientColors = [...colors, colors[0]].join(', ');

    const gradientStyle = {
        backgroundImage: `linear-gradient(${gradientAngle}, ${gradientColors})`,
        backgroundSize: direction === 'horizontal' ? '300% 100%' : direction === 'vertical' ? '100% 300%' : '300% 300%',
        backgroundRepeat: 'repeat'
    };

    return (
        <motion.div
            className={`relative mx-auto flex max-w-fit flex-row items-center justify-center rounded-[1.25rem] font-medium backdrop-blur transition-shadow duration-500 overflow-hidden cursor-pointer ${showBorder ? 'py-1 px-2' : ''} ${className}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {showBorder && (
                <motion.div
                    className="absolute inset-0 z-0 pointer-events-none rounded-[1.25rem]"
                    style={{ ...gradientStyle, backgroundPosition }}
                >
                    <div
                        className="absolute bg-indigo-950 rounded-[1.25rem] z-[-1]"
                        style={{
                            width: 'calc(100% - 2px)',
                            height: 'calc(100% - 2px)',
                            left: '50%',
                            top: '50%',
                            transform: 'translate(-50%, -50%)'
                        }}
                    />
                </motion.div>
            )}
            <motion.div
                className="inline-block relative z-2 text-transparent bg-clip-text"
                style={{ ...gradientStyle, backgroundPosition, WebkitBackgroundClip: 'text' }}
            >
                {children}
            </motion.div>
        </motion.div>
    );
}

export default function Signup({ setUsername }) {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [role, setRole] = useState('user');
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        if (setUsername) {
            setUsername(fullName);
        }
        
        if (role === 'admin') {
            navigate('/admin-dashboard');
        } else {
            navigate('/dashboard');
        }
    };

    return (
        <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4 sm:p-8 font-sans text-gray-800 dark:text-gray-200 overflow-hidden relative">
            <style>{animationStyles}</style>

            {/* Login Card Container (Reused layout for consistency) */}
            <div className="flex flex-col md:flex-row w-full max-w-5xl bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden relative z-10 border border-gray-100 dark:border-gray-800 animate-fade-in opacity-0">

                {/* --- LEFT SIDE: Cinematic Hero --- */}
                <div className="hidden md:flex flex-col w-1/2 relative bg-indigo-950 text-white p-10 justify-between overflow-hidden">

                    {/* Background Image & Overlays */}
                    <div
                        className="absolute inset-0 z-0 bg-cover bg-center"
                        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=2070&auto=format&fit=crop')" }}
                    ></div>
                    <div className="absolute inset-0 bg-indigo-950/80 mix-blend-multiply z-0"></div>

                    {/* Neon Orbs/Rings */}
                    <div className="absolute -top-20 -left-20 w-80 h-80 bg-purple-600 rounded-full mix-blend-screen filter blur-[100px] opacity-60 z-0 animate-float"></div>
                    <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-blue-500 rounded-full mix-blend-screen filter blur-[100px] opacity-60 z-0 animate-float delay-500"></div>

                    {/* Top Label */}
                    <div className="relative z-10 animate-slide-right delay-100 opacity-0 mb-8 flex justify-start w-full">
                        <GradientText
                            colors={["#818cf8", "#e879f9", "#38bdf8"]}
                            animationSpeed={5}
                            showBorder={true}
                            className="text-xs font-semibold tracking-wider uppercase !mx-0 px-4 py-1.5"
                        >
                            A Paradigm Shift in Education
                        </GradientText>
                    </div>

                    {/* Hero Content */}
                    <div className="relative z-10 my-12 animate-slide-right delay-200 opacity-0">
                        <h1 className="text-5xl font-extrabold leading-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-indigo-200">
                            Join Us.<br />Grow Deep.
                        </h1>
                        <p className="text-lg text-indigo-100/80 leading-relaxed max-w-sm">
                            Create your gateway to millions of universal, high-quality resources and courses.
                        </p>
                    </div>

                    {/* Category Icons */}
                    <div className="relative z-10 grid grid-cols-4 gap-4 mt-auto">
                        {[
                            { icon: GraduationCap, label: "Higher Ed" },
                            { icon: Microscope, label: "Research" },
                            { icon: Briefcase, label: "Career" },
                            { icon: Theater, label: "Cultural" },
                        ].map((cat, idx) => (
                            <div key={idx} className={`flex flex-col items-center justify-center space-y-2 group cursor-pointer animate-slide-up opacity-0 delay-${300 + idx * 100}`}>
                                <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:bg-white/20 transition-all duration-300 hover:-translate-y-1">
                                    <cat.icon className="w-5 h-5 text-indigo-100" />
                                </div>
                                <span className="text-xs font-medium text-indigo-200">{cat.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* --- RIGHT SIDE: Form --- */}
                <div className="w-full md:w-1/2 p-8 sm:p-12 flex flex-col justify-center bg-gray-50 dark:bg-gray-900 animate-slide-left delay-300 opacity-0">

                    <div className="mb-6">
                        <GradientText
                            colors={["#5227FF", "#FF9FFC", "#B19EEF"]}
                            animationSpeed={8}
                            className="text-4xl font-bold mb-2 !mx-0 justify-start"
                        >
                            Create Account
                        </GradientText>
                        <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
                            Fill in the details below to join the Digital Library
                        </p>
                    </div>

                    {/* Role Selection Toggle */}
                    <div className="flex rounded-lg bg-gray-200 dark:bg-gray-800 p-1 mb-6 shadow-inner">
                        <button
                            type="button"
                            className={`flex-1 py-2 text-sm font-semibold rounded-md transition-all duration-200 flex items-center justify-center gap-2 ${role === "user"
                                    ? "bg-white dark:bg-gray-700 text-indigo-600 dark:text-white shadow"
                                    : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                                }`}
                            onClick={() => setRole("user")}
                        >
                            👤 User
                        </button>
                        <button
                            type="button"
                            className={`flex-1 py-2 text-sm font-semibold rounded-md transition-all duration-200 flex items-center justify-center gap-2 ${role === "admin"
                                    ? "bg-white dark:bg-gray-700 text-indigo-600 dark:text-white shadow"
                                    : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                                }`}
                            onClick={() => setRole("admin")}
                        >
                            🛡️ Admin
                        </button>
                    </div>

                    {/* Form Inputs */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
                            <input
                                type="text"
                                placeholder="John Doe"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                className="w-full px-4 py-2.5 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-900 outline-none transition-all placeholder-gray-400 dark:placeholder-gray-500 text-gray-900 dark:text-white"
                                required
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                            <input
                                type="email"
                                placeholder="user@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-2.5 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-900 outline-none transition-all placeholder-gray-400 dark:placeholder-gray-500 text-gray-900 dark:text-white"
                                required
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    className="w-full px-4 py-2.5 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-900 outline-none transition-all placeholder-gray-400 dark:placeholder-gray-500 text-gray-900 dark:text-white"
                                    required
                                />
                                <button
                                    type="button"
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Re-enter Password</label>
                            <div className="relative flex items-center group">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    className="w-full px-4 py-2.5 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-900 outline-none transition-all placeholder-gray-400 dark:placeholder-gray-500 text-gray-900 dark:text-white"
                                    required
                                />
                                <button
                                    type="button"
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full mt-4 py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all focus:ring-4 focus:ring-indigo-200 dark:focus:ring-indigo-900"
                        >
                            Sign Up
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Already a member?{" "}
                            <Link to="/login" className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 font-semibold hover:underline">
                                Sign In
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}