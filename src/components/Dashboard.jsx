import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';
import InfiniteCarousel from './InfiniteCarousel';

const Dashboard = ({ toggleTheme, isDarkMode, toggleFullScreen, username }) => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [placeholder, setPlaceholder] = useState('Search for "Machine Learning"');
  const cardsWrapperRef = useRef(null);
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

  const scrollCarousel = (direction) => {
    if (cardsWrapperRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      cardsWrapperRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const scrollToExplore = () => {
    if (exploreRef.current) {
      exploreRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-bg-light transition-colors duration-500">
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
          <LanguageSwitcher isDark={true} />
        </div>
        <div className="flex items-center gap-6">
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
      <header className="z-[1000] sticky top-10 flex justify-center items-center py-5 px-[5%] bg-white/80 dark:bg-ndl-dark/80 backdrop-blur-xl border-b border-border-color/50 dark:border-white/5 shadow-sm transition-all duration-300">
        <nav className="flex items-center gap-4 md:gap-12 px-8 py-3 bg-white/90 dark:bg-gray-800/90 border border-border-color shadow-sm rounded-full transition-all hover:shadow-md dark:border-white/10">
          <button
            onClick={scrollToExplore}
            className="text-sm font-black tracking-widest uppercase cursor-pointer text-gray-900 dark:text-white hover:text-accent transition-colors"
          >
            {t('explore')}
          </button>
          <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse"></span>
          <button
            onClick={() => navigate('/judicial-resources')}
            className="text-sm font-black tracking-widest uppercase cursor-pointer text-gray-900 dark:text-white hover:text-accent transition-colors"
          >
            {t('resources')}
          </button>
          <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse delay-75"></span>
          <button
            onClick={() => navigate('/school-education')}
            className="text-sm font-black tracking-widest uppercase cursor-pointer text-gray-900 dark:text-white hover:text-accent transition-colors"
          >
            {t('courses')}
          </button>
        </nav>
      </header>


      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center min-h-[550px] px-[5%] py-20 text-center overflow-hidden">
        {/* Animated Background Canvas */}
        <div className="bg-shape shape-1 animate-float opacity-40 dark:opacity-20"></div>
        <div className="bg-shape shape-2 animate-float opacity-40 dark:opacity-20"></div>

        <div className="relative z-10 w-full max-w-5xl">
          <h1 className="mb-6 text-5xl font-black leading-tight tracking-tighter md:text-8xl text-text-dark animate-fadeInDown drop-shadow-sm">
            {t('heroTitlePrimary')} <span className="text-accent underline decoration-primary/20 transition-all hover:decoration-accent/40">{t('heroTitleSecondary')}</span>
          </h1>
          <p className="max-w-2xl mx-auto mb-12 text-lg md:text-2xl text-text-gray font-medium animate-fadeInUp leading-relaxed">
            {t('heroSubtitle')}
          </p>

          <div className="flex flex-col md:flex-row items-stretch w-full max-w-3xl mx-auto bg-white dark:bg-gray-800 shadow-2xl rounded-2xl animate-popIn border border-border-color dark:border-white/5 group ring-0 focus-within:ring-4 ring-accent/10 transition-all duration-500">
            <div className="relative flex-1 flex items-center">
              <span className="absolute left-5 text-xl opacity-30 group-focus-within:opacity-100 transition-opacity">🔍</span>
              <input
                type="text"
                placeholder={t('searchPlaceholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && searchTerm && navigate(`/search?q=${searchTerm}`)}
                className="w-full px-14 py-5 text-xl outline-none text-white bg-transparent placeholder-white/50"
              />
            </div>
            <button
              type="button"
              onClick={() => searchTerm && navigate(`/search?q=${searchTerm}`)}
              className="px-10 py-5 font-black text-white transition-all bg-accent hover:bg-orange-600 hover:scale-[1.02] active:scale-95 shadow-lg shadow-accent/20"
            >
              {t('searchButton')}
            </button>
          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-4 text-xs font-bold uppercase tracking-widest text-text-gray animate-fadeInUp delay-300">
            <span className="py-2">{t('popular')}</span>
            <button
              onClick={() => navigate('/search?q=Computer Science')}
              className="px-4 py-2 bg-white/50 dark:bg-white/5 rounded-full border border-border-color hover:bg-accent hover:text-white transition-all active:scale-95"
            >
              Computer Science
            </button>
            <button
              onClick={() => navigate('/search?q=Law')}
              className="px-4 py-2 bg-white/50 dark:bg-white/5 rounded-full border border-border-color hover:bg-accent hover:text-white transition-all active:scale-95"
            >
              Law
            </button>
            <button
              onClick={() => navigate('/search?q=Chemistry')}
              className="px-4 py-2 bg-white/50 dark:bg-white/5 rounded-full border border-border-color hover:bg-accent hover:text-white transition-all active:scale-95"
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
                  else if (cat.id === 'patents') navigate('/patents');
                  else if (cat.id === 'higher') navigate('/higher-education');
                  else if (cat.id === 'career') navigate('/career');
                  else if (cat.id === 'cultural') navigate('/culture');
                  else if (cat.id === 'news') navigate('/newspapers');
                }}
                className="min-w-[340px] bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] flex flex-col transition-all duration-500 hover:-translate-y-6 hover:shadow-[0_40px_80px_rgba(0,0,0,0.18)] relative dark:bg-gray-800 border border-transparent dark:border-white/5 overflow-hidden group cursor-pointer"
              >
                <div
                  className="h-44 bg-center bg-cover relative flex items-center justify-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url(${cat.bg})` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                  <span className="relative z-10 text-xs font-black text-white uppercase tracking-[0.2em] drop-shadow-lg">{t(cat.id)}</span>
                </div>

                <div className="absolute top-36 left-1/2 -translate-x-1/2 w-20 h-20 bg-white dark:bg-gray-700 rounded-2xl shadow-xl flex items-center justify-center text-4xl z-10 border-4 border-white dark:border-gray-800 transition-all duration-500 group-hover:rotate-12 group-hover:scale-110">
                  {cat.icon}
                </div>

                <div className="flex-1 px-8 pt-16 pb-8 bg-white dark:bg-gray-800">
                  <ul className="space-y-3">
                    {cat.items.map((item, idx) => (
                      <li key={idx} className="text-sm border-b border-gray-100 dark:border-white/5 last:border-none pb-3 flex items-center justify-between text-text-dark dark:text-gray-300 transition-colors hover:text-accent font-medium group/item text-left">
                        <div className="flex items-center gap-3">
                          <span className="w-1.5 h-1.5 bg-accent rounded-full"></span> {item}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="px-8 py-5 border-t border-gray-50 dark:border-white/5 bg-gray-50/50 dark:bg-black/20 flex justify-center group-hover:bg-accent group-hover:text-white transition-all duration-500">
                  <button className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2 group-hover:translate-x-2 transition-transform">
                    {t('openCategory') || 'Open Category'} ➔
                  </button>
                </div>
              </div>
            ))}
          </InfiniteCarousel>
        </div>
      </div>

      <section className="py-20 px-[5%] bg-white dark:bg-gray-800/80 border-y border-border-color dark:border-white/5 animate-fadeInUp">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-sm font-black text-accent uppercase tracking-[0.4em] mb-4">Community Engagement</h2>
          <h1 className="text-4xl font-black text-text-dark mb-10 tracking-tighter">Your feedback helps us <span className="italic">grow</span></h1>
          <div className="flex flex-col md:flex-row gap-6">
            <input
              type="text"
              placeholder="Tell us what you're looking for..."
              className="flex-1 px-8 py-5 bg-gray-50 dark:bg-black/20 border border-border-color dark:border-white/5 focus:border-accent rounded-2xl outline-none text-text-dark transition-all"
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
            <div className="mt-10 flex gap-6 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-500 overflow-visible">
              <img src="https://ndl.iitkgp.ac.in/assets/images/Ministry_Of_Education.png" alt="MOE" className="h-16" />
              <img src="https://ndl.iitkgp.ac.in/assets/images/iit-kgp.png" alt="IIT KGP" className="h-16" />
            </div>
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
