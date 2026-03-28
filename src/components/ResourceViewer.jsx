import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ResourceViewer = ({ toggleFullScreen }) => {
    const { id } = useParams();
    const navigate = useNavigate();

    return (
        <div className="flex flex-col w-full min-h-screen bg-ndl-dark transition-colors duration-500 overflow-hidden text-white">
            {/* Top Utility Bar */}
            <div className="z-[1050] bg-gradient-to-r from-primary to-[#003f42] text-white flex justify-between px-[5%] py-2.5 text-xs font-semibold tracking-wide sticky top-0 border-b border-primary/20 backdrop-blur-sm shadow-md">
                <div className="flex items-center gap-6">
                    <span className="font-bold tracking-widest opacity-80 uppercase">Preview Mode</span>
                </div>

                <div className="flex items-center gap-6">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 opacity-90 hover:opacity-100 hover:text-accent transition-all group p-1"
                    >
                        <span className="text-sm group-hover:-translate-x-1 transition-transform text-white">⬅️</span>
                        <span className="hidden sm:inline">Back to List</span>
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

            {/* Viewer Stage */}
            <main className="flex-1 flex items-center justify-center p-8 md:p-12 lg:p-16 relative">
                {/* Background Blobs */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-[100px] animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[100px] animate-pulse delay-1000"></div>

                {/* The "Blank Box" Placeholder */}
                <div className="relative w-full max-w-5xl aspect-[3/4] md:aspect-video bg-gray-800/80 backdrop-blur-2xl rounded-[3rem] shadow-[0_50px_100px_rgba(0,0,0,0.4)] border border-white/10 overflow-hidden flex flex-col animate-popIn">

                    {/* Interior Header/Toolbar */}
                    <div className="px-10 py-6 border-b border-white/5 flex items-center justify-between bg-black/20">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center text-2xl shadow-inner">
                                📖
                            </div>
                            <div>
                                <h2 className="text-lg font-black tracking-tight text-white uppercase leading-none">
                                    {id?.replace(/-/g, ' ') || 'Resource Document'}
                                </h2>
                                <p className="text-[10px] font-bold text-gray-500 tracking-[0.2em] mt-1">
                                    DOCUMENT PREVIEW • PAGE 1 OF 1
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="flex bg-white/5 rounded-xl p-1">
                                <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-700 transition-all text-sm opacity-50 hover:opacity-100">➖</button>
                                <div className="px-4 flex items-center text-[10px] font-black">100%</div>
                                <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-700 transition-all text-sm opacity-50 hover:opacity-100">➕</button>
                            </div>
                            <button className="w-10 h-10 flex items-center justify-center bg-primary text-white rounded-xl shadow-lg hover:scale-110 active:scale-95 transition-all">
                                📥
                            </button>
                        </div>
                    </div>

                    {/* The Blank Area (where pages will be) */}
                    <div className="flex-1 relative flex items-center justify-center p-12 overflow-hidden">
                        {/* Empty State Visual */}
                        <div className="relative z-10 text-center max-w-md animate-fadeInUp">
                            <div className="w-24 h-24 bg-gradient-to-br from-gray-700 to-gray-900 mx-auto rounded-3xl shadow-xl flex items-center justify-center text-4xl mb-8 border border-white/5 opacity-50">
                                📑
                            </div>
                            <h3 className="text-xl font-black text-white mb-4 tracking-tight">Blank Preview Container</h3>
                            <p className="text-sm font-medium text-gray-500 leading-relaxed">
                                This is a dedicated placeholder for your digital library resources. You can populate this area with PDFs, high-res images, or interactive reading modules.
                            </p>

                            {/* Decorative Lines simulating text */}
                            <div className="mt-10 space-y-3 opacity-10">
                                <div className="h-2 bg-white rounded-full w-full"></div>
                                <div className="h-2 bg-white rounded-full w-5/6 mx-auto"></div>
                                <div className="h-2 bg-white rounded-full w-4/6 mx-auto"></div>
                            </div>
                        </div>

                        {/* Subtle Grid Pattern */}
                        <div className="absolute inset-0 opacity-[0.05]"
                            style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '30px 30px' }}>
                        </div>
                    </div>

                    {/* Footer / Pagination Status */}
                    <div className="px-10 py-5 bg-black/20 border-t border-white/5 flex items-center justify-center gap-8">
                        <div className="flex items-center gap-4">
                            <button className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center opacity-30 cursor-not-allowed">◀</button>
                            <span className="text-[10px] font-black tracking-widest uppercase text-gray-500">Entry Stage • Initialization</span>
                            <button className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center opacity-30 cursor-not-allowed">▶</button>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer Branding */}
            <footer className="py-8 px-[5%] opacity-40 hover:opacity-100 transition-opacity">
                <div className="max-w-[1400px] mx-auto flex justify-between items-center">
                    <div className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500">
                        NDLI Digital Asset Viewer v1.0
                    </div>
                    <div className="flex gap-6">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">System Ready</span>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default ResourceViewer;
