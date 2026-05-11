"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface AnimatedAvatarProps {
  name: string;
  className?: string;
  size?: number;
}

export const AnimatedAvatar = ({ name, className = "", size = 40 }: AnimatedAvatarProps) => {
  // Use DiceBear Avataaars with a seed based on the name
  const avatarUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf`;

  return (
    <motion.div
      className={`relative overflow-hidden rounded-full border border-white/10 shadow-sm ${className}`}
      style={{ width: size, height: size }}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ 
        scale: 1.1,
        rotate: [0, -5, 5, -5, 0],
        transition: { duration: 0.5 }
      }}
    >
      <motion.div
        animate={{
          y: [0, -2, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="w-full h-full"
      >
        <img
          src={avatarUrl}
          alt={name}
          width={size}
          height={size}
          className="w-full h-full object-cover"
        />
      </motion.div>
    </motion.div>
  );
};
