"use client";

import React, { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text, Float, OrbitControls, Stars, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";
import { useSkillsContext } from "../about/SkillsContext";
import { SkillCategory } from "../about/skillCategories";

function Skill({ word, position, color: textColor = "#e2e8f0", ...props }: { word: string; position: THREE.Vector3; color?: string }) {
  const fontProps = {
    // Standard system-like font weight and size for better legibility in 3D
    fontSize: 0.35,
    letterSpacing: -0.02,
    lineHeight: 1,
    'material-toneMapped': false,
  };
  
  const [hovered, setHovered] = useState(false);
  const ref = useRef<THREE.Group>(null);

  // Billboard effect: Make text always face the camera
  useFrame((state) => {
    if (ref.current) {
      ref.current.quaternion.copy(state.camera.quaternion);
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <group position={position} ref={ref}>
        <Text
          {...fontProps}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          color={hovered ? "#a78bfa" : textColor}
          {...props}
        >
          {word}
        </Text>
      </group>
    </Float>
  );
}

function Cloud({ category }: { category: SkillCategory | "all" }) {
  const { filteredSkills } = useSkillsContext();
  
  const skillsToDisplay = useMemo(() => {
    if (category === "all") {
      // In "all" mode, we might want to limit the count for performance
      // or show everything if the list is manageable
      const all = [];
      if (filteredSkills.type === "category") {
          // If we don't have global filters, show current category + some others? 
          // Actually let's just show what's in the context
          return filteredSkills.skills.map(s => s.name);
      } else {
          return filteredSkills.skills.map(s => s.skill.name);
      }
    }
    
    // If a specific category is requested, use it from the context if matches or filter manually
    if (filteredSkills.type === "category") {
        return filteredSkills.skills.map(s => s.name);
    } else {
        return filteredSkills.skills
            .filter(s => s.category === category)
            .map(s => s.skill.name);
    }
  }, [category, filteredSkills]);

  const radius = 5;
  const words = useMemo(() => {
    const temp = [];
    const count = skillsToDisplay.length;
    
    for (let i = 0; i < count; i++) {
      // Use golden ratio to distribute points evenly on sphere (Fibonacci Sphere)
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;
      
      const pos = new THREE.Vector3().setFromSpherical(new THREE.Spherical(radius, phi, theta));
      temp.push({ pos, word: skillsToDisplay[i] });
    }
    return temp;
  }, [skillsToDisplay]);

  return (
    <>
      {words.map((item, index) => (
        <Skill key={`${category}-${item.word}-${index}`} position={item.pos} word={item.word} />
      ))}
    </>
  );
}

export default function SkillGlobe() {
  const { activeCategory, setActiveCategory, categoryLabels } = useSkillsContext();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="w-full h-[600px] flex flex-col items-center relative">
      {/* Local Category Filter Overlay */}
      <div className="absolute top-4 z-30 flex flex-wrap justify-center gap-2 max-w-[90%] pointer-events-auto">
        {(Object.keys(categoryLabels) as SkillCategory[]).map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all border ${
              activeCategory === cat
                ? "bg-galaxy-plasma text-white border-galaxy-plasma shadow-lg shadow-galaxy-plasma/20"
                : "bg-galaxy-void/60 text-galaxy-text-muted border-white/10 hover:border-white/30 hover:text-white"
            }`}
          >
            {categoryLabels[cat]}
          </button>
        ))}
      </div>

      <div className="w-full grow cursor-grab active:cursor-grabbing">
        <Canvas dpr={[1, 2]}>
          <PerspectiveCamera makeDefault position={[0, 0, 12]} />
          <fog attach="fog" args={["#060010", 0, 25]} />
          <ambientLight intensity={0.8} />
          <pointLight position={[10, 10, 10]} intensity={1.5} />
          
          <group rotation={[0, 0, 0]}>
            <Cloud category={activeCategory} />
          </group>

          <OrbitControls
            enablePan={false}
            enableZoom={true}
            autoRotate
            autoRotateSpeed={0.8}
            minDistance={5}
            maxDistance={15}
            makeDefault
          />
          <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />
        </Canvas>
      </div>
      
      {/* Interactive Hint */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none opacity-40 text-[10px] text-galaxy-text-muted uppercase tracking-widest bg-galaxy-void/50 px-4 py-1 rounded-full border border-white/5">
        Drag to Rotate • Scroll to Zoom
      </div>

      {/* Decorative Core */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-10 blur-3xl w-64 h-64 bg-galaxy-glow rounded-full -z-10" />
    </div>
  );
}
