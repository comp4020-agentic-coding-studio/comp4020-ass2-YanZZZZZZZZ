# SLOP3762 — The Art of Noble Death: Design Philosophy of the Souls-like

This harness is mine, written for this course specifically. It replaces the
template's empty starting note.

## The course, in one sentence

Real difficulty doesn't kill the player — it makes them certain, the instant
after they die, that the next attempt can win. This course treats the
Souls-like as a punitive architecture: a systemic dissection of its spatial
storytelling, risk psychology and minimal guidance, taught as design
methodology rather than critical theory. **Every week is a workshop that
produces an artefact** (a map sketch, an item description, a boss blueprint,
a UI redesign), not just an argument about one. If a week's exercise could be
lifted into a generic "intro to level design" course without touching a
sentence, it has failed the thesis and needs to be rewritten, not padded.

## Working 12-week arc (reference, not frozen)

1. Welcome to the masochism club — punishing difficulty vs. cheating
   difficulty, and why players choose the first willingly
2. Death as a narrative verb — the Undead Curse, hollowing, and item
   description as unreliable narration
3. Level design as argument — interconnected shortcuts (Firelink Shrine as
   hub) and soft visual guidance without a minimap
4. The rhetoric of combat — telegraphs, poise as a hidden metronome, the
   grammar of a wind-up
5. Boss design as dramatic climax — **Boss Blueprint due** (25%): a
   two-phase boss, its transition trigger and narrative justification
6. Midpoint review, no new subsystem — the map/combat/narrative triangle so
   far, peer review of the Boss Blueprint, Final Project brief released
7. Build as projection — attributes as the persona a player projects, not
   just a stat sheet; **Loadout Pitch due** (20%)
8. The economy — souls/runes as the stake, loss aversion, why the levelling
   cost curve is the most precisely tuned number in the game
9. Asynchronous resonance — messages, bloodstains, phantoms; empathy built
   without real-time contact
10. Minimal UI and immersion — why the genre deletes the quest log, and what
    that subtraction forces the player to remember instead
11. Weak guidance and the value of a "bad" ending — ambiguous NPC dialogue as
    navigation, tragedy that outlasts a happy ending
12. Final showcase, the bonfire crit — **Final Project due** (35%): a
    complete opening-level one-pager (map sketch, two item descriptions, one
    boss's move summary, an opening weak-guidance script)

Death Notes (20%) run underneath the first eleven weeks — a ~200-word entry
per week naming one concrete moment from that week's material, not a genre
generality — submitted the week it covers rather than bundled at the end.
The best ten of eleven count, so one missed or weak week doesn't need its
own extension request.

Reordering or merging weeks is fine if a rewrite earns it (weeks 3 above are
already a deliberate merge of two related exercises, done to fit the
12-week cap the content schema enforces). Adding a week that doesn't produce
a workshop artefact is not — check against this arc before writing new
content, and update this arc in the same commit if it genuinely needs to
change.

## Platform: fixed, not up for reinterpretation

This repo is **Astro only** — `astro-theme-university` + `astro-theme-slop`,
deployed to **GitHub Pages**, never Vercel/Netlify. Never introduce Next.js,
React, shadcn/ui, Tailwind, or any other framework: the content collections,
the generated course API and the build pipeline (`astro.config.ts`) are the
fixed contract the programs-and-courses page reads, and swapping stacks
breaks it silently rather than loudly.

Content lives in the collections under `src/content/` (`sessions`,
`assessments`, `lectures`, `topics`, `people`) validated by
`src/content.config.ts` — `topics` is this course's own addition, an undated
collection for the subsystem-level essay a lecture points at rather than a
week-by-week duplicate of the schedule. Never invent a parallel data file (no
`src/data/schedule.ts` or similar) — a thirteenth week or a new assessment is
a new markdown file in the collection it belongs to, nothing else.

The course code's last three digits (`762`) are provisioned to this repo and
must never change; only the level digit is mine to set (`3`, for an advanced
elective, since this asks students to already know the games and argue about
design, not learn to play them).

## Visual direction: a skin, not a replacement

Slop's identity is exactly three CSS custom properties
(`--at-primary`/`--at-secondary`/`--at-tertiary`, gold/bronze/warm-grey) plus
the crest and lockup. **Never touch those three tokens or swap the
logo/crest.** The gothic, bonfire-lit register this course wants — a serif
display face for headings, aged/worn textures, darker card treatments, ember
accents — is built as a layer on top, in `src/layouts/PageLayout.astro`
(a `<style is:global>` block or an imported stylesheet) and in individual
components. Restate as little of the brand palette as possible there; a
colour hand-typed twice is how the skin and the site quietly disagree.
`src/decks/theme.css` gets the same treatment for slides — extend it, don't
replace its import of the theme's base deck styles.

## Voice

Deadpan and precise, the way a strategy guide writer who's also read Derrida
would write, not a marketing brochure for a game jam. Specific claims about
specific games beat abstract genre talk — "the fog gate removes the retreat
option, not just the view" beats "the game uses atmospheric barriers."

Banned by default, because they're the tells of unedited agent prose:
"delve," "tapestry," "in today's fast-paced world," "unleash," "seamlessly,"
"elevate your understanding," any sentence that could open a LinkedIn post.
If a sentence sounds like it's selling the course rather than teaching it,
rewrite it.

## Process

- Small commits, one decision each. A content week going from a skeleton to a
  finished page, a spec check going red→green, a CLAUDE.md rule added after a
  correction — each is its own commit with a message that says *why*, not just
  *what* (`week 3: merge the two level-design halves into one workshop —
  interconnection and soft guidance are one argument, not two`, not `update
  content`).
- Write the spec check before the content it protects, where that's possible.
  A red test on a promise not yet kept is the expected starting state, not a
  problem to hide.
- Before shipping: every `STARTER_CONTENT` marker is gone (`git grep
  STARTER_CONTENT src`), the four starter images are replaced or deliberately
  removed, `pnpm check` and `pnpm check:evidence` are green, and `PROCESS.md`
  cites the commits that matter.
- When I correct an agent output (wrong register, broken thesis-attachment,
  wrong stack), the correction becomes a rule in this file in the same
  session, not just a fix in that one reply.

## Explicitly not doing

- No custom interactive widget unless a specific week's argument needs one —
  not added to pad the page count. Two are earmarked because a specific
  week's material asks for them: a death-currency cost calculator on
  [the economy](/topics/) (week 8) and a click-to-parry timing demo on
  [combat rhetoric](/topics/) (week 4). Build them as their own commit, after
  the week's prose content is in and green, not before.
- No policies page unless there's a real policy worth stating beyond what a
  generic course would say; a placeholder policy page is worse than none.
- No week added purely to reach twelve if the thesis runs out of subsystems
  first — better to widen a week than pad with a thirteenth mediocre one (the
  arc above already accounts for this, but the check is worth restating).
