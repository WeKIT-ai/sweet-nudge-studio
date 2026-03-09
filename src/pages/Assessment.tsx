import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { type AgeGroup, weekitQuestions, LIKERT_OPTIONS } from "@/data/weekitQuestions";
import AssessmentHero from "@/components/assessment/AssessmentHero";
import AssessmentAgeSelect from "@/components/assessment/AgeSelect";
import AssessmentQuestions from "@/components/assessment/AssessmentQuestions";
import AssessmentComplete from "@/components/assessment/AssessmentComplete";
import { supabase } from "@/integrations/supabase/client";

type Phase = "payment-gate" | "age-select" | "testing" | "completed";

const Assessment = () => {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<Phase>("payment-gate");
  const [checkingPayment, setCheckingPayment] = useState(true);
  const [ageGroup, setAgeGroup] = useState<AgeGroup>("18+");
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [history, setHistory] = useState<number[]>([]);

  const totalQ = weekitQuestions.length;
  const answeredCount = Object.keys(answers).length;

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

  const handleAnswer = useCallback((optionIndex: number) => {
    const qId = weekitQuestions[currentQ].id;
    setAnswers((prev) => ({ ...prev, [qId]: optionIndex }));
    setHistory((prev) => [...prev, currentQ]);

    setTimeout(() => {
      if (currentQ < totalQ - 1) {
        setCurrentQ((c) => c + 1);
      } else {
        setPhase("completed");
      }
    }, 400);
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
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-muted-foreground text-sm">Verifying access...</p>
        </div>
      </div>
    );
  }

  if (phase === "payment-gate") {
    return (
      <AssessmentHero
        onStart={() => navigate("/payment")}
        isLocked
      />
    );
  }

  if (phase === "age-select") {
    return (
      <AssessmentAgeSelect
        onSelect={(age) => {
          setAgeGroup(age);
          setPhase("testing");
        }}
      />
    );
  }

  if (phase === "completed") {
    return <AssessmentComplete answeredCount={answeredCount} totalQ={totalQ} answers={answers} />;
  }

  const question = weekitQuestions[currentQ];
  const questionText = question.variants[ageGroup];

  return (
    <AssessmentQuestions
      currentQ={currentQ}
      totalQ={totalQ}
      answeredCount={answeredCount}
      questionText={questionText}
      questionId={question.id}
      trait={question.trait}
      answers={answers}
      onAnswer={handleAnswer}
      onUndo={handleUndo}
      canUndo={history.length > 0}
    />
  );
};

export default Assessment;
