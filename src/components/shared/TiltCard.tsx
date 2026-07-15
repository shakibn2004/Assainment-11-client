"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { MouseEvent, ReactNode } from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
}

export function TiltCard({ 
  children, 
  className,
  glowColor = "rgba(100, 100, 255, 0.15)"
}: TiltCardProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const x = clientX - left;
    const y = clientY - top;
    
    // Convert to percentage for tilt (-1 to 1)
    const xPct = (x / width - 0.5) * 2;
    const yPct = (y / height - 0.5) * 2;
    
    // Inverse for realistic tilt
    mouseX.set(xPct * -15);
    mouseY.set(yPct * 15);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <motion.div
      style={{
        rotateX: mouseY,
        rotateY: mouseX,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={twMerge(
        "relative rounded-2xl p-0.5 overflow-hidden group perspective-[1000px] transition-transform duration-200 ease-out",
        className
      )}
    >
      {/* Glow effect on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out pointer-events-none rounded-2xl"
           style={{
             background: `radial-gradient(600px circle at 50% 50%, ${glowColor}, transparent 40%)`
           }}
      />
      
      {/* Content wrapper */}
      <div 
        className="h-full w-full bg-card rounded-2xl relative z-10 p-6 flex flex-col border border-white/5 shadow-xl glass-card"
        style={{ transform: "translateZ(20px)" }}
      >
        {children}
      </div>
    </motion.div>
  );
}
