import { useState, useEffect, useCallback } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Clock, Undo2 } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { type AgeGroup, weekitQuestions, LIKERT_OPTIONS } from "@/data/weekitQuestions";
import AgeSelect from "@/components/assessment/AgeSelect";
import AssessmentInstructions from "@/components/assessment/AssessmentInstructions";
import AssessmentComplete from "@/components/assessment/AssessmentComplete";
import SwipeCard from "@/components/assessment/SwipeCard";
import WeKitLogo from "@/components/WeKitLogo";

type Phase = "age-select" | "instructions" | "testing" | "completed";

const Assessment = () => {
  const [phase, setPhase] = useState<Phase>("age-select");
  const [ageGroup, setAgeGroup] = useState<AgeGroup>("18+");
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [timeLeft, setTimeLeft] = useState(12 * 60);
  const [history, setHistory] = useState<number[]>([]);

  const totalQ = weekitQuestions.length;
  const answeredCount = Object.keys(answers).length;
  const progressPct = (answeredCount / totalQ) * 100;

  useEffect(() => {
    if (phase !== "testing") return;
    const timer = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) { setPhase("completed"); return 0; }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [phase]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  const handleSwipeAnswer = useCallback((optionIndex: number) => {
    const qId = weekitQuestions[currentQ].id;
    setAnswers((prev) => ({ ...prev, [qId]: optionIndex }));
    setHistory((prev) => [...prev, currentQ]);

    // Auto-advance
    setTimeout(() => {
      if (currentQ < totalQ - 1) {
        setCurrentQ((c) => c + 1);
      } else {
        setPhase("completed");
      }
    }, 300);
  }, [currentQ, totalQ]);

  const handleUndo = useCallback(() => {
    if (history.length === 0) return;
    const prevQ = history[history.length - 1];
    setHistory((h) => h.slice(0, -1));
    // Remove previous answer
    const prevId = weekitQuestions[prevQ].id;
    setAnswers((prev) => {
      const next = { ...prev };
      delete next[prevId];
      return next;
    });
    setCurrentQ(prevQ);
  }, [history]);

  if (phase === "age-select") {
    return <AgeSelect onSelect={(age) => { setAgeGroup(age); setPhase("instructions"); }} />;
  }

  if (phase === "instructions") {
    return <AssessmentInstructions totalQ={totalQ} onStart={() => setPhase("testing")} />;
  }

  if (phase === "completed") {
    return <AssessmentComplete answeredCount={answeredCount} totalQ={totalQ} answers={answers} />;
  }

  const question = weekitQuestions[currentQ];
  const questionText = question.variants[ageGroup];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/50 bg-background/95 backdrop-blur">
        <div className="container mx-auto flex items-center justify-between px-6 py-3">
          <div className="flex items-center gap-3">
            <WeKitLogo size="sm" />
            <span className="font-display font-semibold text-foreground text-sm">
              WeKIT™ Career Clarity 360
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant={timeLeft < 120 ? "destructive" : "secondary"} className="gap-1 font-mono text-xs">
              <Clock className="h-3 w-3" /> {formatTime(timeLeft)}
            </Badge>
            <Badge variant="outline" className="text-xs">{answeredCount}/{totalQ}</Badge>
          </div>
        </div>
        <Progress value={progressPct} className="h-1 rounded-none" />
      </header>

      {/* Swipe area */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={question.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="w-full flex justify-center"
          >
            <SwipeCard
              questionNumber={currentQ + 1}
              questionText={questionText}
              trait={question.trait}
              onAnswer={handleSwipeAnswer}
              totalQuestions={totalQ}
            />
          </motion.div>
        </AnimatePresence>

        {/* Controls */}
        <div className="mt-12 flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={handleUndo}
            disabled={history.length === 0}
            className="gap-1"
          >
            <Undo2 className="h-3.5 w-3.5" /> Undo
          </Button>
          <div className="flex gap-1">
            {LIKERT_OPTIONS.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleSwipeAnswer(i)}
                className={`rounded-md px-2.5 py-1.5 text-[11px] font-medium border transition-all
                  ${answers[question.id] === i
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border text-muted-foreground hover:border-primary/30 hover:text-foreground"
                  }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        <p className="mt-4 text-xs text-muted-foreground text-center max-w-xs">
          Swipe the card: ← Disagree · → Agree · ↑ Strongly Agree · ↓ Strongly Disagree · Tap for Neutral
        </p>
      </main>
    </div>
  );
};

export default Assessment;
