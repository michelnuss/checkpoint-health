# UM AI Hackathon Student Playbook (text)

## Slide 1
AI Hackathon Student Playbook
University of Miami  |  What we expect, how to prepare, and how to move through every phase / Build an AI solution a CFO, a CISO and a business sponsor would fund
NOTES: Mentors: walk students through this deck at the pre-event briefing (about T-2 weeks) and again at kickoff.

## Slide 2
Executive summary
This is not a coding contest. You will run a compressed enterprise AI project: prove the value, build it, make it safe, and show how it would run.
Value
Show the problem, its cost today, and what your solution is worth
Build
Ship one working slice and prove it with tests, including failures
Trust
Protect data, stop misuse, and know your risks
People
Work as one team, adapt to change, and tell one clear story
How it works: prepare for two weeks, pass four gates during the event, pitch to a panel, and leave with a plan for what happens next. Judges score six criteria out of 100, published today.
2
NOTES: This deck mirrors the mentor playbook and the judges' rubric. Nothing here is a surprise on event day.

## Slide 3
Bottom line up front
Teams that win will not have the biggest model or the most features. They will show a measured outcome, an honest cost per result, working safeguards, and who runs it on Monday.
1
Arrive ready
Do the prep checklist. Event time is for building, not for learning the basics.
2
Problem before code
No code until your mentor signs off your one-page problem and value hypothesis (Gate 1).
3
Small and working beats big and broken
One end-to-end slice, tested on data you did not tune on.
4
Evidence beats claims
If you can't show it in the demo, slides or repo, judges score it one level lower.
3
NOTES: Read the green box aloud at kickoff.

## Slide 4
Why we run it this way: the ground reality
30%+
of GenAI projects predicted to be abandoned after proof of concept by end-2025
Gartner, Jul 2024: poor data quality, inadequate risk controls, escalating costs, unclear business value
95%
of organizations in MIT NANDA's sample saw no measurable P&L impact from GenAI pilots
MIT NANDA, 'The GenAI Divide', 2025: the gap is integration into real workflows, not model quality
1 night
to build a working Timeline demo at a Facebook hackathon in 2010 (2 engineers, an intern, a designer)
TechCrunch, Jan 2012: it shipped the next year, after a full team and plan were put behind it
What this means for you: demos are easy; surviving cost, risk and adoption is hard. The rubric scores the hard part.
Sources: Gartner press release (Jul 2024); MIT NANDA via Fortune and Virtualization Review (Aug 2025); TechCrunch (5 Jan 2012).
4
NOTES: Use precise wording: the MIT figure measures P&L impact within roughly six months, not technical failure.

## Slide 5
Guiding principles
Start from a real problem
Name the user, what it costs today, and the metric you will move.
Treat every claim as a hypothesis
Write what you expect, test it, and report what actually happened.
Cost is a design input
Track cost per successful result from your first API call.
Safe by design
Synthetic data, no secrets in code, guardrails on from the start.
Cut scope, not quality
When time runs short, drop features, not tests or safeguards.
Be honest about limits
Judges reward stated limitations; they penalize hidden ones.
5
NOTES: Six principles. Mentors will quote them back to you.

## Slide 6
How you will be judged: six criteria, 100 points
Criterion | Weight | To score a 3 (Proficient) you must show
Value: case & impact | 25 | Baseline, sized benefit, ROI and TCO with stated inputs
Build: execution & evidence | 20 | Working end-to-end slice; test results vs baseline on data you did not tune on
Trust: risk, security, privacy | 20 | Risk level stated; personal data handled; defenses against prompt injection, data leakage or excessive agency shown
Run: readiness & FinOps | 15 | Monitoring view, cost per successful result, fallback when the model fails
People: team & pitch | 10 | On time, one story, whole team engaged, limitations stated
Innovation & learning | 10 | A fresh approach, or a new skill learned and applied
Each criterion scored 0 to 4
0 not shown  |  1 claimed  |  2 partial  |  3 pilot-ready  |  4 survives a real exec review
Not scored
Slide polish, model size, number of features. Scored: evidence.
6
NOTES: Same rubric the judges use. Score = sum of weight x (score / 4), minus 2 points per missed gate.

## Slide 7
Your preparation timeline
T-3 days
Form the team
Agree roles and a decision rule / Read this playbook and the rubric / Pick a learning gap per person
T-2 days
Learn the fundamentals
Value toolkit: ROI, TCO, cost per result / Build toolkit: API call, structured output, eval script / Trust toolkit: OWASP LLM Top 3, PII handling
T-2 days
Dry run
Clone repo template; run it end to end / Generate a small synthetic dataset / Practice a 5-minute pitch on any topic
T-1 day
Ready check
Accounts, keys in environment variables / Laptops charged; chargers packed / Sleep. Fatigue costs more than it saves
Goal: on Day 0, every teammate can make one model call, read the rubric from memory, and explain cost per successful result.
7
NOTES: Prep is where most teams win or lose. Arrive with the basics working so event time goes into the problem.

## Slide 8
Fundamentals 1: the value toolkit
Concept | What it means | Formula / how to use it
Baseline | How the process performs today | Measure or estimate time, cost, error rate before you change anything
Value hypothesis | What you expect to improve, by how much | 'For [user], [solution] will cut [metric] from X to Y'
Productivity benefit | Value of time saved | Hours saved x loaded hourly cost x adoption rate
TCO | Total cost of ownership | Build + run (models, cloud, people, support) + governance
ROI | Return on investment | (Benefits - Costs) / Costs, over a stated period
Payback | Time to earn back the investment | Upfront cost / monthly net benefit
Cost per successful result | Unit economics for AI | Total run cost / results that met your quality bar (include retries)
TAM / SAM / SOM | Market size: total, reachable, winnable | Do a bottom-up check: users x usage x price
Watch out: time saved is not cash saved unless the time is redeployed. Never assume 100% adoption.
8
NOTES: Learn these before you arrive. Every formula needs stated inputs; judges will ask where each number came from.

## Slide 9
Fundamentals 2: the build and trust toolkits
Build: be able to do these
Call a model API with keys loaded from environment variables / Get structured output (e.g., JSON) and validate it / Basic retrieval (RAG): chunk, embed, search, cite the source / Write an eval script: 30+ labeled cases, score accuracy, log failures / Generate synthetic data (e.g., Python Faker or SDV)
Trust: be able to explain and show
Prompt injection (LLM01): untrusted text that hijacks the model / Sensitive info disclosure (LLM02): leaking personal or secret data / Excessive agency (LLM06): giving the AI more power than it needs / How you detect and mask personal data before a model call / What you log so a decision can be explained later
Read before Day 0 (free)
OWASP Top 10 for LLM Applications 2025 (genai.owasp.org): know all ten names, deep-dive LLM01, LLM02, LLM06 / NIST AI Risk Management Framework 1.0: the four functions Govern, Map, Measure, Manage / FinOps Foundation, FinOps for AI (finops.org): why cost per outcome matters more than cost per token
9
NOTES: Practice these on a toy problem before the event. Each takes an evening, not a week.

## Slide 10
Team setup: roles and team charter
Role | Owns | Prepare by
Product owner | Scope, priorities, final say on tie-breaks | Practicing cutting a feature list to one user story
Tech lead | Architecture, repo, code quality | Setting up the repo template and running it end to end
Data / AI lead | Data, prompts, models, evals | Building a toy eval script and synthetic dataset
Value lead | Business case, metrics, ROI | Working the value toolkit on a sample problem
Risk lead | Risk register, safeguards, privacy | Reading OWASP LLM Top 10; drafting a 5-row risk register
Storyteller | Pitch, demo flow, timing | Rehearsing a 5-minute pitch with a timer
Team charter (one page)
Roles (small teams double up; every role has an owner) / Decision rule: discuss 10 minutes, then the product owner decides; disagree and commit / Check-ins: every 3 hours, 10 minutes, standing / Breaks and sleep rota / How we raise a concern: privately first, then to the mentor
10
NOTES: Write the charter before the event. Teams with an agreed decision rule recover from conflict faster.

## Slide 11
Day 0 readiness checklist
Accounts
[ ]  Sandbox / cloud login works / [ ]  Model API key tested / [ ]  Spend cap understood
Repo
[ ]  Template cloned and runs / [ ]  Secrets in .env, .env in .gitignore / [ ]  README with team and roles
Data
[ ]  Only synthetic or public data / [ ]  Generator script ready / [ ]  No real personal or student records
Templates
[ ]  Problem one-pager / [ ]  Risk register (5 rows) / [ ]  Cost per result sheet / [ ]  Pitch outline
Rules to know now
Disclose any prior work, open-source code and AI coding assistants in writing. Real personal data means disqualification. Exposed keys cap your Trust score at 2. A faked 'live' demo caps Build and People at 1.
11
NOTES: Tick every box before kickoff. A missing account or key can cost you the first gate.

## Slide 12
Your journey: six stages, four gates
Prepare
Before
Team, skills, setup
Kickoff
~10%
Gate 1: problem + value
Design
~15%
Gate 2: architecture + risks
Build & test
~45%
Gate 3: working slice + evidence
Harden & pitch
~25%
Gate 4: run plan + pitch
Path to prod
After
Owner, pilot or archive
Gate | Bring this to your mentor | Question you must answer
G1 Problem | One-page problem statement, user, baseline, value hypothesis | What happens today, what does it cost, how will you know you improved it?
G2 Design | Architecture sketch, data sources, top-5 risk register, token budget | Which data is personal, where does it go, and who would say no?
G3 Evidence | Working slice, eval results vs baseline, cost per successful result | Show me the failures. What is your error rate?
G4 Run | Monitoring view, fallback, run cost, owner, 90-day plan | It's Monday after the event. Who gets paged when it breaks?
12
Refer to Appendix for detailed slide on each phase
NOTES: Gates are short check-ins with your mentor, not stop signs. Missing a gate costs 2 points. Time shares are suggested; follow the published schedule.

## Slide 13
Curveballs: expect them, and how to respond
Examples you may get
Security: no personal data may reach external model APIs / Finance: your token budget is cut by 50% / A data source is withdrawn; switch within 2 hours / Your sponsor asks for a different success metric / The model endpoint goes down; show your fallback
Response play (15 minutes)
Pause: stop building; everyone hears the change / Assess: what breaks, what still works? / Re-plan: product owner decides what to cut / Tell: update your mentor and your risk register / Show it: mention the change and your response in the pitch
Working through conflict
Disagree on substance, never on people. Use data or a quick test to settle it. / Use your charter's decision rule; once decided, everyone commits. / If one voice dominates or someone checks out, raise it at the next check-in or with your mentor.
13
NOTES: Every team gets the same curveball at the same time. You are scored on how you respond, not on whether you fix it perfectly.

## Slide 14
The 5-minute pitch and Q&A
0:00
Problem
User, pain, baseline cost
0:45
Solution
What it does, in one line
1:15
Live demo
One end-to-end path
2:45
Evidence
Eval results, failures, cost per result
3:30
Trust & run
Safeguards, monitoring, owner
4:15
Value & ask
ROI, limits, next 90 days
Criterion | Expect a question like
Value | What happens to your ROI if adoption is half what you assumed?
Build | Show me a case where it fails. Why did it fail?
Trust | What happens if I paste a prompt injection into this field?
Run | What is your cost per successful result, including retries?
People | How did your plan change when the curveball hit?
Innovation | What here would you not find in a tutorial?
14
NOTES: Finals: 5-minute pitch plus 3-minute Q&A. The panel stops you at time; anything after the stop is not scored.

## Slide 15
Templates: fill these in, in this order
1. Problem one-pager (Gate 1)
User and job to be done / Baseline: today's time, cost or error rate (and source) / Value hypothesis: from X to Y by [date] / Scope: the one user story you will build
2. Risk register row (Gate 2)
Risk, e.g., prompt injection via uploaded file / Likelihood and impact: low / medium / high / Mitigation, and how you will show it / Owner on the team
3. Evidence sheet (Gate 3)
Eval set size; how it was built; held out? / Result vs baseline; pass bar met? / Top 3 failures and causes / Cost per successful result = run cost / successful results
4. Run plan (Gate 4)
Owner and budget owner / Monitoring: quality, cost, safety signals / Fallback when the model fails / Next 90 days: pilot, scale or retire criteria
15
NOTES: Copies are in the repo template. Keep each to one page.

## Slide 16
Key considerations and common mistakes
Common mistake | Do this instead
Coding before the problem is clear | Pass Gate 1 first; a clear problem saves hours later
Assuming 100% adoption and that time saved equals cash | Use an adoption rate; show what changes if it halves
Testing only on examples you tuned with | Keep a held-out eval set and report failures
Quoting cost per token | Report cost per successful result, including retries and human review
Using real personal data 'just to test' | Synthetic or public data only; it is a disqualification
API keys in code or slides | Environment variables; check the repo before you push
Adding features in the final hours | Freeze, stabilize, add a fallback, rehearse
Unsourced statistics in the pitch | Source and date every number, or remove it
Skipping sleep and breaks | Keep a rota; tired teams make expensive mistakes
16

## Slide 17
Key takeaways
Problem, baseline and value first
Prove it on data you did not tune on
Safeguards are features, not extras
Know your cost per successful result
Show who runs it on Monday
One team, one story, honest limits
17

## Slide 18
Assumptions and constraints
Assumptions
The event runs 24 to 48 hours; teams of 4 to 6 / Mixed teams: CS, data science, business, law or policy / Organizers provide sandboxes with spending caps / Phase time shares are suggestions; the published schedule wins / Curveballs are identical for all teams
Constraints
Synthetic or public data only; no real personal, health or student records / Fixed token and compute budget per team / University policies on IP, conduct and AI tool use apply / Prior work, open source and AI assistants must be disclosed / Framework details are current as of Nov 2026
18

## Slide 19
Appendix
19
NOTES: Gates are short check-ins with your mentor, not stop signs. Missing a gate costs 2 points. Time shares are suggested; follow the published schedule.

## Slide 20
Phase 1, Kickoff: choose the problem and prove it matters
When:  first ~10% of build time
Gate:  G1 Problem
Lead roles:  Product owner, Value lead
Step by step
1
Pick one problem brief; name one user and one job
2
Find the baseline: time, cost or error rate today
3
Write the value hypothesis with a target number
4
Score 2 to 3 ideas on value vs feasibility; pick one
5
Agree scope: one user story, end to end
6
Book Gate 1 with your mentor
You walk out with
Problem one-pager with baseline / Value hypothesis with a target / Prioritization note and agreed scope
Done when
Your mentor signs off the one-pager.
Trap to avoid
Picking the coolest idea instead of the most valuable feasible one.
20
NOTES: No code in this phase. Teams that skip to code usually rebuild later.

## Slide 21
Phase 2, Design: plan the build and the risks
When:  next ~15% of build time
Gate:  G2 Design
Lead roles:  Tech lead, Risk lead
Step by step
1
Sketch the architecture: UI, model, data, guardrails
2
Classify every data source; confirm all are synthetic or public
3
Choose the model; estimate tokens per task and set a budget
4
Write the top-5 risk register with an owner per risk
5
Define the eval set (30+ cases) and the pass bar
6
Declare: platform, product or service?
You walk out with
Architecture sketch / Risk register and data classification / Token budget and eval plan
Done when
You can answer: which data is personal, where does it go, who would say no?
Trap to avoid
'We'll add security later.' It will cost you Trust points at every gate.
21
NOTES: Bring Trust in now. Changing data flows after building is the most expensive fix.

## Slide 22
Phase 3, Build and test: one working slice, with evidence
When:  ~45% of build time, in sprints
Gate:  G3 Evidence
Lead roles:  Tech lead, Data / AI lead
Step by step
1
Build the thinnest end-to-end path first
2
Add guardrails: input checks, output checks, PII masking
3
Run the eval on held-out cases; record every failure
4
Log tokens, latency and cost for each call
5
Compute cost per successful result
6
Fix the top failure; re-run the eval; cut a feature if behind
You walk out with
Working slice in the repo / Eval results vs baseline, with failures / Cost per successful result
Done when
You can show a failure case and explain why it failed.
Trap to avoid
Tuning on your test cases. Keep a held-out set you never look at while building.
22
NOTES: Build the thinnest end-to-end path first, then test it, then improve. Commit often.

## Slide 23
Phase 4, Harden and pitch: make it runnable, then tell the story
When:  ~25% of build time
Gate:  G4 Run
Lead roles:  Storyteller, whole team
Step by step
1
Freeze features; fix bugs only
2
Add a monitoring view: quality, cost, safety flags
3
Add a fallback for when the model is down or unsure
4
Write the run plan: owner, run cost, 90-day next steps
5
Build the 5-minute pitch; rehearse twice with a timer
6
Prepare answers to the judge question bank
You walk out with
Stable demo with fallback / Monitoring view and run plan / Rehearsed 5-minute pitch
Done when
Everyone can answer: who owns it Monday, and what does it cost to run?
Trap to avoid
Adding features in the last hours. Freeze and rehearse instead.
23
NOTES: Freeze features early. A stable demo with a fallback beats a new feature that crashes on stage.

## Slide 24
Phase 5, after the event: path to production
Within 1 week
Read judge feedback: one strength, one improvement per judge / Clean up the repo and README / Write down what you learned
Within 6 weeks (finalists)
Sponsor review of the pitch / Decide: pilot, keep building, or archive / If pilot: named owner and budget
If it goes live
Re-test on governed real data before any pilot / Security, risk and finance sign-off / Monitor value, cost and quality monthly
Expected outcome
A clear decision on your solution's future, and a portfolio piece you can explain in an interview: problem, evidence, cost, risk and what you learned.
24
NOTES: Real hackathon wins became products only when someone owned them. Facebook's Timeline went from overnight demo to launch in about a year with a full team behind it.

## Slide 25
Closing argument
Anyone can build an AI demo in a weekend. The teams worth funding prove the problem is real, show the solution works and fails safely, know what it costs, and can say who runs it on Monday. Prepare the basics now, follow the gates, and let the evidence carry your pitch.
