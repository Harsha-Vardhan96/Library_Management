import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

const AdminDashboard = ({ toggleTheme, isDarkMode, username }) => {
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

    const renderOverview = () => (
        <div className="max-w-6xl mx-auto space-y-12 animate-fadeIn">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h2 className="text-xs font-black text-accent uppercase tracking-[0.4em] mb-3">System Overview</h2>
                    <h1 className={`text-4xl md:text-5xl font-black tracking-tighter ${isDarkMode ? 'text-white' : 'text-ndl-dark'}`}>
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
                    <div key={idx} className={`${isDarkMode ? 'bg-gray-800/80 border-white/5' : 'bg-white border-border-color'} p-8 rounded-[2.5rem] shadow-[0_15px_45px_rgba(0,0,0,0.03)] border group hover:-translate-y-2 transition-all duration-500`}>
                        <div className={`w-14 h-14 ${stat.color} rounded-2xl flex items-center justify-center text-2xl mb-6 shadow-lg shadow-black/5 group-hover:rotate-12 transition-transform`}>
                            {stat.icon}
                        </div>
                        <p className={`text-xs font-black uppercase tracking-widest mb-1 ${isDarkMode ? 'text-gray-400' : 'text-text-gray/80'}`}>{stat.label}</p>
                        <h3 className={`text-3xl font-black tracking-tighter ${isDarkMode ? 'text-white' : 'text-ndl-dark'}`}>{stat.value}</h3>
                    </div>
                ))}
            </div>

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className={`lg:col-span-2 ${isDarkMode ? 'bg-gray-800/80 border-white/5' : 'bg-white border-border-color'} p-10 rounded-[3rem] shadow-[0_15px_45px_rgba(0,0,0,0.03)] border`}>
                    <div className="flex items-center justify-between mb-10">
                        <h3 className={`text-xl font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-ndl-dark'}`}>Recent Content Submissions</h3>
                        <button
                            onClick={() => setActiveTab('resources')}
                            className="text-xs font-bold text-primary dark:text-accent transition-colors uppercase tracking-widest"
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
                                        <h4 className={`font-bold transition-colors ${isDarkMode ? 'text-white group-hover:text-accent' : 'text-text-dark group-hover:text-primary'}`}>{upload.title}</h4>
                                        <p className={`text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-text-gray'}`}>{upload.category} • {upload.date}</p>
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
                <div className={`${isDarkMode ? 'bg-gray-900/40' : 'bg-primary'} p-10 rounded-[3rem] text-white flex flex-col justify-between group overflow-hidden relative shadow-2xl`}>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-accent opacity-20 rounded-full blur-3xl -translate-y-16 translate-x-16"></div>
                    <div className="relative z-10">
                        <h3 className="text-xl font-black mb-6 tracking-tight">Access Control</h3>
                        <p className="text-sm text-white/80 mb-8 leading-relaxed">Instantly manage user roles or suspend accounts from the centralized directory.</p>
                        <div className="space-y-3">
                            <button className={`w-full py-4 bg-white/10 hover:bg-white text-white ${isDarkMode ? 'hover:text-ndl-dark' : 'hover:text-primary'} font-black uppercase tracking-widest text-[10px] rounded-2xl transition-all border border-white/5 hover:border-white`} onClick={() => setActiveTab('users')}>
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
                    <div className="mt-12 pt-12 border-t border-white/10 text-[10px] font-black uppercase tracking-[0.3em] opacity-60">
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
                <h1 className={`text-4xl font-black tracking-tighter ${isDarkMode ? 'text-white' : 'text-ndl-dark'}`}>Resources <span className="italic">Hub</span></h1>
            </div>
            <div className={`${isDarkMode ? 'bg-gray-800/80 border-white/5' : 'bg-white border-border-color'} rounded-[3rem] shadow-xl border overflow-hidden`}>
                <div className={`p-10 border-b flex flex-wrap gap-6 justify-between items-center ${isDarkMode ? 'bg-black/10 border-white/5' : 'bg-gray-50/50 border-border-color'}`}>
                    <div className="relative flex-1 min-w-[300px]">
                        <span className="absolute left-5 top-1/2 -translate-y-1/2 opacity-30">🔍</span>
                        <input
                            type="text"
                            placeholder="Search resources..."
                            value={resourceSearchTerm}
                            onChange={(e) => setResourceSearchTerm(e.target.value)}
                            className="w-full pl-14 pr-6 py-4 bg-white dark:bg-gray-700 border border-border-color dark:border-white/10 rounded-2xl outline-none focus:border-accent transition-all"
                        />
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
                            <tr className={`${isDarkMode ? 'bg-black/20' : 'bg-gray-100/50'}`}>
                                <th className={`px-10 py-6 text-xs font-black uppercase tracking-widest ${isDarkMode ? 'text-gray-400' : 'text-text-dark/70'}`}>Resource Title</th>
                                <th className={`px-10 py-6 text-xs font-black uppercase tracking-widest ${isDarkMode ? 'text-gray-400' : 'text-text-dark/70'}`}>Category</th>
                                <th className={`px-10 py-6 text-xs font-black uppercase tracking-widest ${isDarkMode ? 'text-gray-400' : 'text-text-dark/70'}`}>Status</th>
                                <th className={`px-10 py-6 text-xs font-black uppercase tracking-widest ${isDarkMode ? 'text-gray-400' : 'text-text-dark/70'} text-right`}>Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border-color dark:divide-white/5">
                            {filteredResources.length > 0 ? (
                                filteredResources.map(resource => (
                                    <tr key={resource.id} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group">
                                        <td className={`px-10 py-8 font-bold transition-colors ${isDarkMode ? 'text-white group-hover:text-accent' : 'text-text-dark group-hover:text-primary'}`}>
                                            {resource.title}
                                        </td>
                                        <td className={`px-10 py-8 text-sm ${isDarkMode ? 'text-gray-400' : 'text-text-gray'}`}>
                                            {resource.category}
                                        </td>
                                        <td className="px-10 py-8">
                                            <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${resource.status === 'Published' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400'}`}>
                                                {resource.status}
                                            </span>
                                        </td>
                                        <td className="px-10 py-8 text-right space-x-4">
                                            <button
                                                onClick={() => alert(`Downloading: ${resource.title}`)}
                                                className="text-accent hover:scale-110 transition-transform"
                                                title="Download Resource"
                                            >
                                                📥
                                            </button>
                                            <button
                                                onClick={() => alert(`Editing: ${resource.title}`)}
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
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="px-10 py-20 text-center text-text-gray/50 uppercase font-black tracking-widest text-xs">
                                        No resources found matching "{resourceSearchTerm}"
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
        <div className="max-w-6xl mx-auto space-y-12 animate-fadeIn">
            <div>
                <h2 className="text-xs font-black text-accent uppercase tracking-[0.4em] mb-3">Community Control</h2>
                <h1 className={`text-4xl font-black tracking-tighter ${isDarkMode ? 'text-white' : 'text-ndl-dark'}`}>User <span className="italic">Directory</span></h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                    { name: 'Harsha Vardhan', role: 'Administrator', color: 'bg-blue-500' },
                    { name: 'Lohith Reddy', role: 'Student', color: 'bg-green-500' },
                    { name: 'Gopi Krishna', role: 'Administrator', color: 'bg-purple-500' },
                    { name: 'Rajesh Kumar', role: 'Librarian', color: 'bg-orange-500' },
                    { name: 'Elena Gilbert', role: 'Librarian', color: 'bg-pink-500' },
                    { name: 'Damon Salvatore', role: 'Student', color: 'bg-teal-500' }
                ].map((user, idx) => (
                    <div key={idx} className={`${isDarkMode ? 'bg-gray-800/80 border-white/5' : 'bg-white border-border-color'} p-10 rounded-[3rem] shadow-xl border flex flex-col items-center text-center group hover:-translate-y-2 transition-all duration-500`}>
                        <div className={`w-24 h-24 ${user.color} rounded-full flex items-center justify-center text-4xl text-white mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                            {user.name.charAt(0)}
                        </div>
                        <h3 className={`text-xl font-black mb-2 tracking-tight ${isDarkMode ? 'text-white' : 'text-ndl-dark'}`}>{user.name}</h3>
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
                ))
                }
            </div>
        </div>
    );

    const renderAnalytics = () => (
        <div className="max-w-6xl mx-auto space-y-12 animate-fadeIn">
            <div>
                <h2 className="text-xs font-black text-accent uppercase tracking-[0.4em] mb-3">Platform Performance</h2>
                <h1 className={`text-4xl font-black tracking-tighter ${isDarkMode ? 'text-white' : 'text-ndl-dark'}`}>System <span className="italic">Analytics</span></h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className={`${isDarkMode ? 'bg-gray-800/80 border-white/5' : 'bg-white border-border-color'} p-10 rounded-[3rem] shadow-xl border`}>
                    <h3 className={`text-xl font-black mb-10 tracking-tight ${isDarkMode ? 'text-white' : 'text-ndl-dark'}`}>Growth Projection</h3>
                    <div className="flex items-end gap-4 h-64 px-4 overflow-hidden">
                        {[40, 60, 45, 90, 75, 100, 85].map((h, i) => (
                            <div key={i} className="flex-1 h-full flex flex-col justify-end items-center gap-4">
                                <div style={{ height: `${h}%` }} className="w-full bg-accent rounded-t-xl relative group">
                                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-ndl-dark text-white px-3 py-1 rounded-lg text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">{h}% Increase</div>
                                </div>
                                <span className={`text-[10px] font-black uppercase ${isDarkMode ? 'text-gray-400' : 'text-text-gray'}`}>M {i + 1}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className={`${isDarkMode ? 'bg-gray-900/40' : 'bg-primary'} p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden`}>
                    <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-accent/20 rounded-full blur-3xl"></div>
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
        <div className="max-w-6xl mx-auto space-y-12 animate-fadeIn pb-20">
            <div>
                <h2 className="text-xs font-black text-accent uppercase tracking-[0.4em] mb-3">Console Configuration</h2>
                <h1 className={`text-4xl font-black tracking-tighter ${isDarkMode ? 'text-white' : 'text-ndl-dark'}`}>Portal <span className="italic">Settings</span></h1>
            </div>

            <form className="space-y-8" onSubmit={(e) => { e.preventDefault(); alert('Settings saved successfully!'); }}>
                {/* Profile Settings */}
                <div className={`${isDarkMode ? 'bg-gray-800/80 border-white/5' : 'bg-white border-border-color'} p-10 rounded-[3rem] shadow-xl border`}>
                    <h3 className={`text-xl font-black mb-8 tracking-tight ${isDarkMode ? 'text-white' : 'text-ndl-dark'} flex items-center gap-3`}>
                        <span className="opacity-50 text-base">👤</span> Profile Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <label className={`block text-[10px] font-black uppercase tracking-widest px-1 ${isDarkMode ? 'text-gray-400' : 'text-text-gray'}`}>Admin Display Name</label>
                            <input type="text" placeholder={username || 'Administrator'} className="w-full px-6 py-4 bg-gray-50 dark:bg-black/20 border border-border-color dark:border-white/5 rounded-2xl outline-none focus:border-accent transition-all text-text-dark dark:text-white placeholder:text-text-gray/50" />
                        </div>
                        <div className="space-y-4">
                            <label className={`block text-[10px] font-black uppercase tracking-widest px-1 ${isDarkMode ? 'text-gray-400' : 'text-text-gray'}`}>Institutional Email</label>
                            <input type="email" placeholder="admin@ndli.gov.in" className="w-full px-6 py-4 bg-gray-50 dark:bg-black/20 border border-border-color dark:border-white/5 rounded-2xl outline-none focus:border-accent transition-all text-text-dark dark:text-white placeholder:text-text-gray/50" />
                        </div>
                    </div>
                </div>

                {/* Security Settings */}
                <div className={`${isDarkMode ? 'bg-gray-800/80 border-white/5' : 'bg-white border-border-color'} p-10 rounded-[3rem] shadow-xl border`}>
                    <h3 className={`text-xl font-black mb-8 tracking-tight ${isDarkMode ? 'text-white' : 'text-ndl-dark'} flex items-center gap-3`}>
                        <span className="opacity-50 text-base">🛡️</span> Security & Privacy
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div className="flex items-center justify-between p-6 bg-gray-50 dark:bg-black/10 rounded-2xl">
                            <div>
                                <h4 className={`font-bold ${isDarkMode ? 'text-white' : 'text-ndl-dark'}`}>Two-Factor Authentication</h4>
                                <p className="text-[10px] text-text-gray mt-1 uppercase tracking-widest font-black opacity-60">Enhanced account protection</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer" />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-accent"></div>
                            </label>
                        </div>
                        <div className="space-y-4">
                            <label className={`block text-[10px] font-black uppercase tracking-widest px-1 ${isDarkMode ? 'text-gray-400' : 'text-text-gray'}`}>Auto-Logout Session</label>
                            <select className="w-full px-6 py-4 bg-gray-50 dark:bg-black/20 border border-border-color dark:border-white/5 rounded-2xl outline-none focus:border-accent transition-all text-sm font-bold text-text-dark dark:text-white">
                                <option>15 Minutes</option>
                                <option>30 Minutes</option>
                                <option selected>1 Hour</option>
                                <option>4 Hours</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Interface Customization */}
                <div className={`${isDarkMode ? 'bg-gray-800/80 border-white/5' : 'bg-white border-border-color'} p-10 rounded-[3rem] shadow-xl border`}>
                    <h3 className={`text-xl font-black mb-8 tracking-tight ${isDarkMode ? 'text-white' : 'text-ndl-dark'} flex items-center gap-3`}>
                        <span className="opacity-50 text-base">🎨</span> Interface Customization
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <label className={`block text-[10px] font-black uppercase tracking-widest px-1 ${isDarkMode ? 'text-gray-400' : 'text-text-gray'}`}>Portal Language</label>
                            <select
                                value={currentLanguage}
                                onChange={(e) => changeLanguage(e.target.value)}
                                className="w-full px-6 py-4 bg-gray-50 dark:bg-black/20 border border-border-color dark:border-white/5 rounded-2xl outline-none focus:border-accent transition-all text-sm font-bold text-text-dark dark:text-white"
                            >
                                <option value="en">English (US)</option>
                                <option value="hi">Hindi (हिन्दी)</option>
                                <option value="te">Telugu (తెలుగు)</option>
                                <option value="kn">Kannada (ಕನ್ನಡ)</option>
                            </select>
                        </div>
                        <div className="space-y-4">
                            <label className={`block text-[10px] font-black uppercase tracking-widest px-1 ${isDarkMode ? 'text-gray-400' : 'text-text-gray'}`}>Accent Color</label>
                            <div className="flex gap-3">
                                {['#FF6D00', '#006064', '#7B1FA2', '#D32F2F', '#388E3C'].map(color => (
                                    <button
                                        key={color}
                                        type="button"
                                        onClick={() => setAccentColor(color)}
                                        className={`w-10 h-10 rounded-full border-4 transition-all hover:scale-110 active:scale-90 ${color === accentColor ? 'border-primary dark:border-white animate-pulse' : 'border-transparent opacity-60 hover:opacity-100'}`}
                                        style={{ backgroundColor: color }}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Data Management */}
                <div className={`${isDarkMode ? 'bg-gray-900/40 border-white/5' : 'bg-ndl-dark border-transparent'} p-10 rounded-[3rem] shadow-xl border text-white relative overflow-hidden group`}>
                    <div className="absolute top-0 right-0 w-64 h-64 bg-accent opacity-5 rounded-full blur-3xl -translate-y-32 translate-x-32 group-hover:opacity-10 transition-opacity"></div>
                    <h3 className="text-xl font-black mb-8 tracking-tight flex items-center gap-3">
                        <span className="opacity-50 text-base">⚙️</span> Data & System Management
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Maintenance Mode</span>
                                <label className="relative inline-flex items-center cursor-pointer scale-90">
                                    <input type="checkbox" className="sr-only peer" />
                                    <div className="w-11 h-6 bg-white/10 peer-focus:outline-none dark:bg-white/5 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent/80"></div>
                                </label>
                            </div>
                            <p className="text-xs text-white/40 leading-relaxed italic">When active, the portal will be accessible only to administrators.</p>
                        </div>
                        <div className="flex flex-col gap-4">
                            <button type="button" onClick={() => alert('Starting system backup...')} className="w-full py-4 bg-white/5 hover:bg-white transform hover:text-ndl-dark transition-all rounded-2xl text-[10px] font-black uppercase tracking-widest border border-white/10 hover:scale-[1.02]">
                                Initialize Cloud Backup
                            </button>
                            <button type="button" onClick={() => alert('Exporting audit logs...')} className="w-full py-4 bg-accent/20 hover:bg-accent transition-all rounded-2xl text-[10px] font-black uppercase tracking-widest border border-accent/20 hover:scale-[1.02]">
                                Export Audit Master Logs
                            </button>
                        </div>
                    </div>
                </div>

                {/* Form Actions */}
                <div className="pt-10 flex flex-col sm:flex-row gap-6">
                    <button
                        type="submit"
                        className="px-12 py-5 bg-primary text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-[#004d40] transition-all shadow-xl hover:-translate-y-1 active:translate-y-0"
                    >
                        Save Preferences
                    </button>
                    <button
                        type="button"
                        onClick={() => setActiveTab('overview')}
                        className={`px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-xs transition-all ${isDarkMode ? 'bg-white/5 text-white hover:bg-white/10' : 'bg-gray-100 text-ndl-dark hover:bg-gray-200'}`}
                    >
                        Discard Changes
                    </button>
                </div>
            </form>
        </div>
    );

    return (
        <div className={`flex flex-col w-full min-h-screen transition-colors duration-500 ${isDarkMode ? 'bg-ndl-dark' : 'bg-white'}`}>
            {/* Top Utility Bar */}
            <div className={`z-[1050] flex justify-between px-[5%] py-4 text-xs font-bold tracking-widest uppercase sticky top-0 border-b backdrop-blur-md shadow-sm transition-all duration-300 ${isDarkMode ? 'bg-ndl-dark/80 text-white border-white/5' : 'bg-white/80 text-text-dark border-border-color/50'}`}>
                <div className="flex items-center gap-8">
                    <div className="flex items-center gap-3 group cursor-pointer" onClick={() => navigate('/dashboard')}>
                        <span className="text-xl group-hover:scale-125 transition-transform">🛡️</span>
                        <span className="tracking-[0.3em] font-black">{t('adminConsole')}</span>
                    </div>
                    <div className={`h-4 w-px hidden sm:block ${isDarkMode ? 'bg-white/10' : 'bg-border-color'}`}></div>
                    <button
                        onClick={toggleTheme}
                        className="hidden sm:flex items-center gap-2 hover:text-accent transition-all active:scale-95 p-2 rounded-lg bg-gray-50/50 dark:bg-white/5"
                    >
                        <span className="text-lg">{isDarkMode ? '☀️' : '🌙'}</span>
                        <span>{isDarkMode ? 'Switch to Light' : 'Switch to Dark'}</span>
                    </button>
                </div>
                <div className="flex items-center gap-6">
                    <div className={`flex items-center gap-3 px-4 py-1.5 rounded-full border group hover:border-accent transition-all ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-border-color'}`}>
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                        <span className={`text-[10px] opacity-80 group-hover:opacity-100 ${isDarkMode ? 'text-white' : 'text-text-dark'}`}>{username || 'Super Admin'}</span>
                    </div>
                    <button
                        onClick={() => navigate('/login')}
                        className={`flex items-center gap-2 hover:text-accent transition-colors font-black ${isDarkMode ? 'text-white' : 'text-text-dark'}`}
                    >
                        Logout 🚪
                    </button>
                </div>
            </div>

            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar */}
                <aside className={`w-72 border-r hidden lg:flex flex-col p-8 space-y-2 transition-all duration-300 ${isDarkMode ? 'bg-gray-800/50 border-white/5' : 'bg-white border-border-color'}`}>
                    <p className="text-[10px] font-black text-text-gray dark:text-gray-400 uppercase tracking-[0.3em] mb-6 px-4">Management</p>
                    {[
                        { id: 'overview', name: t('dashboardHome'), icon: '📊' },
                        { id: 'resources', name: t('resourcesHub'), icon: '📂' },
                        { id: 'users', name: t('userDirectory'), icon: '👤' },
                        { id: 'reports', name: t('analytics'), icon: '📈' },
                        { id: 'settings', name: t('settings'), icon: '⚙️' }
                    ].map(item => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`flex items-center gap-4 px-6 py-4 rounded-2xl text-sm font-bold transition-all duration-300 ${activeTab === item.id
                                ? 'bg-accent text-white shadow-lg shadow-accent/20 translate-x-2'
                                : `${isDarkMode ? 'text-gray-400 hover:bg-white/5 hover:text-white' : 'text-text-gray hover:bg-gray-50 hover:text-text-dark'}`}`}
                        >
                            <span className={`text-xl transition-opacity ${activeTab === item.id ? 'opacity-100' : 'opacity-80 group-hover:opacity-100'}`}>{item.icon}</span>
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
