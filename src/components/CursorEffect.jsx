import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function CursorEffect() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [cursorVariant, setCursorVariant] = useState('default');

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    // Track hover states for interactive elements
    const handleProjectEnter = () => {
      setCursorVariant('project');
      setIsHovering(true);
    };

    const handleButtonEnter = () => {
      setCursorVariant('button');
      setIsHovering(true);
    };

    const handleLinkEnter = () => {
      setCursorVariant('link');
      setIsHovering(true);
    };

    const handleLeave = () => {
      setCursorVariant('default');
      setIsHovering(false);
    };

    // Add event listeners to relevant elements
    const projectElements = document.querySelectorAll('.project-card');
    const buttonElements = document.querySelectorAll('button, .button-like');
    const linkElements = document.querySelectorAll('a, .link-like');

    projectElements.forEach(el => {
      el.addEventListener('mouseenter', handleProjectEnter);
      el.addEventListener('mouseleave', handleLeave);
    });

    buttonElements.forEach(el => {
      el.addEventListener('mouseenter', handleButtonEnter);
      el.addEventListener('mouseleave', handleLeave);
    });

    linkElements.forEach(el => {
      el.addEventListener('mouseenter', handleLinkEnter);
      el.addEventListener('mouseleave', handleLeave);
    });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      
      projectElements.forEach(el => {
        el.removeEventListener('mouseenter', handleProjectEnter);
        el.removeEventListener('mouseleave', handleLeave);
      });

      buttonElements.forEach(el => {
        el.removeEventListener('mouseenter', handleButtonEnter);
        el.removeEventListener('mouseleave', handleLeave);
      });

      linkElements.forEach(el => {
        el.removeEventListener('mouseenter', handleLinkEnter);
        el.removeEventListener('mouseleave', handleLeave);
      });
    };
  }, []);

  const variants = {
    default: {
      height: 32,
      width: 32,
      x: position.x - 16,
      y: position.y - 16,
      backgroundColor: 'rgba(99, 102, 241, 0.2)',
      mixBlendMode: 'normal',
      border: '1px solid rgba(99, 102, 241, 0.3)'
    },
    project: {
      height: 60,
      width: 60,
      x: position.x - 30,
      y: position.y - 30,
      backgroundColor: 'rgba(99, 102, 241, 0.15)',
      mixBlendMode: 'difference',
      border: '1px solid rgba(255, 255, 255, 0.5)'
    },
    button: {
      height: 24,
      width: 24,
      x: position.x - 12,
      y: position.y - 12,
      backgroundColor: 'rgba(255, 255, 255, 0.6)',
      mixBlendMode: 'difference',
      border: 'none'
    },
    link: {
      height: 40,
      width: 40,
      x: position.x - 20,
      y: position.y - 20,
      backgroundColor: 'rgba(99, 102, 241, 0.15)',
      border: '1px solid rgba(99, 102, 241, 0.5)'
    }
  };

  if (typeof window === 'undefined') return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-50 hidden md:block"
        animate={cursorVariant}
        variants={variants}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 28,
          mass: 0.5
        }}
        style={{ 
          opacity: isVisible ? 1 : 0,
        }}
      />
      <motion.div 
        className="fixed top-0 left-0 rounded-full bg-indigo-500 pointer-events-none z-50 hidden md:block"
        animate={{
          x: position.x - 4,
          y: position.y - 4,
          scale: isHovering ? 0 : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 1500,
          damping: 50
        }}
        style={{ 
          width: 8,
          height: 8,
          opacity: isVisible ? 1 : 0
        }}
      />
    </>
  );
}
