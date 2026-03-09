import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Sparkles, Loader2, Compass, Users, BookOpen, Rocket, MessageCircle, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { calculateTraitScores } from "@/data/weekitQuestions";
import WeKitLogo from "@/components/WeKitLogo";

interface Props {
  answeredCount: number;
  totalQ: number;
  answers?: Record<number, number>;
}

const INSIGHT_CARDS = [
  { icon: Sparkles, title: "Your Strengths", desc: "Discover your core personality superpowers" },
  { icon: Compass, title: "Your Interests", desc: "Explore the domains that excite you most" },
  { icon: Rocket, title: "Career Pathways", desc: "3,300+ careers matched to your profile" },
  { icon: BookOpen, title: "Next Steps", desc: "Actionable guidance for your journey" },
];

const CAREER_PREVIEWS = [
  "Technology & AI",
  "Sustainability & Environment",
  "Healthcare Innovation",
  "Creative Industries",
  "Entrepreneurship",
];

const NEXT_STEPS = [
  { icon: Compass, title: "Explore the Purpose Architecture Lab", desc: "Deep-dive into career exploration tools" },
  { icon: Users, title: "Find a Mentor", desc: "Connect with industry professionals" },
  { icon: BookOpen, title: "Discover Future Skills Courses", desc: "Upskill for tomorrow's opportunities" },
  { icon: Rocket, title: "Explore College Discovery", desc: "Find programs aligned with your path" },
];

export default function AssessmentComplete({ answeredCount, totalQ, answers }: Props) {
  const navigate = useNavigate();
  const [generating, setGenerating] = useState(true);

  useEffect(() => {
    if (answers && Object.keys(answers).length > 0) {
      const traitScores = calculateTraitScores(answers);
      localStorage.setItem("wekit_trait_scores", JSON.stringify(traitScores));
      localStorage.setItem("wekit_answers", JSON.stringify(answers));
    }
    const timer = setTimeout(() => setGenerating(false), 3000);
    return () => clearTimeout(timer);
  }, [answers]);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Ambient background */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/3 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[150px]"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-accent/5 blur-[120px]"
          animate={{ scale: [1.1, 1, 1.1] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="flex items-center justify-center px-6 py-6">
          <WeKitLogo size="sm" />
        </header>

        {/* Generating state */}
        {generating ? (
          <div className="flex flex-col items-center justify-center min-h-[70vh] px-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center max-w-md"
            >
              <div className="mx-auto mb-8 relative">
                <div className="w-20 h-20 rounded-full border-2 border-primary/20 flex items-center justify-center">
                  <Loader2 className="h-8 w-8 text-primary animate-spin" />
                </div>
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-primary/10"
                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
              <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground">
                Generating Your <span className="gradient-text">Insights</span>
              </h1>
              <p className="mt-4 text-muted-foreground text-base sm:text-lg">
                Our AI is mapping your personality across 3,300+ career pathways...
              </p>
              <div className="mt-8 flex items-center justify-center gap-1">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="h-2 w-2 rounded-full bg-primary"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto px-6 py-8 space-y-16">
            {/* Hero reveal */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
                className="mx-auto mb-6 w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center"
              >
                <CheckCircle2 className="h-8 w-8 text-primary" />
              </motion.div>
              <h1 className="font-display text-4xl sm:text-5xl font-bold text-foreground">
                Your Career Discovery <span className="gradient-text">Insights</span>
              </h1>
              <p className="mt-4 text-lg text-muted-foreground">
                You answered {answeredCount} of {totalQ} questions. Here's what we discovered.
              </p>
            </motion.div>

            {/* Insight cards */}
            <div className="grid gap-4 sm:grid-cols-2">
              {INSIGHT_CARDS.map((card, i) => (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                  className="rounded-2xl border border-border/50 bg-card/50 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20"
                >
                  <card.icon className="h-6 w-6 text-primary mb-4" />
                  <h3 className="font-display text-lg font-semibold text-foreground">{card.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{card.desc}</p>
                </motion.div>
              ))}
            </div>

            {/* Career pathway previews */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              <h2 className="font-display text-2xl font-bold text-foreground text-center mb-8">
                Recommended Career Pathways
              </h2>
              <div className="flex flex-wrap justify-center gap-3">
                {CAREER_PREVIEWS.map((career, i) => (
                  <motion.div
                    key={career}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 + i * 0.1 }}
                    className="rounded-full border border-border/50 bg-card/50 px-5 py-2.5 text-sm text-foreground font-medium
                      transition-all duration-300 hover:border-primary/30 hover:bg-primary/5 hover:shadow-md cursor-default"
                  >
                    {career}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Next step cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
            >
              <h2 className="font-display text-2xl font-bold text-foreground text-center mb-8">
                Suggested Next Steps
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {NEXT_STEPS.map((step, i) => (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.1 + i * 0.1 }}
                    className="group rounded-2xl border border-border/50 bg-card/50 p-5 flex items-start gap-4
                      transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-primary/20 cursor-pointer"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary
                      group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                      <step.icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-display text-sm font-semibold text-foreground">{step.title}</h3>
                      <p className="mt-1 text-xs text-muted-foreground">{step.desc}</p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0 mt-1" />
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* YOMA Assistant */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.6 }}
              className="rounded-2xl border border-primary/20 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 p-6 sm:p-8"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <MessageCircle className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-lg font-semibold text-foreground">
                    YOMA – Your Online Mentor Assistant
                  </h3>
                  <p className="mt-2 text-muted-foreground text-sm leading-relaxed">
                    Hi! I'm YOMA. Based on your results, I can help you explore careers and mentors
                    that match your interests.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    <Button size="sm" className="rounded-full gap-2 hover-glow">
                      <Compass className="h-4 w-4" /> Explore Career Paths
                    </Button>
                    <Button size="sm" variant="outline" className="rounded-full gap-2">
                      <Users className="h-4 w-4" /> Find a Mentor
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center pb-12"
            >
              <Button size="lg" className="h-14 px-10 rounded-full hover-glow text-base font-semibold" asChild>
                <Link to="/report">
                  <Sparkles className="h-5 w-5 mr-2" /> View Full Report
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-10 rounded-full text-base" asChild>
                <Link to="/">Return Home</Link>
              </Button>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
