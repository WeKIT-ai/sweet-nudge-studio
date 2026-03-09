import { useState } from "react";
import { AgeGroup } from "@/data/weekitQuestions";
import { Button } from "@/components/ui/button";
import { ChevronRight, Users, GraduationCap, Briefcase } from "lucide-react";
import { motion } from "framer-motion";
import WeKitLogo from "@/components/WeKitLogo";

type AgeOption = { value: AgeGroup; label: string; desc: string; icon: React.ReactNode };

const AGE_OPTIONS: AgeOption[] = [
  { value: "12-14", label: "12–14 years", desc: "Early Adolescents", icon: <Users className="h-6 w-6" /> },
  { value: "15-18", label: "15–18 years", desc: "Late Adolescents", icon: <GraduationCap className="h-6 w-6" /> },
  { value: "18+", label: "18+ years", desc: "Adults & Professionals", icon: <Briefcase className="h-6 w-6" /> },
];

export default function AssessmentAgeSelect({
  onSelect,
}: {
  onSelect: (age: AgeGroup) => void;
}) {
  const [selected, setSelected] = useState<AgeGroup | null>(null);

  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary/3 blur-[150px]"
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-lg text-center"
        >
          <WeKitLogo size="lg" className="mx-auto mb-6" />

          <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground">
            Tell us about <span className="gradient-text">yourself</span>
          </h1>
          <p className="mt-3 text-muted-foreground text-base sm:text-lg">
            Select your age group — questions are tailored for the best experience.
          </p>

          <div className="mt-10 space-y-4">
            {AGE_OPTIONS.map((opt, i) => (
              <motion.button
                key={opt.value}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                onClick={() => setSelected(opt.value)}
                className={`w-full flex items-center gap-5 rounded-2xl border p-5 sm:p-6 text-left transition-all duration-300 group
                  ${selected === opt.value
                    ? "border-primary bg-primary/5 shadow-lg shadow-primary/10"
                    : "border-border/50 bg-card/50 hover:border-primary/30 hover:bg-card"
                  }`}
              >
                <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-colors duration-300
                  ${selected === opt.value ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground group-hover:text-foreground"}`}
                >
                  {opt.icon}
                </div>
                <div>
                  <span className="font-display text-lg font-semibold text-foreground block">{opt.label}</span>
                  <span className="text-sm text-muted-foreground">{opt.desc}</span>
                </div>
                <div className={`ml-auto h-5 w-5 rounded-full border-2 flex items-center justify-center transition-all duration-300
                  ${selected === opt.value ? "border-primary bg-primary" : "border-border"}`}
                >
                  {selected === opt.value && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="h-2 w-2 rounded-full bg-primary-foreground"
                    />
                  )}
                </div>
              </motion.button>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <Button
              className="mt-8 w-full h-14 text-base font-semibold rounded-full hover-glow"
              disabled={!selected}
              onClick={() => selected && onSelect(selected)}
            >
              Continue to Assessment <ChevronRight className="ml-1 h-5 w-5" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
