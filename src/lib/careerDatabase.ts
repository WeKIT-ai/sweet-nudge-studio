// Career Database — parses CSV and matches careers to trait scores

export interface Career {
  id: string;
  title: string;
  family: string;
  level: string;
  dnaPrimary: string;
  dnaScores: Record<string, number>;
  salaryMin: number;
  salaryMax: number;
  remoteScore: number;
  workLifeBalance: number;
  jobSatisfaction: number;
  marketDemand: string;
  growthRate: number;
  freelance: string;
}

export const ARCHETYPES = [
  "Builder",
  "Thinker",
  "Advocate",
  "Caregiver",
  "Creator",
  "Organizer",
  "Leader",
  "Adventurer",
] as const;

export type Archetype = (typeof ARCHETYPES)[number];

// Map WeKIT traits → Career DNA archetypes (weighted)
export const TRAIT_TO_ARCHETYPE: Record<string, { archetype: Archetype; weight: number }[]> = {
  "Self-awareness":        [{ archetype: "Thinker", weight: 1 }],
  "Risk Orientation":      [{ archetype: "Adventurer", weight: 1 }],
  "Decision Making":       [{ archetype: "Thinker", weight: 0.6 }, { archetype: "Leader", weight: 0.4 }],
  "Communication":         [{ archetype: "Leader", weight: 0.5 }, { archetype: "Advocate", weight: 0.5 }],
  "Empathy":               [{ archetype: "Caregiver", weight: 0.6 }, { archetype: "Advocate", weight: 0.4 }],
  "Work Style":            [{ archetype: "Creator", weight: 0.5 }, { archetype: "Adventurer", weight: 0.5 }],
  "Goal Orientation":      [{ archetype: "Organizer", weight: 0.5 }, { archetype: "Leader", weight: 0.5 }],
  "Planning":              [{ archetype: "Organizer", weight: 1 }],
  "Social Initiative":     [{ archetype: "Leader", weight: 0.6 }, { archetype: "Adventurer", weight: 0.4 }],
  "Practical Skills":      [{ archetype: "Builder", weight: 1 }],
  "Resilience":            [{ archetype: "Adventurer", weight: 0.5 }, { archetype: "Builder", weight: 0.5 }],
  "Emotional Regulation":  [{ archetype: "Caregiver", weight: 1 }],
  "Creativity":            [{ archetype: "Creator", weight: 1 }],
  "Collaboration":         [{ archetype: "Caregiver", weight: 0.5 }, { archetype: "Organizer", weight: 0.5 }],
  "Digital Literacy":      [{ archetype: "Builder", weight: 0.5 }, { archetype: "Thinker", weight: 0.5 }],
  "Leadership":            [{ archetype: "Leader", weight: 1 }],
  "Knowledge Sharing":     [{ archetype: "Advocate", weight: 0.6 }, { archetype: "Caregiver", weight: 0.4 }],
  "Adaptability":          [{ archetype: "Adventurer", weight: 0.6 }, { archetype: "Creator", weight: 0.4 }],
  "Ethical Reasoning":     [{ archetype: "Advocate", weight: 1 }],
  "Entrepreneurial Spirit":[{ archetype: "Adventurer", weight: 0.4 }, { archetype: "Leader", weight: 0.3 }, { archetype: "Creator", weight: 0.3 }],
  "Critical Thinking":     [{ archetype: "Thinker", weight: 1 }],
  "Well-being Management": [{ archetype: "Caregiver", weight: 1 }],
  "Inclusivity":           [{ archetype: "Advocate", weight: 0.5 }, { archetype: "Caregiver", weight: 0.5 }],
  "Future Tech Orientation":[{ archetype: "Thinker", weight: 0.5 }, { archetype: "Builder", weight: 0.5 }],
  "Problem-Solving":       [{ archetype: "Thinker", weight: 0.6 }, { archetype: "Builder", weight: 0.4 }],
  "Social Responsibility": [{ archetype: "Advocate", weight: 1 }],
};

// Superpower descriptions for traits
export const TRAIT_SUPERPOWERS: Record<string, string> = {
  "Self-awareness": "You deeply understand your own strengths and growth areas — a rare superpower.",
  "Risk Orientation": "You thrive on bold moves and adventurous pursuits.",
  "Decision Making": "You make sharp, logical decisions under pressure.",
  "Communication": "You're a natural explainer who makes complex ideas simple.",
  "Empathy": "People trust you with their problems — you feel what others feel.",
  "Work Style": "You thrive in dynamic, ever-changing environments.",
  "Goal Orientation": "You set targets and relentlessly pursue them.",
  "Planning": "You turn chaos into structure with ease.",
  "Social Initiative": "You walk into any room and build connections instantly.",
  "Practical Skills": "You solve real-world problems with your hands and mind.",
  "Resilience": "You bounce back stronger from every setback.",
  "Emotional Regulation": "You stay calm and composed when others can't.",
  "Creativity": "You see possibilities where others see problems.",
  "Collaboration": "You bring out the best in every team you join.",
  "Digital Literacy": "You navigate technology like a native — future-ready.",
  "Leadership": "People naturally look to you for direction and inspiration.",
  "Knowledge Sharing": "You elevate everyone around you by sharing what you know.",
  "Adaptability": "You thrive in change — it's your element.",
  "Ethical Reasoning": "You stand for what's right, even when it's hard.",
  "Entrepreneurial Spirit": "You spot opportunities and create value from nothing.",
  "Critical Thinking": "You cut through noise to find the truth.",
  "Well-being Management": "You balance ambition with self-care — sustainable success.",
  "Inclusivity": "You build bridges across differences and bring people together.",
  "Future Tech Orientation": "You anticipate tomorrow's tech and prepare today.",
  "Problem-Solving": "You untangle complexity with analytical precision.",
  "Social Responsibility": "You're driven to make the world better for everyone.",
};

function parseDnaScores(raw: string): Record<string, number> {
  const scores: Record<string, number> = {};
  // Format: "Builder: 3, Thinker: 2"
  const parts = raw.split(",").map((s) => s.trim());
  for (const part of parts) {
    const match = part.match(/^(\w+):\s*(\d+)/);
    if (match) scores[match[1]] = parseInt(match[2], 10);
  }
  return scores;
}

let cachedCareers: Career[] | null = null;

export async function loadCareers(): Promise<Career[]> {
  if (cachedCareers) return cachedCareers;

  const res = await fetch("/data/careers.csv");
  const text = await res.text();
  const lines = text.trim().split("\n");

  const careers: Career[] = [];
  for (let i = 1; i < lines.length; i++) {
    // Handle quoted fields (CSV with commas inside quotes)
    const fields: string[] = [];
    let current = "";
    let inQuotes = false;
    for (const ch of lines[i]) {
      if (ch === '"') { inQuotes = !inQuotes; continue; }
      if (ch === "," && !inQuotes) { fields.push(current.trim()); current = ""; continue; }
      current += ch;
    }
    fields.push(current.trim());

    if (fields.length < 14) continue;

    careers.push({
      id: fields[0],
      title: fields[1],
      family: fields[2],
      level: fields[3],
      dnaPrimary: fields[4],
      dnaScores: parseDnaScores(fields[5]),
      salaryMin: parseInt(fields[6], 10) || 0,
      salaryMax: parseInt(fields[7], 10) || 0,
      remoteScore: parseInt(fields[8], 10) || 0,
      workLifeBalance: parseInt(fields[9], 10) || 0,
      jobSatisfaction: parseInt(fields[10], 10) || 0,
      marketDemand: fields[11],
      growthRate: parseInt(fields[12], 10) || 0,
      freelance: fields[13],
    });
  }

  cachedCareers = careers;
  return careers;
}

/** Convert trait scores (0-30) → archetype scores */
export function traitScoresToArchetypes(traitScores: Record<string, number>): Record<Archetype, number> {
  const archScores: Record<string, number> = {};
  const archCounts: Record<string, number> = {};

  for (const [trait, score] of Object.entries(traitScores)) {
    const mappings = TRAIT_TO_ARCHETYPE[trait];
    if (!mappings) continue;
    for (const { archetype, weight } of mappings) {
      archScores[archetype] = (archScores[archetype] || 0) + score * weight;
      archCounts[archetype] = (archCounts[archetype] || 0) + weight;
    }
  }

  // Normalize to 0-100
  const result: Record<string, number> = {};
  for (const arch of ARCHETYPES) {
    const total = archScores[arch] || 0;
    const count = archCounts[arch] || 1;
    result[arch] = Math.round((total / count / 30) * 100);
  }
  return result as Record<Archetype, number>;
}

export interface CareerMatch {
  career: Career;
  matchScore: number;
  matchingArchetypes: string[];
}

/** Match user archetype profile to careers */
export function matchCareers(
  archetypeScores: Record<Archetype, number>,
  careers: Career[],
  limit = 20
): CareerMatch[] {
  // Get top 3 archetypes
  const sorted = Object.entries(archetypeScores)
    .sort(([, a], [, b]) => b - a);
  const top3 = sorted.slice(0, 3).map(([a]) => a);

  const matches: CareerMatch[] = careers.map((career) => {
    let score = 0;
    const matching: string[] = [];

    for (const [arch, careerWeight] of Object.entries(career.dnaScores)) {
      const userScore = archetypeScores[arch as Archetype] || 0;
      // Weighted match: career weight × user archetype strength
      score += (userScore / 100) * careerWeight * 20;
      if (top3.includes(arch) && careerWeight >= 2) {
        matching.push(arch);
      }
    }

    // Bonus for primary DNA match
    if (top3.includes(career.dnaPrimary)) {
      score += 15;
    }

    return { career, matchScore: Math.min(Math.round(score), 100), matchingArchetypes: matching };
  });

  return matches
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, limit);
}

/** Generate "next 3 moves" based on top career */
export function generateNextMoves(topCareers: CareerMatch[], topTraits: string[]): string[] {
  const moves: string[] = [];
  if (topCareers[0]) {
    moves.push(`Follow 3 ${topCareers[0].career.family} professionals on LinkedIn this week.`);
  }
  if (topTraits[0]) {
    const traitSkillMap: Record<string, string> = {
      "Communication": "public speaking",
      "Leadership": "leadership fundamentals",
      "Creativity": "design thinking",
      "Critical Thinking": "logical reasoning",
      "Problem-Solving": "analytical skills",
      "Empathy": "emotional intelligence",
      "Digital Literacy": "coding basics",
      "Entrepreneurial Spirit": "startup basics",
      "Adaptability": "change management",
    };
    const skill = traitSkillMap[topTraits[0]] || topTraits[0].toLowerCase();
    moves.push(`Take a free ${skill} course on YouTube or Coursera.`);
  }
  moves.push("Join the We‑KIT Discord community — live career Q&A sessions weekly.");
  return moves;
}
