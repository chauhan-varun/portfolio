import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html, Float } from '@react-three/drei';
import { useState } from 'react';
import { Tooltip } from 'react-tooltip';

// TechItem component for each technology in the 3D space
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
    <Float 
      speed={1.5} 
      rotationIntensity={0.5} 
      floatIntensity={0.5}
      floatingRange={[-0.1, 0.1]}
    >
      <mesh 
        ref={meshRef} 
        position={position}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <Html
          as='div'
          center
          style={{
            width: 'auto',
            height: 'auto',
            cursor: 'pointer',
            userSelect: 'none'
          }}
          data-tooltip-id={tooltipId}
          data-tooltip-content={tech.description}
        >
          <div 
            className="transition-all duration-300"
            style={{
              transform: hovered ? 'scale(1.2)' : 'scale(1)',
              padding: hovered ? '12px' : '8px',
              borderRadius: '50%',
              backgroundColor: `${tech.color}15`,
              boxShadow: hovered ? `0 0 20px ${tech.color}40` : 'none',
              zIndex: -1
            }}
          >
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

// Scene component containing all tech items
function Scene({ technologies }) {
  return (
    <group>
      {technologies.map((tech, idx) => {
        // Calculate 3D positions in a spherical arrangement
        const phi = Math.acos(-1 + (2 * idx) / technologies.length);
        const theta = Math.sqrt(technologies.length * Math.PI) * phi;
        const radius = 5; // Radius for cloud view
        
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

// Main ThreeJS component
export default function ThreeJSCloud({ technologies }) {
  return (
    <div className="relative h-[400px] md:h-[550px] w-full">
      <Canvas 
        camera={{ position: [0, 0, 15], fov: 50 }}
        dpr={[1, 2]}
        className="!touch-none"
        performance={{ min: 0.5 }} // Performance optimization
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Scene technologies={technologies} />
      </Canvas>
      
      {/* Gradient overlay for better visibility */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-gray-50 dark:from-gray-900 via-transparent to-gray-50 dark:to-gray-900"></div>
    </div>
  );
}
