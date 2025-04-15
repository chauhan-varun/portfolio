import { motion, useAnimation, useScroll, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState, lazy, Suspense } from 'react';
import { FaChevronDown } from 'react-icons/fa';

// Lazy load particles which is performance-intensive
const Particles = lazy(() => import('@tsparticles/react'));

const heroVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: 'easeOut' } },
};

// Optimized wave animation for text with reduced motion
const waveVariants = {
  wave: {
    transition: {
      staggerChildren: 0.1, // Increased stagger timing
      repeat: Infinity,
      repeatType: "mirror",
      duration: 3, // Slowed down for better performance
    },
  },
};

const letterVariants = {
  initial: { y: 0 },
  wave: i => ({
    y: [0, -5, 0], // Subtle motion range
    transition: {
      duration: 1.8, // Smoother animation
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "mirror",
      delay: i * 0.04, // Subtle delay between letters for more natural wave
    },
  }),
};

// Scroll down indicator animation
const scrollIndicatorVariants = {
  initial: { opacity: 0, y: -10 },
  animate: { 
    opacity: [0.2, 1, 0.2], 
    y: [0, 10, 0],
    transition: {
      duration: 2,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "loop",
    }
  },
};

export default function Hero() {
  const dynamicText = [
    'Web Developer',
    'Blockchain Developer',
    'Open Source Contributor',
    'Smart Contract Engineer',
  ];
  const textRef = useRef();
  const [typedName, setTypedName] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const gradientControls = useAnimation();
  const firstName = "Varun";
  const lastName = "Chauhan";
  const { scrollYProgress } = useScroll();
  
  // Optimized typing animation with reduced frequency
  useEffect(() => {
    if (typedName.length < (firstName + ' ' + lastName).length) {
      const timeout = setTimeout(() => {
        setTypedName((firstName + ' ' + lastName).substring(0, typedName.length + 1));
      }, 120); // Slightly slower typing for better performance
      return () => clearTimeout(timeout);
    } else {
      // Small delay before showing wave animation to prevent simultaneous animations
      const completeTimeout = setTimeout(() => {
        setIsTypingComplete(true);
      }, 300);
      return () => clearTimeout(completeTimeout);
    }
  }, [typedName, firstName, lastName]);
  
  // Role text rotation
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (textRef.current) {
        textRef.current.textContent = dynamicText[i % dynamicText.length];
        i++;
      }
    }, 1600);
    return () => clearInterval(interval);
  }, []);
  
  // Optimized gradient animation - removed in favor of static gradients
  useEffect(() => {
    // Only starting simpler animation when typing is complete to avoid overlapping animations
    if (isTypingComplete) {
      // Using a simpler animation with longer duration for better performance
      gradientControls.start({
        opacity: 1,
        transition: {
          duration: 0.6,
          ease: "easeOut",
        }
      });
    }
  }, [isTypingComplete, gradientControls]);

  return (
    <section className="relative flex flex-col items-center justify-center min-h-[60vh] md:min-h-[80vh] overflow-hidden bg-gray-950 text-white" style={{ willChange: 'transform, opacity' }}>
      {/* Particle Background - Lazy loaded and optimized */}
      <Suspense fallback={<div className="absolute inset-0 z-0 bg-gray-950"></div>}>
        <Particles
          id="tsparticles"
          options={{
            background: { color: 'transparent' },
            fpsLimit: 30, // Reduced FPS for better performance
            interactivity: { 
              events: { 
                onClick: { enable: true, mode: 'push' }, 
                onHover: { enable: true, mode: 'repulse', parallax: { enable: false } } // Disabled parallax
              }, 
              modes: { 
                push: { quantity: 2 }, // Reduced particles added on click
                repulse: { distance: 80, duration: 0.4 } 
              } 
            },
            particles: { 
              color: { value: '#6366f1' }, 
              links: { 
                enable: true, 
                color: '#6366f1', 
                distance: 150, 
                opacity: 0.3, 
                width: 1,
                triangles: { enable: false } // Disabled triangles for better performance
              }, 
              move: { 
                enable: true, 
                speed: 0.8, // Slower movement
                outModes: { default: "bounce" } 
              }, 
              number: { value: 40 }, // Reduced number of particles
              opacity: { value: 0.5 }, 
              shape: { type: 'circle' }, 
              size: { value: { min: 1, max: 3 } } 
            },
            detectRetina: false, // Disabled retina detection
          }}
          className="absolute inset-0 z-0"
          style={{ willChange: 'transform' }} // Added will-change for better performance
        />
      </Suspense>
      <motion.div
        className="relative z-10 flex flex-col items-center mt-24"
        initial="hidden"
        animate="visible"
        variants={heroVariants}
        style={{ willChange: 'transform, opacity' }}
      >
        <h1 className="text-4xl md:text-6xl font-extrabold text-center text-white">
          Hi, I'm{" "}
          {isTypingComplete ? (
            <>
              <motion.span
                className="inline-block"
                variants={waveVariants}
                animate="wave"
              >
                {/* First Name - optimized with reduced animation complexity */}
                {firstName.split("").map((letter, index) => (
                  <motion.span
                    key={`first-${index}`}
                    custom={Math.min(index, 3)} // Limiting custom values to reduce unique animations
                    variants={letterVariants}
                    initial="initial"
                    animate="wave"
                    className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-500"
                    style={{ willChange: index < 3 ? 'transform' : 'auto' }} // Only apply will-change to first few letters
                  >
                    {letter}
                  </motion.span>
                ))}
              </motion.span>
              
              {/* Add space between first and last name */}
              <span className="inline-block mx-2"></span>
              
              <motion.span
                className="inline-block"
                variants={waveVariants}
                animate="wave"
              >
                {/* Last Name - optimized with reduced animation complexity */}
                {lastName.split("").map((letter, index) => (
                  <motion.span
                    key={`last-${index}`}
                    custom={Math.min(index, 3)} // Limiting custom values to reduce unique animations
                    variants={letterVariants}
                    initial="initial"
                    animate="wave"
                    className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-500"
                    style={{ willChange: index < 3 ? 'transform' : 'auto' }} // Only apply will-change to first few letters
                  >
                    {letter}
                  </motion.span>
                ))}
              </motion.span>
            </>
          ) : (
            <span className="text-indigo-500">{typedName}<span className="animate-pulse">|</span></span>
          )}
        </h1>
        <div className="mt-4 text-xl md:text-3xl font-semibold h-10 flex items-center">
          <span>&nbsp;</span>
          <span ref={textRef} className="text-indigo-500 transition-colors duration-500">Designer.</span>
        </div>
        <p className="mt-6 max-w-xl text-center px-4 md:px-0 text-gray-300 text-base md:text-lg">
          I craft modern, interactive web experiences with a focus on performance, accessibility, and stunning visuals.
        </p>
        <motion.a
          href="#portfolio"
          whileHover={{ scale: 1.05 }} // Reduced scale amount
          whileTap={{ scale: 0.98 }} // Reduced scale amount
          className="mt-8 px-8 py-3 rounded-full bg-indigo-500 text-white font-bold shadow-lg hover:bg-indigo-600 transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-indigo-800"
          style={{ willChange: 'transform' }} // Added will-change for smoother hover animation
        >
          View My Work
        </motion.a>
        
        {/* Scroll down indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
          variants={scrollIndicatorVariants}
          initial="initial"
          animate="animate"
          style={{ willChange: 'transform, opacity' }} // Added will-change for smoother animation
        >
          <span className="text-sm text-gray-400 mb-2">Scroll Down</span>
          <FaChevronDown className="text-indigo-500 text-xl" />
        </motion.div>
      </motion.div>
    </section>
  );
}
