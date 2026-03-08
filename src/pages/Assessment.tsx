import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";
import { Brain, Clock, ChevronLeft, ChevronRight, Flag, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { type AgeGroup, weekitQuestions, LIKERT_OPTIONS } from "@/data/weekitQuestions";
import AgeSelect from "@/components/assessment/AgeSelect";
import AssessmentInstructions from "@/components/assessment/AssessmentInstructions";
import AssessmentComplete from "@/components/assessment/AssessmentComplete";

type Phase = "age-select" | "instructions" | "testing" | "completed";

const Assessment = () => {
  const [phase, setPhase] = useState<Phase>("age-select");
  const [ageGroup, setAgeGroup] = useState<AgeGroup>("18+");
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({}); // qId -> optionIndex
  const [flagged, setFlagged] = useState<Set<number>>(new Set());
  const [timeLeft, setTimeLeft] = useState(12 * 60);

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

  const handleAnswer = useCallback((optionIndex: number) => {
    setAnswers((prev) => ({ ...prev, [weekitQuestions[currentQ].id]: optionIndex }));
  }, [currentQ]);

  const toggleFlag = useCallback(() => {
    setFlagged((prev) => {
      const next = new Set(prev);
      const qId = weekitQuestions[currentQ].id;
      next.has(qId) ? next.delete(qId) : next.add(qId);
      return next;
    });
  }, [currentQ]);

  if (phase === "age-select") {
    return <AgeSelect onSelect={(age) => { setAgeGroup(age); setPhase("instructions"); }} />;
  }

  if (phase === "instructions") {
    return <AssessmentInstructions totalQ={totalQ} onStart={() => setPhase("testing")} />;
  }

  if (phase === "completed") {
    return <AssessmentComplete answeredCount={answeredCount} totalQ={totalQ} />;
  }

  const question = weekitQuestions[currentQ];
  const questionText = question.variants[ageGroup];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/50 bg-background/95 backdrop-blur">
        <div className="container mx-auto flex items-center justify-between px-6 py-3">
          <div className="flex items-center gap-3">
            <Brain className="h-5 w-5 text-primary" />
            <span className="font-display font-semibold text-foreground">Career Clarity 360</span>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant={timeLeft < 120 ? "destructive" : "secondary"} className="gap-1 font-mono">
              <Clock className="h-3.5 w-3.5" /> {formatTime(timeLeft)}
            </Badge>
            <Badge variant="outline">{answeredCount}/{totalQ} answered</Badge>
          </div>
        </div>
        <Progress value={progressPct} className="h-1 rounded-none" />
      </header>

      <main className="container mx-auto max-w-3xl px-6 py-8">
        {/* Question navigator */}
        <div className="mb-6 flex flex-wrap gap-1.5">
          {weekitQuestions.map((q, i) => (
            <button
              key={q.id}
              onClick={() => setCurrentQ(i)}
              className={`flex h-8 w-8 items-center justify-center rounded-md text-xs font-medium transition-all
                ${i === currentQ ? "bg-primary text-primary-foreground" : ""}
                ${i !== currentQ && answers[q.id] !== undefined ? "bg-accent/20 text-accent" : ""}
                ${i !== currentQ && answers[q.id] === undefined ? "bg-muted text-muted-foreground hover:bg-muted/80" : ""}
                ${flagged.has(q.id) ? "ring-2 ring-warning" : ""}
              `}
            >
              {i + 1}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={question.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            <Card className="border-border/50">
              <CardContent className="p-6 md:p-8">
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="outline" className="text-xs">{question.trait}</Badge>
                  <button
                    onClick={toggleFlag}
                    className={`flex items-center gap-1 text-xs transition ${flagged.has(question.id) ? "text-warning" : "text-muted-foreground hover:text-foreground"}`}
                  >
                    <Flag className="h-3.5 w-3.5" /> {flagged.has(question.id) ? "Flagged" : "Flag"}
                  </button>
                </div>

                <p className="font-display text-lg font-semibold leading-relaxed text-foreground">
                  <span className="text-primary mr-2">Q{currentQ + 1}.</span>
                  {questionText}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {LIKERT_OPTIONS.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => handleAnswer(i)}
                      className={`rounded-lg border px-4 py-2.5 text-sm font-medium transition-all
                        ${answers[question.id] === i
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border text-muted-foreground hover:border-primary/30 hover:text-foreground"
                        }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="mt-6 flex items-center justify-between">
          <Button
            variant="outline"
            onClick={() => setCurrentQ((c) => Math.max(0, c - 1))}
            disabled={currentQ === 0}
          >
            <ChevronLeft className="mr-1 h-4 w-4" /> Previous
          </Button>
          {currentQ < totalQ - 1 ? (
            <Button onClick={() => setCurrentQ((c) => c + 1)}>
              Next <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          ) : (
            <Button
              className="bg-accent hover:bg-accent/90 text-accent-foreground"
              onClick={() => setPhase("completed")}
            >
              Submit Assessment <CheckCircle2 className="ml-1 h-4 w-4" />
            </Button>
          )}
        </div>
      </main>
    </div>
  );
};

export default Assessment;
