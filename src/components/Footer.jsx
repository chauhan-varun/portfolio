import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="py-8 bg-gray-100 dark:bg-gray-900 text-center mt-16 border-t border-gray-200 dark:border-gray-800">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex flex-col items-center gap-2"
      >
        <span className="font-semibold text-gray-700 dark:text-gray-300">&copy; {new Date().getFullYear()} Varun Chauhan. All rights reserved.</span>
        <div className="flex gap-4 mt-2">
          <motion.a 
            href="https://github.com/chauhan-varun" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-gray-500 hover:text-indigo-500 transition-colors" 
            aria-label="GitHub"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaGithub size={28} />
          </motion.a>
          <motion.a 
            href="https://www.linkedin.com/in/chauhan-varun/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-gray-500 hover:text-indigo-500 transition-colors" 
            aria-label="LinkedIn"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaLinkedin size={28} />
          </motion.a>
        </div>
      </motion.div>
    </footer>
  );
}
