import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Star,
  Shield,
  Users,
  Sparkles,
  Target,
  Heart,
  Compass,
  Brain,
} from "lucide-react";
import WeKitLogo from "@/components/WeKitLogo";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

const stats = [
  { value: "97%", label: "Accuracy" },
  { value: "3,300+", label: "Careers" },
  { value: "10K+", label: "Students" },
  { value: "50+", label: "Experts" },
];

const features = [
  {
    icon: Compass,
    title: "Career DNA Mapping",
    description: "Discover your unique Career DNA archetype from our 6 personality archetypes matched to 3,300+ career paths.",
  },
  {
    icon: Brain,
    title: "AI-Powered Matching",
    description: "Advanced psychometric scoring maps your 12 personality traits to careers that truly fit who you are.",
  },
  {
    icon: Target,
    title: "Personalized Roadmap",
    description: "Get a step-by-step action plan with college recommendations, skill gaps, and next steps.",
  },
  {
    icon: Heart,
    title: "1-on-1 Mentor Call",
    description: "Discuss your results with certified career mentors who help you chart your path forward.",
  },
  {
    icon: Shield,
    title: "Scientifically Validated",
    description: "46 research-backed questions developed with psychometric experts and validated across 10,000+ students.",
  },
  {
    icon: Sparkles,
    title: "Swipe-Based Experience",
    description: "Fun, Tinder-style swipe interface — complete your assessment in just 12 minutes.",
  },
];

const Index = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    whatsapp: "",
    city: "",
    stage: "",
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto flex h-16 items-center justify-between px-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <Brain className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-display text-xl font-bold text-foreground">WeKIT™</span>
          </Link>
          <div className="hidden items-center gap-8 md:flex">
            <a href="#features" className="text-sm font-medium text-muted-foreground transition hover:text-foreground">How It Works</a>
            <a href="#pricing" className="text-sm font-medium text-muted-foreground transition hover:text-foreground">Pricing</a>
            <a href="https://www.wekitmentoring.com/" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-muted-foreground transition hover:text-foreground">WeKIT Mentoring</a>
          </div>
          <div className="flex items-center gap-3">
            <Button size="sm" asChild>
              <Link to="/assessment">Take the Test <ArrowRight className="ml-1 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.08),transparent_50%)]" />
        <div className="container relative mx-auto px-6 text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}>
            <Badge variant="secondary" className="mb-6 rounded-full px-4 py-1.5 text-sm font-medium">
              <Star className="mr-1.5 h-3.5 w-3.5 text-warning" /> ONLY 150 FOUNDING COHORT SPOTS AVAILABLE
            </Badge>
          </motion.div>
          <motion.h1
            className="mx-auto max-w-4xl font-display text-5xl font-bold leading-tight tracking-tight text-foreground md:text-7xl"
            initial="hidden" animate="visible" variants={fadeUp} custom={1}
          >
            Fall in love with{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              your future
            </span>
          </motion.h1>
          <motion.p
            className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl"
            initial="hidden" animate="visible" variants={fadeUp} custom={2}
          >
            Discover careers that match your personality, not just your marks.
            12 minutes → AI-powered career clarity → confident next steps.
          </motion.p>
          <motion.div
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
            initial="hidden" animate="visible" variants={fadeUp} custom={3}
          >
            <Button size="lg" className="h-12 px-8 text-base" asChild>
              <Link to="/assessment">Start Career Clarity 360 <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
            <Button variant="outline" size="lg" className="h-12 px-8 text-base" asChild>
              <a href="https://www.wekitmentoring.com/" target="_blank" rel="noopener noreferrer">Learn About WeKIT</a>
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="mx-auto mt-20 grid max-w-3xl grid-cols-2 gap-6 md:grid-cols-4"
            initial="hidden" animate="visible" variants={fadeUp} custom={4}
          >
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-display text-3xl font-bold text-primary">{stat.value}</div>
                <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <Badge variant="outline" className="mb-4">How It Works</Badge>
            <h2 className="font-display text-4xl font-bold text-foreground">
              Career Clarity in 3 Steps
            </h2>
          </div>
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {[
              { step: "01", title: "Swipe Through Questions", desc: "Answer 46 personality questions with our fun swipe interface. Left, right, up, down — it's that easy." },
              { step: "02", title: "Get Your Career DNA", desc: "Our AI maps your 12 traits to 3,300+ careers and reveals your unique Career DNA archetype." },
              { step: "03", title: "Receive Your Roadmap", desc: "Get a personalized PDF report with top career matches, a 1-on-1 mentor call, and action steps." },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
              >
                <Card className="h-full border-border/50 bg-card">
                  <CardContent className="p-6">
                    <span className="font-display text-4xl font-bold text-primary/20">{item.step}</span>
                    <h3 className="mt-3 font-display text-lg font-semibold text-foreground">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <Badge variant="outline" className="mb-4">Features</Badge>
            <h2 className="font-display text-4xl font-bold text-foreground">
              Why WeKIT™ Career Clarity 360?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              A patent-pending assessment experience built for India's next generation.
            </p>
          </div>
          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeUp}
                custom={i}
              >
                <Card className="group h-full border-border/50 bg-card transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
                  <CardContent className="p-6">
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/20">
                      <feature.icon className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="mt-4 font-display text-lg font-semibold text-foreground">{feature.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <Badge variant="outline" className="mb-4">Pricing</Badge>
            <h2 className="font-display text-4xl font-bold text-foreground">Choose Your Path</h2>
            <p className="mt-3 text-muted-foreground">Both paths lead to the same transformative career clarity experience.</p>
          </div>
          <div className="mx-auto mt-16 grid max-w-4xl gap-8 md:grid-cols-2">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
              <Card className="relative h-full border-primary shadow-lg shadow-primary/10">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground">Founding Cohort</Badge>
                </div>
                <CardContent className="p-8 pt-10">
                  <div className="flex items-baseline gap-2">
                    <span className="font-display text-4xl font-bold text-foreground">₹1,050</span>
                    <span className="text-lg text-muted-foreground line-through">₹1,500</span>
                  </div>
                  <Badge variant="secondary" className="mt-2">30% OFF — Limited Time</Badge>
                  <ul className="mt-6 space-y-3">
                    {["Complete Career Clarity 360 Assessment", "Personalized career roadmap", "1-on-1 mentor video call", "Exclusive WhatsApp community", "PDF report with top career matches"].map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-foreground">
                        <CheckCircle2 className="h-4 w-4 text-primary shrink-0" /> {f}
                      </li>
                    ))}
                  </ul>
                  <Button className="mt-8 w-full h-12 text-base" asChild>
                    <Link to="/assessment">Reserve My Founding Seat <ArrowRight className="ml-2 h-4 w-4" /></Link>
                  </Button>
                  <p className="mt-3 text-center text-xs text-muted-foreground flex items-center justify-center gap-1">
                    <Users className="h-3 w-3" /> Only 150 spots available
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1}>
              <Card className="h-full border-border/50">
                <CardContent className="p-8">
                  <div className="flex items-center gap-2">
                    <Heart className="h-5 w-5 text-primary" />
                    <span className="font-display text-xl font-semibold text-foreground">Scholarship Path</span>
                  </div>
                  <p className="mt-2 text-2xl font-display font-bold text-foreground">25–100% off</p>
                  <Badge variant="secondary" className="mt-2">Need-Based</Badge>
                  <ul className="mt-6 space-y-3">
                    {["Based on family income", "Same benefits as Founding Cohort", "Simple application process", "48-hour response time"].map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-foreground">
                        <CheckCircle2 className="h-4 w-4 text-primary shrink-0" /> {f}
                      </li>
                    ))}
                  </ul>
                  <Button variant="outline" className="mt-8 w-full h-12 text-base">
                    Apply for Scholarship <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <p className="mt-3 text-center text-xs text-muted-foreground">
                    🏆 NapoleonRobertsFoundation
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <Card className="overflow-hidden border-0 bg-gradient-to-br from-primary to-accent">
            <CardContent className="flex flex-col items-center p-12 text-center">
              <h2 className="font-display text-3xl font-bold text-primary-foreground md:text-4xl">
                12 Minutes to Career Clarity
              </h2>
              <p className="mt-4 max-w-xl text-primary-foreground/80">
                Join 10,000+ students who discovered careers that match who they really are.
                Don't let marks decide your future.
              </p>
              <Button size="lg" variant="secondary" className="mt-8 h-12 px-8 text-base" asChild>
                <Link to="/assessment">Start Your Assessment <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-6 md:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary">
              <Brain className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-display text-sm font-bold text-foreground">WeKIT™ Career Clarity 360</span>
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <a href="https://www.wekitmentoring.com/" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition">wekitmentoring.com</a>
            <span>•</span>
            <span>support@wekit.ai</span>
          </div>
          <p className="text-sm text-muted-foreground">© 2026 WeKIT™. Patent Pending.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
