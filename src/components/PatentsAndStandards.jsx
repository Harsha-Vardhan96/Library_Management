import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import ProfessionalBackground from './ProfessionalBackground';

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const itemVariants = { hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } } };

const PatentsAndStandards = ({ toggleFullScreen }) => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = React.useState('');

    const sections = [
        {
            title: 'Issuing Authorities',
            icon: '🏛️',
            items: [
                'Indian Patent Office (IPO)', 'USPTO (USA)', 'European Patent Office (EPO)',
                'WIPO (International)', 'JPO (Japan)', 'CNIPA (China)',
                'IP Australia', 'KIPO (South Korea)', 'CIPO (Canada)',
                'UK Intellectual Property Office', 'Rospatent (Russia)', 'INPI (Brazil)'
            ]
        },
        {
            title: 'International Standards',
            icon: '📏',
            items: [
                'ISO Standards', 'IEEE Standards', 'IEC Electrotechnical',
                'ASTM International', 'ASI Standards', 'ITU Telecommunications',
                'SAE International', 'CEN European Standards', 'NIST (USA)',
                'BSI (UK)', 'DIN (Germany)', 'BIS (India)'
            ]
        },
        {
            title: 'Technical Domains',
            icon: '⚙️',
            items: [
                'High-Tech Electronics', 'Pharmaceutical & Bio', 'Mechanical Engineering',
                'Sustainable Energy', 'Aviation & Space', 'Artificial Intelligence',
                'Telecommunications', 'Medical Devices', 'Chemical Processing',
                'Automotive Tech', 'Materials Science', 'Nanotechnology'
            ]
        },
        {
            title: 'Legal & Compliance',
            icon: '⚖️',
            items: [
                'Intellectual Property Rights', 'Trademark Guidelines', 'Licensing Frameworks',
                'Compliance Protocols', 'Patent Litigation', 'Copyright Laws',
                'Industrial Design Rights', 'Trade Secrets Protection', 'IP Valuation',
                'Patent Drafting Guide', 'Filing Strategies', 'Prior Art Search'
            ]
        }
    ];

    return (
        <div className="flex flex-col w-full min-h-screen bg-ndl-dark transition-colors duration-500 relative">
            <ProfessionalBackground />
            {/* Top Utility Bar */}
            <div className="z-[1050] bg-gradient-to-r from-[#1a237e] to-[#0d47a1] text-white flex justify-between px-[5%] py-2.5 text-xs font-semibold tracking-wide sticky top-0 border-b border-white/5 backdrop-blur-sm shadow-lg">
                <div className="flex items-center gap-6">
                    <button className="flex items-center gap-2 opacity-90 hover:opacity-100 hover:text-accent transition-all group p-1">
                        <span className="text-sm group-hover:scale-110 transition-transform">🔍</span>
                        <span className="hidden sm:inline">Patent Search</span>
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
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative pt-20 pb-12 px-[5%] text-center overflow-hidden bg-gradient-to-b from-ndl-dark to-transparent"
            >
                <div className="relative z-10 flex flex-col items-center">
                    {/* Themed Header Badge */}
                    <div className="inline-block px-14 py-4 bg-gray-800 border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-3xl mb-10 border animate-popIn">
                        <h1 className="text-4xl font-black tracking-tighter uppercase text-white">
                            Patents & <span className="text-accent underline decoration-primary/20 transition-all">Standards</span>
                        </h1>
                    </div>

                    {/* Patent Search Bar */}
                    <div className="w-full max-w-5xl relative group mb-12 animate-fadeInUp">
                        <div className="absolute inset-x-0 -bottom-2 h-4 bg-black/5 blur-2xl rounded-full scale-95 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div className="relative bg-gray-800 border-2 border-transparent focus-within:border-accent shadow-2xl rounded-[1.5rem] flex p-1 transition-all duration-500 overflow-hidden">
                            <div className="px-8 flex items-center border-r border-white/5 bg-gray-900/20">
                                <span className="text-xs font-black uppercase tracking-widest text-[#90caf9] flex items-center gap-3">
                                    📜 IP Registry
                                </span>
                            </div>
                            <input
                                type="text"
                                placeholder="Search patents by ID, classification (CPC), or inventor name..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && searchTerm && navigate(`/search?q=${searchTerm}`)}
                                className="flex-1 bg-transparent px-8 py-5 outline-none font-semibold text-white placeholder-white/30 text-lg"
                            />
                            <button
                                onClick={() => searchTerm && navigate(`/search?q=${searchTerm}`)}
                                className="bg-[#1a237e] hover:bg-[#0d47a1] text-white px-12 rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-xl active:scale-95 shadow-primary/30"
                            >
                                Search
                            </button>
                        </div>
                        <div className="mt-4 flex justify-center gap-6 text-[10px] font-black uppercase tracking-widest text-gray-400">
                            <span
                                onClick={() => alert('Accessing Patent Gazette...')}
                                className="cursor-pointer hover:text-accent transition-colors"
                            >
                                Patent Gazette
                            </span>
                            <span className="w-1 h-1 bg-gray-300 rounded-full my-auto"></span>
                            <span
                                onClick={() => alert('Accessing Technical Standards repository...')}
                                className="cursor-pointer hover:text-accent transition-colors"
                            >
                                Technical Standards
                            </span>
                            <span className="w-1 h-1 bg-gray-300 rounded-full my-auto"></span>
                            <span
                                onClick={() => alert('Opening IP Litigation database...')}
                                className="cursor-pointer hover:text-accent transition-colors"
                            >
                                IP Litigation
                            </span>
                        </div>
                    </div>
                </div>

                {/* Background Floating Elements */}
                <div className="absolute top-10 right-[10%] w-72 h-72 bg-accent/5 rounded-full blur-[100px] animate-pulse"></div>
                <div className="absolute top-40 left-[10%] w-60 h-60 bg-primary/5 rounded-full blur-[100px] animate-pulse delay-1000"></div>
            </motion.div>

            {/* Main Grid */}
            <motion.main 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="flex-1 px-[5%] pb-32 relative z-10"
            >
                <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {sections.map((section, idx) => (
                        <motion.div
                            key={idx}
                            variants={itemVariants}
                            whileHover={{ y: -10, transition: { duration: 0.2 } }}
                            className="group bg-gray-800/95 backdrop-blur-2xl rounded-[3rem] shadow-[0_60px_120px_rgba(0,0,0,0.3)] border border-white/10 flex flex-col overflow-hidden transition-colors duration-500 hover:border-accent/50"
                        >
                            {/* Header */}
                            <div className="px-12 py-8 border-b border-white/5 bg-gray-900/40 flex items-center justify-between group-hover:bg-gray-800 transition-colors duration-500">
                                <h2 className="text-2xl font-black flex items-center gap-6 tracking-tight uppercase text-white">
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
                            <div className="p-12 flex-1 relative overflow-hidden bg-gray-800">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6 relative z-10">
                                    {section.items.map((item, itemIdx) => (
                                        <div
                                            key={itemIdx}
                                            className="group/item flex items-center justify-between text-sm text-gray-100 font-semibold transition-all duration-300 hover:translate-x-2"
                                        >
                                            <div
                                                className="flex items-center gap-5 cursor-pointer hover:text-accent"
                                                onClick={() => navigate(`/view/${item}`)}
                                            >
                                                <div className="min-w-2 h-2 rounded-full bg-accent/20 group-hover/item:bg-accent group-hover/item:scale-150 transition-all shadow-sm"></div>
                                                <span className="truncate border-b-2 border-transparent group-hover/item:border-accent/10 pb-1">{item}</span>
                                            </div>
                                            <button
                                                onClick={(e) => { e.stopPropagation(); navigate(`/view/${item}`); }}
                                                className="opacity-0 group-hover/item:opacity-100 transition-opacity p-1.5 hover:bg-accent/10 rounded-lg text-accent"
                                                title="View Resource"
                                            >
                                                📖
                                            </button>
                                        </div>
                                    ))}
                                </div>
                                {/* Decorative Pattern */}
                                <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-[0.03] rotate-12 transition-opacity duration-1000 pointer-events-none">
                                    <span className="text-9xl font-black uppercase select-none">{section.title[0]}</span>
                                </div>
                            </div>

                            {/* Action Footer */}
                            <div className="px-12 py-6 bg-black/30 border-t border-white/5 flex justify-center group-hover:bg-accent/10 transition-colors duration-500">
                                <button
                                    onClick={() => alert(`Redirecting to ${section.title} specific IP portal...`)}
                                    className="flex items-center gap-4 text-xs font-black uppercase tracking-[0.4em] text-[#90caf9] hover:text-white transition-all group/btn"
                                >
                                    <span className="transition-all duration-700 group-hover/btn:scale-150 group-hover/btn:rotate-[45deg]">📚</span>
                                    <span className="relative overflow-hidden inline-block group-hover:scale-105 transition-all">
                                        Access IP Portal
                                        <span className="absolute bottom-0 left-0 w-full h-[2px] bg-currentColor translate-x-[-105%] group-hover/btn:translate-x-0 transition-transform duration-700"></span>
                                    </span>
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.main>

            {/* Footer Branding */}
            <footer className="py-20 px-[5%] bg-ndl-dark border-t border-white/10 mt-auto">
                <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row justify-between items-center gap-12">
                    
                    <div className="text-gray-500 text-[10px] font-black tracking-[0.4em] uppercase text-center lg:text-right">
                        Digitizing IP Knowledge &copy; 2026 NDLI Platform
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default PatentsAndStandards;
