import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${
        isScrolled || !isHomePage
          ? 'bg-cream-paper/95 backdrop-blur-sm py-4'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="w-full px-6 lg:px-12 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="font-display text-xl lg:text-2xl font-bold text-espresso tracking-tight hover:text-terracotta transition-colors"
        >
          Coffee Matters
        </Link>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          {isHomePage ? (
            <>
              <button
                onClick={() => scrollToSection('coffee')}
                className="font-mono text-xs uppercase tracking-widest text-espresso hover:text-terracotta transition-colors relative group"
              >
                Menu
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-terracotta transition-all duration-300 group-hover:w-full" />
              </button>
              <button
                onClick={() => scrollToSection('events')}
                className="font-mono text-xs uppercase tracking-widest text-espresso hover:text-terracotta transition-colors relative group"
              >
                Events
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-terracotta transition-all duration-300 group-hover:w-full" />
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="font-mono text-xs uppercase tracking-widest text-espresso hover:text-terracotta transition-colors relative group"
              >
                About
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-terracotta transition-all duration-300 group-hover:w-full" />
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="font-mono text-xs uppercase tracking-widest text-espresso hover:text-terracotta transition-colors relative group"
              >
                Contact
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-terracotta transition-all duration-300 group-hover:w-full" />
              </button>
            </>
          ) : (
            <>
              <Link
                to="/menu"
                className="font-mono text-xs uppercase tracking-widest text-espresso hover:text-terracotta transition-colors relative group"
              >
                Menu
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-terracotta transition-all duration-300 group-hover:w-full" />
              </Link>
              <Link
                to="/"
                className="font-mono text-xs uppercase tracking-widest text-espresso hover:text-terracotta transition-colors relative group"
              >
                Home
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-terracotta transition-all duration-300 group-hover:w-full" />
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden p-2 text-espresso">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M3 12h18M3 6h18M3 18h18" />
          </svg>
        </button>
      </div>
    </nav>
  );
}
