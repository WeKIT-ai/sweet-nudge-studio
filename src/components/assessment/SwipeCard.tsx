import { useState, useRef } from "react";
import { motion, useMotionValue, useTransform, PanInfo } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ThumbsUp, ThumbsDown, ChevronsUp, ChevronsDown, Circle } from "lucide-react";

interface SwipeCardProps {
  questionNumber: number;
  questionText: string;
  trait: string;
  onAnswer: (optionIndex: number) => void;
  totalQuestions: number;
}

const SWIPE_THRESHOLD = 100;
const VERTICAL_THRESHOLD = 80;

const DIRECTION_LABELS = [
  { direction: "left", label: "Disagree", icon: ThumbsDown, color: "text-destructive" },
  { direction: "right", label: "Agree", icon: ThumbsUp, color: "text-success" },
  { direction: "up", label: "Strongly Agree", icon: ChevronsUp, color: "text-primary" },
  { direction: "down", label: "Strongly Disagree", icon: ChevronsDown, color: "text-destructive" },
];

export default function SwipeCard({
  questionNumber,
  questionText,
  trait,
  onAnswer,
  totalQuestions,
}: SwipeCardProps) {
  const [exiting, setExiting] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotate = useTransform(x, [-300, 0, 300], [-15, 0, 15]);

  // Overlay opacities
  const leftOpacity = useTransform(x, [-SWIPE_THRESHOLD, -40, 0], [1, 0.3, 0]);
  const rightOpacity = useTransform(x, [0, 40, SWIPE_THRESHOLD], [0, 0.3, 1]);
  const upOpacity = useTransform(y, [-VERTICAL_THRESHOLD, -30, 0], [1, 0.3, 0]);
  const downOpacity = useTransform(y, [0, 30, VERTICAL_THRESHOLD], [0, 0.3, 1]);

  const handleDragEnd = (_: any, info: PanInfo) => {
    const { offset } = info;
    const absX = Math.abs(offset.x);
    const absY = Math.abs(offset.y);

    // Determine dominant direction
    if (absX > absY && absX > SWIPE_THRESHOLD) {
      // Horizontal swipe
      setExiting(true);
      const answer = offset.x > 0 ? 3 : 1; // Agree(3) or Disagree(1)
      setTimeout(() => onAnswer(answer), 200);
    } else if (absY > absX && absY > VERTICAL_THRESHOLD) {
      // Vertical swipe
      setExiting(true);
      const answer = offset.y < 0 ? 4 : 0; // Strongly Agree(4) or Strongly Disagree(0)
      setTimeout(() => onAnswer(answer), 200);
    }
  };

  const handleTap = () => {
    setExiting(true);
    setTimeout(() => onAnswer(2), 200); // Neutral
  };

  return (
    <div className="relative flex flex-col items-center w-full max-w-[340px] sm:max-w-sm">
      {/* Direction hints — hidden on very small screens */}
      <div className="absolute -top-8 left-1/2 -translate-x-1/2 items-center gap-1 text-[10px] text-muted-foreground/60 hidden sm:flex">
        <ChevronsUp className="h-3 w-3" /> Strongly Agree
      </div>
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 items-center gap-1 text-[10px] text-muted-foreground/60 hidden sm:flex">
        <ChevronsDown className="h-3 w-3" /> Strongly Disagree
      </div>
      <div className="absolute top-1/2 -left-20 -translate-y-1/2 items-center gap-1 text-[10px] text-muted-foreground/60 hidden md:flex">
        <ThumbsDown className="h-3 w-3" /> Disagree
      </div>
      <div className="absolute top-1/2 -right-16 -translate-y-1/2 items-center gap-1 text-[10px] text-muted-foreground/60 hidden md:flex">
        <ThumbsUp className="h-3 w-3" /> Agree
      </div>

      <motion.div
        drag
        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
        dragElastic={0.8}
        onDragEnd={handleDragEnd}
        onTap={handleTap}
        style={{ x, y, rotate }}
        animate={exiting ? { opacity: 0, scale: 0.8 } : { opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="w-full cursor-grab active:cursor-grabbing touch-none select-none"
      >
        <Card className="relative overflow-hidden border-border/50 shadow-xl">
          {/* Directional overlays */}
          <motion.div
            className="absolute inset-0 z-10 flex items-center justify-center rounded-lg bg-destructive/20"
            style={{ opacity: leftOpacity }}
          >
            <span className="rounded-lg border-2 border-destructive px-3 py-1.5 text-base sm:text-xl font-bold text-destructive rotate-12">
              DISAGREE
            </span>
          </motion.div>
          <motion.div
            className="absolute inset-0 z-10 flex items-center justify-center rounded-lg bg-success/20"
            style={{ opacity: rightOpacity }}
          >
            <span className="rounded-lg border-2 border-success px-3 py-1.5 text-base sm:text-xl font-bold text-success -rotate-12">
              AGREE
            </span>
          </motion.div>
          <motion.div
            className="absolute inset-0 z-10 flex items-center justify-center rounded-lg bg-primary/20"
            style={{ opacity: upOpacity }}
          >
            <span className="rounded-lg border-2 border-primary px-3 py-1.5 text-base sm:text-xl font-bold text-primary">
              STRONGLY AGREE
            </span>
          </motion.div>
          <motion.div
            className="absolute inset-0 z-10 flex items-center justify-center rounded-lg bg-destructive/20"
            style={{ opacity: downOpacity }}
          >
            <span className="rounded-lg border-2 border-destructive px-3 py-1.5 text-base sm:text-xl font-bold text-destructive">
              STRONGLY DISAGREE
            </span>
          </motion.div>

          <CardContent className="p-6 sm:p-8">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <Badge variant="outline" className="text-[10px] sm:text-xs font-medium">{trait}</Badge>
              <span className="text-[10px] sm:text-xs text-muted-foreground font-mono">
                {questionNumber}/{totalQuestions}
              </span>
            </div>

            <p className="font-display text-base sm:text-lg md:text-xl font-semibold leading-relaxed text-foreground min-h-[100px] sm:min-h-[120px] flex items-center">
              {questionText}
            </p>

            <div className="mt-6 sm:mt-8 flex items-center justify-center gap-2 text-[10px] sm:text-xs text-muted-foreground">
              <Circle className="h-3 w-3" /> Tap for Neutral
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
