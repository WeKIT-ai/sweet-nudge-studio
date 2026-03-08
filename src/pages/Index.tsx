import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Brain,
  BarChart3,
  Shield,
  Users,
  Zap,
  Globe,
  ArrowRight,
  CheckCircle2,
  Star,
  ChevronRight,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

const features = [
  {
    icon: Brain,
    title: "Adaptive Testing Engine",
    description: "Real-time difficulty adjustment powered by Item Response Theory for precise, efficient measurement.",
  },
  {
    icon: BarChart3,
    title: "Deep Analytics",
    description: "Competency breakdowns, radar charts, and role-fit indicators backed by psychometric science.",
  },
  {
    icon: Shield,
    title: "AI Proctoring",
    description: "Tab-switch detection, anomaly algorithms, and identity verification ensure test integrity.",
  },
  {
    icon: Users,
    title: "Candidate Experience",
    description: "Mobile-first, accessible design with progress tracking and instant feedback.",
  },
  {
    icon: Zap,
    title: "Smart Insights",
    description: "Predictive performance modeling and bias-free evaluations for better hiring decisions.",
  },
  {
    icon: Globe,
    title: "Enterprise Scale",
    description: "10,000+ concurrent users, multi-language support, and ATS integrations.",
  },
];

const assessmentTypes = [
  {
    title: "Cognitive Ability",
    tests: ["Numerical Reasoning", "Verbal Reasoning", "Logical Reasoning", "Problem Solving"],
    color: "bg-primary/10 text-primary",
  },
  {
    title: "Personality",
    tests: ["Big Five (OCEAN)", "DISC Profile", "MBTI-Style Typing", "Trait Competency"],
    color: "bg-accent/10 text-accent",
  },
  {
    title: "Situational Judgment",
    tests: ["Leadership Scenarios", "Customer Service", "Ethical Judgment", "Decision Making"],
    color: "bg-warning/10 text-warning",
  },
];

const stats = [
  { value: "40%", label: "Faster Hiring" },
  { value: "30%", label: "Better Quality-of-Hire" },
  { value: "95%", label: "User Satisfaction" },
  { value: "85%+", label: "Prediction Accuracy" },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto flex h-16 items-center justify-between px-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <Brain className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-display text-xl font-bold text-foreground">PsychMetric</span>
          </Link>
          <div className="hidden items-center gap-8 md:flex">
            <a href="#features" className="text-sm font-medium text-muted-foreground transition hover:text-foreground">Features</a>
            <a href="#assessments" className="text-sm font-medium text-muted-foreground transition hover:text-foreground">Assessments</a>
            <a href="#pricing" className="text-sm font-medium text-muted-foreground transition hover:text-foreground">Pricing</a>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/dashboard">Login</Link>
            </Button>
            <Button size="sm" asChild>
              <Link to="/dashboard">Get Started <ArrowRight className="ml-1 h-4 w-4" /></Link>
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
              <Star className="mr-1.5 h-3.5 w-3.5 text-warning" /> Trusted by 500+ Organizations
            </Badge>
          </motion.div>
          <motion.h1
            className="mx-auto max-w-4xl font-display text-5xl font-bold leading-tight tracking-tight text-foreground md:text-7xl"
            initial="hidden" animate="visible" variants={fadeUp} custom={1}
          >
            Hire Smarter with{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Science-Backed
            </span>{" "}
            Assessments
          </motion.h1>
          <motion.p
            className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl"
            initial="hidden" animate="visible" variants={fadeUp} custom={2}
          >
            AI-powered psychometric testing platform that reduces bias, predicts performance,
            and delivers actionable insights — from cognitive ability to personality profiling.
          </motion.p>
          <motion.div
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
            initial="hidden" animate="visible" variants={fadeUp} custom={3}
          >
            <Button size="lg" className="h-12 px-8 text-base" asChild>
              <Link to="/dashboard">Start Free Trial <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
            <Button variant="outline" size="lg" className="h-12 px-8 text-base" asChild>
              <Link to="/assessment">Try Demo Assessment</Link>
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

      {/* Features */}
      <section id="features" className="py-24 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <Badge variant="outline" className="mb-4">Platform Features</Badge>
            <h2 className="font-display text-4xl font-bold text-foreground">
              Everything You Need for Better Hiring
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              A complete psychometric assessment suite from adaptive testing to advanced analytics.
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

      {/* Assessment Types */}
      <section id="assessments" className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <Badge variant="outline" className="mb-4">Assessment Library</Badge>
            <h2 className="font-display text-4xl font-bold text-foreground">
              Scientifically Validated Assessment Suite
            </h2>
          </div>
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {assessmentTypes.map((type, i) => (
              <motion.div
                key={type.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
              >
                <Card className="h-full border-border/50">
                  <CardContent className="p-6">
                    <Badge className={type.color + " border-0"}>{type.title}</Badge>
                    <ul className="mt-6 space-y-3">
                      {type.tests.map((test) => (
                        <li key={test} className="flex items-center gap-2 text-sm text-foreground">
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-accent" />
                          {test}
                        </li>
                      ))}
                    </ul>
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
            <h2 className="font-display text-4xl font-bold text-foreground">Simple, Transparent Pricing</h2>
          </div>
          <div className="mx-auto mt-16 grid max-w-5xl gap-8 md:grid-cols-3">
            {[
              { name: "Starter", price: "$49", period: "/mo", desc: "For small teams", features: ["Up to 50 assessments/mo", "3 assessment types", "Basic reports", "Email support"] },
              { name: "Professional", price: "$149", period: "/mo", desc: "For growing teams", features: ["Unlimited assessments", "All assessment types", "Advanced analytics", "AI proctoring", "ATS integrations", "Priority support"], popular: true },
              { name: "Enterprise", price: "Custom", period: "", desc: "For large organizations", features: ["Everything in Pro", "Custom assessments", "SSO & RBAC", "Dedicated CSM", "SLA guarantee", "On-premise option"] },
            ].map((plan, i) => (
              <motion.div
                key={plan.name}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
              >
                <Card className={`relative h-full ${plan.popular ? "border-primary shadow-lg shadow-primary/10" : "border-border/50"}`}>
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <Badge className="bg-primary text-primary-foreground">Most Popular</Badge>
                    </div>
                  )}
                  <CardContent className="p-6 pt-8">
                    <h3 className="font-display text-xl font-semibold text-foreground">{plan.name}</h3>
                    <p className="text-sm text-muted-foreground">{plan.desc}</p>
                    <div className="mt-4">
                      <span className="font-display text-4xl font-bold text-foreground">{plan.price}</span>
                      <span className="text-muted-foreground">{plan.period}</span>
                    </div>
                    <ul className="mt-6 space-y-3">
                      {plan.features.map((f) => (
                        <li key={f} className="flex items-center gap-2 text-sm text-foreground">
                          <CheckCircle2 className="h-4 w-4 text-accent" /> {f}
                        </li>
                      ))}
                    </ul>
                    <Button
                      className="mt-6 w-full"
                      variant={plan.popular ? "default" : "outline"}
                      asChild
                    >
                      <Link to="/dashboard">
                        Get Started <ChevronRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <Card className="overflow-hidden border-0 bg-gradient-to-br from-primary to-primary/80">
            <CardContent className="flex flex-col items-center p-12 text-center">
              <h2 className="font-display text-3xl font-bold text-primary-foreground md:text-4xl">
                Ready to Transform Your Hiring?
              </h2>
              <p className="mt-4 max-w-xl text-primary-foreground/80">
                Join 500+ organizations using PsychMetric to make data-driven hiring decisions.
              </p>
              <Button size="lg" variant="secondary" className="mt-8 h-12 px-8 text-base" asChild>
                <Link to="/dashboard">Start Free Trial <ArrowRight className="ml-2 h-4 w-4" /></Link>
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
            <span className="font-display text-sm font-bold text-foreground">PsychMetric</span>
          </div>
          <p className="text-sm text-muted-foreground">© 2026 PsychMetric. GDPR & CCPA Compliant.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
