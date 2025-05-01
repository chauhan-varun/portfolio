import { useState, useEffect, Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  SiReact, SiNodedotjs, SiJavascript, SiTypescript, SiHtml5, 
  SiCss3, SiMongodb, SiFirebase, SiRedux, SiNextdotjs, 
  SiTailwindcss, SiGraphql, SiGit, SiFramer, SiFigma 
} from 'react-icons/si';
import { FaAmazon } from 'react-icons/fa';

// Load the animation component dynamically to reduce initial bundle size
const TechStackMotionCloud = lazy(() => import('./TechStackMotionCloud'));

// Category colors for glows
const categoryColors = {
  frontend: '#3b82f6', // blue
  backend: '#10b981',  // green
  Blockchain: '#f59e0b', // amber
  devops: '#8b5cf6',   // purple
  design: '#ec4899'    // pink
};

// Fallback component when 3D view is loading or for low-end devices
const TechGrid = ({ technologies }) => (
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-w-4xl mx-auto py-8 px-4">
    {technologies.map((tech) => (
      <div 
        key={tech.name}
        className="flex flex-col items-center p-4 rounded-lg bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow duration-300"
      >
        {tech.icon && <tech.icon size={36} color={tech.color} className="mb-2" />}
        <h3 className="font-medium text-sm text-center">{tech.name}</h3>
        <span className="text-xs text-gray-500 dark:text-gray-400 mt-1 capitalize">{tech.category}</span>
      </div>
    ))}
  </div>
);

export default function TechStackCloudDynamic() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Default to flying animation view by setting useFallback to false
  const [useFallback, setUseFallback] = useState(false);
  
  useEffect(() => {
    // Force animation mode by setting useFallback to false
    setUseFallback(false);
  }, []);

  // Tech stack data with icons, colors and categories
  const technologies = [
    { 
      name: 'React', 
      color: '#61DAFB', 
      icon: SiReact, 
      category: 'frontend',
      description: 'A JavaScript library for building user interfaces'
    },
    { 
      name: 'Node.js', 
      color: '#68A063', 
      icon: SiNodedotjs, 
      category: 'backend',
      description: "JavaScript runtime built on Chrome's V8 JavaScript engine"
    },
    { 
      name: 'JavaScript', 
      color: '#F7DF1E', 
      icon: SiJavascript, 
      category: 'language',
      description: 'The programming language of the Web'
    },
    { 
      name: 'TypeScript', 
      color: '#3178C6', 
      icon: SiTypescript, 
      category: 'language',
      description: 'JavaScript with syntax for types'
    },
    { 
      name: 'HTML5', 
      color: '#E34F26', 
      icon: SiHtml5, 
      category: 'frontend',
      description: 'The standard markup language for Web pages'
    },
    { 
      name: 'CSS3', 
      color: '#1572B6', 
      icon: SiCss3, 
      category: 'frontend',
      description: 'Style sheet language used for describing the presentation of a document'
    },
    { 
      name: 'MongoDB', 
      color: '#47A248', 
      icon: SiMongodb, 
      category: 'backend',
      description: 'Document-oriented NoSQL database'
    },
    { 
      name: 'Firebase', 
      color: '#FFCA28', 
      icon: SiFirebase,
      category: 'backend',
      description: "Google's mobile and web application development platform" 
    },
    { 
      name: 'AWS', 
      color: '#FF9900', 
      icon: FaAmazon, 
      category: 'devops',
      description: 'Secure cloud services platform'
    },
    { 
      name: 'Redux', 
      color: '#764ABC', 
      icon: SiRedux, 
      category: 'frontend',
      description: 'A Predictable State Container for JS Apps'
    },
    { 
      name: 'Next.js', 
      color: '#000000', 
      icon: SiNextdotjs, 
      category: 'frontend',
      description: 'The React Framework for Production'
    },
    { 
      name: 'Tailwind', 
      color: '#06B6D4', 
      icon: SiTailwindcss, 
      category: 'frontend',
      description: 'A utility-first CSS framework'
    },
    { 
      name: 'GraphQL', 
      color: '#E10098', 
      icon: SiGraphql, 
      category: 'backend',
      description: 'A query language for your API'
    },
    { 
      name: 'Git', 
      color: '#F05032', 
      icon: SiGit, 
      category: 'devops',
      description: 'Distributed version control system'
    },
    { 
      name: 'Framer', 
      color: '#0055FF', 
      icon: SiFramer, 
      category: 'design',
      description: 'A JavaScript library for creating interactive UI animations'
    },
    { 
      name: 'Figma', 
      color: '#F24E1E', 
      icon: SiFigma, 
      category: 'design',
      description: 'A digital design and prototyping tool'
    },
  ];

  return (
    <motion.section
      ref={ref}
      className="py-12 md:py-20 bg-gray-50 dark:bg-gray-900 overflow-hidden relative"
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="max-w-7xl mx-auto px-4">
        <motion.div 
          className="text-center mb-6"
          initial={{ y: 50, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Tech Stack
          </h2>
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-2 md:px-0">
            A glimpse into the technologies I work with to create exceptional digital experiences
          </p>
        </motion.div>
        
        {/* Category legend */}
        <motion.div 
          className="flex flex-wrap justify-center gap-4 mb-6 px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          {Object.entries(categoryColors).map(([category, color]) => (
            <div key={category} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }}></div>
              <span className="text-xs text-gray-600 dark:text-gray-400 capitalize">{category}</span>
            </div>
          ))}
        </motion.div>
      </div>
      
      {/* Always render tech stack content with conditional rendering for animation or grid view */}
      {inView && (
        useFallback ? (
          <div className="py-4">
            <TechGrid technologies={technologies} />
          </div>
        ) : (
          <Suspense fallback={
            <div className="h-[400px] md:h-[550px] flex items-center justify-center">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-indigo-500 mt-4">Loading Animation...</p>
              </div>
            </div>
          }>
            <TechStackMotionCloud technologies={technologies} />
          </Suspense>
        )
      )}
    </motion.section>
  );
}
