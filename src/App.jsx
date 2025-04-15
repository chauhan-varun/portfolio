import { useEffect, useState, lazy, Suspense } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import CursorEffect from './components/CursorEffect';
import { motion, AnimatePresence, LazyMotion, domAnimation } from 'framer-motion';

// Lazy load non-critical components
const Portfolio = lazy(() => import('./components/Portfolio'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));
const TechStackCloud = lazy(() => import('./components/TechStackCloud'));
const TimelineJourney = lazy(() => import('./components/TimelineJourney'));
const EasterEggs = lazy(() => import('./components/EasterEggs'));

// Optimized HashLoader component with will-change for better performance
const HashLoader = ({ color, size, loading }) => {
  if (!loading) return null;
  
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{ 
          borderWidth: size/8,
          borderColor: `${color}50`,
          borderStyle: 'solid'
        }}
      />
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{ 
          borderWidth: size/8,
          borderBottomColor: 'transparent',
          borderLeftColor: 'transparent',
          borderRightColor: color,
          borderTopColor: color,
          borderStyle: 'solid',
          willChange: 'transform'
        }}
        animate={{ rotate: 360 }}
        transition={{ 
          duration: 1, 
          ease: "linear", 
          repeat: Infinity 
        }}
      />
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{ 
          borderWidth: size/8,
          borderBottomColor: color,
          borderLeftColor: color,
          borderRightColor: 'transparent',
          borderTopColor: 'transparent',
          borderStyle: 'solid',
          willChange: 'transform'
        }}
        animate={{ rotate: 360 }}
        transition={{ 
          duration: 1.5, 
          ease: "linear", 
          repeat: Infinity 
        }}
      />
    </div>
  );
};

// Fallback loading component for Suspense
const LoadingFallback = () => (
  <div className="flex justify-center items-center min-h-[200px]">
    <HashLoader color="#6366f1" size={40} loading={true} />
  </div>
);

function App() {
  // Page transition state - will be shorter
  const [loading, setLoading] = useState(true);

  // Robust dark mode state with system preference and localStorage
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      if (localStorage.theme === 'dark') return true;
      if (localStorage.theme === 'light') return false;
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return true; // Default to dark theme
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
    }
    
    // Always set the background color to dark regardless of theme
    document.documentElement.style.backgroundColor = '#0a0a23';
    document.body.style.backgroundColor = '#0a0a23';
  }, [isDark]);

  // Optimized initial page loading animation
  useEffect(() => {
    // Set body background color immediately to prevent white flash
    document.documentElement.style.backgroundColor = '#0a0a23';
    document.body.style.backgroundColor = '#0a0a23';
    
    // Preload critical assets
    const preloadFonts = () => {
      const fontUrls = [
        // Add font URLs if you have custom fonts
        // '/fonts/your-font.woff2'
      ];
      
      fontUrls.forEach(url => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = url;
        link.as = 'font';
        link.type = 'font/woff2';
        link.crossOrigin = 'anonymous';
        document.head.appendChild(link);
      });
    };
    
    preloadFonts();
    
    // Slightly longer fade to ensure other components have loaded
    const timer = setTimeout(() => {
      setLoading(false);
    }, 300); // Short but perceptible delay for better transitions
    
    return () => clearTimeout(timer);
  }, []);

  // Listen for system theme changes
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e) => {
      if (!('theme' in localStorage)) {
        setIsDark(e.matches);
      }
    };
    
    if (mq) {
      mq.addEventListener('change', handler);
      return () => mq.removeEventListener('change', handler);
    }
    return () => {};
  }, []);

  return (
    <div className="bg-gray-950" style={{ backgroundColor: '#0a0a23' }}>
      {/* Using LazyMotion to bundle only needed features for better performance */}
      <LazyMotion features={domAnimation}>
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div 
              key="loader"
              className="fixed inset-0 bg-gray-950"
              style={{ backgroundColor: '#0a0a23' }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <div className="w-full h-full flex items-center justify-center">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 1.1, opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col items-center"
                  style={{ willChange: 'transform, opacity' }}
                >
                  <HashLoader color="#6366f1" size={80} loading={true} />
                  <motion.p 
                    className="mt-6 text-indigo-400 font-medium"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    Loading Experience
                  </motion.p>
                </motion.div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="main"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="min-h-screen bg-gray-950"
              style={{ backgroundColor: '#0a0a23' }}
            >
              <CursorEffect />
              {/* Loading components in sequence with priorities */}
              <Header onToggleTheme={() => setIsDark((d) => !d)} isDark={isDark} />
              
              <main>
                {/* Higher priority components */}
                <Hero />
                
                {/* Lower priority components with staggered loading */}
                <Suspense fallback={<LoadingFallback />}>
                  <TechStackCloud />
                </Suspense>
                
                <Suspense fallback={<LoadingFallback />}>
                  <Portfolio />
                </Suspense>
                
                <Suspense fallback={<LoadingFallback />}>
                  <TimelineJourney />
                </Suspense>
                
                <Suspense fallback={<LoadingFallback />}>
                  <Contact />
                </Suspense>
                
                {/* Lowest priority components */}
                <Suspense fallback={null}>
                  <EasterEggs />
                </Suspense>
              </main>
              
              <Suspense fallback={null}>
                <Footer />
              </Suspense>
            </motion.div>
          )}
        </AnimatePresence>
      </LazyMotion>
    </div>
  );
}

export default App;
