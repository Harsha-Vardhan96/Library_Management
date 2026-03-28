import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import ProfessionalBackground from './ProfessionalBackground';

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const itemVariants = { hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } } };

const JudicialResources = ({ toggleFullScreen }) => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');

    const sections = [
        {
            title: 'Court Judgments',
            icon: '⚖️',
            items: [
                { name: 'Supreme Court of India', count: '50,000+' },
                { name: 'High Courts (State-wise)', count: '1.2M+' },
                { name: 'District Courts', count: '5M+' },
                { name: 'Consumer Forums', count: '200,000+' }
            ]
        },
        {
            title: 'Laws & Acts',
            icon: '📜',
            items: [
                { name: 'Central Acts (1836-2024)', count: '2,500+' },
                { name: 'State Acts & Rules', count: '15,000+' },
                { name: 'Constitutional Provisions', count: '450+' },
                { name: 'Ordinances & Gazettes', count: '25,000+' }
            ]
        },
        {
            title: 'Legal Research',
            icon: '🔍',
            items: [
                { name: 'Law Commission Reports', count: '280+' },
                { name: 'Legal Glossaries', count: '10,000 terms' },
                { name: 'Constituent Assembly Debates', count: '12 Vols' },
                { name: 'Historical Legal Archives', count: 'By-laws' }
            ]
        }
    ];

    return (
        <div className="flex flex-col w-full min-h-screen bg-ndl-dark transition-colors duration-500 relative">
            <ProfessionalBackground />
            {/* Top Utility Bar */}
            <div className="z-[1050] bg-gradient-to-r from-[#1b5e20] to-[#1b3022] text-white flex justify-between px-[5%] py-2.5 text-xs font-semibold tracking-wide sticky top-0 border-b border-white/5 backdrop-blur-sm shadow-lg">
                <div className="flex items-center gap-6">
                    <button className="flex items-center gap-2 opacity-90 hover:opacity-100 hover:text-accent transition-all group p-1">
                        <span className="text-sm group-hover:scale-110 transition-transform">⚖️</span>
                        <span className="hidden sm:inline">Legal Terminal</span>
                    </button>
                    <div className="h-3 w-px bg-white/10"></div>
                    <button className="flex items-center gap-2 opacity-70 hover:opacity-100 hover:text-accent transition-colors">
                        <span>🏛️</span>
                        <span className="hidden sm:inline">Courts Directory</span>
                    </button>
                </div>
                <div className="flex items-center gap-6">
                    <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2 opacity-90 hover:opacity-100 hover:text-accent transition-all group p-1">
                        <span className="text-sm group-hover:-translate-x-1 transition-transform text-white">⬅️</span>
                        <span className="hidden sm:inline text-white">Back to Dashboard</span>
                    </button>
                    <button onClick={toggleFullScreen} className="flex items-center gap-2 opacity-90 hover:opacity-100 hover:text-accent transition-all group p-1">
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
                            Judicial <span className="text-accent underline decoration-primary/20 transition-all">Resources</span>
                        </h1>
                    </div>

                    {/* Legal Search Bar */}
                    <div className="w-full max-w-5xl relative group mb-12 animate-fadeInUp">
                        <div className="absolute inset-x-0 -bottom-2 h-4 bg-black/5 blur-2xl rounded-full scale-95 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div className="relative bg-gray-800 border-2 border-transparent focus-within:border-accent shadow-2xl rounded-[1.5rem] flex p-1 transition-all duration-500 overflow-hidden">
                            <div className="px-8 flex items-center border-r border-white/5 bg-gray-900/20">
                                <span className="text-xs font-black uppercase tracking-widest text-[#4caf50] flex items-center gap-3">
                                    ⚖️ Case Lex
                                </span>
                            </div>
                            <input
                                type="text"
                                placeholder="Search by Case No., Bench, Petitioner, Respondent or Act..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && searchTerm && navigate(`/search?q=${searchTerm}`)}
                                className="flex-1 bg-transparent px-8 py-5 outline-none font-semibold text-white placeholder-white/30 text-lg"
                            />
                            <button
                                onClick={() => searchTerm && navigate(`/search?q=${searchTerm}`)}
                                className="bg-[#2e7d32] hover:bg-[#1b5e20] text-white px-12 rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-xl active:scale-95 shadow-primary/30"
                            >
                                Search
                            </button>
                        </div>
                        <div className="mt-4 flex justify-center gap-6 text-[10px] font-black uppercase tracking-widest text-gray-400">
                            <span onClick={() => alert('Opening Supreme Court Case Finder...')} className="cursor-pointer hover:text-accent transition-colors">Supreme Court</span>
                            <span className="w-1 h-1 bg-gray-600 rounded-full my-auto"></span>
                            <span onClick={() => alert('Opening Acts & Statutes repository...')} className="cursor-pointer hover:text-accent transition-colors">Acts & Statutes</span>
                            <span className="w-1 h-1 bg-gray-600 rounded-full my-auto"></span>
                            <span onClick={() => alert('Opening Legal Glossary...')} className="cursor-pointer hover:text-accent transition-colors">Legal Glossary</span>
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
                <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-10">
                    {sections.map((section, idx) => (
                        <motion.div
                            key={idx}
                            variants={itemVariants}
                            whileHover={{ y: -10, transition: { duration: 0.2 } }}
                            className="group bg-gray-800/95 backdrop-blur-2xl rounded-[3rem] shadow-[0_60px_120px_rgba(0,0,0,0.3)] border border-white/10 flex flex-col overflow-hidden transition-colors duration-500 hover:border-accent/50"
                        >
                            <div className="px-10 py-10 flex-1">
                                <div className="flex items-center justify-between mb-10">
                                    <div className="w-16 h-16 bg-black/20 rounded-2xl flex items-center justify-center text-4xl shadow-inner group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                                        {section.icon}
                                    </div>
                                    <h2 className="text-xl font-black tracking-tight text-white">{section.title}</h2>
                                </div>

                                <div className="space-y-6">
                                    {section.items.map((item, itemIdx) => (
                                        <div
                                            key={itemIdx}
                                            className="group/item flex items-center justify-between text-sm text-gray-100 font-semibold transition-all duration-300 hover:translate-x-1"
                                        >
                                            <div
                                                className="flex items-center gap-3 cursor-pointer hover:text-accent"
                                                onClick={() => navigate(`/view/${item.name}`)}
                                            >
                                                <div className="w-1.5 h-1.5 rounded-full bg-accent/40 group-hover/item:bg-accent transition-all"></div>
                                                <span>{item.name}</span>
                                            </div>
                                            <span className="text-[10px] bg-white/5 px-2 py-0.5 rounded text-gray-500 font-black">{item.count}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="px-8 py-4 bg-black/10 border-t border-white/5 flex justify-center group-hover:bg-accent/5 transition-colors duration-500">
                                <button
                                    onClick={() => navigate(`/view/${section.title}`)}
                                    className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#4caf50] hover:text-white transition-all group/btn"
                                >
                                    <span className="transition-all duration-500 group-hover/btn:scale-150 group-hover/btn:rotate-12">📚</span>
                                    <span className="relative overflow-hidden inline-block">
                                        Open Archive
                                        <span className="absolute bottom-0 left-0 w-full h-[1px] bg-current translate-x-[-105%] group-hover/btn:translate-x-0 transition-transform duration-500"></span>
                                    </span>
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.main>

            {/* Footer Branding */}
            <footer className="py-12 px-[5%] bg-ndl-dark border-t border-white/5">
                <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                    
                    <div className="text-gray-500 text-[10px] font-black tracking-[0.4em] uppercase">
                        Preserving the Rule of Law &copy; 2026 NDLI Platform
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default JudicialResources;
