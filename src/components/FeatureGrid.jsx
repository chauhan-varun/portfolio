import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import ParallaxTilt from './ParallaxTilt';
import { FaCode, FaFigma, FaLaptopCode, FaExternalLinkAlt, FaChevronRight } from 'react-icons/fa';

const tags = {
  React: { bg: 'bg-blue-500', text: 'text-white' },
  Vue: { bg: 'bg-green-500', text: 'text-white' },
  Next: { bg: 'bg-black', text: 'text-white' },
  Node: { bg: 'bg-green-600', text: 'text-white' },
  AWS: { bg: 'bg-yellow-500', text: 'text-black' },
  Firebase: { bg: 'bg-amber-500', text: 'text-white' },
  AI: { bg: 'bg-purple-500', text: 'text-white' },
  UI: { bg: 'bg-pink-500', text: 'text-white' },
  Realtime: { bg: 'bg-red-500', text: 'text-white' },
};

export default function FeatureGrid({ projects }) {
  const [expandedId, setExpandedId] = useState(null);
  const [showBts, setShowBts] = useState(false);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, -60]);

  return (
    <motion.div 
      ref={containerRef}
      className="py-10"
      style={{ opacity, y }}
    >
      <div className="flex justify-between items-center mb-8 px-4">
        <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Featured Projects</h3>
        <button 
          onClick={() => setShowBts(!showBts)}
          className="flex items-center px-4 py-2 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 font-medium transition-all hover:bg-indigo-200 dark:hover:bg-indigo-800"
        >
          {showBts ? 'Hide' : 'Show'} Behind-the-Scenes
          <span className={`ml-2 transition-transform duration-300 ${showBts ? 'rotate-90' : ''}`}>
            <FaChevronRight />
          </span>
        </button>
      </div>
      
      <div className="relative overflow-x-auto pb-8">
        <motion.div 
          className="flex space-x-6 px-4"
          drag="x"
          dragConstraints={{ left: -1000, right: 0 }}
          initial={{ x: 20 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.8 }}
        >
          {projects.slice(0, 4).map((project, idx) => (
            <ProjectCard 
              key={project.title} 
              project={project} 
              index={idx} 
              expanded={expandedId === project.title}
              onExpand={() => setExpandedId(expandedId === project.title ? null : project.title)}
              showBts={showBts}
            />
          ))}
        </motion.div>
        <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-white/50 dark:from-gray-950/50 pointer-events-none"></div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12 px-4">
        {projects.slice(4).map((project, idx) => (
          <ProjectGridItem 
            key={project.title} 
            project={project} 
            index={idx}
            showBts={showBts}
          />
        ))}
      </div>
    </motion.div>
  );
}

function ProjectCard({ project, index, expanded, onExpand, showBts }) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      className="flex-shrink-0 w-[300px] md:w-[380px]"
    >
      <ParallaxTilt>
        <motion.div
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden cursor-pointer h-full"
          layoutId={`card-container-${project.title}`}
          onClick={onExpand}
          whileHover={{ y: -5 }}
        >
          <motion.div className="relative">
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-indigo-500/30 to-transparent z-10"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
            <motion.img 
              src={project.image} 
              alt={project.title}
              className="w-full h-48 object-cover object-top"
              layoutId={`card-image-${project.title}`}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.4 }}
            />
            <motion.div 
              className="absolute bottom-4 right-4 z-20"
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <a 
                href={project.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white/90 dark:bg-gray-900/90 p-2 rounded-full shadow-md text-indigo-600 dark:text-indigo-400"
                onClick={(e) => e.stopPropagation()}
              >
                <FaExternalLinkAlt />
              </a>
            </motion.div>
          </motion.div>
          
          <motion.div className="p-4">
            <motion.div className="flex gap-2 flex-wrap mb-2">
              {project.tags.map((tag, i) => (
                <motion.span
                  key={tag}
                  className={`text-xs px-2 py-1 rounded-full ${tags[tag]?.bg || 'bg-gray-200 dark:bg-gray-700'} ${tags[tag]?.text || 'text-gray-800 dark:text-gray-200'}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: i * 0.1 + 0.2 }}
                >
                  {tag}
                </motion.span>
              ))}
            </motion.div>
            
            <motion.h3 
              className="text-lg font-bold text-gray-800 dark:text-white mb-2"
              layoutId={`card-title-${project.title}`}
            >
              {project.title}
            </motion.h3>
            
            <motion.p 
              className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2"
              layoutId={`card-desc-${project.title}`}
            >
              {project.description}
            </motion.p>
          </motion.div>
          
          {showBts && (
            <motion.div 
              className="px-4 pb-4"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="border-t border-gray-200 dark:border-gray-700 pt-3 mt-2">
                <h4 className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 flex items-center">
                  <FaLaptopCode className="mr-2" /> Behind the scenes
                </h4>
                <div className="mt-2 flex gap-3">
                  <div className="bg-gray-100 dark:bg-gray-900 rounded-lg p-2 flex items-center">
                    <FaCode className="text-blue-500 mr-1" />
                    <span className="text-xs">React</span>
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-900 rounded-lg p-2 flex items-center">
                    <FaFigma className="text-purple-500 mr-1" />
                    <span className="text-xs">Figma</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </ParallaxTilt>
      
      <AnimatePresence>
        {expanded && (
          <motion.div
            layoutId={`card-expanded-${project.title}`}
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ backgroundColor: 'rgba(0, 0, 0, 0)' }}
            animate={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
            exit={{ backgroundColor: 'rgba(0, 0, 0, 0)' }}
          >
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-xl w-11/12 max-w-2xl overflow-hidden"
              layoutId={`card-container-${project.title}`}
            >
              <motion.div 
                className="relative"
                layoutId={`card-image-container-${project.title}`}
              >
                <motion.img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-64 object-cover"
                  layoutId={`card-image-${project.title}`}
                />
                <motion.div 
                  className="absolute top-4 right-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <button 
                    onClick={onExpand}
                    className="bg-white/90 dark:bg-gray-900/90 p-2 rounded-full shadow-md text-gray-600 dark:text-gray-300"
                  >
                    ✕
                  </button>
                </motion.div>
              </motion.div>
              
              <div className="p-6">
                <motion.h2 
                  className="text-2xl font-bold text-gray-800 dark:text-white mb-3"
                  layoutId={`card-title-${project.title}`}
                >
                  {project.title}
                </motion.h2>
                
                <motion.p 
                  className="text-gray-600 dark:text-gray-300 mb-4"
                  layoutId={`card-desc-${project.title}`}
                >
                  {project.description}
                </motion.p>
                
                <motion.div 
                  className="flex flex-wrap gap-2 mb-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {project.tags.map((tag) => (
                    <span 
                      key={tag}
                      className={`text-sm px-3 py-1 rounded-full ${tags[tag]?.bg || 'bg-gray-200 dark:bg-gray-700'} ${tags[tag]?.text || 'text-gray-800 dark:text-gray-200'}`}
                    >
                      {tag}
                    </span>
                  ))}
                </motion.div>
                
                <motion.div 
                  className="flex justify-end"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <a 
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center"
                  >
                    Visit Project <FaExternalLinkAlt className="ml-2" />
                  </a>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function ProjectGridItem({ project, index, showBts }) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const hoverVariants = {
    rest: { scale: 1, boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' },
    hover: { 
      scale: 1.02, 
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      transition: { duration: 0.3, ease: 'easeOut' }
    }
  };
  
  return (
    <motion.div
      ref={ref}
      initial={{ 
        opacity: 0, 
        y: 60,
        scale: 1, 
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
      }}
      animate={inView ? { 
        opacity: 1, 
        y: 0 
      } : {}}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden"
      variants={hoverVariants}
      whileHover="hover"
    >
      <div className="relative overflow-hidden">
        <motion.img 
          src={project.image} 
          alt={project.title}
          className="w-full h-52 object-cover"
          whileHover={{ scale: 1.05, filter: 'brightness(1.1)' }}
          transition={{ duration: 0.4 }}
        />
        <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/70 to-transparent">
          <h3 className="text-white font-bold text-lg">{project.title}</h3>
        </div>
        <motion.div 
          className="absolute top-4 right-4"
          whileHover={{ scale: 1.15, rotate: 5 }}
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
      </div>
      
      <div className="p-4">
        <div className="flex gap-2 flex-wrap mb-3">
          {project.tags.slice(0, 3).map((tag, i) => (
            <motion.span
              key={tag}
              className={`text-xs px-2 py-1 rounded-full ${tags[tag] ? tags[tag].bg : 'bg-gray-200 dark:bg-gray-700'} ${tags[tag] ? tags[tag].text : 'text-gray-800 dark:text-gray-200'}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: i * 0.1 }}
            >
              {tag}
            </motion.span>
          ))}
        </div>
        
        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-3">
          {project.description}
        </p>
        
        {showBts && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="border-t border-gray-200 dark:border-gray-700 pt-3 mt-2"
          >
            <h4 className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 flex items-center">
              <FaLaptopCode className="mr-2" /> Tech Stack
            </h4>
            <div className="mt-2 flex flex-wrap gap-2">
              <div className="bg-gray-100 dark:bg-gray-900 rounded-lg p-1.5 flex items-center">
                <FaCode className="mr-1 text-xs text-blue-500" />
                <span className="text-xs">React</span>
              </div>
              <div className="bg-gray-100 dark:bg-gray-900 rounded-lg p-1.5 flex items-center">
                <FaFigma className="text-xs text-purple-500 mr-1" />
                <span className="text-xs">Figma</span>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
