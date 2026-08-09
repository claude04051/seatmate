# Running the channel

A video is one deliverable. A channel is a repeatable identity plus everything wrapped around
each episode. This file covers the wrapper.

## The channel lock

Keep a small file in the user's project — `channel.lock.md` or similar — recording every locked
parameter. Read it at the start of each episode and pass the values as stated parameters so the
workflow's intake skips those rounds entirely.

```markdown
# Channel lock — <name>

Niche:          physics & astronomy explainers, curious adult audience
Channel type:   Explainer
Motion mode:    animated
Style preset:   Editorial Motion Graphics (56fc6472-33b7-45dc-83ff-80c71d40aec6)
Voice:          d8ba9f14-8a24-44db-932b-99e16c45bd32 / preset
Aspect:         16:9
Duration:       90s (9 blocks)
Subtitles:      on
Tone:           deadpan, second person, dry humor, no hype

## Episodes
| # | Title | Hook | Open question it leaves |
|---|---|---|---|
| 1 | Why time runs slower on your phone than on the ground | GPS off by 10km/day | why gravity affects clocks at all |
```

That last column is what makes the channel compound: each episode's open question is the next
episode's hook, and the table stops you from re-explaining setup you've already paid for or
contradicting an earlier simplification.

## Episode pipeline

Each episode is three deliverables, not one. The video workflow explicitly excludes the other
two, so they're yours to drive:

**1. The video** — `faceless-channel-video`, with locked parameters stated. Ends as a single
upscaled `final.mp4`.

**2. The thumbnail** — the separate `youtube-thumbnail-generator` workflow:

```
get_workflow_instructions({ workflow: "youtube-thumbnail-generator" })
```

Not optional, and not an afterthought. The thumbnail and title decide whether the video is
watched at all; everything upstream only matters if this lands. It routes to text-capable models,
so thumbnail text renders correctly — unlike text inside generated video frames.

For science thumbnails: one clear subject, high contrast, three or four large words maximum, and
the same visual grammar every episode so the channel is recognizable in a sidebar. The thumbnail
should pose the video's question, not label its topic — same principle as the hook.

**3. Shorts** — feed the finished video to **Personal Clipper** (`clipify`), which cuts a YouTube
video into vertical clips with burned subtitles:

```
model: clipify
urls: ["<the published YouTube URL>"]   # exactly one URL per job
clip_aspect: "9:16"
clips_num: 3–5
subtitle_position: "center"
subtitle_case: "upper"
```

Run this on the published video rather than producing a separate 9:16 edit — same asset,
no extra generation, and the clips point back at the long-form. The strongest Short is usually
the turn (the "wait, what?" beat), not the opening.

## Cadence

Consistency beats volume. A weekly episode that ships for six months outperforms a burst of ten
followed by silence — both for the algorithm and for the habit you're trying to build in a
viewer.

Set a cadence the user can actually hold given how long an episode takes end to end, and build
a topic backlog ahead of the publishing schedule so a slow research week doesn't break the
streak. When a topic turns out to be too big, split it into an arc rather than delaying — an arc
is better for the channel anyway.

## Series

Multi-part arcs are the most reliable way to convert viewers into subscribers, because they
create a reason to come back that a single strong video doesn't.

Structure them as genuine dependencies: each part ends on an open question the next part answers,
and each part still works standalone for someone arriving in the middle. "Part 3 of 6" with no
recap loses every new viewer; a 10-second reframe of what's established costs one block and
keeps them.

Natural physics arcs:
- Relativity: time dilation → length contraction → mass-energy → gravity as curvature
- Quantum: the double slit → superposition → measurement → entanglement
- Cosmology: what redshift shows → expansion → the CMB → the first light
- Scale: the atom → the cell → the Earth → the galaxy → the observable limit

## Reusing what you've built

Episodes in the same arc should share their asset roster — the same styling for a recurring
object across episodes makes the channel feel authored rather than assembled. When an arc revisits
something (the same lab, the same spacecraft, the same character standing in for the observer),
reuse the approved asset images from the earlier episode rather than regenerating and getting a
subtly different design.

Note the tension with the workflow's rule that clips compose from *that run's* approved assets:
the move is to carry the reference images forward into the new run's roster, not to skip the
roster phase.

## What not to do

- Don't chase trends outside the niche. A physics channel that posts a news reaction confuses
  both the audience and the recommendation system.
- Don't inflate length for watch-time. Padding shows immediately at this format's density, and
  retention percentage matters more than duration.
- Don't clickbait past what the video delivers. The gap between thumbnail promise and payoff is
  the fastest way to lose a science audience specifically — they're there for honesty.
- Don't let the look drift episode to episode. Either it's locked or it's a rebrand.
