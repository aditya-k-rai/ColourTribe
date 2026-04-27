import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles, Environment } from '@react-three/drei';
import * as THREE from 'three';

// Optimized Shader-based Cloth for GPU performance
const OrganicClothMesh = () => {
  const meshRef = useRef();
  
  // Custom Shader Material for extreme performance (GPU-based vertex displacement)
  const shaderArgs = useMemo(() => ({
    uniforms: {
      uTime: { value: 0 },
      uColor: { value: new THREE.Color("#0f1b2d") },
    },
    vertexShader: `
      uniform float uTime;
      varying vec2 vUv;
      varying vec3 vNormal;
      varying vec3 vPosition;

      void main() {
        vUv = uv;
        vec3 pos = position;
        
        // Multi-layered waves calculated on GPU
        float wave1 = sin(pos.x * 0.2 + uTime * 0.4) * 1.5;
        float wave2 = cos(pos.y * 0.3 - uTime * 0.4) * 1.5;
        float wave3 = sin((pos.x + pos.y) * 0.15 + uTime * 0.6) * 1.0;
        
        pos.z += wave1 + wave2 + wave3;
        vPosition = pos;
        vNormal = normal;

        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `,
    fragmentShader: `
      uniform vec3 uColor;
      varying vec2 vUv;
      varying vec3 vNormal;
      varying vec3 vPosition;

      void main() {
        // Subtle gradient based on position for a premium silk look
        float intensity = vNormal.z;
        vec3 finalColor = mix(uColor * 0.5, uColor * 1.2, intensity);
        
        // Add fake highlights for metallic sheen
        float highlight = pow(max(0.0, dot(vNormal, vec3(0.0, 0.0, 1.0))), 8.0);
        finalColor += highlight * 0.2;
        
        gl_FragColor = vec4(finalColor, 1.0);
      }
    `
  }), []);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.material.uniforms.uTime.value = state.clock.getElapsedTime();
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh ref={meshRef} rotation={[-Math.PI / 2 + 0.3, 0, 0]} position={[0, -2, -10]}>
        <planeGeometry args={[45, 45, 128, 128]} />
        <shaderMaterial 
          args={[shaderArgs]} 
          side={THREE.DoubleSide}
          transparent
        />
      </mesh>
    </Float>
  );
};

const HeroScene = () => {
  return (
    <Canvas 
      camera={{ position: [0, 0, 12], fov: 45 }} 
      gl={{ 
        antialias: true,
        powerPreference: "high-performance"
      }}
      dpr={[1, 2]} // Performance: limit pixel ratio on high-res screens
    >
      <ambientLight intensity={0.4} />
      
      <pointLight position={[15, 15, 5]} color="#c9a84c" intensity={150} />
      <pointLight position={[-15, -10, 5]} color="#2a7a4b" intensity={50} />
      
      <OrganicClothMesh />
      
      <Sparkles count={80} scale={25} size={3} speed={0.4} opacity={0.3} color="#c9a84c" />
      <Environment preset="city" />
    </Canvas>
  );
};

export default HeroScene;
