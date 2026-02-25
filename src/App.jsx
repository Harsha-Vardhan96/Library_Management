import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import AdminDashboard from './components/AdminDashboard';
import JudicialResources from './components/JudicialResources';
import SchoolEducation from './components/SchoolEducation';
import ResearchResources from './components/ResearchResources';
import SearchResults from './components/SearchResults';
import PatentsAndStandards from './components/PatentsAndStandards';
import HigherEducation from './components/HigherEducation';
import CareerDevelopment from './components/CareerDevelopment';
import CulturalArchives from './components/CulturalArchives';
import NewspaperArchives from './components/NewspaperArchives';
import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [username, setUsername] = useState('');

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <ThemeProvider>
      <LanguageProvider>
        <Router>
          <div className={`min-h-screen transition-colors duration-300 bg-bg-light ${isDarkMode ? 'dark' : ''}`}>
            <Routes>
              <Route
                path="/"
                element={<Login toggleTheme={toggleTheme} isDarkMode={isDarkMode} setUsername={setUsername} />}
              />
              <Route
                path="/login"
                element={<Login toggleTheme={toggleTheme} isDarkMode={isDarkMode} setUsername={setUsername} />}
              />
              <Route
                path="/signup"
                element={<Signup toggleTheme={toggleTheme} isDarkMode={isDarkMode} setUsername={setUsername} />}
              />
              <Route
                path="/dashboard"
                element={<Dashboard toggleTheme={toggleTheme} isDarkMode={isDarkMode} toggleFullScreen={toggleFullScreen} username={username} />}
              />
              <Route
                path="/admin-dashboard"
                element={<AdminDashboard toggleTheme={toggleTheme} isDarkMode={isDarkMode} toggleFullScreen={toggleFullScreen} username={username} />}
              />
              <Route
                path="/judicial-resources"
                element={<JudicialResources toggleTheme={toggleTheme} isDarkMode={isDarkMode} toggleFullScreen={toggleFullScreen} />}
              />
              <Route
                path="/school-education"
                element={<SchoolEducation toggleTheme={toggleTheme} isDarkMode={isDarkMode} toggleFullScreen={toggleFullScreen} />}
              />
              <Route
                path="/research-resources"
                element={<ResearchResources toggleTheme={toggleTheme} isDarkMode={isDarkMode} toggleFullScreen={toggleFullScreen} />}
              />
              <Route
                path="/search"
                element={<SearchResults toggleTheme={toggleTheme} isDarkMode={isDarkMode} toggleFullScreen={toggleFullScreen} />}
              />
              <Route
                path="/patents-and-standards"
                element={<PatentsAndStandards toggleTheme={toggleTheme} isDarkMode={isDarkMode} toggleFullScreen={toggleFullScreen} />}
              />
              <Route
                path="/higher-education"
                element={<HigherEducation toggleTheme={toggleTheme} isDarkMode={isDarkMode} toggleFullScreen={toggleFullScreen} />}
              />
              <Route
                path="/career-development"
                element={<CareerDevelopment toggleTheme={toggleTheme} isDarkMode={isDarkMode} toggleFullScreen={toggleFullScreen} />}
              />
              <Route
                path="/cultural-archives"
                element={<CulturalArchives toggleTheme={toggleTheme} isDarkMode={isDarkMode} toggleFullScreen={toggleFullScreen} />}
              />
              <Route
                path="/newspaper-archives"
                element={<NewspaperArchives toggleTheme={toggleTheme} isDarkMode={isDarkMode} toggleFullScreen={toggleFullScreen} />}
              />
            </Routes>
          </div>
        </Router>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
