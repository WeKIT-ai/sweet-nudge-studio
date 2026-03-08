import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Brain,
  Download,
  ArrowLeft,
  TrendingUp,
  Award,
  Target,
  Lightbulb,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import WeKitLogo from "@/components/WeKitLogo";
import { candidateReport } from "@/data/mockData";
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

const radarData = [
  { trait: "Openness", value: candidateReport.personalityProfile.openness },
  { trait: "Conscientiousness", value: candidateReport.personalityProfile.conscientiousness },
  { trait: "Extraversion", value: candidateReport.personalityProfile.extraversion },
  { trait: "Agreeableness", value: candidateReport.personalityProfile.agreeableness },
  { trait: "Emotional Stability", value: 100 - candidateReport.personalityProfile.neuroticism },
];

const competencyData = candidateReport.competencies.map((c) => ({
  name: c.name,
  score: c.score,
  benchmark: c.benchmark,
}));

const roleFitData = Object.entries(candidateReport.roleFit).map(([role, score]) => ({
  role,
  score,
}));

const COLORS = [
  "hsl(245, 58%, 51%)",
  "hsl(168, 64%, 42%)",
  "hsl(32, 95%, 55%)",
  "hsl(340, 65%, 55%)",
];

const Report = () => {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <Link to="/dashboard" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Brain className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-display text-lg font-bold text-foreground">PsychMetric</span>
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" asChild>
              <Link to="/dashboard"><ArrowLeft className="mr-1 h-3 w-3" /> Dashboard</Link>
            </Button>
            <Button size="sm">
              <Download className="mr-1 h-3 w-3" /> Export PDF
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto max-w-6xl px-6 py-8">
        {/* Header Card */}
        <Card className="border-border/50 bg-gradient-to-r from-primary/5 to-accent/5">
          <CardContent className="p-6 md:p-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <Badge variant="secondary" className="mb-2">Candidate Report</Badge>
                <h1 className="font-display text-3xl font-bold text-foreground">{candidateReport.name}</h1>
                <p className="mt-1 text-muted-foreground">{candidateReport.assessment} • Completed {candidateReport.completedAt}</p>
                <p className="text-sm text-muted-foreground">Duration: {candidateReport.duration}</p>
              </div>
              <div className="flex gap-4">
                <div className="text-center">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-primary bg-primary/10">
                    <span className="font-display text-2xl font-bold text-primary">{candidateReport.overallScore}%</span>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">Overall Score</p>
                </div>
                <div className="text-center">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-accent bg-accent/10">
                    <span className="font-display text-2xl font-bold text-accent">{candidateReport.percentile}th</span>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">Percentile</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {/* Competency Breakdown */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-display">
                <Target className="h-5 w-5 text-primary" /> Competency Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {candidateReport.competencies.map((comp) => (
                  <div key={comp.name}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-foreground">{comp.name}</span>
                      <span className="text-muted-foreground">{comp.score}% <span className="text-xs">(bench: {comp.benchmark}%)</span></span>
                    </div>
                    <div className="relative">
                      <Progress value={comp.score} className="h-2.5" />
                      <div
                        className="absolute top-0 h-2.5 w-0.5 bg-destructive"
                        style={{ left: `${comp.benchmark}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Personality Radar */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-display">
                <Brain className="h-5 w-5 text-primary" /> Personality Profile (Big Five)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="75%">
                  <PolarGrid stroke="hsl(220, 13%, 90%)" />
                  <PolarAngleAxis dataKey="trait" tick={{ fontSize: 11, fill: "hsl(220, 10%, 46%)" }} />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} axisLine={false} />
                  <Radar
                    name="Score"
                    dataKey="value"
                    stroke="hsl(245, 58%, 51%)"
                    fill="hsl(245, 58%, 51%)"
                    fillOpacity={0.2}
                    strokeWidth={2}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Role Fit */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-display">
                <Award className="h-5 w-5 text-primary" /> Role Fit Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={roleFitData} layout="vertical" margin={{ left: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="hsl(220, 13%, 90%)" />
                  <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11 }} />
                  <YAxis dataKey="role" type="category" width={130} tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Bar dataKey="score" radius={[0, 4, 4, 0]} barSize={24}>
                    {roleFitData.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Strengths & Development */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-display">
                <Lightbulb className="h-5 w-5 text-primary" /> Key Insights
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="flex items-center gap-2 text-sm font-semibold text-foreground mb-3">
                  <TrendingUp className="h-4 w-4 text-accent" /> Strengths
                </h4>
                <ul className="space-y-2">
                  {candidateReport.strengths.map((s) => (
                    <li key={s} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" /> {s}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="flex items-center gap-2 text-sm font-semibold text-foreground mb-3">
                  <AlertCircle className="h-4 w-4 text-warning" /> Development Areas
                </h4>
                <ul className="space-y-2">
                  {candidateReport.developmentAreas.map((d) => (
                    <li key={d} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-warning" /> {d}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Report;
