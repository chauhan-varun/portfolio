import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Konami code: up, up, down, down, left, right, left, right, b, a
const KONAMI_CODE = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];

export default function EasterEggs() {
  const [keysPressed, setKeysPressed] = useState([]);
  const [showKonamiEffect, setShowKonamiEffect] = useState(false);
  const [logoClicked, setLogoClicked] = useState(false);
  
  // Handle Konami code
  const handleKeyDown = useCallback((e) => {
    const newKeys = [...keysPressed, e.keyCode];
    
    // Only keep the relevant part of the sequence
    if (newKeys.length > KONAMI_CODE.length) {
      newKeys.shift();
    }
    
    setKeysPressed(newKeys);
    
    // Check if the sequence matches the Konami code
    if (newKeys.join(',') === KONAMI_CODE.join(',')) {
      setShowKonamiEffect(true);
      setTimeout(() => setShowKonamiEffect(false), 5000);
      setKeysPressed([]);
    }
  }, [keysPressed]);
  
  // Add logo click handler to document
  useEffect(() => {
    const handleLogoClick = (e) => {
      if (e.target.id === 'logo' || e.target.closest('#logo')) {
        setLogoClicked(true);
        setTimeout(() => setLogoClicked(false), 5000);
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('click', handleLogoClick);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('click', handleLogoClick);
    };
  }, [handleKeyDown]);

  return (
    <>
      {/* Konami Code Effect */}
      <AnimatePresence>
        {showKonamiEffect && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="relative"
              initial={{ scale: 0 }}
              animate={{ scale: 1, rotate: 360 }}
              exit={{ scale: 0 }}
              transition={{ 
                type: "spring",
                stiffness: 260,
                damping: 20,
                duration: 1
              }}
            >
              <div className="flex flex-col items-center">
                <span className="text-7xl mb-3">🎮</span>
                <div className="bg-black/70 px-6 py-3 rounded-full">
                  <span className="text-xl font-bold text-white">KONAMI CODE ACTIVATED!</span>
                </div>
                
                {/* Flying emojis */}
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute text-2xl"
                    initial={{ 
                      x: 0, 
                      y: 0,
                      opacity: 1
                    }}
                    animate={{ 
                      x: (Math.random() - 0.5) * 500, 
                      y: (Math.random() - 0.5) * 500,
                      opacity: 0,
                      rotate: Math.random() * 360
                    }}
                    transition={{ 
                      duration: 2 + Math.random() * 3,
                      delay: Math.random() * 0.5
                    }}
                  >
                    {['🚀', '✨', '💻', '🔥', '🎯'][Math.floor(Math.random() * 5)]}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Logo Click Effect */}
      <AnimatePresence>
        {logoClicked && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative h-screen w-screen overflow-hidden">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.15 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
              />
              
              {/* Matrix-like falling code */}
              {[...Array(50)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute text-xl font-mono text-white/90 top-0 select-none"
                  style={{ left: `${(i / 50) * 100}%` }}
                  initial={{ y: -100 }}
                  animate={{ 
                    y: window.innerHeight + 100,
                  }}
                  transition={{ 
                    duration: 3 + Math.random() * 4,
                    delay: Math.random() * 2,
                    repeat: Infinity,
                    repeatType: "loop"
                  }}
                >
                  {Array(10).fill().map((_, j) => (
                    <div key={j} style={{ opacity: 1 - (j * 0.1) }}>
                      {String.fromCharCode(33 + Math.floor(Math.random() * 94))}
                    </div>
                  ))}
                </motion.div>
              ))}
              
              <motion.div
                className="relative z-10 bg-white/90 dark:bg-gray-900/90 p-6 rounded-xl shadow-lg"
                initial={{ scale: 0, rotate: -10 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 10 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                <h3 className="text-xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">You found a secret!</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Thanks for checking out my portfolio. If you liked what you saw, let's connect!
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
