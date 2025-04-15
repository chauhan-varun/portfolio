import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function ParallaxTilt({ children, scale = 1.05, perspective = 800, speed = 400 }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!ref.current || !isHovered) return;
      
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Calculate normalized tilt values (-1 to 1)
      const x = (e.clientX - centerX) / (rect.width / 2);
      const y = (e.clientY - centerY) / (rect.height / 2);
      
      setTilt({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isHovered]);

  return (
    <motion.div
      ref={ref}
      className="relative overflow-hidden w-full h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setTilt({ x: 0, y: 0 });
      }}
      style={{
        perspective: `${perspective}px`,
        transformStyle: 'preserve-3d',
      }}
      animate={{
        transform: isHovered ? 
          `perspective(${perspective}px) rotateY(${tilt.x * 10}deg) rotateX(${-tilt.y * 10}deg) scale3d(${scale}, ${scale}, 1)` :
          'perspective(800px) rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)',
      }}
      transition={{
        duration: isHovered ? 0 : 0.4,
        ease: 'easeOut',
      }}
    >
      <motion.div
        animate={{
          transform: isHovered ? `translateX(${-tilt.x * speed / 10}px) translateY(${-tilt.y * speed / 10}px)` : 'translateX(0) translateY(0)',
        }}
        transition={{
          duration: isHovered ? 0 : 0.4,
          ease: 'easeOut',
        }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
