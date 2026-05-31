import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Download, ArrowLeft, FileText } from "lucide-react";
import WeKitLogo from "@/components/WeKitLogo";
import ScrollReveal from "@/components/ScrollReveal";
import SEO from "@/components/SEO";

const PRD_CONTENT = `# We‑KIT – AI‑Powered Psychometric Career Discovery Platform
## Product Requirements Document v1.0 | February 2026

---

## 1. Overview

### 1.1 Vision
Enable every young person (13–25) to discover their purpose and career path through psychometrics, AI, and real‑world career data, in a fun, gamified, mobile‑first and accessible way.

### 1.2 Product Summary
- **Audience:** Students and young adults aged 13–25 (grade 7–college + early career)
- **Problem:** Youth lack clarity on how interests, strengths, and values map to real jobs
- **Solution:** AI‑powered psychometric platform measuring interests (RIASEC), strengths/personality, values (Ikigai), and light aptitude — mapping to 40 career families and ~5,000 roles
- **Business Model:** ₹1,500 per full assessment journey, with scholarships for underserved learners

### 1.3 Goals & KPIs (Phase 1)
- ≥10,000 registered learners (13–25)
- ≥80% full-test completion rate on mobile
- ≥5–10% free→paid conversion at ₹1,500
- ≥40% users from underserved contexts via scholarships
- Parent CSAT ≥4.2/5

---

## 2. Users & Personas

### 2.1 Primary
1. **School Student (13–16)** — Fun self-discovery, gamified micro-flows
2. **Senior Student (16–18)** — Stream/course decisions, AI/future skills interest
3. **College Student (18–22)** — Confirm/pivot major, internship choices
4. **Early Career (22–25)** — Career pivots, strengths-to-roles alignment

### 2.2 Secondary
- **Parent/Guardian** — Clear, non-technical child strength summaries
- **Counsellor/School/NGO** — Batch assessments, aggregate reports, CSV exports

---

## 3. Product Experience (Mobile‑First)

### Journey: Assess → Explore → Act

**Assess Yourself (10–25 min)**
- Sign up with phone/email + OTP
- Select age and education → maps to age-band wording
- Complete personality/strength items, interests, Ikigai prompts, optional aptitude

**Explore Possibilities**
- Free: 1–2 top strengths, teaser career clusters
- Paid (₹1,500): Full profile, career matches, roadmaps

**Act on It**
- Career families, roles, and roadmaps
- "Purpose Challenges" and future-skills missions
- Book counselling or share reports

---

## 4. Functional Requirements

### 4.1 Psychometric Engine
- **Question Bank:** 46-item master with age-specific wording (12–14, 15–18, 18+)
- **Traits:** Self-awareness, Risk Orientation, Decision Making, Communication, Empathy, Work Style, Goal Orientation, Planning, Social Initiative, Practical Skills, Resilience, Emotional Regulation, Creativity, Collaboration, Digital Literacy, Leadership, Knowledge Sharing, Adaptability, Ethical Reasoning, Entrepreneurial Spirit, Critical Thinking, Well-being Management, Inclusivity, Future Tech Orientation, Problem-Solving, Social Responsibility
- **Scoring:** Convert 1–5 Likert; reverse-score where flagged; normalize to 0–100

### 4.2 Career Database
- 3,309 roles across 40+ career families
- Fields: title, family, level, Career DNA, salary range, remote score, growth rate, market demand
- 8 Career DNA Archetypes: Builder, Thinker, Advocate, Caregiver, Creator, Organizer, Leader, Adventurer

### 4.3 Matching & Explainability
- Trait scores → Archetype scores → Career DNA matching
- Each career shows: Match %, "Why this fits you" (3–4 bullet points)
- **AC-P1:** Every role has human-readable explanation
- **AC-P2:** Scoring is deterministic given same inputs

### 4.4 Gamification
- Levels, XP, badges
- "Purpose Challenges" and missions
- Progress tracker: Assess → Explore → Act

### 4.5 Pricing & Payments
- ₹1,500 per full journey; free lite tier
- Razorpay (UPI, card, net banking, wallets)
- Scholarships via admin-configurable discount codes

---

## 5. Non‑Functional Requirements
- **Mobile-first:** All screens optimized for <6.5" phones; touch-friendly
- **Performance:** P95 dashboard load <2s on 4G; scoring <1s
- **Reliability:** 99.5% uptime; graceful degradation on slow networks
- **Security:** Encryption in transit/at rest; DPDP-aware

---

## 6. Architecture & Stack
- **Frontend:** React SPA/PWA, mobile-first
- **Backend:** Node.js/Python APIs on Cloud Run
- **Data:** Cloud SQL (PostgreSQL) + Firestore
- **Integrations:** Razorpay, Zoho CRM, email/SMS

---

## 7. Scoring Pseudo‑Code

\`\`\`
function scorePsychTest(testId):

  // 1. Load test session
  sessionDoc = firestore.get("test_sessions/" + testId)
  responses  = sessionDoc.responses   // { "Q001": 4, "Q002": 2, ... }

  // 2. Load question + trait metadata
  questionMeta = sql.query("""
    SELECT q.question_id, q.item_code, q.primary_trait_id,
           q.is_reverse_scored, t.trait_code
    FROM psych_questions q
    JOIN psych_traits t ON q.primary_trait_id = t.trait_id
    WHERE q.item_code = ANY($1)
  """, [responses.keys()])

  // 3. Score each response
  traitAccumulator = map<trait_id, list<float>>()

  for row in questionMeta:
    rawScore = responses[row.item_code]
    scoredValue = row.is_reverse_scored ? (6 - rawScore) : rawScore

    // Save to psych_responses (idempotent upsert)
    upsert psych_responses (test_id, question_id, raw_score, scored_value)

    traitAccumulator[row.trait_id].append(scoredValue)

  // 4. Aggregate per trait, normalize to 0–100
  traitResults = {}
  for traitId, values in traitAccumulator:
    meanLikert = average(values)           // 1..5
    normalized = ((meanLikert - 1) / 4) * 100  // 1→0, 5→100
    
    insert psych_results (test_id, trait_id, trait_score = normalized)
    traitResults[traitCode] = normalized

  // 5. Map traits → Career DNA archetypes
  archetypeScores = weightedMapping(traitResults, TRAIT_TO_ARCHETYPE)

  // 6. Match to career database
  careerMatches = matchCareers(archetypeScores, careerDB)
  // Each match includes: matchScore, whyFits[] explainability

  // 7. Cache for mobile dashboards
  firestore.set("reports_cache/" + testId, {
    traitScores: traitResults,
    archetypeProfile: archetypeScores,
    careerClusters: careerMatches,
    generatedAt: now()
  })

  return { traitResults, archetypeScores, careerMatches }
\`\`\`

---

## 8. Report Explainability Model

Each career recommendation includes a "Why this fits you" section:

**Scoring Logic:**
1. **Archetype Alignment:** "Your [strength] aligns with this role's [Archetype] requirements"
2. **Primary DNA Match:** "This career's primary DNA is [Archetype] — one of your top archetypes"
3. **Growth Signal:** "High-growth field at X% — strong future demand"
4. **Satisfaction Signal:** "High job satisfaction reported by professionals"

**Example Output:**
> **Software Engineer — 92% Match**
> - Your hands-on problem-solving and technical skills align strongly with this role's Builder requirements
> - Your analytical thinking and logical reasoning align with Thinker requirements  
> - High-growth field at 24% — strong future demand
> - High job satisfaction reported by professionals

---

## 9. Roadmap (Phase 1)
- **M1–M2:** Infra + psychometric engine (46 items + interests/Ikigai)
- **M3–M4:** Matching, dashboards, Razorpay
- **M5:** Parent/counsellor views, Zoho, scholarships
- **M6:** Pilot with schools/NGOs; refine

---

## 10. Risks & Mitigations
- Misinterpretation → strong UX copy, FAQs, counsellor support
- Model bias → periodic audits, fairness checks
- Engagement drop → mobile-first UX, gamification
`;

export default function DocsPage() {
  const handleDownload = () => {
    const blob = new Blob([PRD_CONTENT], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "WeKIT-PRD-v1.0.md";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDownloadHTML = () => {
    const styles = [
      "body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 800px; margin: 0 auto; padding: 40px 20px; line-height: 1.7; color: #1a1a2e; }",
      "h1 { font-size: 28px; border-bottom: 3px solid #00665B; padding-bottom: 12px; }",
      "h2 { font-size: 22px; color: #00665B; margin-top: 40px; border-bottom: 1px solid #e0e0e0; padding-bottom: 8px; }",
      "h3 { font-size: 18px; color: #333; }",
      "pre { background: #f4f4f8; padding: 16px; border-radius: 4px; font-size: 13px; overflow-x: auto; border: 1px solid #e0e0e0; }",
      "ul { padding-left: 20px; }",
      "li { margin-bottom: 6px; }",
      "strong { color: #00665B; }",
      "hr { border: none; border-top: 1px solid #e0e0e0; margin: 30px 0; }",
      "blockquote { border-left: 4px solid #00665B; padding-left: 16px; margin-left: 0; color: #555; }",
    ].join("\n");

    const body = PRD_CONTENT
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/^# (.+)$/gm, "<h1>$1</h1>")
      .replace(/^## (.+)$/gm, "<h2>$1</h2>")
      .replace(/^### (.+)$/gm, "<h3>$1</h3>")
      .replace(/^- (.+)$/gm, "<li>$1</li>")
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/^---$/gm, "<hr>")
      .replace(/\n\n/g, "<br><br>");

    const htmlContent = "<!DOCTYPE html><html lang='en'><head><meta charset='UTF-8'><meta name='viewport' content='width=device-width, initial-scale=1.0'><title>We-KIT PRD v1.0</title><style>" + styles + "</style></head><body>" + body + "</body></html>";

    const blob = new Blob([htmlContent], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "WeKIT-PRD-v1.0.html";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Product Documentation | WeKIT™"
        description="Read the WeKIT Career Clarity 360 product requirements document and learn how the assessment platform works."
        path="/docs"
      />
      <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto flex h-14 items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2">
            <WeKitLogo size="sm" />
            <span className="font-display text-base font-bold text-foreground">WeKIT™</span>
          </Link>
          <Button variant="outline" size="sm" asChild>
            <Link to="/"><ArrowLeft className="mr-1 h-3 w-3" /> Back</Link>
          </Button>
        </div>
      </header>

      <main className="container mx-auto max-w-3xl px-4 py-8">
        <ScrollReveal>
          <div className="text-center mb-8">
            <FileText className="mx-auto h-10 w-10 text-primary" />
            <h1 className="mt-4 font-display text-3xl md:text-4xl font-bold text-foreground">
              Product Requirements Document
            </h1>
            <p className="mt-2 text-muted-foreground">
              We‑KIT – AI‑Powered Psychometric Career Discovery Platform v1.0
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
            <Button onClick={handleDownload} className="gap-2 rounded-full hover-glow">
              <Download className="h-4 w-4" /> Download Markdown (.md)
            </Button>
            <Button onClick={handleDownloadHTML} variant="outline" className="gap-2 rounded-full">
              <Download className="h-4 w-4" /> Download HTML (printable)
            </Button>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <div className="prose prose-invert max-w-none rounded-2xl border border-border/50 bg-card p-6 md:p-10">
            <div className="whitespace-pre-wrap text-sm leading-relaxed text-muted-foreground font-mono">
              {PRD_CONTENT}
            </div>
          </div>
        </ScrollReveal>
      </main>
    </div>
  );
}
