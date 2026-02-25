import React from 'react';
import { useNavigate } from 'react-router-dom';

const ResearchResources = ({ toggleTheme, isDarkMode, toggleFullScreen }) => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = React.useState('');

    const sections = [
        {
            title: 'Academic Subjects',
            icon: '🧬',
            items: [
                'Physical Sciences', 'Biological Sciences', 'Chemical Sciences',
                'Engineering & Tech', 'Arts & Humanities', 'Social Sciences',
                'Medicine & Health', 'Earth & Environment', 'Business & Econ',
                'Computer Science', 'Mathematics', 'Philosophy',
                'Agricultural Science', 'Law & Governance', 'Psychology'
            ]
        },
        {
            title: 'Research Types',
            icon: '📑',
            items: [
                'Journal Articles', 'Theses & Dissertations', 'Conference Papers',
                'Research Reports', 'Datasets', 'Preprints',
                'Patents & Standards', 'Systematic Reviews', 'Case Studies',
                'Book Chapters', 'Monographs', 'Working Papers'
            ]
        },
        {
            title: 'Institutes & Labs',
            icon: '🏢',
            items: [
                'Indian Institutes of Technology (IITs)', 'National Institutes of Tech (NITs)', 'IISERs & IISC',
                'CSIR Laboratories', 'DRDO Research Centers', 'ISRO / Dept of Space',
                'ICMR Centers', 'ICAR Institutions', 'National Repositories',
                'Public Universities', 'International Research Agencies', 'Private R&D Centers'
            ]
        },
        {
            title: 'Journals & Repositories',
            icon: '🗞️',
            items: [
                'Nature Portfolio', 'ScienceDirect (Elsevier)', 'IEEE Xplore',
                'PubMed Central', 'arXiv.org (Preprints)', 'SAGE Journals',
                'SpringerLink', 'Wiley Online Library', 'JSTOR Archive',
                'Taylor & Francis', 'Oxford Academic', 'ACM Digital Library'
            ]
        }
    ];

    return (
        <div className="flex flex-col w-full min-h-screen bg-[#f3f4f6] dark:bg-ndl-dark transition-colors duration-500">
            {/* Top Utility Bar */}
            <div className="z-[1050] bg-gradient-to-r from-[#004d40] to-[#002f2b] text-white flex justify-between px-[5%] py-2.5 text-xs font-semibold tracking-wide sticky top-0 border-b border-white/5 backdrop-blur-sm shadow-lg">
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
                        onClick={() => alert('Advanced Search system coming soon!')}
                        className="flex items-center gap-2 opacity-90 hover:opacity-100 hover:text-accent transition-all group p-1"
                    >
                        <span className="text-sm group-hover:scale-110 transition-transform">🔍</span>
                        <span className="hidden sm:inline">Advanced Search</span>
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
            <div className="relative pt-20 pb-12 px-[5%] text-center overflow-hidden bg-gradient-to-b from-[#e0f2f1] to-transparent dark:from-ndl-dark dark:to-transparent">
                <div className="relative z-10 flex flex-col items-center">
                    {/* Themed Header Badge */}
                    <div className={`inline-block px-14 py-4 ${isDarkMode ? 'bg-gray-800 border-white/10' : 'bg-white border-white'} shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-3xl mb-10 border animate-popIn`}>
                        <h1 className={`text-4xl font-black tracking-tighter uppercase ${isDarkMode ? 'text-white' : 'text-ndl-dark'}`}>
                            Research <span className="text-accent underline decoration-primary/20 transition-all">Hub</span>
                        </h1>
                    </div>

                    {/* Research Search Bar */}
                    <div className="w-full max-w-5xl relative group mb-12 animate-fadeInUp">
                        <div className="absolute inset-x-0 -bottom-2 h-4 bg-black/5 blur-2xl rounded-full scale-95 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div className="relative bg-white dark:bg-gray-800 border-2 border-transparent focus-within:border-accent shadow-2xl rounded-[1.5rem] flex p-1 transition-all duration-500 overflow-hidden">
                            <div className="px-8 flex items-center border-r border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-gray-900/20">
                                <span className="text-xs font-black uppercase tracking-widest text-[#006064] dark:text-[#4db6ac] flex items-center gap-3">
                                    🔬 Research Portal
                                </span>
                            </div>
                            <input
                                type="text"
                                placeholder="Discover journals, DOI, authors, or research topics..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && searchTerm && navigate(`/search?q=${searchTerm}`)}
                                className={`flex-1 bg-transparent px-8 py-5 outline-none font-semibold ${isDarkMode ? 'text-white placeholder-white/30' : 'text-text-dark placeholder-text-gray/50'} text-lg`}
                            />
                            <button
                                onClick={() => searchTerm && navigate(`/search?q=${searchTerm}`)}
                                className="bg-[#004d40] hover:bg-[#002f2b] text-white px-12 rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-xl active:scale-95 shadow-primary/30"
                            >
                                Search
                            </button>
                        </div>
                        <div className={`mt-4 flex justify-center gap-6 text-[10px] font-black uppercase tracking-widest ${isDarkMode ? 'text-gray-400' : 'text-text-gray/80'}`}>
                            <span
                                onClick={() => alert('Redirecting to Digital Repository...')}
                                className="cursor-pointer hover:text-accent transition-colors"
                            >
                                Digital Repository
                            </span>
                            <span className="w-1 h-1 bg-gray-300 rounded-full my-auto"></span>
                            <span
                                onClick={() => alert('Redirecting to Institutional Repositories...')}
                                className="cursor-pointer hover:text-accent transition-colors"
                            >
                                Institutional Repositories
                            </span>
                            <span className="w-1 h-1 bg-gray-300 rounded-full my-auto"></span>
                            <span
                                onClick={() => alert('Searching for Open Access content...')}
                                className="cursor-pointer hover:text-accent transition-colors"
                            >
                                Open Access
                            </span>
                        </div>
                    </div>
                </div>

                {/* Background Floating Elements */}
                <div className="absolute top-10 right-[10%] w-72 h-72 bg-accent/5 rounded-full blur-[100px] animate-pulse"></div>
                <div className="absolute top-40 left-[10%] w-60 h-60 bg-primary/5 rounded-full blur-[100px] animate-pulse delay-1000"></div>
            </div>

            {/* Main Grid */}
            <main className="flex-1 px-[5%] pb-32">
                <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {sections.map((section, idx) => (
                        <div
                            key={idx}
                            className="group bg-white dark:bg-gray-800/90 backdrop-blur-xl rounded-[3rem] shadow-[0_20px_60px_rgba(0,0,0,0.03)] border border-white dark:border-white/5 flex flex-col overflow-hidden animate-fadeInUp transition-all duration-700 hover:-translate-y-5 hover:shadow-[0_60px_120px_rgba(0,0,0,0.18)] hover:border-accent/50"
                            style={{ animationDelay: `${idx * 200}ms` }}
                        >
                            {/* Header */}
                            <div className={`px-12 py-8 border-b ${isDarkMode ? 'border-white/5 bg-gray-900/40' : 'border-gray-100 bg-gray-50/50'} flex items-center justify-between group-hover:bg-white dark:group-hover:bg-gray-800 transition-colors duration-500`}>
                                <h2 className={`text-2xl font-black flex items-center gap-6 tracking-tight uppercase ${isDarkMode ? 'text-white' : 'text-ndl-dark'}`}>
                                    <span className="text-4xl transition-all duration-700 group-hover:scale-150 group-hover:rotate-[20deg] group-hover:drop-shadow-xl inline-block">
                                        {section.icon}
                                    </span>
                                    {section.title}
                                </h2>
                                <div className="w-12 h-12 rounded-full border-2 border-accent/20 flex items-center justify-center opacity-30 group-hover:opacity-100 group-hover:border-accent transition-all duration-700 scale-75 group-hover:scale-100">
                                    <span className="text-accent text-lg">›</span>
                                </div>
                            </div>

                            {/* Items */}
                            <div className="p-12 flex-1 relative overflow-hidden">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6 relative z-10">
                                    {section.items.map((item, itemIdx) => (
                                        <div
                                            key={itemIdx}
                                            onClick={() => alert(`Accessing research node: ${item}`)}
                                            className="group/item flex items-center gap-5 text-sm text-text-gray/90 dark:text-gray-400 hover:text-accent font-bold cursor-pointer transition-all duration-300"
                                        >
                                            <div className="min-w-2 h-2 rounded-full bg-accent/20 group-hover/item:bg-accent group-hover/item:scale-150 transition-all shadow-sm"></div>
                                            <span className="truncate border-b-2 border-transparent group-hover/item:border-accent/10 pb-1">{item}</span>
                                        </div>
                                    ))}
                                </div>
                                {/* Decorative Pattern */}
                                <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-[0.03] rotate-12 transition-opacity duration-1000 pointer-events-none">
                                    <span className="text-9xl font-black uppercase select-none">{section.title[0]}</span>
                                </div>
                            </div>

                            {/* Action Footer */}
                            <div className="px-12 py-6 bg-gray-50/50 dark:bg-black/30 border-t border-gray-100 dark:border-white/5 flex justify-center group-hover:bg-accent/10 transition-colors duration-500">
                                <button
                                    onClick={() => alert(`Granting access to ${section.title} repository...`)}
                                    className="flex items-center gap-4 text-xs font-black uppercase tracking-[0.4em] text-[#006064] dark:text-[#4db6ac] hover:text-[#004d40] transition-all group/btn"
                                >
                                    <span className="transition-all duration-700 group-hover/btn:scale-150 group-hover/btn:rotate-[45deg]">📚</span>
                                    <span className="relative overflow-hidden inline-block group-hover:scale-105 transition-all">
                                        Access Library
                                        <span className="absolute bottom-0 left-0 w-full h-[2px] bg-currentColor translate-x-[-105%] group-hover/btn:translate-x-0 transition-transform duration-700"></span>
                                    </span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            {/* Footer Branding */}
            <footer className="py-20 px-[5%] bg-white dark:bg-ndl-dark border-t border-border-color dark:border-white/10 mt-auto">
                <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row justify-between items-center gap-12">
                    <div className="flex items-center gap-16 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-1000 scale-90 sm:scale-110">
                        <img src="https://ndl.iitkgp.ac.in/assets/images/Ministry_Of_Education.png" alt="MOE" className="h-16 shadow-none" />
                        <div className="w-[1px] h-12 bg-gray-200 dark:bg-white/10 rounded-full"></div>
                        <img src="https://ndl.iitkgp.ac.in/assets/images/iit-kgp.png" alt="IIT KGP" className="h-16 shadow-none" />
                    </div>
                    <div className="text-text-gray/50 dark:text-gray-500 text-[10px] font-black tracking-[0.4em] uppercase text-center lg:text-right">
                        Digitizing Knowledge for All &copy; 2026 NDLI Platform
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default ResearchResources;
