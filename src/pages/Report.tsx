import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Download,
  ArrowLeft,
  Share2,
  Star,
  TrendingUp,
  Target,
  Sparkles,
  Rocket,
  Copy,
  Mail,
  ExternalLink,
  CheckCircle2,
  Loader2,
  Briefcase,
  IndianRupee,
  Globe,
  BarChart3,
} from "lucide-react";
import WeKitLogo from "@/components/WeKitLogo";
import ScrollReveal from "@/components/ScrollReveal";
import SEO from "@/components/SEO";
import {
  loadCareers,
  traitScoresToArchetypes,
  matchCareers,
  generateNextMoves,
  TRAIT_SUPERPOWERS,
  ARCHETYPES,
  type CareerMatch,
  type Archetype,
} from "@/lib/careerDatabase";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from "recharts";
import { toast } from "@/hooks/use-toast";

const ARCHETYPE_COLORS: Record<string, string> = {
  Builder: "hsl(168, 64%, 42%)",
  Thinker: "hsl(245, 58%, 51%)",
  Advocate: "hsl(32, 95%, 55%)",
  Caregiver: "hsl(340, 65%, 55%)",
  Creator: "hsl(280, 60%, 55%)",
  Organizer: "hsl(200, 70%, 50%)",
  Leader: "hsl(45, 90%, 50%)",
  Adventurer: "hsl(15, 80%, 55%)",
};

const ARCHETYPE_EMOJI: Record<string, string> = {
  Builder: "🔧",
  Thinker: "🧠",
  Advocate: "📢",
  Caregiver: "💚",
  Creator: "🎨",
  Organizer: "📋",
  Leader: "👑",
  Adventurer: "🚀",
};

const Report = () => {
  const reportRef = useRef<HTMLDivElement>(null);
  const [traitScores, setTraitScores] = useState<Record<string, number> | null>(null);
  const [archetypeScores, setArchetypeScores] = useState<Record<Archetype, number> | null>(null);
  const [topCareers, setTopCareers] = useState<CareerMatch[]>([]);
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem("wekit_trait_scores");
    if (!raw) {
      setLoading(false);
      return;
    }
    const scores = JSON.parse(raw) as Record<string, number>;
    setTraitScores(scores);

    const archScores = traitScoresToArchetypes(scores);
    setArchetypeScores(archScores);

    loadCareers().then((careers) => {
      const matches = matchCareers(archScores, careers, 12);
      setTopCareers(matches);
      setLoading(false);
    });
  }, []);

  const topTraits = traitScores
    ? Object.entries(traitScores)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 3)
    : [];

  const topArchetypes = archetypeScores
    ? Object.entries(archetypeScores)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 3)
    : [];

  const nextMoves = topCareers.length > 0 && topTraits.length > 0
    ? generateNextMoves(topCareers, topTraits.map(([t]) => t))
    : [];

  const radarData = archetypeScores
    ? ARCHETYPES.map((a) => ({ archetype: a, score: archetypeScores[a] || 0 }))
    : [];

  const highMatches = topCareers.filter((c) => c.matchScore >= 85);
  const mediumMatches = topCareers.filter((c) => c.matchScore >= 60 && c.matchScore < 85);

  const handleExportPDF = async () => {
    setExporting(true);
    try {
      const html2canvas = (await import("html2canvas")).default;
      const { jsPDF } = await import("jspdf");

      const el = reportRef.current;
      if (!el) return;

      const canvas = await html2canvas(el, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: "#0c0c14",
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = pageWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position -= pageHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save("WeKIT-Career-Clarity-360-Report.pdf");
      toast({ title: "PDF Downloaded!", description: "Your career report has been saved." });
    } catch (err) {
      toast({ title: "Export failed", description: "Please try again.", variant: "destructive" });
    } finally {
      setExporting(false);
    }
  };

  const shareUrl = window.location.href;
  const shareText = `I just discovered my Career DNA with WeKIT™ Career Clarity 360! My top archetype is ${topArchetypes[0]?.[0] || "Unknown"} with ${topCareers[0]?.career.title || "amazing"} as my #1 career match. Take the assessment →`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast({ title: "Link copied!" });
  };

  const handleShareEmail = () => {
    const subject = encodeURIComponent("My WeKIT™ Career Clarity 360 Results");
    const body = encodeURIComponent(`${shareText}\n\n${shareUrl}`);
    window.open(`mailto:?subject=${subject}&body=${body}`);
  };

  const handleShareWhatsApp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(`${shareText}\n${shareUrl}`)}`);
  };

  const handleShareLinkedIn = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`);
  };

  const handleShareTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`);
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
          <p className="mt-4 text-muted-foreground">Loading your career report...</p>
        </div>
      </div>
    );
  }

  if (!traitScores) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background p-6">
        <Card className="max-w-md border-border/50">
          <CardContent className="p-8 text-center">
            <Sparkles className="mx-auto h-10 w-10 text-primary" />
            <h2 className="mt-4 font-display text-2xl font-bold text-foreground">No Report Found</h2>
            <p className="mt-2 text-muted-foreground">
              Complete the Career Clarity 360 assessment first to generate your personalized report.
            </p>
            <Button className="mt-6 hover-glow" asChild>
              <Link to="/assessment">Take the Assessment</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const formatSalary = (n: number) => {
    if (n >= 100000) return `₹${(n / 100000).toFixed(1)}L`;
    if (n >= 1000) return `₹${(n / 1000).toFixed(0)}K`;
    return `₹${n}`;
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Your Career Report | WeKIT™ Career Clarity 360"
        description="Your personalized career DNA report with top archetype matches, superpowers, and a roadmap of next moves."
        path="/report"
      />
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto flex h-16 items-center justify-between px-6">
          <Link to="/" className="flex items-center gap-2">
            <WeKitLogo size="sm" />
            <span className="font-display text-lg font-bold text-foreground">WeKIT™</span>
          </Link>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link to="/"><ArrowLeft className="mr-1 h-3 w-3" /> Home</Link>
            </Button>
            <Button size="sm" onClick={handleExportPDF} disabled={exporting}>
              {exporting ? <Loader2 className="mr-1 h-3 w-3 animate-spin" /> : <Download className="mr-1 h-3 w-3" />}
              Export PDF
            </Button>
          </div>
        </div>
      </header>

      <main ref={reportRef} className="container mx-auto max-w-5xl px-6 py-8 space-y-8">
        {/* Page 1: Who You Are */}
        <ScrollReveal>
          <div className="text-center mb-12">
            <Badge className="mb-4 rounded-full bg-primary/10 text-primary border-primary/20 px-4 py-1.5">
              <Star className="mr-1.5 h-3.5 w-3.5" /> Career Clarity 360 Report
            </Badge>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground">
              Here's who you are
            </h1>
            <p className="mt-3 text-lg text-muted-foreground">
              Your unique Career DNA, decoded from 46 personality dimensions.
            </p>
          </div>
        </ScrollReveal>

        {/* Career DNA Archetype */}
        <h2 className="sr-only">Your career profile</h2>
        <ScrollReveal>
          <Card className="border-border/50 overflow-hidden">
            <div className="bg-gradient-to-r from-primary/10 via-accent/5 to-primary/10 p-1" />
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-display text-xl">
                <Target className="h-5 w-5 text-primary" /> Your Career DNA
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                {/* Archetype badges */}
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">Your top archetype profile:</p>
                  {topArchetypes.map(([arch, score], i) => (
                    <div key={arch} className="flex items-center gap-4">
                      <div
                        className="flex h-12 w-12 items-center justify-center rounded-xl text-xl"
                        style={{ backgroundColor: `${ARCHETYPE_COLORS[arch]}20` }}
                      >
                        {ARCHETYPE_EMOJI[arch]}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-semibold text-foreground">
                            {i === 0 && "🥇 "}{i === 1 && "🥈 "}{i === 2 && "🥉 "}{arch}
                          </span>
                          <span className="text-sm font-mono text-primary">{score}%</span>
                        </div>
                        <Progress value={score} className="h-2" />
                      </div>
                    </div>
                  ))}
                </div>
                {/* Radar */}
                <div>
                  <ResponsiveContainer width="100%" height={260}>
                    <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="70%">
                      <PolarGrid stroke="hsl(var(--border))" />
                      <PolarAngleAxis
                        dataKey="archetype"
                        tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
                      />
                      <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} axisLine={false} />
                      <Radar
                        name="Score"
                        dataKey="score"
                        stroke="hsl(var(--primary))"
                        fill="hsl(var(--primary))"
                        fillOpacity={0.2}
                        strokeWidth={2}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </CardContent>
          </Card>
        </ScrollReveal>

        {/* YOUR SUPERPOWERS */}
        <ScrollReveal delay={100}>
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-display text-xl">
                <Sparkles className="h-5 w-5 text-primary" /> Your Superpowers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                {topTraits.map(([trait, score], i) => (
                  <div
                    key={trait}
                    className="rounded-xl border border-border/50 bg-card p-5 hover-lift transition-all"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <Badge variant="outline" className="text-xs">#{i + 1} Superpower</Badge>
                      <span className="font-mono text-sm font-bold text-primary">
                        {Math.round((score / 30) * 100)}%
                      </span>
                    </div>
                    <h3 className="font-display text-lg font-semibold text-foreground">{trait}</h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                      {TRAIT_SUPERPOWERS[trait] || `You scored exceptionally high in ${trait}.`}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </ScrollReveal>

        {/* CAREER MATCHES */}
        <ScrollReveal delay={150}>
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-display text-xl">
                <Briefcase className="h-5 w-5 text-primary" /> Your Perfect Careers
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {highMatches.length > 0 && (
                <div>
                  <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground mb-4">
                    <TrendingUp className="h-4 w-4 text-accent" /> High Match (85%+)
                  </h3>
                  <div className="grid gap-3 md:grid-cols-2">
                    {highMatches.slice(0, 6).map((match) => (
                      <CareerCard key={match.career.id} match={match} formatSalary={formatSalary} />
                    ))}
                  </div>
                </div>
              )}
              {mediumMatches.length > 0 && (
                <div>
                  <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground mb-4">
                    <BarChart3 className="h-4 w-4 text-muted-foreground" /> Medium Match (60-84%)
                  </h3>
                  <div className="grid gap-3 md:grid-cols-2">
                    {mediumMatches.slice(0, 4).map((match) => (
                      <CareerCard key={match.career.id} match={match} formatSalary={formatSalary} />
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </ScrollReveal>

        {/* NEXT 3 MOVES */}
        <ScrollReveal delay={200}>
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-display text-xl">
                <Rocket className="h-5 w-5 text-primary" /> Your Next 3 Moves
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {nextMoves.map((move, i) => (
                  <div key={i} className="flex items-start gap-4 rounded-lg border border-border/50 p-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 font-display text-sm font-bold text-primary">
                      {i + 1}
                    </div>
                    <p className="text-sm text-foreground leading-relaxed">{move}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </ScrollReveal>

        {/* SHARE & EXPORT */}
        <ScrollReveal delay={250}>
          <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-accent/5">
            <CardContent className="p-8 text-center">
              <Share2 className="mx-auto h-8 w-8 text-primary" />
              <h2 className="mt-4 font-display text-2xl font-bold text-foreground">
                Share Your Career DNA
              </h2>
              <p className="mt-2 text-muted-foreground">
                Inspire your friends and family — share your results!
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <Button onClick={handleShareWhatsApp} className="gap-2 rounded-full bg-[#25D366] hover:bg-[#128C7E] text-white">
                  <ExternalLink className="h-4 w-4" /> WhatsApp
                </Button>
                <Button onClick={handleShareLinkedIn} className="gap-2 rounded-full bg-[#0077B5] hover:bg-[#005885] text-white">
                  <ExternalLink className="h-4 w-4" /> LinkedIn
                </Button>
                <Button onClick={handleShareTwitter} className="gap-2 rounded-full bg-[#1DA1F2] hover:bg-[#0d8bd9] text-white">
                  <ExternalLink className="h-4 w-4" /> Twitter/X
                </Button>
                <Button onClick={handleShareEmail} variant="outline" className="gap-2 rounded-full">
                  <Mail className="h-4 w-4" /> Email
                </Button>
                <Button onClick={handleCopyLink} variant="outline" className="gap-2 rounded-full">
                  {copied ? <CheckCircle2 className="h-4 w-4 text-accent" /> : <Copy className="h-4 w-4" />}
                  {copied ? "Copied!" : "Copy Link"}
                </Button>
              </div>
              <div className="mt-6">
                <Button size="lg" onClick={handleExportPDF} disabled={exporting} className="rounded-full hover-glow px-8">
                  {exporting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Download className="mr-2 h-4 w-4" />}
                  Download Full PDF Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </ScrollReveal>

        {/* Discord CTA */}
        <ScrollReveal delay={300}>
          <div className="rounded-2xl border border-border/50 bg-card p-8 text-center">
            <h3 className="font-display text-xl font-bold text-foreground">
              Join the We‑KIT Community 🎯
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Weekly career Q&A, mentorship sessions, and exclusive opportunities.
            </p>
            <Button className="mt-4 rounded-full hover-glow" asChild>
              <a href="https://discord.gg/wekit" target="_blank" rel="noopener noreferrer">
                Join Discord Community <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </ScrollReveal>
      </main>
    </div>
  );
};

function CareerCard({ match, formatSalary }: { match: CareerMatch; formatSalary: (n: number) => string }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="rounded-xl border border-border/50 bg-card p-4 hover-lift transition-all cursor-pointer"
      onClick={() => setExpanded(!expanded)}
    >
      <div className="flex items-start justify-between mb-2">
        <h4 className="font-display text-sm font-semibold text-foreground leading-tight">
          {match.career.title}
        </h4>
        <Badge
          className={`shrink-0 ml-2 text-xs font-mono ${
            match.matchScore >= 85
              ? "bg-accent/10 text-accent border-accent/20"
              : "bg-primary/10 text-primary border-primary/20"
          }`}
        >
          {match.matchScore}%
        </Badge>
      </div>
      <p className="text-xs text-muted-foreground">{match.career.family}</p>
      <div className="mt-3 flex flex-wrap gap-2 text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <IndianRupee className="h-3 w-3" />
          {formatSalary(match.career.salaryMin)}–{formatSalary(match.career.salaryMax)}
        </span>
        {match.career.remoteScore >= 50 && (
          <span className="flex items-center gap-1">
            <Globe className="h-3 w-3" /> Remote-friendly
          </span>
        )}
        <span className="flex items-center gap-1">
          <TrendingUp className="h-3 w-3" /> {match.career.growthRate}% growth
        </span>
      </div>
      {match.matchingArchetypes.length > 0 && (
        <div className="mt-2 flex gap-1">
          {match.matchingArchetypes.map((a) => (
            <span key={a} className="text-xs">
              {ARCHETYPE_EMOJI[a as keyof typeof ARCHETYPE_EMOJI]}
            </span>
          ))}
        </div>
      )}

      {/* Explainability: Why this fits you */}
      {expanded && match.whyFits.length > 0 && (
        <div className="mt-3 pt-3 border-t border-border/30 space-y-1.5">
          <p className="text-xs font-semibold text-primary">Why this fits you:</p>
          {match.whyFits.map((reason, i) => (
            <p key={i} className="text-xs text-muted-foreground flex items-start gap-1.5">
              <CheckCircle2 className="h-3 w-3 mt-0.5 shrink-0 text-accent" />
              {reason}
            </p>
          ))}
        </div>
      )}
      {match.whyFits.length > 0 && (
        <p className="mt-2 text-[10px] text-muted-foreground/60 text-center">
          {expanded ? "Tap to collapse" : "Tap to see why →"}
        </p>
      )}
    </div>
  );
}

export default Report;
