import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Star,
  Users,
  Sparkles,
  Target,
  Heart,
  Compass,
  Brain,
  Play,
  Zap,
  Shield,
} from "lucide-react";
import WeKitLogo from "@/components/WeKitLogo";
import VideoHero from "@/components/VideoHero";
import ScrollReveal from "@/components/ScrollReveal";

const HERO_VIDEO = "https://videos.pexels.com/video-files/3129671/3129671-uhd_2560_1440_30fps.mp4";
const SECTION_VIDEO = "https://videos.pexels.com/video-files/3195394/3195394-uhd_2560_1440_25fps.mp4";

const stats = [
  { value: "97%", label: "Accuracy", icon: Target },
  { value: "3,300+", label: "Career Paths", icon: Compass },
  { value: "10K+", label: "Students Guided", icon: Users },
  { value: "12 min", label: "To Clarity", icon: Zap },
];

const features = [
  {
    icon: Compass,
    title: "Career DNA Mapping",
    description: "Discover your unique archetype from 6 personality profiles mapped to 3,300+ career paths worldwide.",
    image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    icon: Brain,
    title: "AI-Powered Matching",
    description: "Advanced psychometric scoring maps 12 personality traits to careers that truly fit who you are.",
    image: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    icon: Target,
    title: "Personalized Roadmap",
    description: "Step-by-step action plan with college recommendations, skill gaps, and actionable next steps.",
    image: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    icon: Heart,
    title: "1-on-1 Mentor Call",
    description: "Discuss your results with certified career mentors who help chart your path forward.",
    image: "https://images.pexels.com/photos/4145153/pexels-photo-4145153.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    icon: Shield,
    title: "Scientifically Validated",
    description: "46 research-backed questions developed with psychometric experts across 10,000+ students.",
    image: "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    icon: Sparkles,
    title: "Swipe-Based Experience",
    description: "Fun, intuitive Tinder-style interface — complete your entire assessment in just 12 minutes.",
    image: "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
];

const steps = [
  {
    num: "01",
    title: "Swipe Through Questions",
    desc: "Answer 46 personality questions with our intuitive swipe interface. Left, right, up, down — it's that simple.",
  },
  {
    num: "02",
    title: "Discover Your Career DNA",
    desc: "Our AI maps your 12 traits to 3,300+ careers and reveals your unique Career DNA archetype.",
  },
  {
    num: "03",
    title: "Get Your Roadmap",
    desc: "Receive a personalized PDF report with top career matches, a 1-on-1 mentor call, and clear action steps.",
  },
];

const Index = () => {
  const parallaxRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const navBg = useTransform(scrollYProgress, [0, 0.05], [0, 1]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Floating Nav */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 glass-nav"
        style={{ opacity: 1 }}
      >
        <div className="container mx-auto flex h-16 items-center justify-between px-6">
          <Link to="/" className="flex items-center gap-3">
            <WeKitLogo size="md" />
            <span className="font-display text-lg font-bold text-foreground">WeKIT™</span>
          </Link>
          <div className="hidden items-center gap-8 md:flex">
            <a href="#how-it-works" className="text-sm font-medium text-muted-foreground transition-colors duration-300 hover:text-foreground">How It Works</a>
            <a href="#features" className="text-sm font-medium text-muted-foreground transition-colors duration-300 hover:text-foreground">Features</a>
            <a href="#pricing" className="text-sm font-medium text-muted-foreground transition-colors duration-300 hover:text-foreground">Pricing</a>
            <a href="https://www.wekitmentoring.com/" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-muted-foreground transition-colors duration-300 hover:text-foreground">Mentoring</a>
          </div>
          <Button size="sm" className="rounded-full px-6 hover-glow" asChild>
            <Link to="/assessment">Start Now <ArrowRight className="ml-1.5 h-4 w-4" /></Link>
          </Button>
        </div>
      </motion.nav>

      {/* HERO — Cinematic Video */}
      <VideoHero videoUrl={HERO_VIDEO}>
        <div className="container mx-auto px-6">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Badge className="mb-8 rounded-full border-primary/30 bg-primary/10 px-5 py-2 text-sm font-medium text-primary backdrop-blur-sm">
                <Star className="mr-2 h-3.5 w-3.5" /> Only 150 Founding Cohort Spots
              </Badge>
            </motion.div>

            <motion.h1
              className="font-display text-5xl font-bold leading-[1.05] tracking-tight text-foreground md:text-7xl lg:text-8xl"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              Fall in love
              <br />
              with your{" "}
              <span className="gradient-text">future</span>
            </motion.h1>

            <motion.p
              className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              Discover careers that match your personality, not just your marks.
              An AI-powered assessment for the next generation.
            </motion.p>

            <motion.div
              className="mt-10 flex flex-col gap-4 sm:flex-row"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              <Button size="lg" className="h-14 rounded-full px-10 text-base font-semibold hover-glow" asChild>
                <Link to="/assessment">
                  Start Career Clarity 360 <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="h-14 rounded-full border-foreground/20 px-10 text-base font-semibold backdrop-blur-sm hover:bg-foreground/5"
                asChild
              >
                <a href="#how-it-works">
                  <Play className="mr-2 h-4 w-4" /> See How It Works
                </a>
              </Button>
            </motion.div>
          </div>
        </div>
      </VideoHero>

      {/* STATS — Glass cards */}
      <section className="relative -mt-20 z-20 pb-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {stats.map((stat, i) => (
              <ScrollReveal key={stat.label} delay={i * 100}>
                <div className="glass-card p-6 text-center hover-lift">
                  <stat.icon className="mx-auto mb-3 h-5 w-5 text-primary" />
                  <div className="font-display text-3xl font-bold text-foreground">{stat.value}</div>
                  <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* PROBLEM / VISION */}
      <section className="py-32">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-4xl text-center">
            <ScrollReveal>
              <p className="text-sm font-medium uppercase tracking-widest text-primary">The Problem</p>
              <h2 className="mt-6 font-display text-4xl font-bold leading-tight text-foreground md:text-6xl text-balance">
                250M+ Indian students face the same crisis
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <p className="mt-8 text-xl leading-relaxed text-muted-foreground text-balance">
                "What should I do?" — Marks don't predict careers. Parents push safe streams.
                AI rewrites jobs daily. The old system is broken.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={400}>
              <div className="mt-12 inline-flex items-center gap-3 rounded-full border border-primary/20 bg-primary/5 px-8 py-4">
                <Sparkles className="h-5 w-5 text-primary" />
                <span className="text-lg font-medium text-foreground">
                  WeKIT™ fixes this — 12 minutes to career clarity
                </span>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS — Steps */}
      <section id="how-it-works" className="py-32 bg-secondary/30">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <div className="text-center">
              <p className="text-sm font-medium uppercase tracking-widest text-primary">How It Works</p>
              <h2 className="mt-4 font-display text-4xl font-bold text-foreground md:text-5xl">
                Career clarity in three moves
              </h2>
            </div>
          </ScrollReveal>

          <div className="mt-20 grid gap-8 md:grid-cols-3">
            {steps.map((step, i) => (
              <ScrollReveal key={step.num} delay={i * 150}>
                <div className="glass-card p-8 hover-lift h-full">
                  <span className="font-display text-6xl font-bold text-primary/15">{step.num}</span>
                  <h3 className="mt-4 font-display text-xl font-semibold text-foreground">{step.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{step.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES — Cinematic cards with images */}
      <section id="features" className="py-32">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <div className="text-center">
              <p className="text-sm font-medium uppercase tracking-widest text-primary">Features</p>
              <h2 className="mt-4 font-display text-4xl font-bold text-foreground md:text-5xl">
                Why WeKIT™ Career Clarity 360?
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
                A patent-pending assessment experience built for India's next generation.
              </p>
            </div>
          </ScrollReveal>

          <div className="mt-20 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, i) => (
              <ScrollReveal key={feature.title} delay={i * 100}>
                <div className="group relative overflow-hidden rounded-2xl border border-border bg-card hover-lift h-full">
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={feature.image}
                      alt={feature.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/20 backdrop-blur-sm">
                        <feature.icon className="h-5 w-5 text-primary" />
                      </div>
                    </div>
                  </div>
                  {/* Content */}
                  <div className="p-6">
                    <h3 className="font-display text-lg font-semibold text-foreground">{feature.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* VISUAL STORYTELLING — Full width video section */}
      <section className="cinematic-section py-0">
        <div className="relative min-h-[80vh] overflow-hidden">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source src={SECTION_VIDEO} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
          <div className="relative z-10 flex min-h-[80vh] items-center">
            <div className="container mx-auto px-6">
              <div className="max-w-xl">
                <ScrollReveal>
                  <p className="text-sm font-medium uppercase tracking-widest text-primary">The Magic Moment</p>
                  <h2 className="mt-6 font-display text-4xl font-bold leading-tight text-foreground md:text-5xl">
                    "Law fits you 92% because your communication + empathy = courtroom superpower."
                  </h2>
                  <p className="mt-6 text-lg text-muted-foreground">
                    That's the moment everything changes. When a student sees their personality
                    translated into a career path they never considered — but that fits them perfectly.
                  </p>
                  <Button size="lg" className="mt-10 h-14 rounded-full px-10 text-base font-semibold hover-glow" asChild>
                    <Link to="/assessment">
                      Discover Your Career DNA <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-32">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <div className="text-center">
              <p className="text-sm font-medium uppercase tracking-widest text-primary">Pricing</p>
              <h2 className="mt-4 font-display text-4xl font-bold text-foreground md:text-5xl">
                Choose your path
              </h2>
              <p className="mt-4 text-muted-foreground">
                Both paths lead to the same transformative career clarity experience.
              </p>
            </div>
          </ScrollReveal>

          <div className="mx-auto mt-16 grid max-w-4xl gap-8 md:grid-cols-2">
            <ScrollReveal delay={0}>
              <div className="relative overflow-hidden rounded-2xl border border-primary/30 bg-card p-8 hover-lift">
                <div className="absolute top-0 right-0 h-32 w-32 rounded-bl-full bg-primary/5" />
                <Badge className="mb-6 rounded-full bg-primary/10 text-primary border-primary/20">
                  Founding Cohort
                </Badge>
                <div className="flex items-baseline gap-3">
                  <span className="font-display text-5xl font-bold text-foreground">₹1,050</span>
                  <span className="text-lg text-muted-foreground line-through">₹1,500</span>
                </div>
                <Badge variant="secondary" className="mt-3 rounded-full">30% OFF — Limited Time</Badge>
                <ul className="mt-8 space-y-4">
                  {[
                    "Complete Career Clarity 360 Assessment",
                    "Personalized career roadmap",
                    "1-on-1 mentor video call",
                    "Exclusive WhatsApp community",
                    "PDF report with top career matches",
                  ].map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm text-foreground">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary shrink-0" /> {f}
                    </li>
                  ))}
                </ul>
                <Button className="mt-8 w-full h-14 rounded-full text-base font-semibold hover-glow" asChild>
                  <Link to="/assessment">Reserve My Founding Seat <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
                <p className="mt-4 text-center text-xs text-muted-foreground flex items-center justify-center gap-1.5">
                  <Users className="h-3.5 w-3.5" /> Only 150 spots available
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={150}>
              <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-8 hover-lift">
                <div className="flex items-center gap-3 mb-6">
                  <Heart className="h-5 w-5 text-primary" />
                  <span className="font-display text-lg font-semibold text-foreground">Scholarship Path</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="font-display text-5xl font-bold text-foreground">25–100%</span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">Scholarship Coverage</p>
                <Badge variant="secondary" className="mt-3 rounded-full">Need-Based</Badge>
                <ul className="mt-8 space-y-4">
                  {[
                    "Based on family income",
                    "Same benefits as Founding Cohort",
                    "Simple application process",
                    "48-hour response time",
                  ].map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm text-foreground">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary shrink-0" /> {f}
                    </li>
                  ))}
                </ul>
                <Button variant="outline" className="mt-8 w-full h-14 rounded-full text-base font-semibold border-foreground/20 hover:bg-foreground/5">
                  Apply for Scholarship <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <p className="mt-4 text-center text-xs text-muted-foreground">
                  🏆 NapoleonRobertsFoundation
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* FINAL CTA — Cinematic */}
      <section className="cinematic-section">
        <div className="relative min-h-[60vh] overflow-hidden bg-gradient-to-br from-primary/20 via-background to-accent/10">
          {/* Ambient glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-primary/10 blur-[120px] animate-glow" />

          <div className="relative z-10 flex min-h-[60vh] items-center">
            <div className="container mx-auto px-6 text-center">
              <ScrollReveal>
                <h2 className="mx-auto max-w-3xl font-display text-4xl font-bold leading-tight text-foreground md:text-6xl">
                  12 minutes to know
                  <br />
                  <span className="gradient-text">who you really are</span>
                </h2>
                <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
                  Don't let marks decide your future. Join 10,000+ students who discovered
                  careers that match who they truly are.
                </p>
                <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                  <Button size="lg" className="h-14 rounded-full px-10 text-base font-semibold hover-glow" asChild>
                    <Link to="/assessment">
                      Start Your Assessment <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="h-14 rounded-full border-foreground/20 px-10 text-base font-semibold hover:bg-foreground/5"
                    asChild
                  >
                    <a href="https://www.wekitmentoring.com/" target="_blank" rel="noopener noreferrer">
                      Explore WeKIT Mentoring
                    </a>
                  </Button>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border py-16">
        <div className="container mx-auto px-6">
          <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
            <div className="flex items-center gap-3">
              <WeKitLogo size="md" />
              <div>
                <span className="font-display text-lg font-bold text-foreground">WeKIT™</span>
                <p className="text-xs text-muted-foreground">Career Clarity 360</p>
              </div>
            </div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <a href="https://www.wekitmentoring.com/" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-foreground">wekitmentoring.com</a>
              <span className="text-border">•</span>
              <span>support@wekit.ai</span>
            </div>
            <p className="text-sm text-muted-foreground">© 2026 WeKIT™. Patent Pending.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
