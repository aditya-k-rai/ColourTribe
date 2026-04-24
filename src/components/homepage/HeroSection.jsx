import React, { useRef, Suspense, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles, Environment } from '@react-three/drei';
import { motion } from 'framer-motion';
import { ChevronDown, ArrowRight, Play } from 'lucide-react';
import { Link } from 'react-router-dom';

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

const HeroSection = () => {
  const headlineWords = ["Dress", "Your", "Workforce", "in", "Style."];

  return (
    <section className="relative w-full h-[100svh] overflow-hidden flex flex-col items-center justify-center bg-[#070d17]">
      
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Suspense fallback={
          <div className="w-full h-full bg-gradient-to-br from-navy to-[#050a12]" />
        }>
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
        </Suspense>
      </div>

      {/* Depth Gradients */}
      <div className="absolute inset-x-0 bottom-0 h-2/3 z-10 bg-gradient-to-t from-[#070d17] to-transparent pointer-events-none"></div>
      <div className="absolute inset-0 z-10 bg-navy/20 pointer-events-none backdrop-blur-[1px]"></div>

      {/* Content Layer */}
      <div className="relative z-20 container mx-auto px-6 lg:px-12 flex justify-center mt-12 md:max-w-6xl w-full">
        <div className="flex flex-col items-center md:items-start text-center md:text-left w-full relative">
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold/30 bg-navy/40 backdrop-blur-md mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-gold animate-pulse"></span>
            <span className="text-gold uppercase tracking-widest text-xs font-bold">Premium B2B Uniforms</span>
          </motion.div>

          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.1] mb-8 w-full max-w-4xl drop-shadow-2xl flex flex-wrap justify-center md:justify-start gap-x-4 gap-y-2">
            {headlineWords.map((word, index) => {
              const isGold = word === "Workforce";
              return (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{
                    duration: 0.8,
                    delay: 0.2 + (index * 0.15),
                    ease: [0.2, 0.65, 0.3, 0.9]
                  }}
                  className={
                    isGold 
                      ? "text-transparent bg-clip-text pb-2 animate-shimmer bg-[length:200%_auto]" 
                      : "text-white"
                  }
                  style={isGold ? {
                    backgroundImage: 'linear-gradient(90deg, #d4af37 0%, #fff4cc 40%, #aa8529 60%, #d4af37 100%)',
                    backgroundSize: '200% auto',
                  } : undefined}
                >
                  {word}
                </motion.span>
              );
            })}
          </h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
            className="text-white/80 text-lg md:text-xl font-light max-w-2xl mb-12 leading-relaxed"
          >
            Elevate your brand with custom-tailored uniforms designed for comfort, durability, and a flawless first impression. <span className="font-bold text-white">Minimum order: 10 pieces.</span>
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1.2, type: "spring" }}
            className="flex flex-col sm:flex-row items-center gap-6 w-full justify-center md:justify-start"
          >
            <Link to="/products" className="group relative flex items-center justify-center gap-3 bg-gradient-to-r from-gold to-[#aa8529] text-navy font-bold py-4 px-10 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_40px_rgba(201,168,76,0.4)] overflow-hidden">
              <div className="absolute inset-0 w-full h-full bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-500 ease-out skew-x-12"></div>
              <span className="relative z-10 text-[15px] uppercase tracking-wider">Explore Catalogue</span>
              <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link to="/contact" className="group flex items-center gap-4 text-white hover:text-gold transition-colors duration-300">
              <div className="w-14 h-14 rounded-full border border-white/30 flex items-center justify-center bg-white/5 backdrop-blur-md group-hover:border-gold group-hover:bg-gold/10 transition-all">
                <Play className="w-5 h-5 ml-1" fill="currentColor" />
              </div>
              <span className="font-semibold tracking-wide uppercase text-sm">Watch Factory Tour</span>
            </Link>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.8 }}
            className="mt-16 flex flex-wrap gap-8 justify-center md:justify-start pt-8 border-t border-white/10 w-full max-w-3xl"
          >
            {[
              { num: "500+", label: "Businesses Served" },
              { num: "100%", label: "In-House Made" },
              { num: "7-Day", label: "Fast Delivery" }
            ].map((stat, i) => (
              <div key={i} className="flex flex-col">
                <span className="font-display font-bold text-2xl text-gold">{stat.num}</span>
                <span className="text-xs uppercase tracking-widest text-white/50">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Floating scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ duration: 1, delay: 2.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center gap-2 backdrop-blur-sm bg-navy/20 px-4 py-2 rounded-full border border-white/5"
      >
        <span className="text-[10px] text-white/50 uppercase tracking-widest">Scroll</span>
        <motion.div
           animate={{ y: [0, 6, 0] }}
           transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="text-gold w-5 h-5" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
