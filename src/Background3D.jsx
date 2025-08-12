import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// Custom hook to detect the current theme
const useTheme = () => {
  const [theme, setTheme] = useState('dark');
  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          const isDark = document.documentElement.classList.contains('dark');
          setTheme(isDark ? 'dark' : 'light');
        }
      });
    });
    observer.observe(document.documentElement, { attributes: true });
    const isDark = document.documentElement.classList.contains('dark');
    setTheme(isDark ? 'dark' : 'light');
    return () => observer.disconnect();
  }, []);
  return theme;
};

// Component for the dark-mode particle background
const Particles = ({ theme }) => {
  const meshRef = useRef();
  const particleCount = 5000;
  const particleColor = theme === 'dark' ? '#ffffff' : '#333333';
  const positions = useMemo(() => {
    const p = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      p[i3] = (Math.random() - 0.5) * 100;
      p[i3 + 1] = (Math.random() - 0.5) * 100;
      p[i3 + 2] = (Math.random() - 0.5) * 100;
    }
    return p;
  }, []);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.05;
      meshRef.current.rotation.x = t * 0.02;
    }
  });
  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          itemSize={3}
          array={positions}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.15}
        color={particleColor}
        sizeAttenuation={true}
        transparent={true}
        opacity={0.6}
        depthWrite={false}
      />
    </points>
  );
};

// New component for the light-mode geometric shapes background
const FloatingShapes = () => {
  const shapesRef = useRef([]);
  const shapes = useMemo(() => {
    return Array.from({ length: 15 }, () => ({
      position: [
        (Math.random() - 0.5) * 80,
        (Math.random() - 0.5) * 80,
        (Math.random() - 0.5) * 80,
      ],
      rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI],
      speed: Math.random() * 0.005 + 0.001,
      size: Math.random() * 2 + 1,
    }));
  }, []);

  useFrame(({ clock }) => {
    shapesRef.current.forEach((mesh, i) => {
      if (mesh) {
        mesh.rotation.x += shapes[i].speed;
        mesh.rotation.y += shapes[i].speed * 1.5;
        mesh.position.y += Math.sin(clock.getElapsedTime() * 0.5 + i) * 0.05;
      }
    });
  });

  return (
    <group>
      {shapes.map((shape, i) => (
        <mesh
          key={i}
          ref={(el) => (shapesRef.current[i] = el)}
          position={shape.position}
          rotation={shape.rotation}
        >
          <boxGeometry args={[shape.size, shape.size, shape.size]} />
          <meshStandardMaterial color="#A9A9A9" roughness={0.5} metalness={0.8} />
        </mesh>
      ))}
    </group>
  );
};

const Background3D = () => {
  const theme = useTheme();
  const backgroundColor = theme === 'dark' ? '#0A0A10' : '#F0F8FF';

  return (
    <Canvas
      camera={{ position: [0, 0, 100] }}
      style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 0,
      }}
    >
      <color attach="background" args={[backgroundColor]} />
      <ambientLight intensity={0.5} />
      <pointLight position={[50, 50, 50]} intensity={1.2} />
      
      {theme === 'dark' ? <Particles theme={theme} /> : <FloatingShapes />}
      
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.2}
      />
    </Canvas>
  );
};

export default Background3D;