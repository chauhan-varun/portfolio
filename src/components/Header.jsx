import { useState, useEffect, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaMoon, FaSun, FaBars, FaTimes } from 'react-icons/fa';

const navLinks = [
  { label: 'Home', href: '#' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Contact', href: '#contact' },
];

// Wrapped in memo to prevent unnecessary re-renders
export default memo(function Header({ onToggleTheme, isDark }) {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Optimized scroll handler with throttling
    let lastScrollY = 0;
    let ticking = false;
    
    const onScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(currentScrollY > 20);
          const docHeight = document.documentElement.scrollHeight - window.innerHeight;
          setProgress((currentScrollY / docHeight) * 100);
          ticking = false;
          lastScrollY = currentScrollY;
        });
        
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <header className={`fixed top-0 left-0 w-full z-30 transition-all duration-500 ${scrolled ? 'bg-white/80 dark:bg-gray-900/80 shadow-lg backdrop-blur' : 'bg-transparent'}`}
      style={{ willChange: scrolled ? 'transform, opacity' : 'auto' }}
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <motion.a 
          href="#" 
          className="flex items-center" 
          initial={{ opacity: 0, y: -10 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.1, duration: 0.4 }}
          style={{ willChange: 'transform, opacity' }}
        >
          <img src="/image.png" alt="Logo" className="h-10 w-auto" />
        </motion.a>
        
        {/* Desktop Navigation */}
        <ul className="hidden md:flex gap-8 items-center">
          {navLinks.map((link, idx) => (
            <motion.li 
              key={link.href} 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.98 }}
              style={{ willChange: 'transform' }} 
            >
              <a href={link.href} className="relative px-2 py-1 font-semibold text-gray-700 dark:text-gray-200 group">
                <span className="group-hover:text-indigo-500 transition-colors duration-300">{link.label}</span>
                <span className="absolute left-0 -bottom-1 w-0 group-hover:w-full h-0.5 bg-indigo-500 transition-all duration-300"></span>
              </a>
            </motion.li>
          ))}
        </ul>
        
        {/* Mobile Menu Toggle */}
        <div className="flex items-center gap-4">
          <button 
            onClick={onToggleTheme} 
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-indigo-100 dark:hover:bg-indigo-900 transition-colors duration-300 focus:outline-none"
            style={{ willChange: 'transform' }}
          >
            <AnimatePresence mode="wait" initial={false}>
              {isDark ? (
                <motion.span 
                  key="moon" 
                  initial={{ rotate: -45, opacity: 0 }} 
                  animate={{ rotate: 0, opacity: 1 }} 
                  exit={{ rotate: 45, opacity: 0 }} 
                  transition={{ duration: 0.3 }}
                  style={{ willChange: 'transform, opacity' }}
                >
                  <FaMoon className="text-indigo-500" />
                </motion.span>
              ) : (
                <motion.span 
                  key="sun" 
                  initial={{ rotate: 45, opacity: 0 }} 
                  animate={{ rotate: 0, opacity: 1 }} 
                  exit={{ rotate: -45, opacity: 0 }} 
                  transition={{ duration: 0.3 }}
                  style={{ willChange: 'transform, opacity' }}
                >
                  <FaSun className="text-yellow-400" />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
          
          <motion.button 
            className="md:hidden p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-indigo-100 dark:hover:bg-indigo-900 transition-colors duration-300 focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            whileTap={{ scale: 0.95 }}
            style={{ willChange: 'transform' }}
          >
            {mobileMenuOpen ? <FaTimes className="text-indigo-500" /> : <FaBars className="text-indigo-500" />}
          </motion.button>
        </div>
      </nav>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4 }}
            className="md:hidden bg-white dark:bg-gray-900 shadow-lg"
            style={{ willChange: 'opacity, height' }}
          >
            <ul className="flex flex-col items-center py-4">
              {navLinks.map((link) => (
                <motion.li 
                  key={link.href} 
                  className="w-full"
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ willChange: 'transform, opacity' }}
                >
                  <a 
                    href={link.href} 
                    className="block w-full text-center py-3 px-4 text-gray-700 dark:text-gray-200 font-semibold hover:bg-indigo-50 dark:hover:bg-indigo-900/30"
                    onClick={closeMenu}
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Scroll Progress Bar */}
      <motion.div
        className="h-1 bg-indigo-500/80 fixed left-0 top-0 z-40"
        style={{ width: `${progress}%`, willChange: 'width' }}
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ ease: 'easeOut', duration: 0.2 }}
      />
    </header>
  );
});
