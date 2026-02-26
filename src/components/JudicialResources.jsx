import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const JudicialResources = ({ toggleTheme, isDarkMode, toggleFullScreen }) => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = React.useState('');

    const sections = [
        {
            title: 'Indian Laws and Acts',
            icon: '🔨',
            items: [
                'Constitutional Laws', 'Criminal Laws', 'Civil Laws',
                'Labour Laws', 'Contract Laws', 'Commercial Laws',
                'Corporate Laws', 'Consumer Laws', 'Taxation Laws',
                'Intellectual Property Laws', 'Cyber Laws', 'Property Laws',
                'Real Estate Laws', 'Family Laws', 'Environmental Laws',
                'Administrative Laws', 'Election Laws', 'International Laws',
                'Aviation Laws', 'Maritime Laws', 'Military Laws',
                'Cultural Heritage Protection Laws'
            ]
        },
        {
            title: 'State/UT-wise Laws and Gazettes',
            icon: '🌐',
            items: [
                'Andhra Pradesh', 'Arunachal Pradesh', 'Assam',
                'Bihar', 'Chhattisgarh', 'Delhi',
                'Goa', 'Gujarat', 'Himachal Pradesh',
                'Haryana', 'Jharkhand', 'Jammu & Kashmir',
                'Karnataka', 'Kerala', 'Maharashtra',
                'Meghalaya', 'Manipur', 'Madhya Pradesh',
                'Mizoram', 'Nagaland', 'Odisha',
                'Punjab', 'Rajasthan', 'Telangana',
                'Tamil Nadu', 'Uttarakhand', 'West Bengal'
            ]
        },
        {
            title: 'Judgements of Supreme Court of India',
            icon: '⚖️',
            items: [
                'Civil Cases', 'Criminal Cases', 'Tax Reference Cases',
                'Habeas Corpus Petitions', 'Arbitration Petitions', 'Special Reference Cases'
            ]
        },
        {
            title: 'Resource Types',
            icon: '📋',
            items: [
                'Gazette', 'Law and Act', 'Judgement',
                'Order', 'Report', 'Preamble/Constitution'
            ]
        }
    ];

    return (
        <div className="flex flex-col w-full min-h-screen bg-[#f8f9fa] dark:bg-ndl-dark transition-colors duration-500">
            {/* Top Utility Bar */}
            <div className="z-[1050] bg-gradient-to-r from-primary to-[#003f42] text-white flex justify-between px-[5%] py-2.5 text-xs font-semibold tracking-wide sticky top-0 border-b border-primary/20 backdrop-blur-sm">
                <div className="flex items-center gap-6">
                    <button
                        onClick={toggleTheme}
                        className="flex items-center gap-2 transition-all p-1 rounded-md hover:bg-white/10 active:scale-95 group"
                        title="Toggle theme"
                    >
                        <span className="text-sm group-hover:rotate-12 transition-transform">{isDarkMode ? '☀️' : '🌙'}</span>
                        <span className="hidden sm:inline opacity-90 group-hover:opacity-100">{isDarkMode ? 'Light' : 'Dark'} Mode</span>
                    </button>
                    <button
                        onClick={() => alert('Language selection module coming soon!')}
                        className="flex items-center gap-2 opacity-90 hover:opacity-100 hover:text-accent transition-all group p-1"
                    >
                        <span className="text-sm group-hover:scale-110 transition-transform">🌐</span>
                        <span className="hidden sm:inline">Languages</span>
                    </button>
                </div>
                <div className="flex items-center gap-6">
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="flex items-center gap-2 opacity-90 hover:opacity-100 hover:text-accent transition-all group p-1"
                    >
                        <span className="text-sm group-hover:-translate-x-1 transition-transform text-white">⬅️</span>
                        <span className="hidden sm:inline">Back to Dashboard</span>
                    </button>
                    <button
                        onClick={toggleFullScreen}
                        className="flex items-center gap-2 opacity-90 hover:opacity-100 hover:text-accent transition-all group p-1"
                    >
                        <span className="text-sm group-hover:scale-110 transition-transform">⛶</span>
                        <span className="hidden sm:inline">View Fullscreen</span>
                    </button>
                </div>
            </div>

            {/* Hero / Header Section */}
            <div className="relative pt-12 pb-6 px-[5%] text-center overflow-hidden bg-gradient-to-b from-[#e8ece5] to-transparent dark:from-ndl-dark dark:to-transparent">
                <div className="relative z-10 flex flex-col items-center">
                    <div className={`inline-block px-12 py-3 ${isDarkMode ? 'bg-gray-800 border-white/10' : 'bg-white border-border-color'} shadow-xl rounded-full mb-8 border animate-popIn`}>
                        <h1 className={`text-3xl font-black tracking-tighter ${isDarkMode ? 'text-white' : 'text-text-dark'}`}>
                            Judicial <span className="text-accent underline decoration-primary/20">Resources</span>
                        </h1>
                    </div>

                    {/* Judicial Search Bar */}
                    <div className="w-full max-w-5xl relative group mb-12 animate-fadeInUp">
                        <div className="absolute inset-x-0 -bottom-2 h-4 bg-black/5 blur-2xl rounded-full scale-95 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div className="relative bg-white dark:bg-gray-800 border-2 border-transparent focus-within:border-accent shadow-2xl rounded-[1.5rem] flex p-1 transition-all duration-500 overflow-hidden">
                            <div className="px-8 flex items-center border-r border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-gray-900/20">
                                <span className="text-xs font-black uppercase tracking-widest text-[#2e7d32] dark:text-[#4caf50] flex items-center gap-3">
                                    ⚖️ Justice Portal
                                </span>
                            </div>
                            <input
                                type="text"
                                placeholder="Search laws, acts, gazettes, or Supreme Court judgements..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && searchTerm) {
                                        navigate(`/search?q=${searchTerm}`);
                                    }
                                }}
                                className={`flex-1 bg-transparent px-8 py-5 outline-none font-semibold ${isDarkMode ? 'text-white placeholder-white/30' : 'text-text-dark placeholder-text-gray/50'} text-lg`}
                            />
                            <button
                                onClick={() => {
                                    if (searchTerm) navigate(`/search?q=${searchTerm}`);
                                }}
                                className="bg-primary hover:bg-[#004d40] text-white px-12 rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-xl active:scale-95 shadow-primary/30"
                            >
                                Search
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Grid */}
            <main className="flex-1 px-[5%] pb-20">
                <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {sections.map((section, idx) => (
                        <div
                            key={idx}
                            className="group bg-white dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-border-color dark:border-white/5 flex flex-col overflow-hidden animate-fadeInUp transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_40px_80px_rgba(0,0,0,0.12)] hover:border-accent/30"
                            style={{ animationDelay: `${idx * 150}ms` }}
                        >
                            <div className={`px-8 py-6 border-b ${isDarkMode ? 'border-white/5 bg-gray-900/20' : 'border-gray-100 bg-gray-50/50'} flex items-center justify-between group-hover:bg-white dark:group-hover:bg-gray-800 transition-colors duration-500`}>
                                <h2 className={`text-xl font-black flex items-center gap-4 tracking-tight ${isDarkMode ? 'text-white' : 'text-text-dark'}`}>
                                    <span className="text-2xl transition-all duration-500 group-hover:scale-125 group-hover:rotate-12 inline-block drop-shadow-sm">
                                        {section.icon}
                                    </span>
                                    {section.title}
                                </h2>
                                <div className="w-8 h-8 rounded-full bg-accent/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-4 group-hover:translate-x-0">
                                    <span className="text-accent text-xs">➔</span>
                                </div>
                            </div>

                            <div className="p-8 flex-1">
                                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-4">
                                    {section.items.map((item, itemIdx) => (
                                        <div
                                            key={itemIdx}
                                            className="group/item flex items-center justify-between text-sm text-text-gray/80 dark:text-gray-400 font-semibold transition-all duration-300 hover:translate-x-1"
                                        >
                                            <div
                                                className="flex items-center gap-3 cursor-pointer hover:text-accent"
                                                onClick={() => navigate(`/view/${item}`)}
                                            >
                                                <span className="text-xs group-hover/item:scale-125 transition-all duration-300 text-accent">📖</span>
                                                <span className="truncate border-b border-transparent group-hover/item:border-accent/20 pb-0.5">{item}</span>
                                            </div>
                                            <button
                                                onClick={(e) => { e.stopPropagation(); navigate(`/view/${item}`); }}
                                                className="opacity-0 group-hover/item:opacity-100 transition-opacity p-1.5 hover:bg-accent/10 rounded-lg text-accent"
                                                title="Open Document"
                                            >
                                                📖
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="px-8 py-4 bg-gray-50/50 dark:bg-black/10 border-t border-gray-100 dark:border-white/5 flex justify-center group-hover:bg-accent/5 transition-colors duration-500">
                                <button
                                    onClick={() => navigate(`/view/${section.title}`)}
                                    className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#2e7d32] dark:text-[#4caf50] hover:text-[#1b5e20] transition-all group/btn"
                                >
                                    <span className="transition-all duration-500 group-hover/btn:scale-150 group-hover/btn:rotate-12">📚</span>
                                    <span className="relative overflow-hidden inline-block">
                                        View More
                                        <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#2e7d32] dark:bg-[#4caf50] translate-x-[-101%] group-hover/btn:translate-x-0 transition-transform duration-500"></span>
                                    </span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            {/* Footer Branding */}
            <footer className="py-12 px-[5%] bg-white dark:bg-ndl-dark border-t border-border-color dark:border-white/5">
                <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex items-center gap-10 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-1000">
                        <img src="https://ndl.iitkgp.ac.in/assets/images/Ministry_Of_Education.png" alt="MOE" className="h-12" />
                        <img src="https://ndl.iitkgp.ac.in/assets/images/iit-kgp.png" alt="IIT KGP" className="h-12" />
                    </div>
                    <div className="text-text-gray text-xs font-bold tracking-widest uppercase">
                        &copy; 2026 NDLI Judicial Portal
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default JudicialResources;
