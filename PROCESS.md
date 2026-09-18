# Process overview

A good university course, to me, does two things: every week produces
something a student made, not an argument they read about, and the rubric
tells them exactly what separates a strong attempt from a weak one instead
of a generic HD/D/C/N scale. Both went into the harness on day one, not as
habits I kept repeating to the agent but as rules it had to check itself
against.

The thesis is the opening of `CLAUDE.md`: "every week is a workshop that
produces an artefact... if a week's exercise could be lifted into a generic
'intro to level design' course without touching a sentence, it has failed
the thesis and needs to be rewritten, not padded"
([`6ba9653`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-YanZZZZZZZZ/commit/6ba9653eed26093d4276d906c5e342b7e0f9c13e)).
The same commit's "Explicitly not doing" section is the other half of that
decision — two interactive widgets earmarked for the specific weeks that
need them and left unbuilt until then, no policies page padded out with a
generic disclaimer. I kept that as a standing constraint on the agent
rather than a one-off instruction, because the failure mode I was
directing against was the agent building something to look thorough, not
the agent refusing to build something.

The rubric decision is where directing actually changed mid-assignment.
I asked for the lightest version first — a reflection field plus grade-band
text — and had the agent sample it on one assessment, Boss Blueprint,
before I confirmed the pattern and asked for a rollout
([`a408c52`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-YanZZZZZZZZ/commit/a408c5264869909c2c745ce1a8e00280347bbe39),
[`ca02667`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-YanZZZZZZZZ/commit/ca02667002cfdcf112ab38564fbc788bdce6e1f0)).
Death Notes is where I rejected the first answer outright: the agent had
modelled the eleven weekly reflections as one holistic portfolio bundled
into a single Week 12 submission, because that was the easiest fit for the
schema that already existed, not because it was how the assessment should
work. A weekly deliverable needs a due date and a mark every week, so I
asked for a schema change instead of a rubric tweak — a new `portfolio`
marking mode plus a per-week `weeklyDue` array, with a cross-field check so
entry points times counted entries can't silently drift from the
assessment's stated weight, and a `spec/` check that walks every weekly
date to confirm it stays inside the teaching period and increases week over
week, the same guarantee the starter's own date check already gave
everything else
([`7f8f9c4`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-YanZZZZZZZZ/commit/7f8f9c4cdd50fe6c86dadfb5cc1a1fca5b660411)
→
[`c687f4c`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-YanZZZZZZZZ/commit/c687f4c23ade40a68689a7be9b0997e0e905387f)).
The late-work rule for that mode is a decision I'm keeping deliberately
small: instead of inventing a percentage penalty, I pointed the agent at
the late-work language the Policies page already had and reused it, so a
late entry scores zero and is absorbed by the drop-lowest slot rather than
a new mechanism nobody asked for.

I didn't accept every result on the first read. Checking the rendered
output rather than trusting a green `pnpm check` surfaced a real bug — a
band descriptor with Markdown link syntax written into a field that only
ever renders as plain text, showing literal brackets on the page — and a
`spec` line for Final Project contradicting its own body text about how
many shortcut loops Week 3 actually requires. Both got fixed in the same
pass that extended the rubric pattern to Loadout Pitch and Final Project
([`7aef257`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-YanZZZZZZZZ/commit/7aef2578a7fb5772e78ab6d25078365205e58482)...[`32d1a8c`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-YanZZZZZZZZ/commit/32d1a8c4f61b82f1f3563707e02e36e10ffae304)).

What I left out on purpose: no fourth marking mode invented for symmetry
once portfolio existed, no rubric rewrite for weeks whose current wording
already holds up, and the two earmarked widgets stay unbuilt — the harness
rule that governs them hasn't changed, so neither has the decision.
