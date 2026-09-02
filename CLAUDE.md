# SLOP3762 — The Art of Noble Death: Design Philosophy of the Souls-like

This harness is mine, written for this course specifically. It replaces the
template's empty starting note.

## The course, in one sentence

A Souls-like withholds comfort on purpose, in every subsystem at once — death,
combat, geography, story, sound, community — and the withholding is the
design, not a side effect of it. "Difficulty" is the lazy word for what the
genre is doing. **Every week tests that claim against one subsystem.** If a
week's content could be lifted out and dropped into a generic "intro to game
design" course without rewriting a sentence, it has failed the thesis and
needs to be rewritten, not padded.

## Working 12-week arc (reference, not frozen)

1. Defining the lineage — Demon's Souls → Dark Souls → the genre it spawned
2. The bonfire economy — death, currency and risk as one system
3. Combat legibility — telegraphs, stamina, the grammar of an attack
4. Level design — interconnected shortcuts, verticality, the map "opening up"
5. Environmental storytelling — lore without exposition, item text as narrative
6. Boss design as argument
7. **Assignment 1 due** — a close reading of one boss or one area against the
   thesis
8. Sound, silence, and the absence of a soundtrack
9. Community as co-author — messages, wikis, "git gud" as a culture, not a taunt
10. The difficulty debate — accessibility criticism vs. "the difficulty is the
    point," argued fairly on both sides
11. Invasions and designed antagonism — the multiplayer that refuses to be co-op
12. Genre codification — soulslikes after FromSoftware: inheritance, or just
    the furniture of a genre now?
Final project: a design document or a critical essay, student's choice, judged
against the thesis either way.

Reordering or merging weeks is fine if a rewrite earns it. Adding a week that
doesn't attach to a subsystem in this list is not — check against this arc
before writing new content, and update this arc in the same commit if it
genuinely needs to change.

## Platform: fixed, not up for reinterpretation

This repo is **Astro only** — `astro-theme-university` + `astro-theme-slop`,
deployed to **GitHub Pages**, never Vercel/Netlify. Never introduce Next.js,
React, shadcn/ui, Tailwind, or any other framework: the content collections,
the generated course API and the build pipeline (`astro.config.ts`) are the
fixed contract the programs-and-courses page reads, and swapping stacks
breaks it silently rather than loudly.

Content lives in the four existing collections under `src/content/`
(`sessions`, `assessments`, `lectures`, `people`) validated by
`src/content.config.ts`. Never invent a parallel data file (no
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
  *what* (`week 6: cut the accessibility debate down to one week — it kept
  eating week 5's material`, not `update content`).
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

- No custom interactive widget unless a specific week's argument needs one
  (e.g. a boss-attack "telegraph" timing demo) — not added to pad the page
  count.
- No policies page unless there's a real policy worth stating beyond what a
  generic course would say; a placeholder policy page is worse than none.
- No week added purely to reach twelve if the thesis runs out of subsystems
  first — better to widen a week than pad with a thirteenth mediocre one (the
  arc above already accounts for this, but the check is worth restating).
