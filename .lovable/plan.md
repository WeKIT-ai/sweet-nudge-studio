
## End-to-End Test Plan

Goal: verify the WeKIT Career Clarity 360 flow works across UI, database, and edge functions — without making a real Razorpay charge.

### 1. Backend / data checks (read-only)
- Query `payments` table: row count, latest 5 rows, status distribution, any orphan `pending` rows older than 24h.
- Confirm RLS policies and grants on `payments` match what the app expects (SELECT/INSERT/UPDATE for anon, no DELETE).
- Verify required secrets exist: `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, `RAZORPAY_WEBHOOK_SECRET`, `SUPABASE_SERVICE_ROLE_KEY`.
- Pull recent logs for `create-razorpay-order` and `razorpay-webhook` edge functions; flag any 4xx/5xx.
- Smoke-test `create-razorpay-order` via `curl_edge_functions` with a synthetic payload — assert it returns `order_id`, `amount`, `key_id`, and inserts a `pending` row. Clean up the test row after.

### 2. UI walkthrough (browser, no real payment)
Viewport: 1366x768 desktop, then 390x844 mobile spot-check on key screens.

1. `/` Index — hero renders, nav links work, SEO `<title>`/meta/canonical present.
2. `/assessment` (locked) — `AssessmentHero` shows Lock + "Unlock — ₹1,500" CTA; click routes to `/payment`.
3. `/payment` — form validates required fields (name/email/phone); submit invalid input and confirm errors. Do NOT submit a real order.
4. Simulate unlock: set `localStorage.wekit_payment_email` to an existing successful email from the payments table (read-only), reload `/assessment`.
5. Age select — pick `18+`, click Continue.
6. Questions — answer all 46 items rapidly, verify: progress bar advances, trait badge changes, timer counts down, Undo restores prior answer, auto-advance after 400 ms works, final answer transitions to Complete.
7. `/assessment` Complete — "Generating" spinner → insight cards render, CTAs visible.
8. `/report` — verify trait scores render (normalized 0–30), career matches from `careerDatabase` appear, charts render without console errors.
9. `/dashboard`, `/docs`, `/offer`, `/admin/payments` — smoke render; confirm `/admin/payments` lists rows.
10. Capture console + network panel at the end; flag any errors/4xx/5xx.

### 3. Scoring sanity check
- Read `weekitQuestions.ts` + `calculateTraitScores` and re-run the function against the synthetic answer set used in step 2.6 in a quick Node snippet; assert all 26 traits land in [0, 30] and reverse-scored items invert correctly.

### 4. Razorpay full flow (only if keys are test-mode)
- Detect mode from `RAZORPAY_KEY_ID` prefix (`rzp_test_` vs `rzp_live_`).
- If **test**: complete a checkout with Razorpay test card `4111 1111 1111 1111`, confirm webhook flips row to `success`, `/payment-success` renders, `/assessment` unlocks automatically.
- If **live**: skip and report — no real charge will be made.

### Deliverable
A single report grouped by section: ✅ pass / ⚠️ warning / ❌ fail, with the failing payload, log excerpt, or screenshot for each issue. Any bugs found are reported back before any fix is attempted.

### Notes / non-goals
- No schema or code changes during testing.
- No deletion of real payment rows; only the synthetic test row from step 1 is cleaned up.
- Browser automation cannot complete Razorpay's hosted checkout reliably in live mode — that path will be skipped if applicable.
