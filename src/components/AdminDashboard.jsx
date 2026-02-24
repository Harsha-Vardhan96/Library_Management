import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = ({ toggleTheme, isDarkMode, username }) => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('overview');

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

    const renderOverview = () => (
        <div className="max-w-6xl mx-auto space-y-12 animate-fadeIn">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h2 className="text-xs font-black text-accent uppercase tracking-[0.4em] mb-3">System Overview</h2>
                    <h1 className="text-4xl md:text-5xl font-black text-text-dark tracking-tighter">
                        Welcome Back, <span className="italic">{username || 'Administrator'}</span>
                    </h1>
                </div>
                <button
                    onClick={() => setActiveTab('resources')}
                    className="px-8 py-4 bg-primary hover:bg-[#004d40] text-white rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-xl hover:-translate-y-1 active:translate-y-0 shadow-primary/20 flex items-center gap-3"
                >
                    <span>➕</span> New Resource
                </button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fadeInUp">
                {stats.map((stat, idx) => (
                    <div key={idx} className="bg-white dark:bg-gray-800/80 p-8 rounded-[2.5rem] shadow-[0_15px_45px_rgba(0,0,0,0.03)] border border-white dark:border-white/5 group hover:-translate-y-2 transition-all duration-500">
                        <div className={`w-14 h-14 ${stat.color} rounded-2xl flex items-center justify-center text-2xl mb-6 shadow-lg shadow-black/5 group-hover:rotate-12 transition-transform`}>
                            {stat.icon}
                        </div>
                        <p className="text-xs font-black text-text-gray uppercase tracking-widest mb-1">{stat.label}</p>
                        <h3 className="text-3xl font-black text-text-dark tracking-tighter">{stat.value}</h3>
                    </div>
                ))}
            </div>

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Activities */}
                <div className="lg:col-span-2 bg-white dark:bg-gray-800/80 p-10 rounded-[3rem] shadow-[0_15px_45px_rgba(0,0,0,0.03)] border border-white dark:border-white/5">
                    <div className="flex items-center justify-between mb-10">
                        <h3 className="text-xl font-black text-text-dark tracking-tight">Recent Content Submissions</h3>
                        <button
                            onClick={() => setActiveTab('resources')}
                            className="text-xs font-bold text-primary hover:text-accent transition-colors uppercase tracking-widest"
                        >
                            View All
                        </button>
                    </div>
                    <div className="space-y-4">
                        {recentUploads.map(upload => (
                            <div key={upload.id} className="flex items-center justify-between p-6 bg-gray-50/50 dark:bg-black/20 rounded-2xl border border-transparent hover:border-accent/20 transition-all group">
                                <div className="flex items-center gap-5">
                                    <div className="w-12 h-12 bg-white dark:bg-gray-700 rounded-xl flex items-center justify-center text-xl shadow-sm">
                                        {upload.category === 'Judicial' ? '⚖️' : upload.category === 'Research' ? '🔬' : '🏫'}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-text-dark group-hover:text-accent transition-colors">{upload.title}</h4>
                                        <p className="text-xs text-text-gray font-medium">{upload.category} • {upload.date}</p>
                                    </div>
                                </div>
                                <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${upload.status === 'Published' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400'}`}>
                                    {upload.status}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Access */}
                <div className="bg-ndl-dark dark:bg-gray-900/40 p-10 rounded-[3rem] text-white flex flex-col justify-between group overflow-hidden relative shadow-2xl">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-accent opacity-10 rounded-full blur-3xl -translate-y-16 translate-x-16"></div>
                    <div className="relative z-10">
                        <h3 className="text-xl font-black mb-6 tracking-tight">Access Control</h3>
                        <p className="text-sm text-white/60 mb-8 leading-relaxed">Instantly manage user roles or suspend accounts from the centralized directory.</p>
                        <div className="space-y-3">
                            <button className="w-full py-4 bg-white/10 hover:bg-white text-white hover:text-ndl-dark font-black uppercase tracking-widest text-[10px] rounded-2xl transition-all border border-white/5 hover:border-white" onClick={() => setActiveTab('users')}>
                                Member Directory
                            </button>
                            <button
                                onClick={() => setActiveTab('users')}
                                className="w-full py-4 bg-accent hover:bg-orange-600 text-white font-black uppercase tracking-widest text-[10px] rounded-2xl transition-all shadow-lg shadow-accent/20"
                            >
                                Add New Admin
                            </button>
                        </div>
                    </div>
                    <div className="mt-12 pt-12 border-t border-white/10 text-[10px] font-black uppercase tracking-[0.3em] opacity-40">
                        NDLI Security Protocol v4.2
                    </div>
                </div>
            </div>
        </div>
    );

    const renderResources = () => (
        <div className="max-w-6xl mx-auto space-y-12 animate-fadeIn">
            <div>
                <h2 className="text-xs font-black text-accent uppercase tracking-[0.4em] mb-3">Resource Management</h2>
                <h1 className="text-4xl font-black text-text-dark tracking-tighter">Resources <span className="italic">Hub</span></h1>
            </div>
            <div className="bg-white dark:bg-gray-800/80 rounded-[3rem] shadow-xl border border-white dark:border-white/5 overflow-hidden">
                <div className="p-10 border-b border-border-color dark:border-white/5 flex flex-wrap gap-6 justify-between items-center bg-gray-50/50 dark:bg-black/10">
                    <div className="relative flex-1 min-w-[300px]">
                        <span className="absolute left-5 top-1/2 -translate-y-1/2 opacity-30">🔍</span>
                        <input type="text" placeholder="Search resources..." className="w-full pl-14 pr-6 py-4 bg-white dark:bg-gray-700 border border-border-color dark:border-white/10 rounded-2xl outline-none focus:border-accent transition-all" />
                    </div>
                    <div className="flex gap-4">
                        <button
                            onClick={() => alert('Filter options coming soon!')}
                            className="px-6 py-3 bg-white dark:bg-gray-700 border border-border-color dark:border-white/10 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-gray-50 dark:hover:bg-white/5 transition-all"
                        >
                            Filter
                        </button>
                        <button
                            onClick={() => alert('Opening Add Resource flow...')}
                            className="px-6 py-3 bg-accent text-white rounded-xl text-xs font-bold uppercase tracking-widest shadow-lg shadow-accent/20 hover:scale-[1.02] active:scale-95 transition-all"
                        >
                            Add New
                        </button>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50/50 dark:bg-black/20">
                                <th className="px-10 py-6 text-xs font-black uppercase tracking-widest text-text-gray">Resource Title</th>
                                <th className="px-10 py-6 text-xs font-black uppercase tracking-widest text-text-gray">Category</th>
                                <th className="px-10 py-6 text-xs font-black uppercase tracking-widest text-text-gray">Status</th>
                                <th className="px-10 py-6 text-xs font-black uppercase tracking-widest text-text-gray text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border-color dark:divide-white/5">
                            {[1, 2, 3, 4, 5].map(i => (
                                <tr key={i} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group">
                                    <td className="px-10 py-8 font-bold text-text-dark group-hover:text-accent transition-colors">Digital Archive Vol {100 + i}</td>
                                    <td className="px-10 py-8 text-sm text-text-gray">Educational</td>
                                    <td className="px-10 py-8">
                                        <span className="px-4 py-1.5 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 rounded-full text-[10px] font-black uppercase tracking-widest">Published</span>
                                    </td>
                                    <td className="px-10 py-8 text-right space-x-4">
                                        <button
                                            onClick={() => alert(`Editing: Digital Archive Vol ${100 + i}`)}
                                            className="text-primary hover:text-accent transition-colors"
                                        >
                                            ✎
                                        </button>
                                        <button
                                            onClick={() => {
                                                if (window.confirm('Are you sure you want to delete this resource?')) {
                                                    alert('Resource deleted successfully!');
                                                }
                                            }}
                                            className="text-red-500 hover:text-red-700 transition-colors"
                                        >
                                            🗑
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );

    const renderUsers = () => (
        <div className="max-w-6xl mx-auto space-y-12 animate-fadeIn">
            <div>
                <h2 className="text-xs font-black text-accent uppercase tracking-[0.4em] mb-3">Community Control</h2>
                <h1 className="text-4xl font-black text-text-dark tracking-tighter">User <span className="italic">Directory</span></h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                    { name: 'Dr. Sarah Wilson', role: 'Chief Editor', color: 'bg-blue-500' },
                    { name: 'John Peterson', role: 'Contributor', color: 'bg-green-500' },
                    { name: 'Emma Watson', role: 'Technical Admin', color: 'bg-purple-500' },
                    { name: 'Rajesh Kumar', role: 'Educator', color: 'bg-orange-500' },
                    { name: 'Elena Gilbert', role: 'Librarian', color: 'bg-pink-500' },
                    { name: 'Damon Salvatore', role: 'Student Delegate', color: 'bg-teal-500' }
                ].map((user, idx) => (
                    <div key={idx} className="bg-white dark:bg-gray-800/80 p-10 rounded-[3rem] shadow-xl border border-white dark:border-white/5 flex flex-col items-center text-center group hover:-translate-y-2 transition-all duration-500">
                        <div className={`w-24 h-24 ${user.color} rounded-full flex items-center justify-center text-4xl text-white mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                            {user.name.charAt(0)}
                        </div>
                        <h3 className="text-xl font-black text-text-dark mb-2 tracking-tight">{user.name}</h3>
                        <p className="text-xs font-black text-accent uppercase tracking-widest mb-8">{user.role}</p>
                        <div className="flex gap-3 w-full">
                            <button
                                onClick={() => alert(`Viewing profile for: ${user.name}`)}
                                className="flex-1 py-4 bg-gray-50 dark:bg-black/20 hover:bg-primary hover:text-white rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all"
                            >
                                Profile
                            </button>
                            <button
                                onClick={() => {
                                    if (window.confirm(`Are you sure you want to suspend: ${user.name}?`)) {
                                        alert('User suspended successfully!');
                                    }
                                }}
                                className="flex-1 py-4 bg-gray-50 dark:bg-black/20 hover:bg-accent hover:text-white rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all"
                            >
                                Suspend
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderAnalytics = () => (
        <div className="max-w-6xl mx-auto space-y-12 animate-fadeIn">
            <div>
                <h2 className="text-xs font-black text-accent uppercase tracking-[0.4em] mb-3">Platform Performance</h2>
                <h1 className="text-4xl font-black text-text-dark tracking-tighter">System <span className="italic">Analytics</span></h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white dark:bg-gray-800/80 p-10 rounded-[3rem] shadow-xl border border-white dark:border-white/5">
                    <h3 className="text-xl font-black text-text-dark mb-10 tracking-tight">Growth Projection</h3>
                    <div className="flex items-end gap-4 h-64 px-4 overflow-hidden">
                        {[40, 60, 45, 90, 75, 100, 85].map((h, i) => (
                            <div key={i} className="flex-1 flex flex-col justify-end items-center gap-4">
                                <div style={{ height: `${h}%` }} className="w-full bg-accent rounded-t-xl relative group">
                                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-ndl-dark text-white px-3 py-1 rounded-lg text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">{h}% Increase</div>
                                </div>
                                <span className="text-[10px] font-black text-text-gray uppercase">M {i + 1}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="bg-ndl-dark dark:bg-gray-900/40 p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden">
                    <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-accent/10 rounded-full blur-3xl"></div>
                    <h3 className="text-xl font-black mb-10 tracking-tight">Real-time Metrics</h3>
                    <div className="space-y-8 relative z-10">
                        {[
                            { label: 'Server Stability', val: '99.9%', w: 'w-[99.9%]' },
                            { label: 'Cache Hit Rate', val: '86.4%', w: 'w-[86.4%]' },
                            { label: 'Database Sync', val: '100%', w: 'w-full' },
                            { label: 'SSL integrity', val: 'Secure', w: 'w-full' }
                        ].map((m, i) => (
                            <div key={i}>
                                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest mb-3">
                                    <span>{m.label}</span>
                                    <span>{m.val}</span>
                                </div>
                                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                    <div className={`h-full bg-accent ${m.w} rounded-full`}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );

    const renderSettings = () => (
        <div className="max-w-6xl mx-auto space-y-12 animate-fadeIn">
            <div>
                <h2 className="text-xs font-black text-accent uppercase tracking-[0.4em] mb-3">Console Configuration</h2>
                <h1 className="text-4xl font-black text-text-dark tracking-tighter">Portal <span className="italic">Settings</span></h1>
            </div>
            <div className="bg-white dark:bg-gray-800/80 p-12 rounded-[3.5rem] shadow-xl border border-white dark:border-white/5">
                <form className="space-y-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="space-y-4">
                            <label className="block text-xs font-black uppercase tracking-widest text-text-gray px-1">Admin Display Name</label>
                            <input type="text" placeholder={username || 'Administrator'} className="w-full px-6 py-4 bg-gray-50 dark:bg-black/20 border border-border-color dark:border-white/5 rounded-2xl outline-none focus:border-accent transition-all text-text-dark" />
                        </div>
                        <div className="space-y-4">
                            <label className="block text-xs font-black uppercase tracking-widest text-text-gray px-1">Institutional Email</label>
                            <input type="email" placeholder="admin@ndli.gov.in" className="w-full px-6 py-4 bg-gray-50 dark:bg-black/20 border border-border-color dark:border-white/5 rounded-2xl outline-none focus:border-accent transition-all text-text-dark" />
                        </div>
                        <div className="space-y-4">
                            <label className="block text-xs font-black uppercase tracking-widest text-text-gray px-1">Console Theme</label>
                            <div className="flex gap-4">
                                <button type="button" onClick={toggleTheme} className={`flex-1 py-4 border rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${!isDarkMode ? 'bg-accent text-white border-accent shadow-lg shadow-accent/20' : 'bg-gray-50 dark:bg-black/20 text-text-gray border-border-color dark:border-white/5'}`}>Light Dynamic</button>
                                <button type="button" onClick={toggleTheme} className={`flex-1 py-4 border rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${isDarkMode ? 'bg-accent text-white border-accent shadow-lg shadow-accent/20' : 'bg-gray-50 dark:bg-black/20 text-text-gray border-border-color dark:border-white/5'}`}>Dark Obsidian</button>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <label className="block text-xs font-black uppercase tracking-widest text-text-gray px-1">System Notifications</label>
                            <label className="flex items-center gap-4 cursor-pointer">
                                <div className="relative">
                                    <input type="checkbox" className="sr-only peer" defaultChecked />
                                    <div className="w-14 h-8 bg-gray-200 dark:bg-black/40 rounded-full peer peer-checked:bg-accent transition-all"></div>
                                    <div className="absolute left-1 top-1 w-6 h-6 bg-white rounded-full transition-all peer-checked:translate-x-6"></div>
                                </div>
                                <span className="text-sm font-bold text-text-gray">Critical System Alerts</span>
                            </label>
                        </div>
                    </div>
                    <div className="pt-10 border-t border-border-color dark:border-white/5 flex gap-6">
                        <button
                            type="submit"
                            onClick={(e) => {
                                e.preventDefault();
                                alert('Settings saved successfully!');
                            }}
                            className="px-12 py-5 bg-primary dark:bg-primary-dark text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-ndl-dark transition-all shadow-xl"
                        >
                            Save Changes
                        </button>
                        <button
                            type="button"
                            onClick={() => setActiveTab('overview')}
                            className="px-12 py-5 bg-gray-50 dark:bg-black/20 text-text-dark rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-gray-100 dark:hover:bg-white/5 transition-all"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );

    return (
        <div className="flex flex-col w-full min-h-screen bg-[#f8fafc] dark:bg-ndl-dark transition-colors duration-500">
            {/* Top Utility Bar */}
            <div className="z-[1050] bg-ndl-dark text-white flex justify-between px-[5%] py-3 text-xs font-bold tracking-widest uppercase sticky top-0 border-b border-white/5 backdrop-blur-md shadow-xl">
                <div className="flex items-center gap-8">
                    <div className="flex items-center gap-3 group cursor-pointer" onClick={() => navigate('/dashboard')}>
                        <span className="text-xl group-hover:scale-125 transition-transform">🛡️</span>
                        <span className="tracking-[0.3em]">Admin <span className="text-accent">Console</span></span>
                    </div>
                    <div className="h-4 w-px bg-white/10 hidden sm:block"></div>
                    <button
                        onClick={toggleTheme}
                        className="hidden sm:flex items-center gap-2 hover:text-accent transition-colors"
                    >
                        <span>{isDarkMode ? '☀️' : '🌙'}</span> {isDarkMode ? 'Light' : 'Dark'} Mode
                    </button>
                </div>
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-3 px-4 py-1.5 bg-white/5 rounded-full border border-white/10 group hover:border-accent transition-all">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                        <span className="text-[10px] opacity-80 group-hover:opacity-100">{username || 'Super Admin'}</span>
                    </div>
                    <button
                        onClick={() => navigate('/login')}
                        className="flex items-center gap-2 hover:text-accent transition-colors"
                    >
                        Logout 🚪
                    </button>
                </div>
            </div>

            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar */}
                <aside className="w-72 bg-white dark:bg-gray-800/50 border-r border-border-color dark:border-white/5 hidden lg:flex flex-col p-8 space-y-2">
                    <p className="text-[10px] font-black text-text-gray uppercase tracking-[0.3em] mb-6 px-4">Management</p>
                    {[
                        { id: 'overview', name: 'Dashboard Home', icon: '📊' },
                        { id: 'resources', name: 'Resources Hub', icon: '📂' },
                        { id: 'users', name: 'User Directory', icon: '👤' },
                        { id: 'reports', name: 'Analytics', icon: '📈' },
                        { id: 'settings', name: 'Settings', icon: '⚙️' }
                    ].map(item => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`flex items-center gap-4 px-6 py-4 rounded-2xl text-sm font-bold transition-all duration-300 ${activeTab === item.id
                                ? 'bg-accent text-white shadow-lg shadow-accent/20 translate-x-2'
                                : 'text-text-gray hover:bg-gray-50 dark:hover:bg-white/5 hover:text-text-dark'}`}
                        >
                            <span className="text-xl">{item.icon}</span>
                            {item.name}
                        </button>
                    ))}
                </aside>

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto p-8 md:p-12 lg:p-16">
                    {activeTab === 'overview' && renderOverview()}
                    {activeTab === 'resources' && renderResources()}
                    {activeTab === 'users' && renderUsers()}
                    {activeTab === 'reports' && renderAnalytics()}
                    {activeTab === 'settings' && renderSettings()}
                </main>
            </div>
        </div>
    );
};

export default AdminDashboard;
