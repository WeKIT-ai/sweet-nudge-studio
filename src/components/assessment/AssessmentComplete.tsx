import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

interface Props {
  answeredCount: number;
  totalQ: number;
}

export default function AssessmentComplete({ answeredCount, totalQ }: Props) {
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
              <CheckCircle2 className="h-8 w-8 text-accent" />
            </div>
            <h1 className="mt-6 font-display text-3xl font-bold text-foreground">
              Assessment Complete! 🎉
            </h1>
            <p className="mt-3 text-muted-foreground">
              You answered {answeredCount} of {totalQ} questions.
              Your WeKIT™ Career Clarity 360 report is being generated.
            </p>
            <div className="mt-6 rounded-lg bg-muted/50 p-4 text-sm text-muted-foreground">
              Your personalized career matches are ready — view your report now!
            </div>
            <div className="mt-6 flex gap-3">
              <Button className="flex-1" asChild>
                <Link to="/report">View My Report</Link>
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
