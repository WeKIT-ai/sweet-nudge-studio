import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface VideoHeroProps {
  videoUrl: string;
  children: React.ReactNode;
  className?: string;
}

export default function VideoHero({ videoUrl, children, className = "" }: VideoHeroProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div ref={ref} className={`relative min-h-screen overflow-hidden ${className}`}>
      {/* Video background with parallax */}
      <motion.div style={{ y }} className="absolute inset-0 -top-[10%] -bottom-[10%]">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover"
          poster=""
        >
          <source src={videoUrl} type="video/mp4" />
        </video>
      </motion.div>

      {/* Gradient overlay */}
      <div className="video-overlay" />

      {/* Content */}
      <motion.div style={{ opacity }} className="relative z-10 flex min-h-screen items-center">
        {children}
      </motion.div>
    </div>
  );
}
