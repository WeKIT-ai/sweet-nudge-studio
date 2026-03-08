import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Sparkles, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { calculateTraitScores } from "@/data/weekitQuestions";

interface Props {
  answeredCount: number;
  totalQ: number;
  answers?: Record<number, number>;
}

export default function AssessmentComplete({ answeredCount, totalQ, answers }: Props) {
  const navigate = useNavigate();
  const [generating, setGenerating] = useState(true);

  useEffect(() => {
    if (answers && Object.keys(answers).length > 0) {
      const traitScores = calculateTraitScores(answers);
      localStorage.setItem("wekit_trait_scores", JSON.stringify(traitScores));
      localStorage.setItem("wekit_answers", JSON.stringify(answers));
    }
    // Simulate report generation
    const timer = setTimeout(() => setGenerating(false), 2000);
    return () => clearTimeout(timer);
  }, [answers]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-lg text-center"
      >
        <Card className="border-border/50">
          <CardContent className="p-10">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
              {generating ? (
                <Loader2 className="h-8 w-8 text-accent animate-spin" />
              ) : (
                <CheckCircle2 className="h-8 w-8 text-accent" />
              )}
            </div>
            <h1 className="mt-6 font-display text-3xl font-bold text-foreground">
              {generating ? "Generating Your Report..." : "Assessment Complete! 🎉"}
            </h1>
            <p className="mt-3 text-muted-foreground">
              You answered {answeredCount} of {totalQ} questions.
              {generating
                ? " Our AI is mapping your personality to 3,300+ careers..."
                : " Your WeKIT™ Career Clarity 360 report is ready!"}
            </p>
            {!generating && (
              <>
                <div className="mt-6 rounded-lg bg-primary/5 border border-primary/20 p-4 text-sm text-foreground flex items-center gap-2 justify-center">
                  <Sparkles className="h-4 w-4 text-primary" />
                  Your personalized career matches are ready!
                </div>
                <div className="mt-6 flex gap-3">
                  <Button className="flex-1 hover-glow" asChild>
                    <Link to="/report">View My Report</Link>
                  </Button>
                  <Button variant="outline" className="flex-1" asChild>
                    <Link to="/">Return Home</Link>
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
