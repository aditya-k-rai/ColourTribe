import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles, Environment } from '@react-three/drei';

const OrganicClothMesh = () => {
  const meshRef = useRef();

  useFrame((state) => {
    if (!meshRef.current) return;
    
    // Slow elegant rotation
    meshRef.current.rotation.z += 0.0005;
    
    const time = state.clock.getElapsedTime() * 0.4;
    const position = meshRef.current.geometry.attributes.position;
    
    for (let i = 0; i < position.count; i++) {
       const x = position.getX(i);
       const y = position.getY(i);
       
       // Complex multi-layered sine waves for a rich, organic fabric fold effect
       const wave1 = Math.sin(x * 0.2 + time) * 1.5;
       const wave2 = Math.cos(y * 0.3 - time) * 1.5;
       const wave3 = Math.sin((x + y) * 0.15 + time * 1.5) * 1.0;
       
       const z = wave1 + wave2 + wave3;
       position.setZ(i, z);
    }
    
    // Smooth shading update
    position.needsUpdate = true;
    meshRef.current.geometry.computeVertexNormals();
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh ref={meshRef} rotation={[-Math.PI / 2 + 0.3, 0, 0]} position={[0, -2, -10]}>
        <planeGeometry args={[45, 45, 100, 100]} />
        {/* Luxury silk/satin material */}
        <meshPhysicalMaterial 
          color="#0f1b2d" 
          roughness={0.2} 
          metalness={0.8}
          clearcoat={0.3}
          clearcoatRoughness={0.1}
          reflectivity={1}
          side={2} // THREE.DoubleSide
        />
      </mesh>
    </Float>
  );
};

const HeroScene = () => {
  return (
    <Canvas camera={{ position: [0, 0, 12], fov: 45 }} gl={{ antialias: true }}>
      <ambientLight intensity={0.4} />
      
      {/* Dramatic lighting setup */}
      <pointLight position={[15, 15, 5]} color="#c9a84c" intensity={150} />
      <pointLight position={[-15, -10, 5]} color="#2a7a4b" intensity={50} />
      <spotLight position={[0, 10, 10]} color="#ffffff" intensity={80} angle={0.5} penumbra={1} />
      
      <OrganicClothMesh />
      
      {/* Ambient gold floating dust particles */}
      <Sparkles count={100} scale={25} size={3} speed={0.4} opacity={0.3} color="#c9a84c" />
      <Environment preset="city" />
    </Canvas>
  );
};

export default HeroScene;
