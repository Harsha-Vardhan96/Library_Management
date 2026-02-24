import React from 'react';
import { useNavigate } from 'react-router-dom';

const SchoolEducation = ({ toggleTheme, isDarkMode, toggleFullScreen }) => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = React.useState('');

    const sections = [
        {
            title: 'Subjects',
            icon: '📚',
            items: [
                'Physics', 'Chemistry', 'Mathematics',
                'Biology', 'Commerce', 'History',
                'Geography', 'Economics', 'Vocational Studies',
                'General Science', 'Computer Science', 'The Arts',
                'English', 'Political Science', 'Regional Languages'
            ]
        },
        {
            title: 'Educational Levels',
            icon: '🎓',
            items: [
                'Class I', 'Class II', 'Class III',
                'Class IV', 'Class V', 'Class VI',
                'Class VII', 'Class VIII', 'Class IX',
                'Class X', 'Class XI', 'Class XII',
                'JEE Main Preparatory', 'JEE Advanced Preparatory', 'NEET (UG) Preparatory'
            ]
        },
        {
            title: 'Contents in Indian Languages',
            icon: '🇮🇳',
            items: [
                'Assamese', 'Bengali', 'Bodo/Boro',
                'Dogri', 'Garo', 'Gujarati',
                'Hindi', 'Kannada', 'Kashmiri',
                'Khasi', 'Konkani', 'Maithili',
                'Malayalam', 'Marathi', 'Manipuri',
                'Nepali', 'Odia', 'Punjabi',
                'Sanskrit', 'Santali', 'Sindhi',
                'Tamil', 'Telugu', 'Urdu'
            ]
        },
        {
            title: 'State Boards',
            icon: '🏫',
            items: [
                'Andhra Pradesh', 'Arunachal Pradesh', 'Assam',
                'Bihar', 'Chandigarh', 'Chhattisgarh',
                'Gujarat', 'Haryana', 'Himachal Pradesh',
                'Jammu & Kashmir', 'Karnataka', 'Kerala',
                'Madhya Pradesh', 'Maharashtra', 'Manipur',
                'Nagaland', 'Odisha', 'Punjab',
                'Rajasthan', 'Sikkim', 'Tamil Nadu',
                'Telangana', 'Tripura', 'Uttarakhand',
                'Uttar Pradesh', 'West Bengal'
            ]
        }
    ];

    return (
        <div className="flex flex-col w-full min-h-screen bg-[#f1f5f9] dark:bg-ndl-dark transition-colors duration-500">
            {/* Top Utility Bar */}
            <div className="z-[1050] bg-gradient-to-r from-primary to-[#003f42] text-white flex justify-between px-[5%] py-2.5 text-xs font-semibold tracking-wide sticky top-0 border-b border-primary/20 backdrop-blur-sm shadow-md">
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

            {/* Hero Header */}
            <div className="relative pt-16 pb-8 px-[5%] text-center overflow-hidden bg-gradient-to-b from-[#e0f2f1] to-transparent dark:from-ndl-dark dark:to-transparent">
                <div className="relative z-10 flex flex-col items-center">
                    {/* Themed Header Badge */}
                    <div className="inline-block px-14 py-4 bg-white dark:bg-gray-800 shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-3xl mb-10 border border-white dark:border-white/10 animate-popIn">
                        <h1 className="text-4xl font-black text-text-dark tracking-tighter uppercase">
                            School <span className="text-accent italic">Education</span>
                        </h1>
                    </div>

                    {/* Search Bar - Matching user screenshot context */}
                    <div className="w-full max-w-4xl relative group mb-12 animate-fadeInUp">
                        <div className="absolute inset-x-0 -bottom-2 h-4 bg-black/5 blur-2xl rounded-full scale-95 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div className="relative bg-white dark:bg-gray-800 border-2 border-transparent focus-within:border-accent shadow-2xl rounded-2xl flex p-1 transition-all duration-500 overflow-hidden">
                            <div className="px-8 flex items-center border-r border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-gray-900/20">
                                <span className="text-xs font-black uppercase tracking-widest text-[#00695c] dark:text-[#80cbc4] flex items-center gap-3">
                                    🏫 EduHub
                                </span>
                            </div>
                            <input
                                type="text"
                                placeholder="Search for textbooks, papers, resources..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && searchTerm && navigate(`/search?q=${searchTerm}`)}
                                className="flex-1 bg-transparent px-8 py-5 text-text-dark outline-none font-medium placeholder-text-gray/40"
                            />
                            <button
                                onClick={() => searchTerm && navigate(`/search?q=${searchTerm}`)}
                                className="bg-primary hover:bg-[#004d40] text-white px-10 rounded-xl font-black uppercase tracking-widest text-xs transition-all shadow-lg active:scale-95 shadow-primary/20"
                            >
                                Search
                            </button>
                        </div>
                    </div>
                </div>

                {/* Background Floating Elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute -bottom-10 left-10 w-48 h-48 bg-primary/5 rounded-full blur-3xl animate-pulse delay-700"></div>
            </div>

            {/* Main Grid */}
            <main className="flex-1 px-[5%] pb-24">
                <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
                    {sections.map((section, idx) => (
                        <div
                            key={idx}
                            className="group bg-white dark:bg-gray-800/80 backdrop-blur-md rounded-[2.5rem] shadow-[0_15px_45px_rgba(0,0,0,0.04)] border border-white dark:border-white/5 flex flex-col overflow-hidden animate-fadeInUp transition-all duration-700 hover:-translate-y-4 hover:shadow-[0_45px_90px_rgba(0,0,0,0.15)] hover:border-accent/40"
                            style={{ animationDelay: `${idx * 150}ms` }}
                        >
                            {/* Header */}
                            <div className="px-10 py-7 border-b border-gray-100 dark:border-white/5 flex items-center justify-between bg-gray-50/50 dark:bg-gray-900/30 group-hover:bg-white dark:group-hover:bg-gray-800 transition-colors duration-500">
                                <h2 className="text-2xl font-black text-text-dark flex items-center gap-5 tracking-tight uppercase">
                                    <span className="text-3xl transition-all duration-500 group-hover:scale-150 group-hover:rotate-[15deg] inline-block drop-shadow-md">
                                        {section.icon}
                                    </span>
                                    {section.title}
                                </h2>
                                <div className="w-10 h-10 rounded-2xl bg-accent/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-700 translate-x-6 group-hover:translate-x-0 rotate-45 group-hover:rotate-0 shadow-lg shadow-accent/20">
                                    <span className="text-accent text-sm font-bold">➔</span>
                                </div>
                            </div>

                            {/* Items */}
                            <div className="p-10 flex-1">
                                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-5">
                                    {section.items.map((item, itemIdx) => (
                                        <div
                                            key={itemIdx}
                                            onClick={() => alert(`Exploring: ${item}`)}
                                            className="group/item flex items-center gap-4 text-sm text-text-gray/90 dark:text-gray-400 hover:text-accent font-bold cursor-pointer transition-all duration-300 hover:translate-x-2"
                                        >
                                            <div className="w-1.5 h-1.5 rounded-full bg-accent/20 group-hover/item:bg-accent group-hover/item:scale-150 transition-all shadow-sm"></div>
                                            <span className="truncate border-b-2 border-transparent group-hover/item:border-accent/10 pb-0.5">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Action Button */}
                            <div className="px-10 py-5 bg-gray-50/50 dark:bg-black/20 border-t border-gray-100 dark:border-white/5 flex justify-center group-hover:bg-accent/5 transition-colors duration-500">
                                <button
                                    onClick={() => alert(`Opening discovery panel for ${section.title}...`)}
                                    className="flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.2em] text-[#00695c] dark:text-[#80cbc4] hover:text-[#004d40] transition-all group/btn"
                                >
                                    <span className="transition-all duration-500 group-hover/btn:scale-150 group-hover/btn:rotate-[20deg]">📚</span>
                                    <span className="relative overflow-hidden inline-block group-hover:italic transition-all">
                                        Explore More
                                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-currentColor translate-x-[-105%] group-hover/btn:translate-x-0 transition-transform duration-700"></span>
                                    </span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            {/* Footer Branding */}
            <footer className="py-16 px-[5%] bg-white dark:bg-ndl-dark border-t border-border-color dark:border-white/5 mt-auto">
                <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
                    <div className="flex items-center gap-14 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-1000 scale-90 sm:scale-100">
                        <img src="https://ndl.iitkgp.ac.in/assets/images/Ministry_Of_Education.png" alt="MOE" className="h-16" />
                        <div className="w-[2px] h-10 bg-gray-200 dark:bg-white/10 rounded-full"></div>
                        <img src="https://ndl.iitkgp.ac.in/assets/images/iit-kgp.png" alt="IIT KGP" className="h-16" />
                    </div>
                    <div className="text-text-gray/60 dark:text-gray-500 text-[10px] font-bold tracking-[0.3em] uppercase">
                        National Digital Library of India &copy; 2026
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default SchoolEducation;
