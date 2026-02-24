import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const SearchResults = ({ toggleTheme, isDarkMode }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const initialQuery = queryParams.get('q') || '';

    const [searchTerm, setSearchTerm] = useState(initialQuery);
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Set loading when query changes
        setLoading(true);

        const mockAllResources = [
            { id: 1, title: 'Introduction to Quantum Mechanics', author: 'Dr. Sarah Smith', type: 'Book', source: 'IIT Madras', year: '2022', category: 'Research' },
            { id: 2, title: 'Constitutional Law of India - Volume 1', author: 'Justice Rahul Verma', type: 'Judgement', source: 'Supreme Court', year: '2021', category: 'Judicial' },
            { id: 3, title: 'Class 10 Mathematics NCERT', author: 'NCERT Board', type: 'Textbook', source: 'School Education', year: '2023', category: 'School' },
            { id: 4, title: 'Machine Learning Basics', author: 'Prof. Amit Shah', type: 'Courseware', source: 'NPTEL', year: '2020', category: 'Higher Education' },
            { id: 5, title: 'Ancient Indian History', author: 'Dr. Meera Bai', type: 'Thesis', source: 'Jawaharlal Nehru University', year: '2019', category: 'Research' },
            { id: 6, title: 'Criminal Procedure Code - 2023 Update', author: 'Legislative Dept', type: 'Laws/Acts', source: 'Ministry of Law', year: '2023', category: 'Judicial' },
            { id: 7, title: 'Organic Chemistry Lab Manual', author: 'IIT Delhi', type: 'Manual', source: 'IIT Delhi', year: '2022', category: 'Higher Education' },
            { id: 8, title: 'English Literature: The Victorian Era', author: 'British Council', type: 'Article', source: 'DU Archive', year: '2018', category: 'School' },
        ];

        // Simulate API call
        const timer = setTimeout(() => {
            const filteredResults = mockAllResources.filter(res =>
                res.title.toLowerCase().includes(initialQuery.toLowerCase()) ||
                res.author.toLowerCase().includes(initialQuery.toLowerCase()) ||
                res.category.toLowerCase().includes(initialQuery.toLowerCase())
            );
            setResults(filteredResults);
            setLoading(false);
        }, 800);

        return () => clearTimeout(timer);
    }, [initialQuery]);

    const handleSearch = (e) => {
        if (e.key === 'Enter' || e.type === 'click') {
            navigate(`/search?q=${searchTerm}`);
        }
    };

    return (
        <div className="flex flex-col w-full min-h-screen bg-[#f8fafc] dark:bg-ndl-dark transition-colors duration-500">
            {/* Top Utility Bar */}
            <div className="z-[1050] bg-ndl-dark text-white flex justify-between px-[5%] py-2.5 text-xs font-bold tracking-widest uppercase sticky top-0 border-b border-white/5 backdrop-blur-md shadow-xl">
                <div className="flex items-center gap-6">
                    <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2 hover:text-accent transition-colors">
                        🏠 Dashboard
                    </button>
                    <div className="h-4 w-px bg-white/10"></div>
                    <button onClick={toggleTheme} className="flex items-center gap-2 hover:text-accent transition-colors">
                        {isDarkMode ? '☀️' : '🌙'} {isDarkMode ? 'Light' : 'Dark'} Mode
                    </button>
                </div>
                <div className="flex items-center gap-4">
                    <span className="opacity-60">Search Results</span>
                </div>
            </div>

            <div className="flex flex-1 max-w-[1600px] mx-auto w-full px-[5%] py-12 gap-12">
                {/* Sidebar Filters */}
                <aside className="w-72 hidden lg:flex flex-col gap-8 shrink-0">
                    <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-sm border border-border-color dark:border-white/5">
                        <h3 className="text-xs font-black uppercase tracking-[0.3em] mb-6 text-accent">Filters</h3>

                        <div className="space-y-8">
                            <div>
                                <label className="block text-[10px] font-black uppercase tracking-widest text-text-gray mb-4">Resource Type</label>
                                {['Book', 'Article', 'Thesis', 'Video', 'Dataset'].map(type => (
                                    <label key={type} className="flex items-center gap-3 mb-3 cursor-pointer group">
                                        <input type="checkbox" className="w-4 h-4 rounded border-border-color text-accent focus:ring-0" />
                                        <span className="text-sm font-medium text-text-dark/80 group-hover:text-accent transition-colors">{type}</span>
                                    </label>
                                ))}
                            </div>

                            <div>
                                <label className="block text-[10px] font-black uppercase tracking-widest text-text-gray mb-4">Source Organization</label>
                                {['IIT Madras', 'Supreme Court', 'NCERT', 'NPTEL', 'UGC'].map(org => (
                                    <label key={org} className="flex items-center gap-3 mb-3 cursor-pointer group">
                                        <input type="checkbox" className="w-4 h-4 rounded border-border-color text-accent focus:ring-0" />
                                        <span className="text-sm font-medium text-text-dark/80 group-hover:text-accent transition-colors">{org}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Search Results Area */}
                <main className="flex-1 min-w-0">
                    {/* Header & Refinement Bar */}
                    <div className="mb-12">
                        <h1 className="text-4xl font-black text-text-dark tracking-tighter mb-8">
                            Showing Results for <span className="text-accent underline decoration-primary/20 italic">"{initialQuery}"</span>
                        </h1>

                        <div className="bg-white dark:bg-gray-800 p-2 shadow-2xl rounded-2xl flex border border-border-color dark:border-white/5">
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onKeyDown={handleSearch}
                                placeholder="Search again..."
                                className="flex-1 bg-transparent px-8 py-4 text-lg outline-none text-text-dark font-medium"
                            />
                            <button
                                onClick={handleSearch}
                                className="bg-primary hover:bg-[#004d40] text-white px-10 rounded-xl font-black uppercase tracking-widest text-xs transition-all active:scale-95"
                            >
                                Search
                            </button>
                        </div>
                    </div>

                    {/* Results Grid/List */}
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-32 animate-pulse">
                            <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin mb-6"></div>
                            <p className="text-text-gray font-bold tracking-widest uppercase text-xs">Fetching Knowledge...</p>
                        </div>
                    ) : results.length > 0 ? (
                        <div className="grid grid-cols-1 gap-6 animate-fadeInUp">
                            {results.map((res, idx) => (
                                <div key={res.id} className="group bg-white dark:bg-gray-800 p-8 rounded-3xl border border-transparent hover:border-accent/20 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                                    <div className="flex gap-6 items-center">
                                        <div className="w-16 h-16 bg-gray-50 dark:bg-black/20 rounded-2xl flex items-center justify-center text-3xl shadow-inner group-hover:scale-110 group-hover:rotate-6 transition-transform">
                                            {res.type === 'Book' || res.type === 'Textbook' ? '📖' : res.type === 'Judgement' ? '⚖️' : res.type === 'Courseware' ? '💻' : '📄'}
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-3 mb-1">
                                                <span className="text-[10px] font-black uppercase tracking-widest text-accent bg-accent/5 px-2 py-0.5 rounded-full">{res.category}</span>
                                                <span className="text-[10px] font-black uppercase tracking-widest text-primary/60">{res.type} • {res.year}</span>
                                            </div>
                                            <h3 className="text-xl font-black text-text-dark tracking-tight mb-1 group-hover:text-primary transition-colors">{res.title}</h3>
                                            <p className="text-sm text-text-gray font-semibold">by {res.author} • <span className="italic">{res.source}</span></p>
                                        </div>
                                    </div>
                                    <div className="flex gap-3 w-full md:w-auto">
                                        <button className="flex-1 md:flex-none px-6 py-3 bg-gray-50 dark:bg-black/20 text-text-dark dark:text-gray-300 rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-primary hover:text-white transition-all active:scale-95 border border-border-color dark:border-white/5">
                                            View Online
                                        </button>
                                        <button className="flex-1 md:flex-none px-6 py-3 bg-accent text-white rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-orange-600 transition-all active:scale-95 shadow-lg shadow-accent/20">
                                            Download 📥
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-32 bg-white dark:bg-gray-800/50 rounded-[3rem] border-2 border-dashed border-border-color dark:border-white/5 animate-popIn">
                            <div className="text-6xl mb-6 opacity-30">🔍</div>
                            <h2 className="text-2xl font-black text-text-dark mb-4 tracking-tight">No resources matched your search</h2>
                            <p className="text-text-gray max-w-sm mx-auto font-medium">Try checking your spelling or using more general terms like "Science" or "Law".</p>
                            <button
                                onClick={() => navigate('/dashboard')}
                                className="mt-10 px-8 py-4 bg-primary text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:scale-105 transition-all shadow-xl"
                            >
                                Return to Dashboard
                            </button>
                        </div>
                    )}
                </main>
            </div>

            <footer className="py-12 px-[5%] bg-white dark:bg-ndl-dark border-t border-border-color dark:border-white/5 mt-auto">
                <div className="max-w-[1400px] mx-auto text-center">
                    <div className="flex justify-center gap-10 grayscale opacity-30 mb-8">
                        <img src="https://ndl.iitkgp.ac.in/assets/images/Ministry_Of_Education.png" alt="MOE" className="h-10" />
                        <img src="https://ndl.iitkgp.ac.in/assets/images/iit-kgp.png" alt="IIT KGP" className="h-10" />
                    </div>
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-text-gray">© 2026 National Digital Library of India</p>
                </div>
            </footer>
        </div>
    );
};

export default SearchResults;
