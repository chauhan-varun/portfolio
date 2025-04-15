import { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const journeyEvents = [
  {
    year: '2019',
    title: 'Started My Coding Journey',
    description: 'Began learning web development with HTML, CSS, and JavaScript.',
    icon: '🚀',
    color: 'bg-blue-500',
  },
  {
    year: '2020',
    title: 'First React Project',
    description: 'Built my first React application, diving deep into modern frontend development.',
    icon: '⚛️',
    color: 'bg-cyan-500',
  },
  {
    year: '2021',
    title: 'Full Stack Development',
    description: 'Expanded into backend technologies with Node.js, Express, and MongoDB.',
    icon: '🔧',
    color: 'bg-green-500',
  },
  {
    year: '2022',
    title: 'AI & Machine Learning',
    description: 'Started exploring AI integration into web applications using TensorFlow.js.',
    icon: '🧠',
    color: 'bg-purple-500',
  },
  {
    year: '2023',
    title: 'Advanced Animation & 3D',
    description: 'Mastered Framer Motion, Three.js, and other advanced animation libraries.',
    icon: '✨',
    color: 'bg-pink-500',
  },
  {
    year: '2024',
    title: 'Latest Projects',
    description: 'Building cutting-edge applications with focus on performance and accessibility.',
    icon: '🏆',
    color: 'bg-amber-500',
  },
];

export default function TimelineJourney() {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section className="py-12 md:py-20 bg-white dark:bg-gray-950 overflow-hidden relative">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-40 -left-20 w-72 h-72 bg-blue-100/30 dark:bg-blue-900/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 -right-20 w-80 h-80 bg-indigo-100/30 dark:bg-indigo-900/10 rounded-full blur-3xl"></div>
      </div>
      
      <motion.div 
        ref={containerRef}
        className="max-w-7xl mx-auto px-4 relative z-10"
        style={{ opacity, y }}
      >
        <motion.div 
          className="text-center mb-8 md:mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2 md:mb-4">
            Behind the Build
          </h2>
          <p className="text-sm md:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-2">
            My journey through technology and development
          </p>
        </motion.div>

        {/* Mobile Timeline */}
        <div className="md:hidden">
          {journeyEvents.map((event, idx) => (
            <MobileTimelineItem 
              key={event.year}
              event={event}
              idx={idx}
              isActive={activeIndex === idx}
              setActive={() => setActiveIndex(idx === activeIndex ? null : idx)}
            />
          ))}
        </div>

        {/* Desktop Timeline */}
        <div className="hidden md:block relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700 transform -translate-x-1/2"></div>
          
          {/* Timeline Events */}
          <div className="relative">
            {journeyEvents.map((event, idx) => {
              // Alternate sides
              const isLeft = idx % 2 === 0;
              
              return (
                <TimelineItem 
                  key={event.year}
                  event={event}
                  isLeft={isLeft}
                  idx={idx}
                  isActive={activeIndex === idx}
                  setActive={() => setActiveIndex(idx === activeIndex ? null : idx)}
                />
              );
            })}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function MobileTimelineItem({ event, idx, isActive, setActive }) {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.3,
  });

  return (
    <motion.div
      ref={ref}
      className="mb-8 relative pl-8 border-l-2 border-gray-200 dark:border-gray-700"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: idx * 0.1 }}
    >
      {/* Timeline Node */}
      <motion.div 
        className={`absolute left-0 top-0 w-8 h-8 rounded-full flex items-center justify-center text-white ${event.color} -translate-x-1/2`}
        whileHover={{ scale: 1.2 }}
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: idx * 0.1 + 0.2 }}
      >
        <span className="text-base">{event.icon}</span>
      </motion.div>
      
      {/* Content */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          {event.title}
        </h3>
        <p className={`text-xs font-semibold ${event.color.replace('bg-', 'text-')} mb-2`}>
          {event.year}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          {event.description}
        </p>
        <motion.button
          className="mt-3 text-indigo-500 hover:text-indigo-600 dark:text-indigo-400 dark:hover:text-indigo-300 text-xs font-medium"
          onClick={setActive}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          {isActive ? 'Read less' : 'Read more'}
        </motion.button>
        
        <AnimatePresence>
          {isActive && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700"
            >
              <p className="text-gray-600 dark:text-gray-300 text-xs">
                This was a significant period where I developed {idx + 2} major projects 
                and learned {idx + 3} new technologies. The challenges during this time shaped
                my approach to problem-solving and architectural decisions.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

function TimelineItem({ event, isLeft, idx, isActive, setActive }) {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.3,
  });

  return (
    <motion.div
      ref={ref}
      className={`mb-16 flex items-center ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.5, delay: idx * 0.1 }}
    >
      {/* Timeline Content */}
      <motion.div 
        className={`w-5/12 px-4 ${isLeft ? 'text-right' : 'text-left'}`}
        whileHover={{ y: -5 }}
      >
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            {event.title}
          </h3>
          <p className={`text-sm font-semibold ${event.color.replace('bg-', 'text-')} mb-2`}>
            {event.year}
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            {event.description}
          </p>
          <motion.button
            className="mt-4 text-indigo-500 hover:text-indigo-600 dark:text-indigo-400 dark:hover:text-indigo-300 text-sm font-medium"
            onClick={setActive}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            {isActive ? 'Read less' : 'Read more'}
          </motion.button>
          
          <AnimatePresence>
            {isActive && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700"
              >
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  This was a significant period where I developed {idx + 2} major projects 
                  and learned {idx + 3} new technologies. The challenges during this time shaped
                  my approach to problem-solving and architectural decisions.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
      
      {/* Timeline Node */}
      <div className="w-1/6 flex justify-center">
        <motion.div 
          className={`w-12 h-12 rounded-full flex items-center justify-center z-10 text-white ${event.color}`}
          whileHover={{ scale: 1.2 }}
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: idx * 0.1 + 0.2 }}
        >
          <span className="text-xl">{event.icon}</span>
        </motion.div>
      </div>
      
      {/* Spacer for alternating layout */}
      <div className="w-5/12"></div>
    </motion.div>
  );
}
