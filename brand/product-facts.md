# Product facts

Offload — Product facts

Factual product sheet (not marketing copy). For students, waitlist, sales, and support.
Selling narrative: OFFLOAD_FOR_STUDENTS.md.
Engineering depth: OFFLOAD_CAPABILITIES.md.

Last updated: 3 Nov 2026 · Status: UK beta



What it is







Fact



Detail





Product



Offload — adaptive study system for exam-driven students





Category



Study planning + spaced practice + calendar scheduling





Core job



Decide what to study, when, and how — and reshape the plan when life or performance changes





Tagline (official)



A study system that adapts when real life happens





Primary users



University / college / A-Level-style students with exams and real calendars





Geography



UK-focused beta





Access



Web app · trial, then paid subscription (tiers share the same student feature set)



What students get (shipped in beta)

Planning & calendar





Upload course materials (e.g. PDFs / notes) and set exam dates in onboarding  



Generates a term plan with Learn → Test → Retain phases  



Places study sessions on an in-app calendar  



Google Calendar connect: schedules around existing busy time; two-way sync for Offload blocks  



Each Offload block in the student's calendar links straight into that session in the app: they click it and start. (Confirmed by Hadiqa, 2026-11-05.) Say it like this: "You just click the link in your calendar and show up."  



Conflict-aware placement (does not deliberately double-book Google busy time)  



Missed-session recovery: overdue work can be moved into free slots (nightly + on-return catch-up); student is informed when sessions were moved  



Weekly append of new materials grows the plan without wiping completed work

Study loop





Learn hub — first-pass study (e.g. flashcards with self-rating)  



Testing & Retention hub — typed / scored recall practice  



Methods available in product: flashcards, Feynman / stem completion, blurting, exam-style questions (generated from materials), mind-map gap-fill  



Spaced repetition (FSRS) on flashcards — reviews due when memory pressure says so  



Fail / weak performance can spawn remediation cards and book remediation / re-learn time

Library & progress





Library — uploaded notes/PDFs and study decks  



Dashboard — today / due / phase snapshot  



Search across study content  



Results — attempt history  



Reports — weekly rollup / export-style insights

Account





Auth (email + Google sign-in paths as configured)  



Settings for profile, study load / windows, preferences  



Billing / trial gate after trial period



How adaptation works (plain facts)







Trigger



What Offload does





New materials / exam dates



Builds or extends the plan and calendar blocks





Google Calendar busy



Places or moves Offload study into free windows





Missed / overdue sessions



Marks / reschedules into near-term free slots; does not wipe the whole remaining term





Weak recall (low quality)



FSRS shortens interval; may create remediation items and book catch-up study





Return after time away



Catch-up can run so the calendar is ready; student sees a notice when sessions were moved

Scheduling and “what to study today” are rule-based (plan + FSRS + calendar busy + heuristics) — not a black-box “AI tutor that invents your syllabus.”



What it is not (beta)







Not this



Fact





Static printable timetable only



Plan is living; it reschedules





Generic AI chat tutor



Core product is plan + calendar + study methods on your materials





Full past-paper / mock exam suite



Exam Papers UI exists as Coming soon; feature flag off in beta





AI marking of official exam scripts



Post-beta / roadmap — not shipped





Exam-focus hour type as a live phase



exam_focus scheduling is off in beta





Instant lockstep with every Google edit



Sync + jobs apply; not every external change is instantaneous



Study methods (fact list)







Method



In beta?



Role





Flashcards + FSRS



Yes



Learn and test / retain reviews





Feynman / stem



Yes



Explain / complete from prompts





Blurting



Yes



Free recall then gap-fill





Exam-style questions



Yes



Generated practice from materials





Mind-map gap-fill



Yes



Structure rebuild





Formal exam papers / mocks



No (coming later)



Flagged off



Commercial facts (high level)





Trial then subscription (see live Pricing page for current pounds and tier names)  



Student feature set is the same across Standard / Impact-style tiers; tiers differ on price / impact positioning, not a cut-down study engine  



Refund / terms: see site legal pages

(Do not hard-code prices in this file — they change on the Pricing page.)



One-sentence product fact

Offload turns a student’s materials and exam dates into a calendar-aware Learn / Test / Retain system that reschedules when they miss days or struggle — so they study instead of reinventing the plan.



Related docs







Doc



Audience





OFFLOAD_FOR_STUDENTS.md



Customer-facing benefits / selling points





OFFLOAD_CAPABILITIES.md



Full capability inventory (engineering)





MVP_MASTER_PLAN.md



MVP contract / scope





Site Pricing / Terms / Privacy



Live commercial & legal facts


## Unspecified

The names of the 4 phases are not in this file. What FSRS changes on a card, what rescheduling moves, what sits in the remediation deck, and which calendars sync are not in this file. Do not fill those gaps. Do not add a price, a trial length, or a feature that is not in Allowed.
