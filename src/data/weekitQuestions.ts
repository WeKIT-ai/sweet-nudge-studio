export type AgeGroup = "12-14" | "15-18" | "18+";

export interface WeKitQuestion {
  id: number;
  questionNo: number;
  variants: Record<AgeGroup, string>;
  trait: string;
  reverseScored: boolean;
}

export const LIKERT_OPTIONS = [
  "Strongly Disagree",
  "Disagree",
  "Neutral",
  "Agree",
  "Strongly Agree",
] as const;

// Scoring: normal = 1-5, reverse = 5-1
export function scoreLikert(optionIndex: number, reverseScored: boolean): number {
  return reverseScored ? 5 - optionIndex : optionIndex + 1;
}

export const weekitQuestions: WeKitQuestion[] = [
  { id: 1, questionNo: 1, trait: "Self-awareness", reverseScored: false, variants: { "12-14": "I ask my family members or friends for advice when I feel confused.", "15-18": "I actively seek feedback or advice from my family members or close friends.", "18+": "I actively seek feedback and advice from people I trust." } },
  { id: 2, questionNo: 11, trait: "Self-awareness", reverseScored: false, variants: { "12-14": "I talk to teachers or elders when I'm unsure about my feelings.", "15-18": "I reach out to mentors or peers for input on my strengths and weaknesses.", "18+": "I consult colleagues or advisors when reflecting on my decisions." } },
  { id: 3, questionNo: 21, trait: "Self-awareness", reverseScored: false, variants: { "12-14": "I seek help from others to understand my emotions better.", "15-18": "I ask for honest opinions from trusted people to improve myself.", "18+": "I value external perspectives to enhance my self-understanding." } },
  { id: 4, questionNo: 2, trait: "Risk Orientation", reverseScored: true, variants: { "12-14": "I do not enjoy risky or adventurous activities.", "15-18": "I generally avoid adventurous or risky activities.", "18+": "I generally avoid adventurous or high-risk activities." } },
  { id: 5, questionNo: 12, trait: "Risk Orientation", reverseScored: true, variants: { "12-14": "I prefer safe and familiar games over exciting but dangerous ones.", "15-18": "I steer clear of thrill-seeking hobbies that could lead to harm.", "18+": "I opt out of high-stakes opportunities that involve uncertainty." } },
  { id: 6, questionNo: 22, trait: "Risk Orientation", reverseScored: true, variants: { "12-14": "I avoid trying new things that might be scary or unpredictable.", "15-18": "I choose stable routines over spontaneous adventures.", "18+": "I prioritize security over bold, unpredictable pursuits." } },
  { id: 7, questionNo: 3, trait: "Decision Making", reverseScored: true, variants: { "12-14": "When I make decisions, I mostly go by what I like rather than facts.", "15-18": "When making decisions, I give more importance to my personal preferences than to facts or logic.", "18+": "In decision-making, I prioritize personal preferences over objective facts or logic." } },
  { id: 8, questionNo: 13, trait: "Decision Making", reverseScored: true, variants: { "12-14": "I choose things based on my gut feeling instead of researching them.", "15-18": "I rely on intuition more than data when picking options.", "18+": "I favor emotional appeals over analytical reasoning in choices." } },
  { id: 9, questionNo: 23, trait: "Decision Making", reverseScored: true, variants: { "12-14": "My decisions are driven by what feels right, not always by evidence.", "15-18": "I let likes/dislikes guide me rather than logical analysis.", "18+": "I lean on subjective views rather than empirical information." } },
  { id: 10, questionNo: 4, trait: "Communication", reverseScored: false, variants: { "12-14": "I use examples or stories to help others understand me.", "15-18": "I use examples or analogies to explain my ideas clearly to others.", "18+": "I use examples or analogies to clearly explain my ideas to others." } },
  { id: 11, questionNo: 14, trait: "Communication", reverseScored: false, variants: { "12-14": "I tell simple tales to make my points clear to friends.", "15-18": "I draw parallels from real life to convey my thoughts effectively.", "18+": "I employ metaphors to articulate concepts precisely." } },
  { id: 12, questionNo: 24, trait: "Communication", reverseScored: false, variants: { "12-14": "I share personal anecdotes to express what I mean.", "15-18": "I use relatable scenarios to communicate my views.", "18+": "I leverage illustrations to ensure my messages are understood." } },
  { id: 13, questionNo: 5, trait: "Empathy", reverseScored: false, variants: { "12-14": "I listen when my family members or friends share their problems.", "15-18": "I make time to listen to the problems shared by people close to me.", "18+": "I make time to listen to the concerns or problems of people close to me." } },
  { id: 14, questionNo: 15, trait: "Empathy", reverseScored: false, variants: { "12-14": "I pay attention when someone in my class talks about their worries.", "15-18": "I offer an ear to friends discussing their challenges.", "18+": "I dedicate time to hear out colleagues' issues." } },
  { id: 15, questionNo: 25, trait: "Empathy", reverseScored: false, variants: { "12-14": "I try to understand how others feel by hearing their stories.", "15-18": "I actively listen to loved ones' difficulties without interrupting.", "18+": "I provide space for trusted individuals to vent their concerns." } },
  { id: 16, questionNo: 6, trait: "Work Style", reverseScored: true, variants: { "12-14": "I feel bored when I have to do the same task again and again.", "15-18": "I get bored when I have to do repetitive tasks or activities.", "18+": "I become disengaged when tasks or activities are repetitive." } },
  { id: 17, questionNo: 16, trait: "Work Style", reverseScored: true, variants: { "12-14": "I lose interest in homework that repeats the same steps.", "15-18": "I disengage from routine chores that lack variety.", "18+": "I find monotonous projects draining and unmotivating." } },
  { id: 18, questionNo: 26, trait: "Work Style", reverseScored: true, variants: { "12-14": "Repeating games or exercises makes me want to stop.", "15-18": "I tire of ongoing activities without change.", "18+": "I withdraw from cyclical duties that feel stagnant." } },
  { id: 19, questionNo: 7, trait: "Goal Orientation", reverseScored: false, variants: { "12-14": "I set goals for myself, such as improving in school or learning something new.", "15-18": "I set clear goals and targets for my academic, personal, or skill development.", "18+": "I set clear goals and measurable targets for myself." } },
  { id: 20, questionNo: 17, trait: "Goal Orientation", reverseScored: false, variants: { "12-14": "I plan to get better at a hobby or sport I enjoy.", "15-18": "I define objectives for my studies or self-growth.", "18+": "I establish specific aims for career or personal advancement." } },
  { id: 21, questionNo: 27, trait: "Goal Orientation", reverseScored: false, variants: { "12-14": "I aim to achieve small wins, like reading more books.", "15-18": "I outline milestones for learning or fitness.", "18+": "I create actionable benchmarks for projects or life." } },
  { id: 22, questionNo: 8, trait: "Planning", reverseScored: false, variants: { "12-14": "I feel uncomfortable when I have to work without knowing what to do first.", "15-18": "I feel uncomfortable working without a clear plan.", "18+": "I feel uncomfortable working without a structured plan." } },
  { id: 23, questionNo: 18, trait: "Planning", reverseScored: false, variants: { "12-14": "I need instructions before starting a new game or task.", "15-18": "I prefer having a roadmap before diving into assignments.", "18+": "I require a framework prior to tackling complex work." } },
  { id: 24, questionNo: 28, trait: "Planning", reverseScored: false, variants: { "12-14": "Without a step-by-step guide, I get nervous about projects.", "15-18": "I unease with ambiguous goals in group work.", "18+": "I avoid unstructured environments in professional settings." } },
  { id: 25, questionNo: 9, trait: "Social Initiative", reverseScored: false, variants: { "12-14": "I try to make new friends when I meet new people.", "15-18": "I usually take the initiative to make new friends.", "18+": "I usually take the initiative to build new professional or social relationships." } },
  { id: 26, questionNo: 19, trait: "Social Initiative", reverseScored: false, variants: { "12-14": "I start conversations with kids at school events.", "15-18": "I approach peers to form study groups or clubs.", "18+": "I network at events to expand my circle." } },
  { id: 27, questionNo: 29, trait: "Social Initiative", reverseScored: false, variants: { "12-14": "I invite others to join my games or activities.", "15-18": "I lead in connecting with new classmates.", "18+": "I proactively foster connections in teams." } },
  { id: 28, questionNo: 10, trait: "Practical Skills", reverseScored: false, variants: { "12-14": "I enjoy fixing things or doing hands-on activities like crafts or gardening.", "15-18": "I enjoy working with mechanical or electrical gadgets or hands-on activities.", "18+": "I enjoy working with tools, equipment, or hands-on problem-solving tasks." } },
  { id: 29, questionNo: 20, trait: "Practical Skills", reverseScored: false, variants: { "12-14": "I like building models or planting seeds in the garden.", "15-18": "I tinker with devices or DIY projects for fun.", "18+": "I excel in manual repairs or technical troubleshooting." } },
  { id: 30, questionNo: 30, trait: "Practical Skills", reverseScored: false, variants: { "12-14": "I have fun creating art or assembling puzzles.", "15-18": "I engage in workshops involving tools or experiments.", "18+": "I prefer tangible, skill-based challenges over theory." } },
  { id: 31, questionNo: 73, trait: "Resilience", reverseScored: false, variants: { "12-14": "I keep trying even if I fail at something the first time.", "15-18": "I persist with tasks even after facing setbacks or failures.", "18+": "I persist through challenges and setbacks in my work or projects." } },
  { id: 32, questionNo: 74, trait: "Emotional Regulation", reverseScored: true, variants: { "12-14": "I get upset easily when things don't go my way.", "15-18": "I often feel overwhelmed when plans change unexpectedly.", "18+": "I struggle to maintain composure under high-pressure situations." } },
  { id: 33, questionNo: 75, trait: "Creativity", reverseScored: false, variants: { "12-14": "I like coming up with new ideas for games or stories.", "15-18": "I enjoy brainstorming creative solutions to problems at school or with friends.", "18+": "I thrive on generating innovative ideas in team or individual settings." } },
  { id: 34, questionNo: 76, trait: "Collaboration", reverseScored: true, variants: { "12-14": "I prefer working alone rather than in a group.", "15-18": "I avoid group projects because I work better independently.", "18+": "I prefer independent tasks over collaborative team environments." } },
  { id: 35, questionNo: 77, trait: "Digital Literacy", reverseScored: false, variants: { "12-14": "I am curious about how apps and gadgets work.", "15-18": "I actively explore new technologies or digital tools on my own.", "18+": "I stay updated on emerging technologies and their applications." } },
  { id: 36, questionNo: 79, trait: "Leadership", reverseScored: false, variants: { "12-14": "I like leading games or activities with my friends.", "15-18": "I take charge in group situations, like organizing events or projects.", "18+": "I naturally assume leadership roles in professional or social settings." } },
  { id: 37, questionNo: 81, trait: "Knowledge Sharing", reverseScored: false, variants: { "12-14": "I enjoy helping others solve their problems using what I know.", "15-18": "I like mentoring or teaching peers about topics I'm good at.", "18+": "I derive satisfaction from sharing knowledge and mentoring others." } },
  { id: 38, questionNo: 82, trait: "Adaptability", reverseScored: false, variants: { "12-14": "I feel okay trying new things even if I'm not sure I'll succeed.", "15-18": "I am comfortable experimenting with new ideas without guaranteed success.", "18+": "I embrace uncertainty and experimentation in my work or life." } },
  { id: 39, questionNo: 83, trait: "Ethical Reasoning", reverseScored: false, variants: { "12-14": "I think about how my actions affect others before I do something.", "15-18": "I weigh the consequences of my decisions on people and society.", "18+": "I consider ethical implications and long-term impacts in my choices." } },
  { id: 40, questionNo: 84, trait: "Entrepreneurial Spirit", reverseScored: false, variants: { "12-14": "I get excited about starting my own small project, like a lemonade stand.", "15-18": "I am interested in entrepreneurial activities, like starting a side hustle.", "18+": "I pursue entrepreneurial opportunities or innovative ventures." } },
  { id: 41, questionNo: 86, trait: "Critical Thinking", reverseScored: false, variants: { "12-14": "I like discussing big ideas, like space or animals.", "15-18": "I enjoy debating or exploring complex topics with others.", "18+": "I engage in critical analysis and discussions on multifaceted issues." } },
  { id: 42, questionNo: 87, trait: "Well-being Management", reverseScored: false, variants: { "12-14": "I take breaks when I feel tired from studying or playing.", "15-18": "I manage my time to balance schoolwork, hobbies, and rest.", "18+": "I prioritize work-life balance and self-care in my routine." } },
  { id: 43, questionNo: 88, trait: "Inclusivity", reverseScored: false, variants: { "12-14": "I don't mind sharing my toys or things with others.", "15-18": "I am willing to compromise in group settings for the greater good.", "18+": "I collaborate effectively by compromising and valuing diverse perspectives." } },
  { id: 44, questionNo: 89, trait: "Future Tech Orientation", reverseScored: false, variants: { "12-14": "I wonder what jobs will be like when I'm grown up with robots.", "15-18": "I think about how AI and tech will change future careers.", "18+": "I anticipate and prepare for AI-driven disruptions in my field." } },
  { id: 45, questionNo: 91, trait: "Problem-Solving", reverseScored: false, variants: { "12-14": "I like solving puzzles or riddles.", "15-18": "I enjoy tackling logical problems or brain teasers.", "18+": "I apply analytical thinking to complex problems in my work." } },
  { id: 46, questionNo: 92, trait: "Social Responsibility", reverseScored: false, variants: { "12-14": "I care about making the world better for everyone.", "15-18": "I am motivated by causes that promote social justice or equality.", "18+": "I seek roles that contribute to societal impact and positive change." } },
];

// Get all unique traits
export const ALL_TRAITS = [...new Set(weekitQuestions.map(q => q.trait))];

// Calculate trait scores from answers
export function calculateTraitScores(
  answers: Record<number, number>, // questionId -> optionIndex (0-4)
): Record<string, number> {
  const traitTotals: Record<string, number> = {};
  const traitCounts: Record<string, number> = {};

  for (const q of weekitQuestions) {
    const answerIndex = answers[q.id];
    if (answerIndex === undefined) continue;
    const score = scoreLikert(answerIndex, q.reverseScored);
    traitTotals[q.trait] = (traitTotals[q.trait] || 0) + score;
    traitCounts[q.trait] = (traitCounts[q.trait] || 0) + 1;
  }

  // Normalize: traits with 3 questions max 15, traits with 1 question max 5
  // Scale all to 0-30 for consistency
  const scores: Record<string, number> = {};
  for (const trait of ALL_TRAITS) {
    const total = traitTotals[trait] || 0;
    const count = traitCounts[trait] || 1;
    const maxPossible = count * 5;
    scores[trait] = Math.round((total / maxPossible) * 30);
  }
  return scores;
}
