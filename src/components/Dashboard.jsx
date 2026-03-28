import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import LanguageSwitcher from './LanguageSwitcher';
import InfiniteCarousel from './InfiniteCarousel';
import MagicRingsBackground from './MagicRingsBackground';
import ThemeToggle from './ThemeToggle';

const Dashboard = ({ toggleFullScreen, username }) => {
  const { t } = useLanguage();
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [placeholder, setPlaceholder] = useState('Search for "Machine Learning"');
  const exploreRef = useRef(null);

  const categories = [
    { id: 'judicial', name: 'JUDICIAL RESOURCES', bg: 'https://ndl.iitkgp.ac.in/assets/images/landing_page/law_bg.jpg', icon: '⚖️', items: ['Content Providers', 'Resource Types', 'Case Types', 'Laws/Acts', 'Jurisdictions'] },
    { id: 'patents', name: 'PATENTS & STANDARDS', bg: 'https://ndl.iitkgp.ac.in/assets/images/landing_page/patents_bg.jpg', icon: '📜', items: ['CPC Classification', 'Jurisdictions', 'Resource Types', 'Issuing Authority', 'Languages'] },
    { id: 'school', name: 'SCHOOL EDUCATION', bg: 'https://ndl.iitkgp.ac.in/assets/images/landing_page/school_bg.jpg', icon: '🏫', items: ['Educational Boards', 'Educational Levels', 'Subjects', 'Resource Types', 'Languages'] },
    { id: 'higher', name: 'HIGHER EDUCATION', bg: 'https://ndl.iitkgp.ac.in/assets/images/landing_page/higher_bg.jpg', icon: '🎓', items: ['Subjects', 'Resource Types', 'Educational Levels', 'Institutes', 'Languages'] },
    { id: 'research', name: 'RESEARCH', bg: 'https://ndl.iitkgp.ac.in/assets/images/landing_page/research_bg.jpg', icon: '🔬', items: ['Subjects', 'Resource Types', 'Institutes', 'Languages', 'Journals'] },
    { id: 'career', name: 'CAREER DEVELOPMENT', bg: 'https://ndl.iitkgp.ac.in/assets/images/landing_page/career_bg.jpg', icon: '💼', items: ['Examinations', 'Resource Types', 'Languages'] },
    { id: 'cultural', name: 'CULTURAL ARCHIVES', bg: 'https://ndl.iitkgp.ac.in/assets/images/landing_page/cultural_bg.jpg', icon: '🎭', items: ['Content Providers', 'Resource Types', 'Languages'] },
    { id: 'news', name: 'NEWSPAPER ARCHIVES', bg: 'https://ndl.iitkgp.ac.in/assets/images/landing_page/news_bg.jpg', icon: '📰', items: ['Content Providers', 'Countries', 'Languages', 'Newspapers'] },
  ];

  const stats = [
    { label: 'Million Resources', value: '104' },
    { label: 'Languages', value: '385' },
    { label: 'Thousand Institutes', value: '15' },
    { label: 'Million Users', value: '8' },
  ];

  useEffect(() => {
    const searchTerms = ['"Machine Learning"', '"CBSE Papers"', '"Constitution"', '"Quantum Computing"'];
    let termIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let timeout;

    const typeEffect = () => {
      const currentTerm = searchTerms[termIndex];

      if (isDeleting) {
        setPlaceholder('Search for ' + currentTerm.substring(0, charIndex - 1));
        charIndex--;
      } else {
        setPlaceholder('Search for ' + currentTerm.substring(0, charIndex + 1));
        charIndex++;
      }

      let typingSpeed = isDeleting ? 40 : 80;

      if (!isDeleting && charIndex === currentTerm.length) {
        typingSpeed = 2000;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        termIndex = (termIndex + 1) % searchTerms.length;
        typingSpeed = 500;
      }

      timeout = setTimeout(typeEffect, typingSpeed);
    };

    timeout = setTimeout(typeEffect, 1000);
    return () => clearTimeout(timeout);
  }, []);



  const scrollToExplore = () => {
    if (exploreRef.current) {
      exploreRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className={`flex flex-col w-full min-h-screen transition-colors duration-500 overflow-x-hidden relative ${isDark ? '' : 'bg-[#fffbf5]'}`}>
      <MagicRingsBackground />
      {/* Top Utility Bar */}
      <div className={`z-[1050] flex justify-between px-[5%] py-2.5 text-xs font-semibold tracking-wide sticky top-0 border-b backdrop-blur-sm transition-colors duration-500 ${isDark ? 'bg-gradient-to-r from-primary to-[#003f42] text-white border-primary/20' : 'bg-white/80 text-gray-800 border-gray-200 shadow-sm'}`}>
        <div className="flex items-center gap-6">
          <LanguageSwitcher />
        </div>
        <div className="flex items-center gap-6">
          <ThemeToggle />
          <Link to="/login" className="flex items-center gap-2 opacity-90 hover:opacity-100 hover:text-accent transition-all group p-1">
            <span className="text-sm group-hover:-translate-y-px transition-transform">👤</span>
            <span className="hidden sm:inline">{username || t('login')}</span>
          </Link>
          <button
            onClick={toggleFullScreen}
            className="flex items-center gap-2 opacity-90 hover:opacity-100 hover:text-accent transition-all group p-1"
          >
            <span className="text-sm group-hover:scale-110 transition-transform">⛶</span>
            <span className="hidden sm:inline">View Fullscreen</span>
          </button>
        </div>
      </div>

      {/* Modern Scrolling Header */}
      <header className="z-[1000] sticky top-10 flex justify-center items-center py-5 px-[5%] bg-ndl-dark/80 backdrop-blur-xl border-b border-white/5 shadow-sm transition-all duration-300">
        <nav className="flex items-center gap-4 md:gap-12 px-8 py-3 bg-gray-800/90 border border-white/10 shadow-sm rounded-full transition-all hover:shadow-md">
          <button
            onClick={scrollToExplore}
            className="text-sm font-black tracking-widest uppercase cursor-pointer text-white hover:text-accent transition-colors"
          >
            {t('explore')}
          </button>
          <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse"></span>
          <button
            onClick={() => navigate('/judicial-resources')}
            className="text-sm font-black tracking-widest uppercase cursor-pointer text-white hover:text-accent transition-colors"
          >
            {t('resources')}
          </button>
          <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse delay-75"></span>
          <button
            onClick={() => navigate('/school-education')}
            className="text-sm font-black tracking-widest uppercase cursor-pointer text-white hover:text-accent transition-colors"
          >
            {t('courses')}
          </button>
        </nav>
      </header>


      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center min-h-[600px] px-[5%] py-20 text-center">

        <div className="relative z-10 w-full max-w-5xl">
          <h1 className={`mb-6 text-5xl font-black leading-tight tracking-tighter md:text-8xl animate-fadeInDown drop-shadow-sm transition-colors duration-500 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {t('heroTitlePrimary')} <span className="text-accent underline decoration-primary/20 transition-all hover:decoration-accent/40">{t('heroTitleSecondary')}</span>
          </h1>
          <p className={`max-w-2xl mx-auto mb-12 text-lg md:text-2xl font-medium animate-fadeInUp leading-relaxed transition-colors duration-500 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            {t('heroSubtitle')}
          </p>

          <div className="relative flex flex-col md:flex-row items-stretch w-full max-w-4xl mx-auto bg-white/5 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.4)] rounded-2xl animate-popIn border border-white/20 group ring-0 focus-within:ring-4 ring-accent/30 transition-all duration-500 hover:shadow-[0_0_40px_rgba(255,109,0,0.15)] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-accent/0 via-accent/5 to-accent/0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none"></div>
            <div className="relative flex-1 flex items-center">
              <span className="absolute left-6 text-2xl opacity-40 group-focus-within:opacity-100 group-focus-within:text-accent transition-all duration-300">🔍</span>
              <input
                type="text"
                placeholder={placeholder || t('searchPlaceholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && searchTerm && navigate(`/search?q=${searchTerm}`)}
                className="w-full px-16 py-6 text-xl outline-none bg-transparent text-white placeholder-white/40 font-semibold"
              />
            </div>
            <button
              type="button"
              onClick={() => searchTerm && navigate(`/search?q=${searchTerm}`)}
              className="relative px-12 py-6 font-black tracking-widest uppercase text-white transition-all bg-accent hover:bg-orange-500 hover:scale-105 active:scale-95 shadow-xl shadow-accent/30 z-10"
            >
              {t('searchButton')}
            </button>
          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-4 text-xs font-bold uppercase tracking-widest text-text-gray animate-fadeInUp delay-300">
            <span className="py-2">{t('popular')}</span>
            <button
              onClick={() => navigate('/search?q=Computer Science')}
              className="px-4 py-2 bg-white/5 rounded-full border border-white/10 hover:bg-accent hover:text-white transition-all active:scale-95"
            >
              Computer Science
            </button>
            <button
              onClick={() => navigate('/search?q=Law')}
              className="px-4 py-2 bg-white/5 rounded-full border border-white/10 hover:bg-accent hover:text-white transition-all active:scale-95"
            >
              Law
            </button>
            <button
              onClick={() => navigate('/search?q=Chemistry')}
              className="px-4 py-2 bg-white/5 rounded-full border border-white/10 hover:bg-accent hover:text-white transition-all active:scale-95"
            >
              Chemistry
            </button>
          </div>
        </div>
      </section>

      {/* Cards Overlay Carousel */}
      <div className="z-20 w-full px-[5%] -mt-10 mb-24" ref={exploreRef}>
        <div className="relative w-full max-w-[1700px] mx-auto">
          <InfiniteCarousel speed={1.2} gap={40} className="py-12">
            {categories.map((cat) => (
              <div
                key={cat.id}
                onClick={() => {
                  if (cat.id === 'judicial') navigate('/judicial-resources');
                  else if (cat.id === 'school') navigate('/school-education');
                  else if (cat.id === 'research') navigate('/research-resources');
                  else if (cat.id === 'patents') navigate('/patents-and-standards');
                  else if (cat.id === 'higher') navigate('/higher-education');
                  else if (cat.id === 'career') navigate('/career-development');
                  else if (cat.id === 'cultural') navigate('/cultural-archives');
                  else if (cat.id === 'news') navigate('/newspaper-archives');
                }}
                className={`relative min-w-[340px] backdrop-blur-xl rounded-[2.5rem] flex flex-col transition-all duration-500 hover:-translate-y-6 hover:border-accent/40 overflow-hidden group cursor-pointer border ${
                  isDark
                    ? 'bg-white/5 border-white/10 shadow-[0_40px_80px_rgba(0,0,0,0.3)] hover:shadow-[0_20px_60px_rgba(255,109,0,0.2)]'
                    : 'bg-gray-800 border-gray-700 shadow-[0_20px_60px_rgba(0,0,0,0.35)] hover:shadow-[0_20px_60px_rgba(255,109,0,0.3)]'
                }`}
              >
                <div
                  className="h-44 bg-center bg-cover relative flex items-center justify-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url(${cat.bg})` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                  <span className="relative z-10 text-xs font-black text-white uppercase tracking-[0.2em] drop-shadow-lg">{t(cat.id)}</span>
                </div>

                <div className={`absolute top-36 left-1/2 -translate-x-1/2 w-20 h-20 rounded-2xl shadow-xl flex items-center justify-center text-4xl z-10 border-4 transition-all duration-500 group-hover:rotate-12 group-hover:scale-110 ${isDark ? 'bg-gray-700 border-gray-800' : 'bg-gray-900 border-gray-950'}`}>
                  {cat.icon}
                </div>

                <div className={`flex-1 px-8 pt-16 pb-8 transition-colors duration-300 ${isDark ? 'bg-transparent' : 'bg-gray-800'}`}>
                  <ul className="space-y-3">
                    {cat.items.map((item, idx) => (
                      <li
                        key={idx}
                        onClick={(e) => { e.stopPropagation(); navigate(`/view/${item}`); }}
                        className={`text-sm border-b last:border-none pb-3 flex items-center justify-between transition-all hover:text-accent font-semibold group/item text-left cursor-pointer hover:translate-x-1 ${isDark ? 'border-white/5 text-gray-300' : 'border-gray-600 text-gray-200'}`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-xs group-hover/item:scale-125 transition-transform">📖</span> {item}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={`px-8 py-5 border-t flex justify-center group-hover:bg-accent group-hover:text-white transition-all duration-500 ${isDark ? 'border-white/10 bg-black/30 text-gray-400' : 'border-gray-600 bg-gray-900 text-gray-300'}`}>
                  <button className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2 group-hover:translate-x-2 transition-transform">
                    {t('openCategory') || 'Open Category'} ➔
                  </button>
                </div>
              </div>
            ))}
          </InfiniteCarousel>
        </div>
      </div>

      <section className="py-20 px-[5%] bg-gray-800/80 border-y border-white/5 animate-fadeInUp">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-sm font-black text-accent uppercase tracking-[0.4em] mb-4">Community Engagement</h2>
          <h1 className="text-4xl font-black text-white mb-10 tracking-tighter">Your feedback helps us <span className="italic">grow</span></h1>
          <div className="flex flex-col md:flex-row gap-6">
            <input
              type="text"
              placeholder="Tell us what you're looking for..."
              className="flex-1 px-8 py-5 bg-black/20 border border-white/5 focus:border-accent rounded-2xl outline-none text-white transition-all"
            />
            <button
              onClick={() => alert('Thank you for your feedback!')}
              className="px-12 py-5 bg-ndl-dark text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-black transition-all shadow-xl active:scale-95"
            >
              Submit Feedback
            </button>
          </div>
        </div>
      </section>

      <section className="py-32 px-[5%] bg-ndl-dark relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent to-transparent opacity-30"></div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 max-w-[1400px] mx-auto relative z-10">
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center group p-10 rounded-3xl transition-all hover:bg-white/5">
              <div className="text-6xl md:text-8xl font-black text-accent mb-4 transition-all duration-500 group-hover:scale-110 group-hover:drop-shadow-[0_0_20px_rgba(255,109,0,0.5)]">
                {stat.value}<span className="text-3xl md:text-5xl opacity-50 ml-1">+</span>
              </div>
              <div className="text-sm md:text-base text-white/50 uppercase tracking-[0.3em] font-bold group-hover:text-white/100 transition-colors">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="py-24 px-[5%] bg-black text-white border-t border-white/5">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20">
          <div className="lg:col-span-2">
            <h2 className="text-4xl font-black mb-8 tracking-tighter">{t('ndliPortal')}</h2>
            <p className="text-gray-500 text-lg leading-relaxed max-w-lg">
              {t('footerDescription')}
            </p>

          </div>
          <div>
            <h4 className="text-xs font-black mb-8 uppercase tracking-[0.4em] text-accent">{t('navigation')}</h4>
            <ul className="space-y-4">
              <li><a className="text-gray-400 hover:text-white transition-colors cursor-pointer text-sm font-bold uppercase tracking-widest">{t('explore')}</a></li>
              <li><a className="text-gray-400 hover:text-white transition-colors cursor-pointer text-sm font-bold uppercase tracking-widest">Help Center</a></li>
              <li><a className="text-gray-400 hover:text-white transition-colors cursor-pointer text-sm font-bold uppercase tracking-widest">Partner List</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-black mb-8 uppercase tracking-[0.4em] text-accent">{t('commitment')}</h4>
            <ul className="space-y-4">
              <li><a className="text-gray-400 hover:text-white transition-colors cursor-pointer text-sm font-bold uppercase tracking-widest">Privacy Shield</a></li>
              <li><a className="text-gray-400 hover:text-white transition-colors cursor-pointer text-sm font-bold uppercase tracking-widest">Data Policy</a></li>
              <li><a className="text-gray-400 hover:text-white transition-colors cursor-pointer text-sm font-bold uppercase tracking-widest">Access Terms</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-32 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-gray-600 font-bold uppercase tracking-widest text-[10px]">
            {t('copyright')}
          </div>
          <div className="flex gap-8 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
            <span className="cursor-pointer hover:text-accent transition-colors">Facebook</span>
            <span className="cursor-pointer hover:text-accent transition-colors">Twitter</span>
            <span className="cursor-pointer hover:text-accent transition-colors">LinkedIn</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
