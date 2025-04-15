import { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { FaCode, FaPaintBrush, FaFilter, FaExternalLinkAlt, FaChevronRight } from 'react-icons/fa';
import ParallaxTilt from './ParallaxTilt';

const projects = [
  {
    title: 'VisionX (AI Image/Video Analysis)',
    image: '/Screenshot from 2025-04-15 19-37-58.png',
    tags: ['Web', 'AI', 'UI/UX'],
    description: 'A powerful AI-powered platform for image and video analysis. Features real-time object detection, OCR, and more. Built with a modern, interactive UI.',
    link: 'https://vision-x-ipxw.onrender.com/',
    techStack: ['React', 'AI', 'Firebase']
  },
  {
    title: 'VisionX Admin Dashboard',
    image: '/Screenshot from 2025-04-15 19-38-06.png',
    tags: ['Web', 'Dashboard'],
    description: 'Admin dashboard for VisionX with analytics, user management, and real-time monitoring. Sleek, responsive, and highly interactive.',
    link: 'https://adminvisionx.onrender.com/dashboard',
    techStack: ['React', 'Node', 'AWS']
  },
  {
    title: 'Ad-Free YouTube',
    image: '/Screenshot from 2025-04-15 19-38-13.png',
    tags: ['Web', 'Entertainment'],
    description: 'A custom YouTube front-end that removes ads for a seamless viewing experience. Fast, clean, and privacy-focused.',
    link: 'https://adfreeyoutube.onrender.com/',
    techStack: ['Vue', 'Node', 'AWS']
  },
  {
    title: 'iChat (Real-time Chat App)',
    image: '/Screenshot from 2025-04-15 19-38-18.png',
    tags: ['Web', 'Chat', 'Realtime'],
    description: 'Modern chat app with real-time messaging, emoji reactions, and beautiful animations. Secure and scalable.',
    link: 'https://ichat-cobn.onrender.com/',
    techStack: ['React', 'Firebase', 'Realtime']
  },
  {
    title: 'Dev Electricals Admin',
    image: '/Screenshot from 2025-04-15 19-38-23.png',
    tags: ['Web', 'Dashboard', 'E-Commerce'],
    description: 'Admin panel for an e-commerce platform. Manage products, orders, and analytics with a robust, animated UI.',
    link: 'https://admindevelectricals.onrender.com/',
    techStack: ['React', 'Node', 'MongoDB']
  },
  {
    title: 'Dev Electricals Storefront',
    image: '/Screenshot from 2025-04-15 19-38-28.png',
    tags: ['Web', 'E-Commerce'],
    description: 'Customer-facing e-commerce website with smooth browsing, filtering, and checkout. Fully responsive and visually striking.',
    link: 'https://develectricals.onrender.com/',
    techStack: ['Next', 'Node', 'AWS']
  },
  {
    title: 'Animated Avatar Login Page',
    image: '/Screenshot from 2025-04-15 19-38-33.png',
    tags: ['Web', 'UI/UX', 'Animation'],
    description: 'A playful, animated login page with interactive avatars and micro-interactions. Great for onboarding experiences.',
    link: 'https://animated-avatar-login-page.onrender.com/',
    techStack: ['React', 'GSAP', 'UI']
  },
];

const filterTags = ['All', 'Web', 'UI/UX', 'AI', 'Dashboard', 'E-Commerce', 'Chat', 'Realtime', 'Entertainment', 'Animation'];

export default function Portfolio() {
  const [selectedTag, setSelectedTag] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState(-1);
  const [showBts, setShowBts] = useState(false);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [100, 0, 0, 100]);

  const filtered = selectedTag === 'All' ? projects : projects.filter(p => p.tags.includes(selectedTag));

  return (
    <section id="portfolio" ref={containerRef} className="py-24 bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
      {/* Background particles/decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-indigo-300/20 dark:bg-indigo-700/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-20 w-80 h-80 bg-indigo-200/20 dark:bg-indigo-800/10 rounded-full blur-3xl"></div>
      </div>
      
      <motion.div 
        className="max-w-6xl mx-auto px-4 relative z-10"
        style={{ opacity, y }}
      >
        <motion.div 
          initial={{ opacity: 0, y: 40 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.7 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6 text-center">
            Portfolio
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Explore my latest projects with innovative UI/UX and interactions. Each project showcases modern web technologies and creative solutions.
          </p>
        </motion.div>

        {/* Behind the scenes toggle */}
        <motion.div 
          className="flex justify-end mb-6"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <button 
            onClick={() => setShowBts(!showBts)}
            className="flex items-center px-4 py-2 rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 font-medium transition-all hover:bg-indigo-200 dark:hover:bg-indigo-800/60 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
          >
            {showBts ? 'Hide' : 'Show'} Tech Stack
            <span className={`ml-2 transition-transform duration-300 ${showBts ? 'rotate-90' : ''}`}>
              <FaChevronRight />
            </span>
          </button>
        </motion.div>
        
        {/* Filter Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-2 my-8 px-2 md:px-0 md:gap-3 md:my-12"
        >
          {filterTags.map((tag, idx) => (
            <motion.button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-3 py-1.5 md:px-5 md:py-2 text-sm rounded-full font-medium border shadow-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${selectedTag === tag ? 'bg-indigo-500 text-white border-indigo-500 shadow-indigo-500/30' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border-gray-200 dark:border-gray-700 hover:bg-indigo-100 dark:hover:bg-indigo-900/50'}`}
              whileHover={{ scale: 1.05, boxShadow: '0 10px 20px -10px rgba(99, 102, 241, 0.3)' }}
              whileTap={{ scale: 0.97 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
            >
              {tag === 'All' ? <FaFilter className="inline mr-2" /> : null}{tag}
            </motion.button>
          ))}
        </motion.div>
        
        {/* Projects Grid - Unified Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          <AnimatePresence mode="wait">
            {filtered.map((project, idx) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 60 }}
                transition={{ duration: 0.5, delay: idx * 0.07 }}
                viewport={{ once: true, margin: "-100px" }}
                className="project-card" // For cursor effect
              >
                <ParallaxTilt>
                  <motion.div
                    className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden h-full shadow-lg"
                    whileHover={{ 
                      y: -5,
                      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                      transition: { duration: 0.3 }
                    }}
                  >
                    <div className="relative overflow-hidden">
                      <motion.img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-56 object-cover cursor-pointer"
                        whileHover={{ scale: 1.05, filter: 'brightness(1.1)' }}
                        transition={{ duration: 0.4 }}
                        onClick={() => setLightboxIndex(idx)}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                        <h3 className="text-xl font-bold text-indigo-100 drop-shadow-md mb-1 flex items-center gap-2">
                          {project.title}
                          <motion.a 
                            href={project.link} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            whileHover={{ scale: 1.2, rotate: 5 }} 
                            className="inline-block text-indigo-200 hover:text-white ml-2 link-like" 
                            aria-label="Visit Website"
                          >
                            <FaExternalLinkAlt />
                          </motion.a>
                        </h3>
                        <p className="text-sm text-indigo-50/90 drop-shadow-md animate-fade-in-up" style={{ animationDelay: `${0.2 + idx * 0.05}s` }}>
                          {project.description}
                        </p>
                      </div>
                      <motion.div 
                        className="absolute top-4 right-4"
                        whileHover={{ scale: 1.15 }}
                      >
                        <a 
                          href={project.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="bg-white/90 dark:bg-gray-900/90 p-2 rounded-full shadow-md text-indigo-600 dark:text-indigo-400"
                        >
                          <FaExternalLinkAlt />
                        </a>
                      </motion.div>
                      <div className="absolute top-4 left-4 flex gap-2">
                        {project.tags.includes('Web') && <FaCode className="text-indigo-400 bg-white/80 rounded-full p-1 w-6 h-6" />}
                        {project.tags.includes('UI/UX') && <FaPaintBrush className="text-pink-400 bg-white/80 rounded-full p-1 w-6 h-6" />}
                      </div>
                    </div>
                    
                    {/* Behind the scenes section */}
                    <AnimatePresence>
                      {showBts && (
                        <motion.div 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="p-4 border-t border-gray-200 dark:border-gray-700"
                        >
                          <h4 className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 mb-2">Tech Stack</h4>
                          <div className="flex flex-wrap gap-2">
                            {project.techStack?.map((tech, i) => (
                              <motion.span
                                key={tech}
                                className="bg-gray-100 dark:bg-gray-900 rounded-lg px-2 py-1 text-xs text-gray-700 dark:text-gray-300 flex items-center"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3, delay: i * 0.1 }}
                              >
                                {tech}
                              </motion.span>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </ParallaxTilt>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        
        {/* Lightbox */}
        <Lightbox
          open={lightboxIndex >= 0}
          close={() => setLightboxIndex(-1)}
          index={lightboxIndex}
          slides={filtered.map(p => ({ src: p.image, alt: p.title }))}
          animation={{ swipe: 250 }}
          controller={{ closeOnBackdropClick: true }}
          className="lightbox-container"
        />
      </motion.div>
    </section>
  );
}
