import { useEffect } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';

function App() {
  useEffect(() => {
    // Refresh ScrollTrigger on route change
    ScrollTrigger.refresh();
    
    return () => {
      // Kill all ScrollTriggers on unmount
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <HashRouter>
      <div className="relative">
        {/* Paper grain overlay */}
        <div className="paper-grain" />
        
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/menu" element={<MenuPage />} />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
