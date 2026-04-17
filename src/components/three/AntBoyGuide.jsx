import React, { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, ContactShadows, PerspectiveCamera } from '@react-three/drei';

/**
 * AntBoyModel - The 3D character that floats and responds to mouse movement
 */
const AntBoyModel = ({ mousePosition }) => {
  const groupRef = useRef();
  const floatOffsetRef = useRef(0);

  // Load model - always call hook unconditionally
  let loadedModel = null;
  try {
    const loaded = useGLTF('/models/Free_Ant_.glb');
    loadedModel = loaded?.scene;
  } catch (error) {
    console.warn('Failed to load model:', error);
  }

  // useFrame MUST be called unconditionally
  useFrame(({ clock }) => {
    if (!groupRef.current) return;

    // Floating animation - gentle bobbing motion
    floatOffsetRef.current = Math.sin(clock.getElapsedTime() * 1.5) * 0.15;
    groupRef.current.position.y = floatOffsetRef.current;

    // Mouse tracking - rotate towards mouse position
    if (mousePosition) {
      const targetRotationX = (mousePosition.y * 0.3) * 0.2;
      const targetRotationY = (mousePosition.x * 0.3) * 0.2;

      groupRef.current.rotation.x += (targetRotationX - groupRef.current.rotation.x) * 0.1;
      groupRef.current.rotation.y += (targetRotationY - groupRef.current.rotation.y) * 0.1;
    }
  });

  // Render fallback if model hasn't loaded yet
  if (!loadedModel) {
    return (
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial color="#0f766e" />
      </mesh>
    );
  }

  return (
    <group ref={groupRef} position={[0, 0, 0]} scale={1.2}>
      <primitive object={loadedModel} />
    </group>
  );
};

/**
 * AntBoyGuideCanvas - The 3D canvas with lighting and environment
 */
const AntBoyGuideCanvas = ({ mousePosition }) => {
  return (
    <Canvas
      camera={{ position: [0, 0.5, 3], fov: 45 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      dpr={[1, 1.5]}
      fallback={null}
    >
      {/* Ambient light */}
      <ambientLight intensity={0.6} color="#fff8dc" />

      {/* Main light */}
      <pointLight position={[5, 4, 5]} intensity={0.8} color="#ffe5b4" distance={20} />

      {/* Fill light */}
      <pointLight position={[-5, 2, 3]} intensity={0.4} color="#b0e0e6" distance={15} />

      {/* Camera */}
      <PerspectiveCamera makeDefault position={[0, 0.5, 3]} fov={45} near={0.1} far={1000} />

      {/* Ant Boy Model */}
      <Suspense fallback={null}>
        <AntBoyModel mousePosition={mousePosition} />
      </Suspense>

      {/* Shadow */}
      <ContactShadows position={[0, -1.2, 0]} scale={3} blur={2.5} far={4} opacity={0.6} />

      {/* Fog */}
      <fog attach="fog" args={['#f5f5f5', 5, 15]} />
    </Canvas>
  );
};

/**
 * AntBoyGuide - Main component with Tailwind wrapper
 */
export const AntBoyGuide = ({ position = 'right', height = 'h-96' }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isMobile) {
        setMousePosition({
          x: (e.clientX / window.innerWidth) * 2 - 1,
          y: -(e.clientY / window.innerHeight) * 2 + 1,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isMobile]);

  if (isMobile || error) {
    return null;
  }

  const positionClasses = {
    right: 'right-0 lg:right-4',
    left: 'left-0 lg:left-4',
    center: 'left-1/2 transform -translate-x-1/2',
  };

  return (
    <div
      className={`
        fixed bottom-0 ${positionClasses[position]} ${height} 
        pointer-events-none z-40
        hidden md:block
        max-w-xs lg:max-w-sm
      `}
    >
      <div className="w-full h-full relative">
        <ErrorBoundary onError={() => setError(true)}>
          <AntBoyGuideCanvas mousePosition={mousePosition} />
        </ErrorBoundary>
      </div>
    </div>
  );
};

/**
 * IntegratedAntBoyGuide - Embedded version for components
 */
export const IntegratedAntBoyGuide = ({ width = 'w-48', height = 'h-64' }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [error, setError] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      setMousePosition({ x, y });
    };

    container.addEventListener('mousemove', handleMouseMove);
    return () => container.removeEventListener('mousemove', handleMouseMove);
  }, []);

  if (error) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className={`${width} ${height} rounded-lg overflow-hidden shadow-lg pointer-events-auto`}
    >
      <ErrorBoundary onError={() => setError(true)}>
        <AntBoyGuideCanvas mousePosition={mousePosition} />
      </ErrorBoundary>
    </div>
  );
};

/**
 * Simple Error Boundary
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    console.error('AntBoy component error:', error);
    this.props.onError?.();
  }

  render() {
    if (this.state.hasError) {
      return null;
    }
    return this.props.children;
  }
}

export default AntBoyGuide;
