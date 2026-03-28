import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import ProfessionalBackground from './ProfessionalBackground';
import '../styles/AdminDashboard.css';
import { motion, AnimatePresence } from 'framer-motion';


const AdminDashboard = ({ username }) => {
    const navigate = useNavigate();
    const { currentLanguage, changeLanguage, t } = useLanguage();
    const { accentColor, setAccentColor } = useTheme();
    const [activeTab, setActiveTab] = useState('overview');
    const [resourceSearchTerm, setResourceSearchTerm] = useState('');

    const allResources = [
        { id: 101, title: 'Digital Archive Vol 101', category: 'Educational', status: 'Published' },
        { id: 102, title: 'Gazette of India 2025', category: 'Judicial', status: 'Published' },
        { id: 103, title: 'Quantum Physics Guide', category: 'Research', status: 'Pending' },
        { id: 104, title: 'History of India', category: 'School', status: 'Published' },
        { id: 105, title: 'Patent Laws 2026', category: 'Legal', status: 'Published' },
        { id: 106, title: 'Constitutional Law - Amendment 105', category: 'Judicial', status: 'Published' },
        { id: 107, title: 'Quantum Computing for Seniors', category: 'Research', status: 'Pending' },
    ];

    const filteredResources = allResources.filter(r =>
        r.title.toLowerCase().includes(resourceSearchTerm.toLowerCase()) ||
        r.category.toLowerCase().includes(resourceSearchTerm.toLowerCase())
    );

    const stats = [
        { label: 'Total Resources', value: '10.4M', icon: '📚', color: 'bg-blue-500' },
        { label: 'Active Users', value: '8.2M', icon: '👥', color: 'bg-green-500' },
        { label: 'Pending Approvals', value: '142', icon: '⏳', color: 'bg-orange-500' },
        { label: 'System Health', value: '99.9%', icon: '⚙️', color: 'bg-purple-500' },
    ];

    const recentUploads = [
        { id: 1, title: 'Constitutional Law - Amendment 105', category: 'Judicial', date: '2026-02-20', status: 'Published' },
        { id: 2, title: 'Quantum Computing for Seniors', category: 'Research', date: '2026-02-19', status: 'Pending' },
        { id: 3, title: 'CBSE X Mathematics Textbook', category: 'School', date: '2026-02-18', status: 'Published' },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: 'spring', stiffness: 100 }
        }
    };

    const renderOverview = () => (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-7xl mx-auto space-y-12"
        >
            {/* Header */}
            <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 relative z-20">
                <div className="animate-fadeIn">
                    <h2 className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.6em] mb-4 drop-shadow-sm">Command Matrix</h2>
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white leading-none">
                        Welcome, <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 italic">{username || 'Root Admin'}</span>
                    </h1>
                </div>
                <motion.button
                    whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(99, 102, 241, 0.4)' }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveTab('resources')}
                    className="px-10 py-6 bg-indigo-600 hover:bg-indigo-500 text-white rounded-[2rem] font-black uppercase tracking-widest text-xs transition-all shadow-[0_20px_50px_rgba(79,70,229,0.3)] flex items-center gap-4"
                >
                    <span className="text-xl">➕</span> New Asset
                </motion.button>
            </motion.div>

            {/* Stats Grid */}
            <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {stats.map((stat, idx) => (
                    <motion.div
                        key={idx}
                        variants={itemVariants}
                        whileHover={{ y: -12, scale: 1.02, transition: { duration: 0.3 } }}
                        className="relative group cursor-default"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2.5rem] blur-xl" />
                        <div className="bg-gray-900/40 backdrop-blur-2xl border border-white/10 p-10 rounded-[2.5rem] shadow-2xl relative z-10 hover:border-indigo-500/30 transition-colors">
                            <div className={`w-16 h-16 ${stat.color} rounded-[1.5rem] flex items-center justify-center text-3xl mb-10 shadow-[0_10px_30px_rgba(0,0,0,0.3)] group-hover:scale-110 group-hover:rotate-12 transition-all`}>
                                {stat.icon}
                            </div>
                            <p className="text-[10px] font-black uppercase tracking-[0.4em] mb-3 text-indigo-300/60">{stat.label}</p>
                            <h3 className="text-5xl font-black tracking-tighter text-white drop-shadow-md">{stat.value}</h3>
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <motion.div
                    variants={itemVariants}
                    className="lg:col-span-2 bg-gray-900/40 backdrop-blur-2xl border border-white/10 p-12 rounded-[3.5rem] shadow-2xl relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
                    
                    <div className="flex items-center justify-between mb-12 relative z-10">
                        <div className="flex items-center gap-4">
                            <div className="w-1 h-8 bg-indigo-500 rounded-full" />
                            <h3 className="text-2xl font-black tracking-tight text-white uppercase tracking-widest">Recent Activity</h3>
                        </div>
                        <button
                            onClick={() => setActiveTab('resources')}
                            className="text-[10px] font-black text-indigo-400 hover:text-white transition-all uppercase tracking-[0.3em] bg-white/5 py-2 px-6 rounded-full border border-white/10 hover:bg-indigo-500 hover:border-indigo-400"
                        >
                            Audit Hub
                        </button>
                    </div>

                    <div className="space-y-6 relative z-10">
                        {recentUploads.map((upload, idx) => (
                            <motion.div
                                key={upload.id}
                                whileHover={{ x: 10, backgroundColor: 'rgba(255,255,255,0.05)' }}
                                className="flex items-center justify-between p-8 bg-black/20 rounded-[2.5rem] border border-white/5 hover:border-indigo-500/30 transition-all group"
                            >
                                <div className="flex items-center gap-8">
                                    <div className="w-16 h-16 bg-gray-800 rounded-[1.25rem] flex items-center justify-center text-3xl shadow-2xl group-hover:scale-110 transition-transform">
                                        {upload.category === 'Judicial' ? '⚖️' : upload.category === 'Research' ? '🔬' : '🏫'}
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold transition-colors text-white group-hover:text-indigo-400 leading-tight">{upload.title}</h4>
                                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-300/40 mt-2">{upload.category} • {upload.date}</p>
                                    </div>
                                </div>
                                <span className={`px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] ${upload.status === 'Published' ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-400/30' : 'bg-orange-500/20 text-orange-400 border border-orange-400/30'}`}>
                                    {upload.status}
                                </span>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Secure Access Module Card */}
                <motion.div
                    variants={itemVariants}
                    className="bg-indigo-700/80 backdrop-blur-2xl p-12 rounded-[3.5rem] text-white flex flex-col justify-between relative overflow-hidden group shadow-[0_30px_70px_rgba(79,70,229,0.3)] border border-indigo-400/20"
                >
                    <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 group-hover:scale-125 transition-transform duration-1000" />
                    
                    <div className="relative z-10">
                        <div className="w-20 h-20 bg-white/20 backdrop-blur-xl rounded-[1.5rem] flex items-center justify-center text-4xl mb-10 shadow-2xl">
                            🛡️
                        </div>
                        <h3 className="text-4xl font-black mb-6 tracking-tighter leading-none">Access<br />Matrix</h3>
                        <p className="text-indigo-100 text-sm mb-12 leading-relaxed font-semibold opacity-80">Protocol-level user management and administrative clearance synchronization.</p>
                        
                        <div className="space-y-4">
                            <motion.button 
                                whileHover={{ y: -4, scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full py-6 bg-white text-indigo-900 font-black uppercase tracking-widest text-xs rounded-[1.5rem] transition-all shadow-[0_15px_30px_rgba(255,255,255,0.1)]"
                                onClick={() => setActiveTab('users')}
                            >
                                Member Registry
                            </motion.button>
                            <motion.button 
                                whileHover={{ y: -4, scale: 1.02, backgroundColor: 'rgba(0,0,0,1)' }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => setActiveTab('users')}
                                className="w-full py-6 bg-gray-900/50 backdrop-blur-md text-white font-black uppercase tracking-widest text-xs rounded-[1.5rem] transition-all border border-white/20"
                            >
                                Secure Actions
                            </motion.button>
                        </div>
                    </div>
                    
                    <div className="mt-14 pt-10 border-t border-white/10 text-[10px] font-black uppercase tracking-[0.6em] opacity-40 relative z-10">
                        AUTH KERNEL v9.42
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );

    const renderResources = () => (
        <div className="max-w-7xl mx-auto space-y-12 animate-up">
            <div className="mb-10">
                <h2 className="text-xs font-black text-accent uppercase tracking-[0.4em] mb-3 opacity-70">Catalog Management</h2>
                <h1 className="text-5xl font-black tracking-tighter text-white">Resources <span className="text-accent italic">Hub</span></h1>
            </div>
            
            <div className="glass-panel overflow-hidden border-white/10 shadow-2xl">
                <div className="p-10 flex flex-wrap gap-8 justify-between items-center bg-white/[0.02] border-b border-white/5">
                    <div className="relative flex-1 min-w-[320px] group">
                        <span className="absolute left-6 top-1/2 -translate-y-1/2 text-xl opacity-30 group-focus-within:opacity-100 transition-opacity">🔍</span>
                        <input
                            type="text"
                            placeholder="Search resources by title or category..."
                            value={resourceSearchTerm}
                            onChange={(e) => setResourceSearchTerm(e.target.value)}
                            className="search-input-glass w-full pl-16 pr-8 py-5 rounded-2xl outline-none"
                        />
                    </div>
                    <div className="flex gap-4">
                        <button
                            onClick={() => alert('Filter options coming soon!')}
                            className="px-8 py-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all active:scale-95"
                        >
                            Refine
                        </button>
                        <button
                            onClick={() => alert('Opening Add Resource flow...')}
                            className="px-8 py-4 bg-accent text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-2xl shadow-accent/20 hover:scale-[1.05] active:scale-95 transition-all"
                        >
                            Add New Data
                        </button>
                    </div>
                </div>

                <div className="p-8 overflow-x-auto">
                    <table className="table-glass">
                        <thead>
                            <tr>
                                <th>Resource Title</th>
                                <th>Category</th>
                                <th>Status</th>
                                <th className="text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredResources.length > 0 ? (
                                filteredResources.map((resource, idx) => (
                                    <tr key={resource.id} className={`animate-up delay-${(idx % 5) + 1}`}>
                                        <td className="font-bold text-white group-hover:text-accent transition-colors">
                                            {resource.title}
                                        </td>
                                        <td>
                                            <span className="text-xs font-black uppercase tracking-widest opacity-50">{resource.category}</span>
                                        </td>
                                        <td>
                                            <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${resource.status === 'Published' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-orange-500/10 text-orange-400 border-orange-500/20'}`}>
                                                {resource.status}
                                            </span>
                                        </td>
                                        <td className="text-right">
                                            <div className="flex justify-end gap-3">
                                                <button
                                                    onClick={() => alert(`Downloading: ${resource.title}`)}
                                                    className="w-10 h-10 flex items-center justify-center bg-white/5 hover:bg-accent hover:text-white rounded-xl transition-all"
                                                    title="Download"
                                                >
                                                    📥
                                                </button>
                                                <button
                                                    onClick={() => alert(`Editing: ${resource.title}`)}
                                                    className="w-10 h-10 flex items-center justify-center bg-white/5 hover:bg-primary hover:text-white rounded-xl transition-all"
                                                    title="Edit"
                                                >
                                                    ✎
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        if (window.confirm('Are you sure you want to delete this resource?')) {
                                                            alert('Resource deleted successfully!');
                                                        }
                                                    }}
                                                    className="w-10 h-10 flex items-center justify-center bg-white/5 hover:bg-red-500 hover:text-white rounded-xl transition-all"
                                                    title="Delete"
                                                >
                                                    🗑
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="py-20 text-center text-white/20 uppercase font-black tracking-[0.3em] text-[10px]">
                                        No assets matching your query
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );

    const renderUsers = () => (
        <div className="max-w-7xl mx-auto space-y-12 animate-up">
            <div className="mb-10">
                <h2 className="text-xs font-black text-accent uppercase tracking-[0.4em] mb-3 opacity-70">Identity & Access</h2>
                <h1 className="text-5xl font-black tracking-tighter text-white">Member <span className="text-accent italic">Directory</span></h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {[
                    { name: 'Harsha Vardhan', role: 'Administrator', color: 'bg-blue-500', email: 'harsha@ndli.gov' },
                    { name: 'Lohith Reddy', role: 'Student', color: 'bg-green-500', email: 'lohith@ndli.gov' },
                    { name: 'Gopi Krishna', role: 'Administrator', color: 'bg-purple-500', email: 'gopi@ndli.gov' },
                    { name: 'Rajesh Kumar', role: 'Librarian', color: 'bg-orange-500', email: 'rajesh@ndli.gov' },
                    { name: 'Elena Gilbert', role: 'Librarian', color: 'bg-pink-500', email: 'elena@ndli.gov' },
                    { name: 'Damon Salvatore', role: 'Student', color: 'bg-teal-500', email: 'damon@ndli.gov' }
                ].map((user, idx) => (
                    <div key={idx} className={`glass-panel p-10 flex flex-col items-center text-center group animate-up delay-${(idx % 3) + 1}`}>
                        <div className="relative mb-8">
                            <div className={`w-28 h-28 ${user.color} rounded-3xl flex items-center justify-center text-4xl text-white shadow-2xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                                {user.name.charAt(0)}
                            </div>
                            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 border-4 border-ndl-dark rounded-full shadow-lg"></div>
                        </div>
                        <h3 className="text-2xl font-black mb-1 tracking-tight text-white">{user.name}</h3>
                        <p className="text-[10px] font-black text-accent uppercase tracking-widest mb-2">{user.role}</p>
                        <p className="text-xs text-white/30 mb-8 font-medium">{user.email}</p>
                        
                        <div className="flex gap-4 w-full pt-6 border-t border-white/5">
                            <button
                                onClick={() => alert(`Viewing profile for: ${user.name}`)}
                                className="flex-1 py-4 bg-white/5 hover:bg-white hover:text-ndl-dark rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border border-white/5"
                            >
                                Details
                            </button>
                            <button
                                onClick={() => {
                                    if (window.confirm(`Are you sure you want to suspend: ${user.name}?`)) {
                                        alert('User suspended successfully!');
                                    }
                                    }}
                                className="flex-1 py-4 bg-white/5 hover:bg-red-500 hover:text-white rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border border-white/5"
                            >
                                Restrict
                            </button>
                        </div>
                    </div>
                ))
                }
            </div>
        </div>
    );

    const renderAnalytics = () => (
        <div className="max-w-7xl mx-auto space-y-12 animate-up">
            <div className="mb-10">
                <h2 className="text-xs font-black text-accent uppercase tracking-[0.4em] mb-3 opacity-70">Platform Performance</h2>
                <h1 className="text-5xl font-black tracking-tighter text-white">System <span className="text-accent italic">Analytics</span></h1>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <div className="glass-panel p-12">
                    <h3 className="text-2xl font-black mb-12 tracking-tight text-white flex items-center gap-4">
                        <span className="w-2 h-8 bg-accent rounded-full"></span>
                        Growth Projection
                    </h3>
                    <div className="flex items-end gap-5 h-72 px-4 overflow-hidden">
                        {[40, 60, 45, 90, 75, 100, 85].map((h, i) => (
                            <div key={i} className="flex-1 h-full flex flex-col justify-end items-center gap-5">
                                <div 
                                    style={{ height: `${h}%` }} 
                                    className="w-full bg-accent/20 border-t-4 border-accent rounded-t-2xl relative group hover:bg-accent/40 transition-all cursor-pointer"
                                >
                                    <div className="absolute -top-14 left-1/2 -translate-x-1/2 bg-white text-ndl-dark px-4 py-2 rounded-xl text-[10px] font-black opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100 whitespace-nowrap shadow-2xl">
                                        +{h}% REVENUE
                                    </div>
                                </div>
                                <span className="text-[10px] font-black uppercase text-white/30 tracking-widest">PER {i + 1}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="glass-panel p-12 relative overflow-hidden group">
                    <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-accent opacity-5 rounded-full blur-[100px] group-hover:opacity-10 transition-opacity"></div>
                    <h3 className="text-2xl font-black mb-12 tracking-tight text-white flex items-center gap-4">
                        <span className="w-2 h-8 bg-primary rounded-full"></span>
                        Real-time Metrics
                    </h3>
                    <div className="space-y-10 relative z-10">
                        {[
                            { label: 'Server Stability', val: '99.9%', w: '99.9%', color: 'bg-green-500' },
                            { label: 'Cache Hit Rate', val: '86.4%', w: '86.4%', color: 'bg-blue-500' },
                            { label: 'Database Sync', val: '100%', w: '100%', color: 'bg-accent' },
                            { label: 'SSL integrity', val: 'Optimal', w: '100%', color: 'bg-purple-500' }
                        ].map((m, i) => (
                            <div key={i} className="animate-up" style={{ animationDelay: `${0.1 * i}s` }}>
                                <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.2em] mb-4 text-white/50">
                                    <span>{m.label}</span>
                                    <span className="text-white">{m.val}</span>
                                </div>
                                <div className="h-3 bg-white/5 rounded-full overflow-hidden border border-white/5 p-[2px]">
                                    <div 
                                        className={`h-full ${m.color} rounded-full transition-all duration-1000 ease-out shadow-[0_0_15px_rgba(255,255,255,0.1)]`} 
                                        style={{ width: `${m.w}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );

    const renderSettings = () => (
        <div className="max-w-7xl mx-auto space-y-12 animate-up pb-20">
            <div className="mb-10">
                <h2 className="text-xs font-black text-accent uppercase tracking-[0.4em] mb-3 opacity-70">Console Configuration</h2>
                <h1 className="text-5xl font-black tracking-tighter text-white">Portal <span className="text-accent italic">Settings</span></h1>
            </div>

            <form className="space-y-10" onSubmit={(e) => { e.preventDefault(); alert('Settings saved successfully!'); }}>
                {/* Profile Settings */}
                <div className="glass-panel p-12">
                    <h3 className="text-2xl font-black mb-10 tracking-tight text-white flex items-center gap-4">
                        <span className="opacity-30 text-2xl">👤</span> Profile Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div className="space-y-4">
                            <label className="block text-[10px] font-black uppercase tracking-[0.2em] px-1 text-white/40">Admin Display Name</label>
                            <input type="text" placeholder={username || 'Administrator'} className="w-full px-8 py-5 bg-white/5 border border-white/5 rounded-2xl outline-none focus:border-accent transition-all text-white placeholder:text-white/20 font-bold" />
                        </div>
                        <div className="space-y-4">
                            <label className="block text-[10px] font-black uppercase tracking-[0.2em] px-1 text-white/40">Institutional Email</label>
                            <input type="email" placeholder="admin@ndli.gov.in" className="w-full px-8 py-5 bg-white/5 border border-white/5 rounded-2xl outline-none focus:border-accent transition-all text-white placeholder:text-white/20 font-bold" />
                        </div>
                    </div>
                </div>

                {/* Security Settings */}
                <div className="glass-panel p-12">
                    <h3 className="text-2xl font-black mb-10 tracking-tight text-white flex items-center gap-4">
                        <span className="opacity-30 text-2xl">🛡️</span> Security & Privacy
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="flex items-center justify-between p-8 bg-white/5 rounded-3xl border border-white/5">
                            <div>
                                <h4 className="text-lg font-bold text-white">Two-Factor Authentication</h4>
                                <p className="text-[10px] text-white/30 mt-1 uppercase tracking-widest font-black">Biometric & MFA Integration</p>
                            </div>
                            <input type="checkbox" className="custom-toggle" />
                        </div>
                        <div className="space-y-4">
                            <label className="block text-[10px] font-black uppercase tracking-[0.2em] px-1 text-white/40">Auto-Logout Session</label>
                            <select className="w-full px-8 py-5 bg-white/5 border border-white/5 rounded-2xl outline-none focus:border-accent transition-all text-sm font-black text-white appearance-none cursor-pointer">
                                <option className="bg-ndl-dark">15 Minutes</option>
                                <option className="bg-ndl-dark">30 Minutes</option>
                                <option className="bg-ndl-dark" selected>1 Hour</option>
                                <option className="bg-ndl-dark">4 Hours</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Interface Customization */}
                <div className="glass-panel p-12">
                    <h3 className="text-2xl font-black mb-10 tracking-tight text-white flex items-center gap-4">
                        <span className="opacity-30 text-2xl">🎨</span> Interface Customization
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div className="space-y-4">
                            <label className="block text-[10px] font-black uppercase tracking-[0.2em] px-1 text-white/40">Portal Language</label>
                            <select
                                value={currentLanguage}
                                onChange={(e) => changeLanguage(e.target.value)}
                                className="w-full px-8 py-5 bg-white/5 border border-white/5 rounded-2xl outline-none focus:border-accent transition-all text-sm font-black text-white appearance-none cursor-pointer"
                            >
                                <option value="en" className="bg-ndl-dark">English (US)</option>
                                <option value="hi" className="bg-ndl-dark">Hindi (हिन्दी)</option>
                                <option value="te" className="bg-ndl-dark">Telugu (తెలుగు)</option>
                                <option value="kn" className="bg-ndl-dark">Kannada (ಕನ್ನಡ)</option>
                            </select>
                        </div>
                        <div className="space-y-4">
                            <label className="block text-[10px] font-black uppercase tracking-[0.2em] px-1 text-white/40">System Accent Color</label>
                            <div className="flex gap-4 p-2 bg-white/5 rounded-2xl border border-white/5 w-fit">
                                {['#FF6D00', '#00BCD4', '#7B1FA2', '#D32F2F', '#388E3C'].map(color => (
                                    <button
                                        key={color}
                                        type="button"
                                        onClick={() => setAccentColor(color)}
                                        className={`w-12 h-12 rounded-xl border-4 transition-all hover:scale-110 active:scale-95 ${color === accentColor ? 'border-white shadow-[0_0_20px_rgba(255,255,255,0.3)]' : 'border-transparent opacity-40 hover:opacity-100'}`}
                                        style={{ backgroundColor: color }}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Data Management */}
                <div className="glass-panel p-12 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-80 h-80 bg-red-500 opacity-5 rounded-full blur-[100px] -translate-y-40 translate-x-40 group-hover:opacity-10 transition-opacity"></div>
                    <h3 className="text-2xl font-black mb-10 tracking-tight text-white flex items-center gap-4">
                        <span className="opacity-30 text-2xl">⚙️</span> Data & Critical Systems
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 relative z-10">
                        <div className="space-y-6">
                            <div className="flex items-center justify-between p-6 bg-white/5 rounded-2xl border border-white/5">
                                <span className="text-[10px] font-black uppercase tracking-widest text-white/60">Institutional Maintenance Mode</span>
                                <input type="checkbox" className="custom-toggle" />
                            </div>
                            <p className="text-xs text-white/30 leading-relaxed font-medium italic">CAUTION: Activating maintenance mode will restrict access for all non-admin users immediately.</p>
                        </div>
                        <div className="flex flex-col gap-4">
                            <button type="button" onClick={() => alert('Starting system backup...')} className="w-full py-5 bg-white/5 hover:bg-white transform hover:text-ndl-dark transition-all rounded-2xl text-[10px] font-black uppercase tracking-widest border border-white/10 hover:shadow-2xl">
                                Initialize Global Cloud Backup
                            </button>
                            <button type="button" onClick={() => alert('Exporting audit logs...')} className="w-full py-5 bg-accent/10 hover:bg-accent text-accent hover:text-white transition-all rounded-2xl text-[10px] font-black uppercase tracking-widest border border-accent/20 hover:shadow-2xl shadow-accent/20">
                                Export Master Audit Logs (CSV)
                            </button>
                        </div>
                    </div>
                </div>

                {/* Form Actions */}
                <div className="pt-10 flex flex-col sm:flex-row gap-8">
                    <button
                        type="submit"
                        className="px-16 py-6 bg-accent text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-orange-600 transition-all shadow-2xl shadow-accent/30 hover:-translate-y-1 active:translate-y-0"
                    >
                        Synchronize Preferences
                    </button>
                    <button
                        type="button"
                        onClick={() => setActiveTab('overview')}
                        className="px-16 py-6 rounded-2xl font-black uppercase tracking-widest text-xs transition-all bg-white/5 text-white hover:bg-white/10 border border-white/10"
                    >
                        Discard Changes
                    </button>
                </div>
            </form>
        </div>
    );

    return (
        <div className="admin-dashboard-container">
            <ProfessionalBackground />
            
            {/* Top Utility Bar */}
            <div className="z-[1050] flex justify-between px-[5%] py-5 text-[10px] font-black tracking-[0.3em] uppercase sticky top-0 border-b backdrop-blur-2xl shadow-2xl border-white/5 bg-ndl-dark/40 text-white">
                <div className="flex items-center gap-10">
                    <div className="flex items-center gap-4 group cursor-pointer" onClick={() => navigate('/dashboard')}>
                        <span className="text-2xl group-hover:scale-125 transition-transform duration-500">🛡️</span>
                        <span className="font-black text-white group-hover:text-accent transition-colors">{t('adminConsole')}</span>
                    </div>
                </div>
                <div className="flex items-center gap-8">
                    <div className="flex items-center gap-3 px-6 py-2 rounded-full border border-white/10 bg-white/5 group hover:border-accent transition-all">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
                        <span className="opacity-60 group-hover:opacity-100 transition-opacity">{username || 'Root Admin'}</span>
                    </div>
                    <button
                        onClick={() => navigate('/login')}
                        className="flex items-center gap-3 hover:text-accent transition-all font-black group"
                    >
                        Logout <span className="group-hover:translate-x-1 transition-transform">🚪</span>
                    </button>
                </div>
            </div>


            <div className="flex h-[calc(100vh-69px)] relative z-10">
                {/* Sidebar */}
                <motion.aside
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="w-96 hidden lg:flex flex-col p-10 space-y-4 bg-black/20 backdrop-blur-md border-r border-white/5 overflow-y-auto"
                >
                    <div className="px-4 mb-10">
                        <p className="text-[10px] font-black text-indigo-300/40 uppercase tracking-[0.6em]">System Management</p>
                    </div>
                    <div className="space-y-4 flex-1">
                        {[
                            { id: 'overview', name: t('dashboardHome'), icon: '📊' },
                            { id: 'resources', name: t('resourcesHub'), icon: '📂' },
                            { id: 'users', name: t('userDirectory'), icon: '👤' },
                            { id: 'reports', name: t('analytics'), icon: '📈' },
                            { id: 'settings', name: t('settings'), icon: '⚙️' }
                        ].map(item => (
                            <motion.button
                                key={item.id}
                                whileHover={{ x: 10, scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => setActiveTab(item.id)}
                                className={`w-full flex items-center gap-6 px-10 py-6 rounded-[2.5rem] text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-300 border ${activeTab === item.id
                                    ? 'bg-indigo-600/30 border-indigo-500/50 text-white shadow-[0_15px_40px_rgba(79,70,229,0.2)]'
                                    : 'bg-white/5 border-transparent text-white/40 hover:text-white hover:bg-white/10'}`}
                            >
                                <span className={`text-2xl transition-all duration-500 ${activeTab === item.id ? 'scale-125 rotate-6' : 'opacity-40 grayscale group-hover:grayscale-0'}`}>{item.icon}</span>
                                {item.name}
                            </motion.button>
                        ))}
                    </div>

                    {/* System Health Module */}
                    <motion.div
                        whileHover={{ y: -5 }}
                        className="bg-gray-900/60 backdrop-blur-xl border border-white/5 p-8 rounded-[3rem] mt-10 shadow-3xl"
                    >
                        <div className="flex justify-between items-center mb-5 px-2">
                            <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Core Integrity</span>
                            <span className="text-[10px] font-extrabold text-white/40 tracking-tighter">94%</span>
                        </div>
                        <div className="h-2 bg-white/5 rounded-full overflow-hidden mb-2">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: '94%' }}
                                transition={{ duration: 1.5, ease: 'easeOut' }}
                                className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full shadow-[0_0_15px_rgba(99,102,241,0.5)]"
                            />
                        </div>
                    </motion.div>
                </motion.aside>

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto p-12 lg:p-16 scroll-smooth">
                    <div className="max-w-7xl mx-auto">
                        {activeTab === 'overview' && renderOverview()}
                        {activeTab === 'resources' && renderResources()}
                        {activeTab === 'users' && renderUsers()}
                        {activeTab === 'reports' && renderAnalytics()}
                        {activeTab === 'settings' && renderSettings()}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminDashboard;
// End of Admin Dashboard Module

