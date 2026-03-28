import React, { useState } from 'react';
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
import ResourceViewer from './components/ResourceViewer';
import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  const [username, setUsername] = useState('');

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


  return (
    <ThemeProvider>
      <LanguageProvider>
        <Router>
          <div className="min-h-screen transition-colors duration-300 bg-bg-light">
            <Routes>
              <Route
                path="/"
                element={<Login setUsername={setUsername} />}
              />
              <Route
                path="/login"
                element={<Login setUsername={setUsername} />}
              />
              <Route
                path="/signup"
                element={<Signup setUsername={setUsername} />}
              />
              <Route
                path="/dashboard"
                element={<Dashboard toggleFullScreen={toggleFullScreen} username={username} />}
              />
              <Route
                path="/admin-dashboard"
                element={<AdminDashboard toggleFullScreen={toggleFullScreen} username={username} />}
              />
              <Route
                path="/judicial-resources"
                element={<JudicialResources toggleFullScreen={toggleFullScreen} />}
              />
              <Route
                path="/school-education"
                element={<SchoolEducation toggleFullScreen={toggleFullScreen} />}
              />
              <Route
                path="/research-resources"
                element={<ResearchResources toggleFullScreen={toggleFullScreen} />}
              />
              <Route
                path="/search"
                element={<SearchResults toggleFullScreen={toggleFullScreen} />}
              />
              <Route
                path="/patents-and-standards"
                element={<PatentsAndStandards toggleFullScreen={toggleFullScreen} />}
              />
              <Route
                path="/higher-education"
                element={<HigherEducation toggleFullScreen={toggleFullScreen} />}
              />
              <Route
                path="/career-development"
                element={<CareerDevelopment toggleFullScreen={toggleFullScreen} />}
              />
              <Route
                path="/cultural-archives"
                element={<CulturalArchives toggleFullScreen={toggleFullScreen} />}
              />
              <Route
                path="/newspaper-archives"
                element={<NewspaperArchives toggleFullScreen={toggleFullScreen} />}
              />
              <Route
                path="/view/:id"
                element={<ResourceViewer toggleFullScreen={toggleFullScreen} />}
              />
            </Routes>
          </div>
        </Router>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
