# Process overview

A good university course, to me, does two things: every week produces
something a student made, not an argument they read about, and the rubric
tells them exactly what separates a strong attempt from a weak one instead
of a generic HD/D/C/N scale. Only the first was a day-one decision; the
second I only reached once the shipped assessments made the gap obvious —
four flat percentage splits with no descriptor at all.

The thesis is the opening of `CLAUDE.md`: "every week is a workshop that
produces an artefact... if a week's exercise could be lifted into a generic
'intro to level design' course without touching a sentence, it has failed
the thesis and needs to be rewritten, not padded"
([`6ba9653`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-YanZZZZZZZZ/commit/6ba9653eed26093d4276d906c5e342b7e0f9c13e)).
The same commit's "Explicitly not doing" section is the other half of that
decision — no interactive widget unless a specific week needs one, no
policies page padded out with a generic disclaimer. I kept that as a
standing constraint, not a one-off instruction — the failure mode I was
directing against was building something to look thorough, not refusing
to build something.

The rubric decision is where directing actually changed mid-assignment.
I asked for the lightest version first — a reflection field plus grade-band
text — and had the agent sample it on one assessment, Boss Blueprint,
before I confirmed the pattern and asked for a rollout
([`a408c52`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-YanZZZZZZZZ/commit/a408c5264869909c2c745ce1a8e00280347bbe39),
[`ca02667`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-YanZZZZZZZZ/commit/ca02667002cfdcf112ab38564fbc788bdce6e1f0)).
Death Notes is where I rejected the first answer outright: the agent had
modelled eleven weekly reflections as one holistic portfolio bundled into
a single Week 12 submission — the easiest fit for the existing schema,
not how the assessment actually works. A weekly deliverable needs a due
date and a mark every week, so I asked for a schema change, not a rubric
tweak: a new `portfolio` marking mode, a per-week `weeklyDue` array, a
cross-field check so entry points times counted entries can't drift from
the stated weight, and a `spec/` check that every weekly date stays inside
the teaching period and increases week over week — the same guarantee the
starter's own date check already gave everything else
([`7f8f9c4`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-YanZZZZZZZZ/commit/7f8f9c4cdd50fe6c86dadfb5cc1a1fca5b660411)
→
[`c687f4c`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-YanZZZZZZZZ/commit/c687f4c23ade40a68689a7be9b0997e0e905387f)).
The late-work rule stays small: instead of a new percentage penalty, I
reused the Policies page's existing language, so a late entry scores
zero, absorbed by the drop-lowest slot. Repeating the same
bands-plus-reflection shape by hand across four files was the signal it
belonged in the harness, not the content, so I wrote it into `CLAUDE.md`
as a standing rule
([`735dae7`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-YanZZZZZZZZ/commit/735dae7e7c14b08dbf4239a41191fd5226155731)).

I didn't accept every result on the first read. Checking the rendered
output instead of trusting a green `pnpm check` surfaced a real bug — a
band descriptor with Markdown link syntax in a field that only ever
renders as plain text, showing literal brackets on the page — and a
`spec` line for Final Project contradicting its own body text on how
many shortcut loops Week 3 requires. Both got fixed in the same pass that
rolled the rubric pattern out to Loadout Pitch and Final Project
([`7aef257`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-YanZZZZZZZZ/commit/7aef2578a7fb5772e78ab6d25078365205e58482)...[`32d1a8c`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-YanZZZZZZZZ/commit/32d1a8c4f61b82f1f3563707e02e36e10ffae304)).

What I left out on purpose stayed out: no fourth marking mode invented for
symmetry once portfolio existed. The two earmarked widgets — a
death-currency calculator for week 8, a click-to-parry demo for week 4 —
I checked rather than left alone: both weeks' prose had already landed,
so the precondition the earlier decision was waiting on was already met.
Restating "still unbuilt" unchecked would have been the same drift the
rendered-bug pass above caught, so I built both and reworded the
standing rule to state what exists, not what's earmarked
([`82368b2`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-YanZZZZZZZZ/commit/82368b2df85a02e3f56d4fc20c2ec017f7ca7265),
[`a0bc7d9`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-YanZZZZZZZZ/commit/a0bc7d9f64cf449074f7f2d260b0475ca3bb0ba8)).
