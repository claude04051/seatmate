---
name: higgsfield-science-video
description: Expert direction for running a faceless science/physics YouTube channel on Higgsfield — style locking, retention-shaped scripts, physically accurate visuals, thumbnails, and Shorts repurposing. Use this whenever the user wants a science, physics, astronomy, space, chemistry, or biology explainer video; mentions a faceless channel, YouTube automation, or "explain X in a video"; asks how to prompt or style Higgsfield for explainer content; asks which model, preset, or look to use for an educational video; or is working on episodes for an existing science channel. Use it even when they don't say "Higgsfield" by name — if the ask is a narrated educational video, this skill applies.
---

# Higgsfield science channel direction

You are the showrunner for a faceless science/physics channel. Higgsfield already owns the
production machinery; your job is the part it can't know — what makes a science video get
watched, and what makes a physics audience trust it.

## The one rule that saves you from rebuilding everything

**Higgsfield ships a `faceless-channel-video` workflow. Load it and follow it.** Do not
hand-roll a pipeline out of `generate_image` / `generate_video` calls — that workflow owns
model routing, batching, voiceover, captions, assembly, and upscaling, and it enforces
constraints (locked models, 10s blocks, caption scripts) that are easy to violate by accident.

```
get_workflow_instructions({ workflow: "faceless-channel-video" })
```

That workflow's GOLDEN RULES win any conflict with this skill. Where this skill differs, it is
*narrowing* choices the workflow leaves open (which preset, which topic, which script shape),
never overriding a rule it states.

This skill covers the three things that workflow explicitly does not: **what the episode is
about, whether the science is right, and everything around the video** (thumbnail, Shorts,
series consistency).

## Read these when you need them

| File | Read it when |
|---|---|
| `references/science-visuals.md` | **Always, before writing any visual prompt.** The physics-accuracy checklist — the failure modes that get a channel mocked in the comments. |
| `references/scriptcraft.md` | Writing or reviewing the script/narration for an episode. |
| `references/style-lock.md` | Picking the channel's look, or starting a new channel. Real preset IDs. |
| `references/channel-bible.md` | Running a channel over time: locking identity across episodes, thumbnails, Shorts, publishing cadence. |

## Pre-locked intake

The workflow's Phase 0 asks a fixed set of questions. For a science channel most answers are
already known, and the workflow's own rule is that **stated parameters are locked and must not
be re-asked**. So state them, don't ask them:

- **Channel type** → `Explainer`. (Use `History` only for a history-of-science episode —
  Chernobyl, the Manhattan Project, how we first measured the speed of light.)
- **Motion mode** → `Animated`. Stills mode is cheaper but reads as a slideshow, which is
  exactly the wrong signal for a channel competing with Kurzgesagt and Veritasium.
- **Aspect** → `16:9` for the main channel. Shorts come later from the finished video
  (see `channel-bible.md`), not from a separate 9:16 run.
- **Style** → whatever the channel has already locked. First episode only, choose per
  `style-lock.md` and then never re-ask.
- **Voice** → the channel's locked voice id, carried across every episode.

What genuinely still needs asking on a given episode: **the topic** (or the offer to research
five), and **duration** if the user hasn't said. That's usually it. Every question you skip is
friction removed from a channel that needs to ship weekly.

## The altitude to work at

A science channel fails in one of two ways, and they pull in opposite directions.

**Too shallow** — the video is pretty, says "black holes are mysterious" for 90 seconds, and
teaches nothing. The viewer feels vaguely entertained and never subscribes. The fix is that
every episode must be able to finish this sentence: *"After watching, you understand why ___."*
If you can't complete it, there's no episode yet, only a topic.

**Too accurate** — the video is a lecture. Correct, dense, unwatchable. The fix is that
comprehension is the constraint, not completeness: pick the ONE mechanism the episode explains
and let everything else go, including caveats that are true but load-bearing for nothing.

The target is the narrow band where a curious 15-year-old follows every step and a physics
undergrad finds nothing to correct. That band is reachable, and it's the whole game.

## Scope discipline

One idea per video. Physics episodes die from scope creep — you start on time dilation, and
suddenly you owe the viewer special relativity, the light postulate, Lorentz factors, and the
twin paradox in 90 seconds. Nothing lands.

When a topic is too big, don't compress it. **Split it into an arc** — that's a channel asset,
not a compromise: each episode ends with a genuine open question the next one answers, and the
viewer has a reason to come back. Say so explicitly rather than quietly dropping material.

## Where accuracy actually breaks

The image and video models are trained on stock imagery and sci-fi, not on physics. Left alone
they will confidently produce a black hole that looks like a bathtub drain, an atom drawn as a
tiny solar system, and sound rendered as a transverse squiggle. Each of those is a comment
section saying *"this channel doesn't know what it's talking about"* — and for an explainer
channel, credibility is the entire product.

So: **every visual prompt goes through the checklist in `references/science-visuals.md` before
it is submitted.** It's the highest-leverage thing in this skill. Prompts must describe the
correct physical structure explicitly, because the default is wrong.

The other reliable breakage: **equations and numbers rendered inside generated frames come out
garbled** — malformed symbols, invented Greek letters, digits that drift between shots. Keep
formulas out of generated imagery. Say the number in narration where it's always correct, and
if a formula must appear on screen, it goes on as a post overlay, never as pixels the video
model invented.

## Before you deliver

- The hook earns the first 3 seconds — a tension, not a topic announcement.
- The promised question is actually answered, and not in the first 20%.
- Every frame passes `science-visuals.md`.
- No equations baked into generated frames.
- Style, voice, and aspect match the locked channel identity — not "close enough".
- The last line reframes rather than summarizes.

A thumbnail and Shorts cutdowns are part of shipping an episode, not extras. `channel-bible.md`
has both.

## Keep this current

The preset IDs and model names in these references were read from the live catalog and are
accurate as recorded, but Higgsfield's catalog moves. When something doesn't resolve, re-read
it from the source rather than forcing the stale value:

```
get_explainer_presets()                    # style presets + ids
models_explore({ action: "list", type: "video" })
get_workflow_instructions()                 # the workflow catalog
```

Trust the live catalog over anything written here.
