export interface Assessment {
  id: string;
  title: string;
  type: "cognitive" | "personality" | "situational";
  duration: number; // minutes
  questions: number;
  description: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  completions: number;
  avgScore: number;
}

export interface Candidate {
  id: string;
  name: string;
  email: string;
  status: "invited" | "in_progress" | "completed" | "expired";
  assessmentId: string;
  assessmentTitle: string;
  score?: number;
  completedAt?: string;
  invitedAt: string;
}

export interface Question {
  id: string;
  type: "multiple_choice" | "likert" | "scenario";
  question: string;
  options: string[];
  category: string;
}

export const assessments: Assessment[] = [
  {
    id: "cog-1",
    title: "Numerical Reasoning",
    type: "cognitive",
    duration: 25,
    questions: 20,
    description: "Evaluate ability to interpret numerical data, charts, and perform calculations under time pressure.",
    difficulty: "intermediate",
    completions: 1243,
    avgScore: 72,
  },
  {
    id: "cog-2",
    title: "Verbal Reasoning",
    type: "cognitive",
    duration: 20,
    questions: 18,
    description: "Assess comprehension, critical evaluation, and logical deduction from written passages.",
    difficulty: "intermediate",
    completions: 987,
    avgScore: 68,
  },
  {
    id: "cog-3",
    title: "Logical Reasoning",
    type: "cognitive",
    duration: 30,
    questions: 24,
    description: "Measure abstract reasoning and pattern recognition through sequences and matrices.",
    difficulty: "advanced",
    completions: 756,
    avgScore: 64,
  },
  {
    id: "per-1",
    title: "Big Five Personality (OCEAN)",
    type: "personality",
    duration: 15,
    questions: 40,
    description: "Comprehensive personality assessment measuring Openness, Conscientiousness, Extraversion, Agreeableness, and Neuroticism.",
    difficulty: "beginner",
    completions: 2341,
    avgScore: 0,
  },
  {
    id: "per-2",
    title: "DISC Behavioral Profile",
    type: "personality",
    duration: 12,
    questions: 28,
    description: "Identify dominant behavioral patterns across Dominance, Influence, Steadiness, and Conscientiousness.",
    difficulty: "beginner",
    completions: 1876,
    avgScore: 0,
  },
  {
    id: "sjt-1",
    title: "Leadership SJT",
    type: "situational",
    duration: 30,
    questions: 15,
    description: "Role-specific situational judgment test evaluating leadership and decision-making capabilities.",
    difficulty: "advanced",
    completions: 543,
    avgScore: 71,
  },
  {
    id: "sjt-2",
    title: "Customer Service SJT",
    type: "situational",
    duration: 20,
    questions: 12,
    description: "Evaluate candidate responses to customer service scenarios and conflict resolution.",
    difficulty: "intermediate",
    completions: 892,
    avgScore: 75,
  },
];

export const candidates: Candidate[] = [
  { id: "c1", name: "Alex Johnson", email: "alex.j@example.com", status: "completed", assessmentId: "cog-1", assessmentTitle: "Numerical Reasoning", score: 85, completedAt: "2026-03-07", invitedAt: "2026-03-05" },
  { id: "c2", name: "Maria Garcia", email: "maria.g@example.com", status: "completed", assessmentId: "per-1", assessmentTitle: "Big Five Personality (OCEAN)", completedAt: "2026-03-06", invitedAt: "2026-03-04" },
  { id: "c3", name: "James Wilson", email: "james.w@example.com", status: "in_progress", assessmentId: "cog-3", assessmentTitle: "Logical Reasoning", invitedAt: "2026-03-07" },
  { id: "c4", name: "Priya Patel", email: "priya.p@example.com", status: "invited", assessmentId: "sjt-1", assessmentTitle: "Leadership SJT", invitedAt: "2026-03-08" },
  { id: "c5", name: "David Kim", email: "david.k@example.com", status: "completed", assessmentId: "cog-2", assessmentTitle: "Verbal Reasoning", score: 92, completedAt: "2026-03-06", invitedAt: "2026-03-03" },
  { id: "c6", name: "Sarah Chen", email: "sarah.c@example.com", status: "expired", assessmentId: "cog-1", assessmentTitle: "Numerical Reasoning", invitedAt: "2026-02-20" },
  { id: "c7", name: "Michael Brown", email: "michael.b@example.com", status: "completed", assessmentId: "sjt-2", assessmentTitle: "Customer Service SJT", score: 78, completedAt: "2026-03-07", invitedAt: "2026-03-05" },
  { id: "c8", name: "Emma Thompson", email: "emma.t@example.com", status: "in_progress", assessmentId: "per-2", assessmentTitle: "DISC Behavioral Profile", invitedAt: "2026-03-08" },
];

export const sampleQuestions: Question[] = [
  {
    id: "q1",
    type: "multiple_choice",
    question: "A company's revenue increased from $2.4M to $3.12M over one year. What is the percentage increase?",
    options: ["25%", "30%", "28%", "32%"],
    category: "Numerical Reasoning",
  },
  {
    id: "q2",
    type: "multiple_choice",
    question: "If the ratio of managers to employees is 1:8, and there are 72 employees, how many managers are there?",
    options: ["8", "9", "10", "12"],
    category: "Numerical Reasoning",
  },
  {
    id: "q3",
    type: "multiple_choice",
    question: "Based on the passage, which conclusion is best supported by the evidence presented?",
    options: [
      "The policy was universally successful",
      "Results varied significantly across regions",
      "No measurable impact was observed",
      "Further study is unnecessary",
    ],
    category: "Verbal Reasoning",
  },
  {
    id: "q4",
    type: "multiple_choice",
    question: "What comes next in the sequence: 2, 6, 12, 20, 30, ?",
    options: ["40", "42", "44", "36"],
    category: "Logical Reasoning",
  },
  {
    id: "q5",
    type: "likert",
    question: "I enjoy working in teams more than working independently.",
    options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"],
    category: "Extraversion",
  },
  {
    id: "q6",
    type: "likert",
    question: "I pay close attention to details and rarely make mistakes in my work.",
    options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"],
    category: "Conscientiousness",
  },
  {
    id: "q7",
    type: "likert",
    question: "I enjoy exploring new ideas and creative approaches to problems.",
    options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"],
    category: "Openness",
  },
  {
    id: "q8",
    type: "scenario",
    question: "A team member consistently misses deadlines, affecting the entire project. As the team lead, how would you handle this?",
    options: [
      "Have a private one-on-one conversation to understand barriers and offer support",
      "Escalate to management immediately for disciplinary action",
      "Reassign their tasks to other team members without discussion",
      "Address the issue in the next team meeting publicly",
    ],
    category: "Leadership",
  },
  {
    id: "q9",
    type: "scenario",
    question: "A customer is frustrated because their order was delayed for the third time. They are threatening to leave a negative review. What do you do?",
    options: [
      "Apologize sincerely, offer a concrete resolution, and follow up personally",
      "Explain the company policy on delays and offer standard compensation",
      "Transfer the customer to a supervisor immediately",
      "Offer a full refund without trying to retain the customer",
    ],
    category: "Customer Service",
  },
  {
    id: "q10",
    type: "multiple_choice",
    question: "A dataset shows that sales increased by 15% in Q1, decreased by 10% in Q2, and increased by 20% in Q3. If starting sales were $100K, what are Q3 ending sales?",
    options: ["$124.2K", "$125K", "$120K", "$126.5K"],
    category: "Numerical Reasoning",
  },
];

export const candidateReport = {
  candidateId: "c1",
  name: "Alex Johnson",
  assessment: "Numerical Reasoning",
  completedAt: "2026-03-07",
  duration: "22 min 34 sec",
  overallScore: 85,
  percentile: 92,
  competencies: [
    { name: "Data Interpretation", score: 90, benchmark: 70 },
    { name: "Calculation Accuracy", score: 82, benchmark: 68 },
    { name: "Problem Solving", score: 88, benchmark: 72 },
    { name: "Pattern Recognition", score: 78, benchmark: 65 },
    { name: "Time Management", score: 85, benchmark: 71 },
  ],
  strengths: [
    "Exceptional data interpretation skills",
    "Strong problem-solving under pressure",
    "Efficient time management throughout the test",
  ],
  developmentAreas: [
    "Pattern recognition in complex sequences",
    "Multi-step calculation problems",
  ],
  roleFit: {
    "Financial Analyst": 94,
    "Data Analyst": 91,
    "Business Intelligence": 87,
    "Operations Manager": 78,
  },
  personalityProfile: {
    openness: 72,
    conscientiousness: 88,
    extraversion: 65,
    agreeableness: 74,
    neuroticism: 32,
  },
};

export const dashboardStats = {
  totalAssessments: 847,
  activeTests: 23,
  completionRate: 87,
  avgScore: 73,
  candidatesThisMonth: 156,
  completedThisWeek: 42,
};
