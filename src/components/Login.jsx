import React, { useState, useCallback, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, GraduationCap, Microscope, Briefcase, Theater, Sparkles, ArrowRight } from "lucide-react";
import { motion, useMotionValue, useAnimationFrame, useTransform, AnimatePresence } from "framer-motion";
import ProfessionalBackground from "./ProfessionalBackground";

/* ─── Google Icon ─────────────────────────────────────────────────────────── */
const GoogleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
  </svg>
);

/* ─── Animated Gradient Text ─────────────────────────────────────────────── */
export function GradientText({
  children,
  className = '',
  colors = ['#818cf8', '#e879f9', '#38bdf8'],
  animationSpeed = 8,
}) {
  const progress = useMotionValue(0);
  const elapsedRef = useRef(0);
  const lastTimeRef = useRef(null);
  const duration = animationSpeed * 1000;

  useAnimationFrame((time) => {
    if (lastTimeRef.current === null) { lastTimeRef.current = time; return; }
    const delta = time - lastTimeRef.current;
    lastTimeRef.current = time;
    elapsedRef.current += delta;
    const full = duration * 2;
    const cycle = elapsedRef.current % full;
    progress.set(cycle < duration ? (cycle / duration) * 100 : 100 - ((cycle - duration) / duration) * 100);
  });

  const backgroundPosition = useTransform(progress, p => `${p}% 50%`);
  const gradientColors = [...colors, colors[0]].join(', ');

  return (
    <motion.span
      className={`inline-block bg-clip-text text-transparent ${className}`}
      style={{
        backgroundImage: `linear-gradient(to right, ${gradientColors})`,
        backgroundSize: '300% 100%',
        backgroundPosition,
        WebkitBackgroundClip: 'text',
      }}
    >
      {children}
    </motion.span>
  );
}

/* ─── Floating Particle ──────────────────────────────────────────────────── */
const Particle = ({ delay, x, size, color }) => (
  <motion.div
    className="absolute rounded-full pointer-events-none"
    style={{ left: `${x}%`, width: size, height: size, background: color, filter: 'blur(1px)' }}
    initial={{ y: '110vh', opacity: 0 }}
    animate={{ y: '-10vh', opacity: [0, 0.8, 0.8, 0] }}
    transition={{ duration: 8 + Math.random() * 4, delay, repeat: Infinity, ease: 'linear' }}
  />
);

/* ─── Category data ───────────────────────────────────────────────────────── */
const CATEGORIES = [
  { Icon: GraduationCap, label: "Higher Ed", color: "#818cf8" },
  { Icon: Microscope,    label: "Research",  color: "#e879f9" },
  { Icon: Briefcase,     label: "Career",    color: "#38bdf8" },
  { Icon: Theater,       label: "Cultural",  color: "#a78bfa" },
];

/* ─── Stagger helpers ─────────────────────────────────────────────────────── */
const fadeUp   = { hidden: { opacity: 0, y: 40 },   visible: { opacity: 1, y: 0 } };
const fadeLeft = { hidden: { opacity: 0, x: -50 },  visible: { opacity: 1, x: 0 } };
const fadeRight= { hidden: { opacity: 0, x: 50 },   visible: { opacity: 1, x: 0 } };
const scaleIn  = { hidden: { opacity: 0, scale: 0.85 }, visible: { opacity: 1, scale: 1 } };

/* ─── Particles config ───────────────────────────────────────────────────── */
const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  delay: i * 0.6,
  x: Math.random() * 100,
  size: 3 + Math.random() * 5,
  color: ['rgba(129,140,248,0.6)', 'rgba(232,121,249,0.6)', 'rgba(56,189,248,0.6)', 'rgba(167,139,250,0.5)'][i % 4],
}));

/* ════════════════════════════════════════════════════════════════════════════
   LOGIN COMPONENT
   ════════════════════════════════════════════════════════════════════════════ */
const Login = ({ setUsername }) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword]   = useState(false);
  const [userInput, setUserInput]         = useState("");
  const [password, setPassword]           = useState("");
  const [role, setRole]                   = useState("user");
  const [loading, setLoading]             = useState(false);
  const [mounted, setMounted]             = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    setUsername(userInput);
    navigate(role === "admin" ? "/admin-dashboard" : "/dashboard");
  };

  return (
    <div className="w-screen h-screen overflow-hidden relative font-sans">

      {/* ── Professional Background ── */}
      <ProfessionalBackground />

      {/* ── Floating Particles overlay ── */}
      <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
        {PARTICLES.map((p, i) => <Particle key={i} {...p} />)}
      </div>

      {/* ── Main Layout: Left Hero + Right Form ── */}
      <div className="relative z-10 flex w-full h-full">

        {/* ══ LEFT PANEL ══════════════════════════════════════════════════════ */}
        <motion.div
          className="hidden lg:flex flex-col justify-between w-[55%] h-full px-16 py-14 relative overflow-hidden"
          initial="hidden"
          animate={mounted ? "visible" : "hidden"}
          transition={{ staggerChildren: 0.15, delayChildren: 0.2 }}
        >
          {/* Library image overlay */}
          <div
            className="absolute inset-0 z-0 bg-cover bg-center opacity-20"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=2070&auto=format&fit=crop')" }}
          />
          {/* Gradient overlay so text is readable */}
          <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#06020c] via-[#0d0520]/80 to-transparent" />

          {/* ── Top badge ── */}
          <motion.div variants={fadeLeft} transition={{ duration: 0.7, ease: [0.22,1,0.36,1] }} className="relative z-10 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span className="text-xs font-bold tracking-[4px] uppercase text-indigo-300/80">A Paradigm Shift in Education</span>
          </motion.div>

          {/* ── Hero headline ── */}
          <motion.div className="relative z-10 space-y-6" variants={fadeLeft} transition={{ duration: 0.8, ease: [0.22,1,0.36,1] }}>
            <h1 className="text-[clamp(52px,5.5vw,88px)] font-extrabold leading-[1.05] tracking-tight">
              <GradientText colors={['#c7d2fe','#e879f9','#818cf8','#38bdf8']} animationSpeed={10}>
                Get Knowledge.
              </GradientText>
              <br />
              <span className="text-white">Grow Deep.</span>
            </h1>
            <p className="text-indigo-200/70 text-lg leading-relaxed max-w-[460px]">
              Access millions of universal, high-quality resources and courses—where curiosity meets discovery.
            </p>
          </motion.div>

          {/* ── Category icons ── */}
          <motion.div
            className="relative z-10 grid grid-cols-4 gap-5"
            initial="hidden"
            animate={mounted ? "visible" : "hidden"}
            transition={{ staggerChildren: 0.1, delayChildren: 0.7 }}
          >
            {CATEGORIES.map(({ Icon, label, color }, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                transition={{ duration: 0.6, ease: [0.22,1,0.36,1] }}
                className="group flex flex-col items-center gap-3 cursor-pointer"
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center border transition-all duration-300 group-hover:-translate-y-2"
                  style={{
                    background: `${color}18`,
                    borderColor: `${color}40`,
                    boxShadow: `0 0 20px ${color}20`,
                  }}
                >
                  <Icon className="w-6 h-6" style={{ color }} />
                </div>
                <span className="text-xs font-semibold text-indigo-300/70 group-hover:text-indigo-200 transition-colors">{label}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* ══ RIGHT PANEL — Glassmorphism Form ═══════════════════════════════ */}
        <motion.div
          className="flex flex-col justify-center w-full lg:w-[45%] h-full px-8 sm:px-14 py-10 relative"
          initial="hidden"
          animate={mounted ? "visible" : "hidden"}
          transition={{ staggerChildren: 0.12, delayChildren: 0.35 }}
        >
          {/* Glass card */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              borderLeft: '1px solid rgba(255,255,255,0.08)',
            }}
          />

          <div className="relative z-10 w-full max-w-[420px] mx-auto space-y-7">

            {/* Header */}
            <motion.div variants={fadeRight} transition={{ duration: 0.7, ease: [0.22,1,0.36,1] }}>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-indigo-400" />
                </div>
                <span className="text-sm font-semibold text-indigo-300/80 tracking-widest uppercase">NDL Portal</span>
              </div>
              <h2 className="text-[42px] font-extrabold leading-tight tracking-tight text-white">
                Welcome <GradientText colors={['#818cf8','#e879f9','#38bdf8']} animationSpeed={6}>Back</GradientText>
              </h2>
              <p className="text-indigo-200/50 text-sm mt-2">Enter your credentials to access your Digital Library account</p>
            </motion.div>

            {/* Role Toggle */}
            <motion.div variants={scaleIn} transition={{ duration: 0.5, ease: [0.22,1,0.36,1] }}>
              <div className="flex rounded-xl p-1" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
                {['user', 'admin'].map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRole(r)}
                    className="flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all duration-300 capitalize"
                    style={role === r ? {
                      background: 'linear-gradient(135deg, rgba(129,140,248,0.3), rgba(232,121,249,0.3))',
                      color: '#e0e7ff',
                      boxShadow: '0 0 20px rgba(129,140,248,0.2)',
                      border: '1px solid rgba(129,140,248,0.4)',
                    } : { color: 'rgba(255,255,255,0.4)' }}
                  >
                    {r === 'user' ? '👤 User' : '🛡️ Admin'}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Form */}
            <motion.form
              onSubmit={handleSubmit}
              className="space-y-5"
              variants={fadeUp}
              transition={{ duration: 0.6, ease: [0.22,1,0.36,1] }}
            >
              {/* Email */}
              <div className="space-y-2">
                <label className="text-xs font-bold tracking-widest uppercase text-indigo-300/70">Email</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={userInput}
                  onChange={e => setUserInput(e.target.value)}
                  required
                  className="w-full px-4 py-3.5 rounded-xl text-white placeholder-white/20 text-sm outline-none transition-all duration-300"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}
                  onFocus={e => { e.target.style.border = '1px solid rgba(129,140,248,0.6)'; e.target.style.boxShadow = '0 0 20px rgba(129,140,248,0.15)'; }}
                  onBlur={e  => { e.target.style.border = '1px solid rgba(255,255,255,0.1)'; e.target.style.boxShadow = 'none'; }}
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label className="text-xs font-bold tracking-widest uppercase text-indigo-300/70">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    className="w-full px-4 py-3.5 pr-12 rounded-xl text-white placeholder-white/20 text-sm outline-none transition-all duration-300"
                    style={{
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.1)',
                    }}
                    onFocus={e => { e.target.style.border = '1px solid rgba(129,140,248,0.6)'; e.target.style.boxShadow = '0 0 20px rgba(129,140,248,0.15)'; }}
                    onBlur={e  => { e.target.style.border = '1px solid rgba(255,255,255,0.1)'; e.target.style.boxShadow = 'none'; }}
                  />
                  <button
                    type="button"
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-indigo-400 transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Options row */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-xs text-white/40 cursor-pointer">
                  <input type="checkbox" className="w-3.5 h-3.5 rounded accent-indigo-500" />
                  Remember me
                </label>
                <Link to="/forgot-password" className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold transition-colors">
                  Forgot Password?
                </Link>
              </div>

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 rounded-xl font-bold text-white text-sm flex items-center justify-center gap-2 transition-all duration-300 relative overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, #6366f1, #8b5cf6, #a855f7)',
                  boxShadow: '0 8px 32px rgba(99,102,241,0.4), 0 0 60px rgba(99,102,241,0.15)',
                }}
              >
                <AnimatePresence mode="wait">
                  {loading ? (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2"
                    >
                      <motion.div
                        className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                      />
                      Signing in…
                    </motion.div>
                  ) : (
                    <motion.span key="text" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                      Sign In <ArrowRight className="w-4 h-4" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>

              {/* Divider */}
              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-white/10" />
                <span className="text-xs text-white/25">or</span>
                <div className="flex-1 h-px bg-white/10" />
              </div>

              {/* Google */}
              <motion.button
                type="button"
                whileHover={{ scale: 1.01, background: 'rgba(255,255,255,0.1)' }}
                whileTap={{ scale: 0.99 }}
                className="w-full py-3.5 rounded-xl font-semibold text-sm text-white/70 flex items-center justify-center gap-3 transition-all duration-300"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
              >
                <GoogleIcon />
                Continue with Google
              </motion.button>
            </motion.form>

            {/* Footer */}
            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.5 }}
              className="text-center text-xs text-white/30"
            >
              Don't have an account?{" "}
              <Link to="/signup" className="text-indigo-400 hover:text-indigo-300 font-bold transition-colors">
                Sign Up
              </Link>
            </motion.p>

          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;