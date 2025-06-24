import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Tooltip } from "react-tooltip";

// TechItem component for each technology in the cloud
function TechItem({ tech, position, speed = 1, index, showTooltips = true }) {
  const [hovered, setHovered] = useState(false);
  const [tooltipId] = useState(
    `tech-${tech.name.toLowerCase().replace(/\./g, "")}`
  );
  const Icon = tech.icon;

  // Create a unique animation path for each item
  const xMovement = Math.sin(index * 0.5) * 40;
  const yMovement = Math.cos(index * 0.7) * 30;

  // Different durations for more organic motion
  const animDuration = 4 + Math.random() * 3;

  return (
    <motion.div
      className="absolute transform -translate-x-1/2 -translate-y-1/2"
      style={{
        left: `${position[0]}%`,
        top: `${position[1]}%`,
        zIndex: hovered ? 10 : 1,
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: 1,
        scale: 1,
        x: [xMovement, -xMovement, xMovement],
        y: [yMovement, -yMovement, yMovement],
      }}
      transition={{
        opacity: { duration: 0.5, delay: index * 0.05 },
        scale: { duration: 0.5, delay: index * 0.05 },
        x: {
          repeat: Infinity,
          duration: animDuration,
          ease: "easeInOut",
          repeatType: "reverse",
        },
        y: {
          repeat: Infinity,
          duration: animDuration * 1.2,
          ease: "easeInOut",
          repeatType: "reverse",
        },
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      data-tooltip-id={tooltipId}
      data-tooltip-content={
        showTooltips ? `${tech.name}: ${tech.description}` : null
      }
      whileHover={{ scale: 1.2 }}
    >
      <motion.div
        className="rounded-full flex items-center justify-center"
        style={{
          backgroundColor: `${tech.color}15`,
          boxShadow: hovered ? `0 0 20px ${tech.color}40` : "none",
          padding: hovered ? "12px" : "8px",
          transition: "all 0.3s ease",
        }}
      >
        <Icon
          size={hovered ? 40 : 32}
          color={tech.color}
          className={`filter drop-shadow-lg transition-all duration-300 ${
            hovered ? "animate-pulse" : ""
          }`}
        />
      </motion.div>

      {/* Enhanced Tooltip with prominent name */}
      {showTooltips && (
        <Tooltip id={tooltipId} className="z-50 max-w-xs">
          <div className="p-2">
            <div className="font-bold text-base mb-1">{tech.name}</div>
            <div className="text-sm opacity-90">{tech.description}</div>
            <div className="text-xs mt-1 italic">
              Category:{" "}
              <span className="font-semibold capitalize">{tech.category}</span>
            </div>
          </div>
        </Tooltip>
      )}
    </motion.div>
  );
}

// Main component to replace ThreeJSCloud
export default function TechStackMotionCloud({
  technologies,
  showTooltips = true,
}) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Calculate positions in a more uniform distribution using the Golden Ratio
  const positionTechnologies = (techs) => {
    const phi = (1 + Math.sqrt(5)) / 2; // Golden ratio
    const positions = [];

    for (let i = 0; i < techs.length; i++) {
      // Use the golden ratio to distribute points more evenly
      const theta = (2 * Math.PI * i) / phi;
      const radius = 40 * Math.sqrt(i / techs.length); // Gradually increasing radius

      // Convert to cartesian coordinates (centered at 50%)
      const x = 50 + radius * Math.cos(theta);
      const y = 50 + radius * Math.sin(theta);

      positions.push([x, y]);
    }

    return positions;
  };

  const positions = positionTechnologies(technologies);

  return (
    <div
      ref={ref}
      className="relative h-[400px] md:h-[550px] w-full overflow-hidden"
    >
      {/* Dynamic background gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-indigo-100/30 to-transparent dark:from-indigo-900/10 dark:to-transparent"></div>

      {/* Animated tech icons */}
      {technologies.map((tech, idx) => (
        <TechItem
          key={tech.name}
          tech={tech}
          position={positions[idx]}
          speed={0.2 + Math.random() * 0.3}
          index={idx}
          showTooltips={showTooltips}
        />
      ))}

      {/* Create floating particle effects for depth */}
      {Array.from({ length: 20 }).map((_, idx) => (
        <motion.div
          key={`particle-${idx}`}
          className="absolute rounded-full bg-gray-200 dark:bg-gray-700"
          style={{
            width: Math.random() * 4 + 2,
            height: Math.random() * 4 + 2,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.5 + 0.1,
          }}
          animate={{
            y: [0, -(Math.random() * 100 + 50)],
            x: [(Math.random() - 0.5) * 20, (Math.random() - 0.5) * 40],
            opacity: [0.1, 0.4, 0.1],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}

      {/* Gradient overlay for better visibility */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-gray-50 dark:from-gray-900 via-transparent to-gray-50 dark:to-gray-900"></div>
    </div>
  );
}
