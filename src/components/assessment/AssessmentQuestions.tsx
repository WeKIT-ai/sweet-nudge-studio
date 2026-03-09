import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Clock, Undo2 } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { LIKERT_OPTIONS } from "@/data/weekitQuestions";
import WeKitLogo from "@/components/WeKitLogo";

interface Props {
  currentQ: number;
  totalQ: number;
  answeredCount: number;
  questionText: string;
  questionId: number;
  trait: string;
  answers: Record<number, number>;
  onAnswer: (optionIndex: number) => void;
  onUndo: () => void;
  canUndo: boolean;
}

const ANSWER_STYLES = [
  { label: "Strongly Disagree", short: "Strongly Disagree", gradient: "from-destructive/10 to-destructive/5", border: "border-destructive/30", activeBorder: "border-destructive", activeGlow: "shadow-destructive/20" },
  { label: "Disagree", short: "Disagree", gradient: "from-warning/10 to-warning/5", border: "border-warning/30", activeBorder: "border-warning", activeGlow: "shadow-warning/20" },
  { label: "Neutral", short: "Neutral", gradient: "from-muted to-muted", border: "border-border", activeBorder: "border-foreground", activeGlow: "shadow-foreground/10" },
  { label: "Agree", short: "Agree", gradient: "from-info/10 to-info/5", border: "border-info/30", activeBorder: "border-info", activeGlow: "shadow-info/20" },
  { label: "Strongly Agree", short: "Strongly Agree", gradient: "from-primary/10 to-primary/5", border: "border-primary/30", activeBorder: "border-primary", activeGlow: "shadow-primary/20" },
];

export default function AssessmentQuestions({
  currentQ,
  totalQ,
  answeredCount,
  questionText,
  questionId,
  trait,
  answers,
  onAnswer,
  onUndo,
  canUndo,
}: Props) {
  const [timeLeft, setTimeLeft] = useState(12 * 60);
  const progressPct = (answeredCount / totalQ) * 100;
  const [selectedThisQ, setSelectedThisQ] = useState<number | null>(null);

  useEffect(() => {
    setSelectedThisQ(null);
  }, [currentQ]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((t) => (t <= 1 ? 0 : t - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  const handleSelect = (index: number) => {
    setSelectedThisQ(index);
    onAnswer(index);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col relative overflow-hidden">
      {/* Ambient background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/[0.02] blur-[150px]" />
      </div>

      {/* Header */}
      <header className="relative z-50 border-b border-border/30 bg-background/80 backdrop-blur-2xl">
        <div className="flex items-center justify-between px-5 sm:px-8 py-3">
          <div className="flex items-center gap-3">
            <WeKitLogo size="sm" />
            <span className="font-display font-semibold text-foreground text-sm hidden sm:inline">
              Career Clarity 360
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Badge
              variant={timeLeft < 120 ? "destructive" : "secondary"}
              className="gap-1.5 font-mono text-xs px-3 py-1"
            >
              <Clock className="h-3.5 w-3.5" /> {formatTime(timeLeft)}
            </Badge>
            <div className="text-xs text-muted-foreground font-mono">
              {answeredCount}/{totalQ}
            </div>
          </div>
        </div>
        <Progress value={progressPct} className="h-1 rounded-none" />
      </header>

      {/* Main content */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-5 sm:px-8 py-8 sm:py-12">
        {/* Step indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-8 text-center"
        >
          <p className="text-sm text-muted-foreground">
            Step <span className="text-foreground font-semibold">{currentQ + 1}</span> of{" "}
            <span className="text-foreground">{totalQ}</span>
          </p>
        </motion.div>

        {/* Question card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={questionId}
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.97 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-2xl"
          >
            {/* Trait badge */}
            <div className="flex justify-center mb-6">
              <Badge
                variant="outline"
                className="rounded-full px-4 py-1.5 text-xs font-medium border-border/50"
              >
                {trait}
              </Badge>
            </div>

            {/* Question text */}
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-foreground text-center leading-snug mb-10">
              {questionText}
            </h2>

            {/* Answer cards */}
            <div className="grid gap-3 sm:gap-4">
              {ANSWER_STYLES.map((style, i) => {
                const isSelected = selectedThisQ === i;
                return (
                  <motion.button
                    key={i}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.05, duration: 0.4 }}
                    onClick={() => handleSelect(i)}
                    className={`w-full rounded-xl border p-4 sm:p-5 text-left transition-all duration-300 group
                      ${isSelected
                        ? `${style.activeBorder} bg-gradient-to-r ${style.gradient} shadow-lg ${style.activeGlow}`
                        : `${style.border} bg-card/30 hover:bg-card/60 hover:border-foreground/20 hover:-translate-y-0.5 hover:shadow-md`
                      }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`h-5 w-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all duration-300
                        ${isSelected ? `${style.activeBorder} bg-foreground/10` : "border-border group-hover:border-foreground/30"}`}
                      >
                        {isSelected && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                            className="h-2.5 w-2.5 rounded-full bg-foreground"
                          />
                        )}
                      </div>
                      <span className={`font-medium text-sm sm:text-base transition-colors ${isSelected ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"}`}>
                        {style.label}
                      </span>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Undo button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8"
        >
          <Button
            variant="ghost"
            size="sm"
            onClick={onUndo}
            disabled={!canUndo}
            className="gap-2 text-muted-foreground hover:text-foreground rounded-full px-6"
          >
            <Undo2 className="h-4 w-4" /> Go Back
          </Button>
        </motion.div>
      </main>
    </div>
  );
}
