import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Clock, Sparkles, Lock, ChevronDown } from "lucide-react";
import WeKitLogo from "@/components/WeKitLogo";

interface Props {
  onStart: () => void;
  isLocked?: boolean;
}

export default function AssessmentHero({ onStart, isLocked }: Props) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      {/* Video background */}
      <div className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover"
        >
          <source
            src="https://videos.pexels.com/video-files/3209828/3209828-uhd_2560_1440_25fps.mp4"
            type="video/mp4"
          />
        </video>
      </div>

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[hsl(0,0%,0%,0.7)] via-[hsl(0,0%,0%,0.5)] to-[hsl(var(--background))]" />

      {/* Subtle animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[120px]"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-accent/5 blur-[100px]"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Navigation */}
      <header className="relative z-20 flex items-center justify-between px-6 py-5 sm:px-10">
        <WeKitLogo size="sm" />
      </header>

      {/* Hero content */}
      <div className="relative z-10 flex min-h-[calc(100vh-80px)] flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-[hsl(var(--glass-border))] bg-[hsl(var(--glass))] px-5 py-2.5 backdrop-blur-xl"
          >
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm text-muted-foreground">WeKIT™ Career Clarity 360</span>
          </motion.div>

          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-bold leading-[1.05] tracking-tight text-foreground">
            Discover Your{" "}
            <span className="gradient-text">Purpose</span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mx-auto mt-6 max-w-xl text-lg sm:text-xl text-muted-foreground leading-relaxed"
          >
            This career discovery assessment will help you explore your strengths,
            interests, and potential career pathways.
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mx-auto mt-10 flex items-center justify-center gap-8 sm:gap-12"
          >
            <div className="text-center">
              <p className="font-display text-2xl font-bold text-foreground">46</p>
              <p className="text-xs text-muted-foreground mt-1">Questions</p>
            </div>
            <div className="h-8 w-px bg-border" />
            <div className="text-center">
              <div className="flex items-center justify-center gap-1.5">
                <Clock className="h-4 w-4 text-primary" />
                <p className="font-display text-2xl font-bold text-foreground">10–12</p>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Minutes</p>
            </div>
            <div className="h-8 w-px bg-border" />
            <div className="text-center">
              <p className="font-display text-2xl font-bold text-foreground">3,300+</p>
              <p className="text-xs text-muted-foreground mt-1">Careers</p>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-12"
          >
            <Button
              onClick={onStart}
              size="lg"
              className="h-14 px-10 text-base font-semibold rounded-full hover-glow gap-2.5"
            >
              {isLocked ? (
                <>
                  <Lock className="h-5 w-5" />
                  Unlock Assessment — ₹1,500
                </>
              ) : (
                <>
                  <Sparkles className="h-5 w-5" />
                  Start Assessment
                </>
              )}
            </Button>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="h-6 w-6 text-muted-foreground" />
        </motion.div>
      </div>
    </div>
  );
}
