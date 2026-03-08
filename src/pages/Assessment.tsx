import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Brain,
  Clock,
  ChevronLeft,
  ChevronRight,
  Flag,
  CheckCircle2,
  AlertTriangle,
  Shield,
} from "lucide-react";
import { sampleQuestions } from "@/data/mockData";
import { motion, AnimatePresence } from "framer-motion";

type Phase = "instructions" | "testing" | "completed";

const Assessment = () => {
  const [phase, setPhase] = useState<Phase>("instructions");
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [flagged, setFlagged] = useState<Set<string>>(new Set());
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 min

  const questions = sampleQuestions;
  const totalQ = questions.length;
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

  const handleAnswer = useCallback((value: string) => {
    setAnswers((prev) => ({ ...prev, [questions[currentQ].id]: value }));
  }, [currentQ, questions]);

  const toggleFlag = useCallback(() => {
    setFlagged((prev) => {
      const next = new Set(prev);
      const qId = questions[currentQ].id;
      next.has(qId) ? next.delete(qId) : next.add(qId);
      return next;
    });
  }, [currentQ, questions]);

  if (phase === "instructions") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-2xl"
        >
          <Card className="border-border/50">
            <CardContent className="p-8">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <Brain className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h1 className="font-display text-2xl font-bold text-foreground">Psychometric Assessment</h1>
                  <p className="text-sm text-muted-foreground">Mixed Assessment — Cognitive, Personality & SJT</p>
                </div>
              </div>

              <div className="space-y-4 rounded-lg bg-muted/50 p-6 text-sm">
                <h3 className="font-display font-semibold text-foreground">Instructions</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" /> This assessment contains <strong className="text-foreground">{totalQ} questions</strong> across multiple categories.</li>
                  <li className="flex items-start gap-2"><Clock className="mt-0.5 h-4 w-4 shrink-0 text-accent" /> You have <strong className="text-foreground">25 minutes</strong> to complete all questions.</li>
                  <li className="flex items-start gap-2"><Flag className="mt-0.5 h-4 w-4 shrink-0 text-accent" /> You can flag questions to review later before submitting.</li>
                  <li className="flex items-start gap-2"><Shield className="mt-0.5 h-4 w-4 shrink-0 text-accent" /> AI proctoring is active — do not switch tabs or windows.</li>
                  <li className="flex items-start gap-2"><AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-warning" /> Unanswered questions will be marked as incorrect.</li>
                </ul>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-3 text-center text-sm">
                <div className="rounded-lg border border-border p-3">
                  <p className="font-display text-lg font-bold text-foreground">{totalQ}</p>
                  <p className="text-muted-foreground">Questions</p>
                </div>
                <div className="rounded-lg border border-border p-3">
                  <p className="font-display text-lg font-bold text-foreground">25 min</p>
                  <p className="text-muted-foreground">Duration</p>
                </div>
                <div className="rounded-lg border border-border p-3">
                  <p className="font-display text-lg font-bold text-foreground">Adaptive</p>
                  <p className="text-muted-foreground">Difficulty</p>
                </div>
              </div>

              <Button className="mt-6 w-full h-12 text-base" onClick={() => setPhase("testing")}>
                Start Assessment <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  if (phase === "completed") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-lg text-center"
        >
          <Card className="border-border/50">
            <CardContent className="p-10">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-success/10">
                <CheckCircle2 className="h-8 w-8 text-success" />
              </div>
              <h1 className="mt-6 font-display text-3xl font-bold text-foreground">Assessment Complete!</h1>
              <p className="mt-3 text-muted-foreground">
                You answered {answeredCount} of {totalQ} questions.
                Your results are being analyzed and will be available shortly.
              </p>
              <div className="mt-6 rounded-lg bg-muted/50 p-4 text-sm text-muted-foreground">
                Expected report delivery: <strong className="text-foreground">within 24 hours</strong>
              </div>
              <div className="mt-6 flex gap-3">
                <Button className="flex-1" asChild>
                  <Link to="/report">View Sample Report</Link>
                </Button>
                <Button variant="outline" className="flex-1" asChild>
                  <Link to="/">Return Home</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  const question = questions[currentQ];
  const isLikert = question.type === "likert";

  return (
    <div className="min-h-screen bg-background">
      {/* Test Header */}
      <header className="sticky top-0 z-50 border-b border-border/50 bg-background/95 backdrop-blur">
        <div className="container mx-auto flex items-center justify-between px-6 py-3">
          <div className="flex items-center gap-3">
            <Brain className="h-5 w-5 text-primary" />
            <span className="font-display font-semibold text-foreground">Psychometric Assessment</span>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant={timeLeft < 300 ? "destructive" : "secondary"} className="gap-1 font-mono">
              <Clock className="h-3.5 w-3.5" /> {formatTime(timeLeft)}
            </Badge>
            <Badge variant="outline">
              {answeredCount}/{totalQ} answered
            </Badge>
          </div>
        </div>
        <Progress value={progressPct} className="h-1 rounded-none" />
      </header>

      <main className="container mx-auto max-w-3xl px-6 py-8">
        {/* Question navigator */}
        <div className="mb-6 flex flex-wrap gap-1.5">
          {questions.map((q, i) => (
            <button
              key={q.id}
              onClick={() => setCurrentQ(i)}
              className={`flex h-8 w-8 items-center justify-center rounded-md text-xs font-medium transition-all
                ${i === currentQ ? "bg-primary text-primary-foreground" : ""}
                ${i !== currentQ && answers[q.id] ? "bg-accent/20 text-accent" : ""}
                ${i !== currentQ && !answers[q.id] ? "bg-muted text-muted-foreground hover:bg-muted/80" : ""}
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
                  <Badge variant="outline" className="text-xs">{question.category}</Badge>
                  <button
                    onClick={toggleFlag}
                    className={`flex items-center gap-1 text-xs transition ${flagged.has(question.id) ? "text-warning" : "text-muted-foreground hover:text-foreground"}`}
                  >
                    <Flag className="h-3.5 w-3.5" /> {flagged.has(question.id) ? "Flagged" : "Flag"}
                  </button>
                </div>

                <p className="font-display text-lg font-semibold leading-relaxed text-foreground">
                  <span className="text-primary mr-2">Q{currentQ + 1}.</span>
                  {question.question}
                </p>

                <RadioGroup
                  value={answers[question.id] || ""}
                  onValueChange={handleAnswer}
                  className={`mt-6 ${isLikert ? "flex flex-wrap gap-2" : "space-y-3"}`}
                >
                  {question.options.map((opt, i) => (
                    isLikert ? (
                      <div key={i}>
                        <RadioGroupItem value={opt} id={`opt-${i}`} className="peer sr-only" />
                        <Label
                          htmlFor={`opt-${i}`}
                          className={`cursor-pointer rounded-lg border px-4 py-2 text-sm transition-all
                            ${answers[question.id] === opt
                              ? "border-primary bg-primary/10 text-primary"
                              : "border-border hover:border-primary/30"
                            }`}
                        >
                          {opt}
                        </Label>
                      </div>
                    ) : (
                      <div key={i} className="flex items-center gap-3">
                        <RadioGroupItem value={opt} id={`opt-${i}`} />
                        <Label
                          htmlFor={`opt-${i}`}
                          className={`flex-1 cursor-pointer rounded-lg border p-4 text-sm transition-all
                            ${answers[question.id] === opt
                              ? "border-primary bg-primary/5"
                              : "border-border hover:border-primary/30"
                            }`}
                        >
                          {opt}
                        </Label>
                      </div>
                    )
                  ))}
                </RadioGroup>
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
