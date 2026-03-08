import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  Brain,
  Users,
  BarChart3,
  Clock,
  Search,
  Plus,
  ChevronRight,
  TrendingUp,
  CheckCircle2,
  AlertCircle,
  Mail,
  Timer,
  XCircle,
  Eye,
} from "lucide-react";
import WeKitLogo from "@/components/WeKitLogo";
import { assessments, candidates, dashboardStats, type Assessment, type Candidate } from "@/data/mockData";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const statusConfig: Record<Candidate["status"], { label: string; icon: typeof CheckCircle2; className: string }> = {
  completed: { label: "Completed", icon: CheckCircle2, className: "bg-success/10 text-success" },
  in_progress: { label: "In Progress", icon: Timer, className: "bg-info/10 text-info" },
  invited: { label: "Invited", icon: Mail, className: "bg-warning/10 text-warning" },
  expired: { label: "Expired", icon: XCircle, className: "bg-destructive/10 text-destructive" },
};

const typeConfig: Record<Assessment["type"], { label: string; className: string }> = {
  cognitive: { label: "Cognitive", className: "bg-primary/10 text-primary" },
  personality: { label: "Personality", className: "bg-accent/10 text-accent" },
  situational: { label: "SJT", className: "bg-warning/10 text-warning" },
};

const Dashboard = () => {
  const [search, setSearch] = useState("");
  const [inviteOpen, setInviteOpen] = useState(false);
  const [typeFilter, setTypeFilter] = useState<string>("all");

  const filteredAssessments = assessments.filter((a) => {
    const matchesSearch = a.title.toLowerCase().includes(search.toLowerCase());
    const matchesType = typeFilter === "all" || a.type === typeFilter;
    return matchesSearch && matchesType;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto flex h-16 items-center justify-between px-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Brain className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-display text-lg font-bold text-foreground">PsychMetric</span>
          </Link>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" asChild>
              <Link to="/report">Reports</Link>
            </Button>
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-xs font-semibold text-primary">SR</span>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          {[
            { label: "Total Assessments", value: dashboardStats.totalAssessments, icon: BarChart3, change: "+12%" },
            { label: "Candidates This Month", value: dashboardStats.candidatesThisMonth, icon: Users, change: "+8%" },
            { label: "Completion Rate", value: `${dashboardStats.completionRate}%`, icon: CheckCircle2, change: "+3%" },
            { label: "Avg Score", value: dashboardStats.avgScore, icon: TrendingUp, change: "+2pts" },
          ].map((stat) => (
            <Card key={stat.label} className="border-border/50">
              <CardContent className="flex items-center gap-4 p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <stat.icon className="h-5 w-5 text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <div className="flex items-center gap-2">
                    <span className="font-display text-2xl font-bold text-foreground">{stat.value}</span>
                    <Badge variant="secondary" className="text-xs text-accent">{stat.change}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <Tabs defaultValue="assessments" className="mt-8">
          <TabsList className="mb-6">
            <TabsTrigger value="assessments">Assessment Library</TabsTrigger>
            <TabsTrigger value="candidates">Candidates</TabsTrigger>
          </TabsList>

          <TabsContent value="assessments">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="relative max-w-sm flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search assessments..."
                  className="pl-9"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                {["all", "cognitive", "personality", "situational"].map((t) => (
                  <Button
                    key={t}
                    variant={typeFilter === t ? "default" : "outline"}
                    size="sm"
                    onClick={() => setTypeFilter(t)}
                  >
                    {t === "all" ? "All" : t.charAt(0).toUpperCase() + t.slice(1)}
                  </Button>
                ))}
              </div>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredAssessments.map((assessment) => (
                <Card key={assessment.id} className="group border-border/50 transition-all hover:border-primary/30 hover:shadow-md">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <Badge className={`${typeConfig[assessment.type].className} border-0`}>
                        {typeConfig[assessment.type].label}
                      </Badge>
                      <Badge variant="outline" className="text-xs capitalize">{assessment.difficulty}</Badge>
                    </div>
                    <CardTitle className="mt-2 font-display text-lg">{assessment.title}</CardTitle>
                    <CardDescription className="line-clamp-2 text-sm">{assessment.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {assessment.duration} min</span>
                      <span className="flex items-center gap-1"><AlertCircle className="h-3.5 w-3.5" /> {assessment.questions} Q</span>
                      <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" /> {assessment.completions}</span>
                    </div>
                    {assessment.type !== "personality" && (
                      <div className="mt-3">
                        <div className="flex justify-between text-xs text-muted-foreground mb-1">
                          <span>Avg Score</span><span>{assessment.avgScore}%</span>
                        </div>
                        <Progress value={assessment.avgScore} className="h-1.5" />
                      </div>
                    )}
                    <div className="mt-4 flex gap-2">
                      <Button size="sm" className="flex-1" onClick={() => setInviteOpen(true)}>
                        Invite Candidates
                      </Button>
                      <Button size="sm" variant="outline" asChild>
                        <Link to="/assessment"><Eye className="h-4 w-4" /></Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="candidates">
            <Card className="border-border/50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="font-display">Candidate Tracker</CardTitle>
                  <Button size="sm" onClick={() => setInviteOpen(true)}>
                    <Plus className="mr-1 h-4 w-4" /> Invite
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="pb-3 text-left font-medium text-muted-foreground">Candidate</th>
                        <th className="pb-3 text-left font-medium text-muted-foreground">Assessment</th>
                        <th className="pb-3 text-left font-medium text-muted-foreground">Status</th>
                        <th className="pb-3 text-left font-medium text-muted-foreground">Score</th>
                        <th className="pb-3 text-left font-medium text-muted-foreground">Date</th>
                        <th className="pb-3 text-right font-medium text-muted-foreground">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {candidates.map((candidate) => {
                        const status = statusConfig[candidate.status];
                        return (
                          <tr key={candidate.id} className="border-b border-border/50 last:border-0">
                            <td className="py-3">
                              <div>
                                <p className="font-medium text-foreground">{candidate.name}</p>
                                <p className="text-xs text-muted-foreground">{candidate.email}</p>
                              </div>
                            </td>
                            <td className="py-3 text-foreground">{candidate.assessmentTitle}</td>
                            <td className="py-3">
                              <Badge className={`${status.className} border-0 gap-1`}>
                                <status.icon className="h-3 w-3" /> {status.label}
                              </Badge>
                            </td>
                            <td className="py-3 font-medium text-foreground">
                              {candidate.score ? `${candidate.score}%` : "—"}
                            </td>
                            <td className="py-3 text-muted-foreground">
                              {candidate.completedAt || candidate.invitedAt}
                            </td>
                            <td className="py-3 text-right">
                              {candidate.status === "completed" && (
                                <Button variant="ghost" size="sm" asChild>
                                  <Link to="/report">View Report <ChevronRight className="ml-1 h-3 w-3" /></Link>
                                </Button>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Invite Dialog */}
      <Dialog open={inviteOpen} onOpenChange={setInviteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Invite Candidates</DialogTitle>
            <DialogDescription>Send assessment invitations via email.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <Input placeholder="Enter email addresses (comma-separated)" />
            <div className="flex gap-2">
              <Button className="flex-1" onClick={() => setInviteOpen(false)}>Send Invitations</Button>
              <Button variant="outline" onClick={() => setInviteOpen(false)}>Cancel</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;
