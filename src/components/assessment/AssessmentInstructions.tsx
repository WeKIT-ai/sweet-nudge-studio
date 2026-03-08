import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Clock, ChevronRight, CheckCircle2, AlertTriangle, Shield, Flag,
} from "lucide-react";
import { motion } from "framer-motion";
import WeKitLogo from "@/components/WeKitLogo";

interface Props {
  totalQ: number;
  onStart: () => void;
}

export default function AssessmentInstructions({ totalQ, onStart }: Props) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-2xl">
        <Card className="border-border/50">
          <CardContent className="p-8">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <Brain className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="font-display text-2xl font-bold text-foreground">
                  WeKIT™ Career Clarity 360
                </h1>
                <p className="text-sm text-muted-foreground">
                  Personality-Based Career Assessment
                </p>
              </div>
            </div>

            <div className="space-y-4 rounded-lg bg-muted/50 p-6 text-sm">
              <h3 className="font-display font-semibold text-foreground">Instructions</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  This assessment contains <strong className="text-foreground">{totalQ} questions</strong> about your personality and preferences.
                </li>
                <li className="flex items-start gap-2">
                  <Clock className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  It takes approximately <strong className="text-foreground">12 minutes</strong> to complete.
                </li>
                <li className="flex items-start gap-2">
                  <Flag className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  Answer honestly — there are no right or wrong answers.
                </li>
                <li className="flex items-start gap-2">
                  <Shield className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  Your responses are used to match you with <strong className="text-foreground">3,300+ career paths</strong>.
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-warning" />
                  Unanswered questions will affect your results.
                </li>
              </ul>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-3 text-center text-sm">
              <div className="rounded-lg border border-border p-3">
                <p className="font-display text-lg font-bold text-foreground">{totalQ}</p>
                <p className="text-muted-foreground">Questions</p>
              </div>
              <div className="rounded-lg border border-border p-3">
                <p className="font-display text-lg font-bold text-foreground">~12 min</p>
                <p className="text-muted-foreground">Duration</p>
              </div>
              <div className="rounded-lg border border-border p-3">
                <p className="font-display text-lg font-bold text-foreground">3,300+</p>
                <p className="text-muted-foreground">Careers</p>
              </div>
            </div>

            <Button className="mt-6 w-full h-12 text-base" onClick={onStart}>
              Start Assessment <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
