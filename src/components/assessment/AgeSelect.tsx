import { useState } from "react";
import { AgeGroup } from "@/data/weekitQuestions";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import WeKitLogo from "@/components/WeKitLogo";

type AgeOption = { value: AgeGroup; label: string; desc: string };
const AGE_OPTIONS: AgeOption[] = [
  { value: "12-14", label: "12–14", desc: "Early Adolescents" },
  { value: "15-18", label: "15–18", desc: "Late Adolescents" },
  { value: "18+", label: "18+", desc: "Adults" },
];

export default function AssessmentAgeSelect({
  onSelect,
}: {
  onSelect: (age: AgeGroup) => void;
}) {
  const [selected, setSelected] = useState<AgeGroup | null>(null);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <Card className="border-border/50">
          <CardContent className="p-8 text-center">
            <div className="mx-auto mb-4">
              <WeKitLogo size="lg" className="mx-auto" />
            </div>
            <h2 className="font-display text-xl font-bold text-foreground">WeKIT™ Career Clarity 360</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Select your age group — questions are tailored for the best experience.
            </p>
            <div className="mt-6 space-y-3">
              {AGE_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setSelected(opt.value)}
                  className={`w-full rounded-lg border p-4 text-left transition-all ${
                    selected === opt.value
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/30"
                  }`}
                >
                  <span className="font-display font-semibold text-foreground">{opt.label}</span>
                  <span className="ml-2 text-sm text-muted-foreground">{opt.desc}</span>
                </button>
              ))}
            </div>
            <Button
              className="mt-6 w-full h-12"
              disabled={!selected}
              onClick={() => selected && onSelect(selected)}
            >
              Continue <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
