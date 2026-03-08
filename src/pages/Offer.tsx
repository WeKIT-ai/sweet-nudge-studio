import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle2,
  Sparkles,
  GraduationCap,
  ArrowRight,
  Shield,
  Star,
  Zap,
  Heart,
  Clock,
  Users,
} from "lucide-react";
import { motion } from "framer-motion";
import WeKitLogo from "@/components/WeKitLogo";

/* ── funnel steps ── */
const FUNNEL_STEPS = [
  { key: "waitlist", label: "Waitlist" },
  { key: "profile", label: "Profile" },
  { key: "offer", label: "Offer" },
  { key: "test", label: "Test" },
  { key: "report", label: "Report" },
] as const;

const CURRENT_STEP = 2; // "Offer" is index 2

const foundingPerks = [
  "Full 46‑question psychometric assessment",
  "Career DNA radar with 8 archetypes",
  "3,300+ career match database",
  "Personalized 'Why this fits you' explainability",
  "Downloadable PDF report",
  "Lifetime access to your results",
  "Priority access to future modules",
  "Founding Member badge & community",
];

const scholarshipPerks = [
  "Full 46‑question psychometric assessment",
  "Career DNA radar with 8 archetypes",
  "3,300+ career match database",
  "Personalized career report",
  "Downloadable PDF report",
];

export default function Offer() {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState<"founding" | "scholarship" | null>(null);

  const handleFoundingCohort = () => {
    // Razorpay integration placeholder
    window.open(
      "https://razorpay.me/@wekit?amount=1050",
      "_blank",
      "noopener"
    );
  };

  const handleScholarship = () => {
    window.open(
      "https://forms.zoho.com/wekit/scholarship",
      "_blank",
      "noopener"
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* ── header ── */}
      <header className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-lg items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2">
            <WeKitLogo className="h-7 w-7" />
            <span className="font-display text-lg font-bold text-foreground">
              WeKIT
            </span>
          </Link>
          <Badge
            variant="outline"
            className="border-primary/40 text-primary text-xs"
          >
            <Clock className="mr-1 h-3 w-3" /> Limited spots
          </Badge>
        </div>
      </header>

      {/* ── funnel progress ── */}
      <div className="mx-auto max-w-lg px-4 pt-5 pb-2">
        <div className="flex items-center justify-between">
          {FUNNEL_STEPS.map((step, i) => (
            <div key={step.key} className="flex flex-1 items-center">
              <div className="flex flex-col items-center gap-1">
                <div
                  className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold transition-colors ${
                    i < CURRENT_STEP
                      ? "bg-primary text-primary-foreground"
                      : i === CURRENT_STEP
                      ? "bg-primary text-primary-foreground ring-2 ring-primary/40 ring-offset-2 ring-offset-background"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {i < CURRENT_STEP ? (
                    <CheckCircle2 className="h-4 w-4" />
                  ) : (
                    i + 1
                  )}
                </div>
                <span
                  className={`text-[10px] font-medium ${
                    i <= CURRENT_STEP
                      ? "text-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  {step.label}
                </span>
              </div>
              {i < FUNNEL_STEPS.length - 1 && (
                <div
                  className={`mx-1 h-0.5 flex-1 rounded-full ${
                    i < CURRENT_STEP ? "bg-primary" : "bg-muted"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── hero ── */}
      <div className="mx-auto max-w-lg px-4 pt-6 pb-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Badge className="mb-3 bg-primary/10 text-primary border-primary/20">
            <Sparkles className="mr-1 h-3 w-3" /> Founding Cohort – 30% OFF
          </Badge>
          <h1 className="font-display text-2xl font-bold text-foreground leading-tight">
            Unlock Your Career DNA
          </h1>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            Get your personalized psychometric report mapping your strengths to
            3,300+ careers with AI‑powered explainability.
          </p>
        </motion.div>
      </div>

      {/* ── plans ── */}
      <div className="mx-auto max-w-lg space-y-4 px-4 pb-8">
        {/* Founding Cohort */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
        >
          <Card
            className={`relative overflow-hidden border-2 transition-colors cursor-pointer ${
              selectedPlan === "founding"
                ? "border-primary shadow-lg shadow-primary/10"
                : "border-border/50 hover:border-primary/40"
            }`}
            onClick={() => setSelectedPlan("founding")}
          >
            {/* ribbon */}
            <div className="absolute right-0 top-0 rounded-bl-lg bg-primary px-3 py-1">
              <span className="text-[10px] font-bold text-primary-foreground uppercase tracking-wider">
                Most Popular
              </span>
            </div>

            <CardContent className="p-5">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                  <Zap className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h2 className="font-display text-lg font-bold text-foreground">
                    Founding Cohort
                  </h2>
                  <div className="mt-1 flex items-baseline gap-2">
                    <span className="text-2xl font-extrabold text-primary">
                      ₹1,050
                    </span>
                    <span className="text-sm text-muted-foreground line-through">
                      ₹1,500
                    </span>
                    <Badge
                      variant="secondary"
                      className="text-[10px] bg-primary/10 text-primary border-none"
                    >
                      Save ₹450
                    </Badge>
                  </div>
                </div>
              </div>

              <ul className="mt-4 space-y-2">
                {foundingPerks.map((perk) => (
                  <li
                    key={perk}
                    className="flex items-start gap-2 text-sm text-foreground/80"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    {perk}
                  </li>
                ))}
              </ul>

              <Button
                className="mt-5 w-full h-12 text-base font-semibold"
                onClick={(e) => {
                  e.stopPropagation();
                  handleFoundingCohort();
                }}
              >
                Pay ₹1,050 & Start
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>

              <div className="mt-3 flex items-center justify-center gap-4 text-[11px] text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Shield className="h-3 w-3" /> Secure payment
                </span>
                <span className="flex items-center gap-1">
                  <Star className="h-3 w-3" /> Instant access
                </span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Scholarship */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <Card
            className={`relative overflow-hidden border-2 transition-colors cursor-pointer ${
              selectedPlan === "scholarship"
                ? "border-accent shadow-lg shadow-accent/10"
                : "border-border/50 hover:border-accent/40"
            }`}
            onClick={() => setSelectedPlan("scholarship")}
          >
            <CardContent className="p-5">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10">
                  <GraduationCap className="h-5 w-5 text-accent" />
                </div>
                <div className="flex-1">
                  <h2 className="font-display text-lg font-bold text-foreground">
                    Scholarship Application
                  </h2>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    For students from underserved backgrounds
                  </p>
                </div>
              </div>

              <ul className="mt-4 space-y-2">
                {scholarshipPerks.map((perk) => (
                  <li
                    key={perk}
                    className="flex items-start gap-2 text-sm text-foreground/80"
                  >
                    <Heart className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    {perk}
                  </li>
                ))}
              </ul>

              <Button
                variant="outline"
                className="mt-5 w-full h-12 text-base font-semibold border-accent/40 text-accent hover:bg-accent/10"
                onClick={(e) => {
                  e.stopPropagation();
                  handleScholarship();
                }}
              >
                Apply for Scholarship
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>

              <p className="mt-2 text-center text-[11px] text-muted-foreground">
                <Users className="mr-1 inline h-3 w-3" />
                40% of seats reserved for scholarships
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* social proof */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="rounded-xl border border-border/30 bg-card/50 p-4 text-center"
        >
          <div className="flex justify-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="h-4 w-4 fill-primary text-primary"
              />
            ))}
          </div>
          <p className="text-sm text-foreground/80 italic">
            "Finally understood why I love what I love. The career matches
            were spot‑on!"
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            — Priya, Class 11, Mumbai
          </p>
        </motion.div>

        {/* skip */}
        <div className="pt-2 text-center">
          <Button
            variant="ghost"
            size="sm"
            className="text-xs text-muted-foreground"
            asChild
          >
            <Link to="/assessment">
              Skip — take the free preview first →
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
