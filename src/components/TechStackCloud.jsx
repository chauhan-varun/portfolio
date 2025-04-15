import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html, Float } from '@react-three/drei';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Tooltip } from 'react-tooltip';
import { 
  SiReact, 
  SiNodedotjs, 
  SiJavascript, 
  SiTypescript, 
  SiHtml5, 
  SiCss3, 
  SiMongodb, 
  SiFirebase, 
  SiRedux, 
  SiNextdotjs, 
  SiTailwindcss, 
  SiGraphql, 
  SiGit, 
  SiFramer, 
  SiFigma 
} from 'react-icons/si';
import { FaAmazon } from 'react-icons/fa';

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

// Category colors for glows
const categoryColors = {
  frontend: '#3b82f6', // blue
  backend: '#10b981',  // green
  language: '#f59e0b', // amber
  devops: '#8b5cf6',   // purple
  design: '#ec4899'    // pink
};

function TechItem({ tech, position, speed = 1 }) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  const [tooltipId] = useState(`tech-${tech.name.toLowerCase().replace('.', '')}`);
  const Icon = tech.icon;
  
  // Rotation animation
  useFrame((state) => {
    if (!meshRef.current) return;
    
    // Custom orbiting motion
    const t = state.clock.getElapsedTime() * speed;
    meshRef.current.position.x = position[0] + Math.sin(t) * 2;
    meshRef.current.position.y = position[1] + Math.cos(t) * 0.5;
    meshRef.current.position.z = position[2] + Math.cos(t) * 2;
    
    // Rotate to face the camera
    meshRef.current.rotation.y = Math.sin(t * 0.5) * 0.5;
    meshRef.current.rotation.x = Math.cos(t * 0.5) * 0.2;
  });

  return (
    <Float speed={5} rotationIntensity={0.2} floatIntensity={0.2}>
      <mesh
        ref={meshRef}
        position={position}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={hovered ? 1.2 : 1}
      >
        <Html
          center
          className="pointer-events-auto select-none"
          distanceFactor={10}
          zIndexRange={[100, 0]}
          sprite
        >
          <div 
            className={`relative transition-all duration-300 ${hovered ? 'scale-125' : 'scale-100'}`}
            id={tooltipId}
            data-tooltip-content={tech.name}
            data-tooltip-place="top"
          >
            {/* Category glow */}
            <div 
              className={`absolute inset-0 rounded-full blur-lg opacity-60 transition-opacity duration-300 ${hovered ? 'opacity-100' : 'opacity-60'}`} 
              style={{ 
                backgroundColor: categoryColors[tech.category],
                transform: 'scale(1.3)',
                zIndex: -1
              }}
            />
            
            {/* Icon */}
            <Icon 
              size={hovered ? 40 : 32} 
              color={tech.color}
              className={`filter drop-shadow-lg transition-all duration-300 ${hovered ? 'animate-pulse' : ''}`}
            />
            
            {/* Tooltip container */}
            <Tooltip id={tooltipId} className="z-50 max-w-xs">
              <div className="p-2">
                <div className="font-bold mb-1">{tech.name}</div>
                <div className="text-xs opacity-90">{tech.description}</div>
                <div className="text-xs mt-1 italic">
                  Category: <span className="font-semibold capitalize">{tech.category}</span>
                </div>
              </div>
            </Tooltip>
          </div>
        </Html>
      </mesh>
    </Float>
  );
}

function Scene({ viewMode }) {
  return (
    <group>
      {technologies.map((tech, idx) => {
        // Calculate 3D positions in a spherical arrangement
        const phi = Math.acos(-1 + (2 * idx) / technologies.length);
        const theta = Math.sqrt(technologies.length * Math.PI) * phi;
        const radius = viewMode === 'cloud' ? 5 : 7; // Larger radius for icon view
        
        return (
          <TechItem
            key={tech.name}
            tech={tech}
            position={[
              radius * Math.cos(theta) * Math.sin(phi),
              radius * Math.sin(theta) * Math.sin(phi),
              radius * Math.cos(phi),
            ]}
            speed={0.2 + Math.random() * 0.5} // Random speed for each item
          />
        );
      })}
    </group>
  );
}

export default function TechStackCloud() {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

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
      
      <div className="relative h-[400px] md:h-[550px] w-full">
        <Canvas 
          camera={{ position: [0, 0, 15], fov: 50 }}
          dpr={[1, 2]}
          className="!touch-none"
        >
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <Scene viewMode="cloud" />
        </Canvas>
        
        {/* Gradient overlay for better visibility */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-gray-50 dark:from-gray-900 via-transparent to-gray-50 dark:to-gray-900"></div>
      </div>
    </motion.section>
  );
}
