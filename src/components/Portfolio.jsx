import { useState, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { useInView } from "react-intersection-observer";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import {
  FaCode,
  FaPaintBrush,
  FaFilter,
  FaExternalLinkAlt,
  FaChevronRight,
  FaGithub,
} from "react-icons/fa";
import ParallaxTilt from "./ParallaxTilt";

const projects = [
  {
    title: "Dev Electricals Storefront",
    image: "/Screenshot from 2025-04-15 19-38-28.png",
    tags: ["Web", "E-Commerce"],
    description:
      "Customer-facing e-commerce website with smooth browsing, filtering, and checkout. Fully responsive and visually striking.",
    link: "https://develectricals.onrender.com/",
    techStack: [
      "Mongodb",
      "Node",
      "Express",
      "React",
      "Tailwindcss",
      "auth0",
      "Framer Motion",
      "Redux",
      "Figma",
    ],
    github: "https://github.com/chauhan-varun/dev-electricals",
  },
  {
    title: "Eth Lotto",
    image: "/eth-lotto.png",
    tags: ["Web3", "Ethereum", "blockchain"],
    description: "A decentralized and verifiably random raffle system built on Ethereum using Solidity, Foundry, and Chainlink VRF + Automation.",
    link: "https://ethlotto.site",
    techStack: [
      "Solidity",
      "Next.js",
      "Tailwindcss",
      "Shadcn UI",
      "wagmi",
      "viem",
      "rainbowkit"
    ],
    github: "https://github.com/chauhan-varun/foundry-lottery",
  },
  {
    title: "Aeris Weather App",
    image: "/aeris-weather-app.png",
    tags: ["Web", "Weather", "UI/UX"],
    description:
      "A sleek weather application with real-time forecasts, interactive maps, and location tracking. Provides detailed weather information with beautiful visualizations.",
    link: "https://aerisapp.onrender.com/",
    techStack: [
      "React",
      "TanStack Query",
      "Typescript",
      "Shadcn UI",
      "Graph QL",
    ],
    github: "https://github.com/chauhan-varun/aeris-weather-app",
  },
  {
    title: "Fizzy Crave",
    image: "/fizzy-crave-e-commerce-website.png",
    tags: ["Web", "E-Commerce", "UI/UX"],
    description:
      "An elegant e-commerce platform for beverages with smooth animations, intuitive product filtering, and secure checkout process. Fully responsive design.",
    link: "https://fizzycrave.onrender.com/",
    techStack: [
      "React",
      "Node",
      "MongoDB",
      "Shadcn UI",
      "Tailwindcss",
      "Paypal SDK",
    ],
    github: "https://github.com/chauhan-varun/fizzycrave",
  },

  {
    title: "iChat (Real-time Chat App)",
    image: "/Screenshot from 2025-04-15 19-38-18.png",
    tags: ["Web", "Chat", "Realtime"],
    description:
      "Modern chat app with real-time messaging, emoji reactions, and beautiful animations. Secure and scalable.",
    link: "https://ichat-cobn.onrender.com/",
    techStack: ["React", "WebRTC", "Realtime", "DaizyUI"],
    github: "https://github.com/chauhan-varun/ichat",
  },
  {
    title: "Ad-Free YouTube",
    image: "/Screenshot from 2025-04-15 19-38-13.png",
    tags: ["Web", "Entertainment"],
    description:
      "A custom YouTube front-end that removes ads for a seamless viewing experience. Fast, clean, and privacy-focused.",
    link: "https://adfreeyoutube.onrender.com/",
    techStack: ["React", "Javascript", "Youtube-API"],
    github: "https://github.com/chauhan-varun/youtube-clone",
  },
];

const filterTags = [
  ...new Set(["All", ...projects.flatMap((project) => project.tags)]),
];

export default function Portfolio() {
  const [selectedTag, setSelectedTag] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState(-1);
  const [showBts, setShowBts] = useState(false);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [100, 0, 0, 100]);

  const filtered =
    selectedTag === "All"
      ? projects
      : projects.filter((p) => p.tags.includes(selectedTag));

  return (
    <section
      id="portfolio"
      ref={containerRef}
      className="relative py-24 overflow-hidden bg-gray-50 dark:bg-gray-900"
    >
      {/* Background particles/decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-64 h-64 rounded-full -top-20 -right-20 bg-indigo-300/20 dark:bg-indigo-700/10 blur-3xl"></div>
        <div className="absolute rounded-full -bottom-40 -left-20 w-80 h-80 bg-indigo-200/20 dark:bg-indigo-800/10 blur-3xl"></div>
      </div>

      <motion.div
        className="relative z-10 max-w-6xl px-4 mx-auto"
        style={{ opacity, y }}
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-12"
        >
          <h2 className="mb-6 text-3xl font-extrabold text-center text-gray-900 md:text-5xl dark:text-white">
            Portfolio
          </h2>
          <p className="max-w-2xl mx-auto text-center text-gray-600 dark:text-gray-300">
            Explore my latest projects with innovative UI/UX and interactions.
            Each project showcases modern web technologies and creative
            solutions.
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
            className="flex items-center px-4 py-2 font-medium text-indigo-700 transition-all bg-indigo-100 rounded-full dark:bg-indigo-900/40 dark:text-indigo-300 hover:bg-indigo-200 dark:hover:bg-indigo-800/60 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
          >
            {showBts ? "Hide" : "Show"} Tech Stack
            <span
              className={`ml-2 transition-transform duration-300 ${
                showBts ? "rotate-90" : ""
              }`}
            >
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
          className="flex flex-wrap justify-center gap-2 px-2 my-8 md:px-0 md:gap-3 md:my-12"
        >
          {filterTags.map((tag, idx) => (
            <motion.button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-3 py-1.5 md:px-5 md:py-2 text-sm rounded-full font-medium border shadow-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                selectedTag === tag
                  ? "bg-indigo-500 text-white border-indigo-500 shadow-indigo-500/30"
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border-gray-200 dark:border-gray-700 hover:bg-indigo-100 dark:hover:bg-indigo-900/50"
              }`}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 20px -10px rgba(99, 102, 241, 0.3)",
              }}
              whileTap={{ scale: 0.97 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
            >
              {tag === "All" ? <FaFilter className="inline mr-2" /> : null}
              {tag}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid - Unified Layout */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 md:gap-8">
          <AnimatePresence mode="wait">
            {filtered.map((project, idx) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 60 }}
                transition={{ duration: 0.5, delay: idx * 0.07 }}
                className="project-card" // For cursor effect
              >
                <ParallaxTilt>
                  <motion.div
                    className="h-full overflow-hidden bg-white shadow-lg dark:bg-gray-800 rounded-2xl"
                    whileHover={{
                      y: -5,
                      boxShadow:
                        "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                      transition: { duration: 0.3 },
                    }}
                  >
                    <div className="relative overflow-hidden">
                      <motion.img
                        src={project.image}
                        alt={project.title}
                        className="object-cover w-full h-56 cursor-pointer"
                        whileHover={{ scale: 1.05, filter: "brightness(1.1)" }}
                        transition={{ duration: 0.4 }}
                        onClick={() => setLightboxIndex(idx)}
                      />
                      <div className="absolute inset-0 flex flex-col justify-end p-4 transition-opacity duration-300 opacity-100 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                        <h3 className="flex items-center gap-2 mb-1 text-xl font-bold text-indigo-100 drop-shadow-md">
                          {project.title}
                          <motion.a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.2, rotate: 5 }}
                            className="inline-block ml-2 text-indigo-200 hover:text-white link-like"
                            aria-label="Visit Website"
                          >
                            <FaExternalLinkAlt />
                          </motion.a>
                          <motion.a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.2, rotate: 5 }}
                            className="inline-block text-indigo-200 hover:text-white link-like"
                            aria-label="View Source on GitHub"
                          >
                            <FaGithub />
                          </motion.a>
                        </h3>
                        <p
                          className="text-sm text-indigo-50/90 drop-shadow-md animate-fade-in-up"
                          style={{ animationDelay: `${0.2 + idx * 0.05}s` }}
                        >
                          {project.description}
                        </p>
                      </div>
                      <motion.div
                        className="absolute flex gap-2 top-4 right-4"
                        whileHover={{ scale: 1.15 }}
                      >
                        {/* Removing duplicate link icons from the top-right corner */}
                      </motion.div>
                      <div className="absolute flex gap-2 top-4 left-4">
                        {project.tags.includes("Web") && (
                          <FaCode className="w-6 h-6 p-1 text-indigo-400 rounded-full bg-white/80" />
                        )}
                        {project.tags.includes("UI/UX") && (
                          <FaPaintBrush className="w-6 h-6 p-1 text-pink-400 rounded-full bg-white/80" />
                        )}
                      </div>
                    </div>

                    {/* Behind the scenes section */}
                    <AnimatePresence>
                      {showBts && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="p-4 border-t border-gray-200 dark:border-gray-700"
                        >
                          <h4 className="mb-2 text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                            Tech Stack
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {project.techStack?.map((tech, i) => (
                              <motion.span
                                key={tech}
                                className="flex items-center px-2 py-1 text-xs text-gray-700 bg-gray-100 rounded-lg dark:bg-gray-900 dark:text-gray-300"
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
          slides={filtered.map((p) => ({ src: p.image, alt: p.title }))}
          animation={{ swipe: 250 }}
          controller={{ closeOnBackdropClick: true }}
          className="lightbox-container"
        />
      </motion.div>
    </section>
  );
}
