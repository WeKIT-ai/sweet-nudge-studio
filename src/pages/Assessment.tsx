import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Undo2, Lock, Sparkles } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { type AgeGroup, weekitQuestions, LIKERT_OPTIONS } from "@/data/weekitQuestions";
import AgeSelect from "@/components/assessment/AgeSelect";
import AssessmentInstructions from "@/components/assessment/AssessmentInstructions";
import AssessmentComplete from "@/components/assessment/AssessmentComplete";
import SwipeCard from "@/components/assessment/SwipeCard";
import WeKitLogo from "@/components/WeKitLogo";
import { supabase } from "@/integrations/supabase/client";

type Phase = "payment-gate" | "age-select" | "instructions" | "testing" | "completed";

const Assessment = () => {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<Phase>("payment-gate");
  const [checkingPayment, setCheckingPayment] = useState(true);
  const [ageGroup, setAgeGroup] = useState<AgeGroup>("18+");
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [timeLeft, setTimeLeft] = useState(12 * 60);
  const [history, setHistory] = useState<number[]>([]);

  const totalQ = weekitQuestions.length;
  const answeredCount = Object.keys(answers).length;
  const progressPct = (answeredCount / totalQ) * 100;

  // Check payment status on mount
  useEffect(() => {
    const checkPayment = async () => {
      const email = localStorage.getItem("wekit_payment_email");
      if (!email) {
        setCheckingPayment(false);
        return;
      }

      const { data } = await supabase
        .from("payments")
        .select("payment_status")
        .eq("email", email)
        .eq("payment_status", "success")
        .limit(1);

      if (data && data.length > 0) {
        setPhase("age-select");
      }
      setCheckingPayment(false);
    };
    checkPayment();
  }, []);

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
    const prevId = weekitQuestions[prevQ].id;
    setAnswers((prev) => {
      const next = { ...prev };
      delete next[prevId];
      return next;
    });
    setCurrentQ(prevQ);
  }, [history]);

  if (checkingPayment) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Verifying access...</div>
      </div>
    );
  }

  if (phase === "payment-gate") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <Card className="border-border/50 bg-card/80 backdrop-blur text-center">
            <CardContent className="pt-10 pb-8 px-6 space-y-6">
              <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <Lock className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h1 className="font-display text-xl sm:text-2xl font-bold text-foreground mb-2">
                  Assessment Locked
                </h1>
                <p className="text-muted-foreground text-sm">
                  You must purchase the WeKIT assessment to continue.
                </p>
              </div>
              <Button
                onClick={() => navigate("/payment")}
                className="w-full h-12 text-base font-semibold"
                size="lg"
              >
                <Sparkles className="h-5 w-5" />
                Unlock Assessment — ₹1,500
              </Button>
              <div className="pt-4 border-t border-border/50">
                <WeKitLogo size="sm" />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

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
      <header className="sticky top-0 z-50 border-b border-border/50 bg-background/95 backdrop-blur">
        <div className="flex items-center justify-between px-4 py-2.5">
          <div className="flex items-center gap-2">
            <WeKitLogo size="sm" />
            <span className="font-display font-semibold text-foreground text-xs sm:text-sm hidden sm:inline">
              Career Clarity 360
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant={timeLeft < 120 ? "destructive" : "secondary"} className="gap-1 font-mono text-[10px] sm:text-xs px-2 py-0.5">
              <Clock className="h-3 w-3" /> {formatTime(timeLeft)}
            </Badge>
            <Badge variant="outline" className="text-[10px] sm:text-xs px-2 py-0.5">{answeredCount}/{totalQ}</Badge>
          </div>
        </div>
        <Progress value={progressPct} className="h-1 rounded-none" />
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-4 py-6 sm:py-12">
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

        <div className="mt-6 sm:mt-12 w-full max-w-sm space-y-3">
          <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
            {LIKERT_OPTIONS.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleSwipeAnswer(i)}
                className={`rounded-lg px-1 py-3 sm:py-2 text-[10px] sm:text-[11px] font-medium border transition-all min-h-[48px] active:scale-95
                  ${answers[question.id] === i
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border text-muted-foreground hover:border-primary/30 hover:text-foreground"
                  }`}
              >
                {opt.replace("Strongly ", "Str. ")}
              </button>
            ))}
          </div>
          <div className="flex justify-center">
            <Button
              variant="outline"
              size="sm"
              onClick={handleUndo}
              disabled={history.length === 0}
              className="gap-1 min-h-[44px] px-6"
            >
              <Undo2 className="h-3.5 w-3.5" /> Undo
            </Button>
          </div>
        </div>

        <p className="mt-3 text-[10px] sm:text-xs text-muted-foreground text-center max-w-xs">
          Swipe: ← Disagree · → Agree · ↑ Strongly Agree · ↓ Strongly Disagree · Tap for Neutral
        </p>
      </main>
    </div>
  );
};

export default Assessment;
