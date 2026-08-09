# Choosing and locking the look

## Pick once, then stop deciding

A channel's look is an identity, not a per-episode choice. Viewers should recognize an episode
in the feed before reading the title. Re-picking the style each time produces a playlist that
looks like a stock library — the single clearest signal of a low-effort automated channel.

So: choose deliberately on episode one, record it (see `channel-bible.md`), and pass it as a
locked parameter forever after. The workflow's own intake rule is that stated parameters are
never re-asked — use that.

Changing the look later is a rebrand. Legitimate, occasionally worth it, but do it as a
deliberate reset across the channel, not drift.

## Presets for a science channel

Read from the live catalog via `get_explainer_presets()`. IDs as recorded — re-read if one fails
to resolve.

| Preset | ID | Use for |
|---|---|---|
| **Editorial Motion Graphics** | `56fc6472-33b7-45dc-83ff-80c71d40aec6` | **The default recommendation.** Clean vector-editorial motion design — the register serious explainer channels use. Handles abstract concepts, diagrams, and cosmic scale equally well, and reads as authoritative rather than cartoonish. |
| **Colorful 3D** | `30948d66-76b1-4c8e-884a-1854e08e91df` | Astronomy and cosmology. Depth and volume suit planets, stars, and orbital mechanics. Slightly playful — good for a broad audience, less so for a serious-tone channel. |
| **Isometric Flat Vector** | `c109eddb-1a79-478a-afd5-273bd0b205e5` | Mechanisms, apparatus, experimental setups. Isometric reads as technical and precise; ideal for a channel about how things work and how we measured them. |
| **Whiteboard Doodle** | `b347d852-98fc-4013-92b7-6b0219fb21be` | Derivation and reasoning-heavy episodes. Feels like being taught. Note it invites in-frame text, which the models garble — keep symbols out and let narration carry them. |
| **Studio 3D** | `ab43dacd-6bee-4f8e-98b7-c4ff678bfdbd` | Polished 3D with a premium feel. Good for a flagship look if the channel leans cinematic. |
| **Low Poly** | `3e4bfd81-fbd8-4587-886d-296cbe48d152` | Stylized space content. Distinctive, but the geometric abstraction fights detailed mechanism explanation. |
| **Vintage Documentary** | `23df630a-c4f4-4f2f-b774-6ae1cd972614` | History-of-science episodes — the discovery stories, the experiments, the people. Pairs with channel type `History` rather than `Explainer`. |
| **Paper Diorama** | `83d276f6-e3aa-49b8-82f2-1a0bb7d0a370` | Tactile handmade look. Memorable and rare in this niche; strongest for scale and comparison episodes. |
| **Stickman Cartoon** | `237dd06c-3729-4895-9672-1c623c4266e0` | Thought experiments with a human in them — twin paradox, Schrödinger's cat, falling elevators. The generic webcomic formula; cheap-feeling as a whole-channel identity. |

**Avoid for a physics channel:** Pixel Art, Fluffy Toy, Claymotion, Fairy Tale & Myth — all
signal "for children" and undercut authority on technical claims.

## How to choose

If the user has no strong preference, **Editorial Motion Graphics** is the answer, and you can
say so plainly rather than presenting a menu. It's the workflow's own recommended Explainer
default, it's the register the established science channels occupy, and it degrades gracefully
across every topic a physics channel will cover — which matters, because the style is locked
before you know what episode 30 is about.

Choose differently when the channel has a defined angle:

- Cosmology and space almost exclusively → **Colorful 3D** or **Studio 3D**
- How things work, experiments, engineering-adjacent → **Isometric Flat Vector**
- History of discovery → **Vintage Documentary** with channel type `History`
- Wants to look unlike everyone else, accepts narrower range → **Paper Diorama**

The thing that separates a channel from a pile of clips is that the same choice was made
thirty times, not that the best possible choice was made once.

## Also locked

Style is one of several parameters that must be identical across every episode:

- **Voice** — one voice id, forever. The workflow pins a default (`Cillian`,
  `d8ba9f14-8a24-44db-932b-99e16c45bd32`, type `preset`) and requires the same
  `voice_id` + `voice_type` on every call. A voice that changes between episodes destroys
  channel identity faster than a style change, because it's audible in the first second.
- **Aspect** — `16:9` for the main channel. Must be passed explicitly on every video call; the
  workflow states it does not inherit.
- **Subtitles** — on or off, consistently. On is generally right: a large share of viewing is
  muted, and the workflow's caption scripts handle timing and styling.
- **Duration band** — pick a house length (90s or 2:00 are good starting points) and hold it.
  Predictable length is part of what a subscriber is subscribing to.

## Models

Don't choose these. The workflow locks its own routing — images, video, and voice each have a
pinned model, and substituting breaks the run. `models_explore` is for understanding what's
available, not for overriding the workflow.

The one place model choice is yours is **outside** the video: thumbnails go through the
`youtube-thumbnail-generator` workflow, which does its own routing to text-capable models —
which is exactly why thumbnail text renders correctly and in-frame video text does not.
