# Physically accurate visuals

Image and video models learned physics from sci-fi posters and stock art. Their default output
is confidently wrong in ways a science audience spots instantly. Every wrong visual costs more
credibility than a good script earns.

The fix is always the same shape: **describe the correct structure explicitly in the prompt.**
Omission gets you the stock-art version. "A black hole" gets a bathtub drain. The corrected
prompt is barely longer — it just says what's actually there.

## The high-frequency errors

### Black holes
The default is a swirling plughole or a black ball. Real structure, and all of it is *more*
cinematic than the wrong version:

> a black hole: a perfectly black circular shadow at center, encircled by a thin bright photon
> ring; a glowing orange-white accretion disk of superheated gas orbiting it, the disk's far
> side bent up and over the top of the shadow by gravitational lensing so the disk appears to
> pass both in front of and above the black hole; background starfield visibly warped and
> smeared into arcs near the edge

Never: a funnel, a vortex, a whirlpool, a tunnel, stars being sucked in like water.

### Atoms and electrons
The default is the Bohr solar-system logo — electrons as balls on ellipse tracks. That model has
been obsolete since 1926.

Use it only when the episode is *about* the Bohr model historically, and say so on screen.
Otherwise: **probability clouds** — a diffuse fuzzy shell of varying density around the nucleus,
denser where the electron is more likely, with no orbit lines and no ball-shaped electron.
For orbital shapes, name the actual geometry: s = spherical shell, p = two lobes on an axis.

### Sound waves
The default is a transverse squiggle — the ocean-wave shape. Sound in air is **longitudinal**:
bands of compression and rarefaction traveling in the direction of propagation.

> concentric shells of alternating dense and sparse particles expanding outward from the source,
> particles oscillating along the direction of travel, not perpendicular to it

A waveform squiggle is fine when it explicitly represents a *pressure-vs-time graph* — that's a
real thing being plotted. It's wrong as a picture of the wave in space.

### Space and vacuum
- No sound. If the episode has an explosion in space, it is silent, and that silence is worth
  making a beat out of.
- No visible laser beams crossing vacuum. You see a beam because of dust scattering; in clean
  vacuum you'd see only what it hits.
- No fire/flames in vacuum — no oxidizer. Glowing plasma and incandescent debris, yes.
- Stars don't twinkle from space; twinkling is atmospheric turbulence.
- The Sun from space is blinding white, not yellow. Yellow is atmospheric scattering.

### Orbits and scale
- Orbits are **ellipses with the primary at a focus**, not circles with it centered. Draw the
  eccentricity when it matters; Earth's is small enough to look circular, comets' are not.
- Objects in orbit are not "falling toward" or "hovering". Free fall with sideways speed.
- **Nothing in space is to scale in stock imagery, and the true scale is usually the hook.** If
  you show the solar system with visible planets, they're wildly oversized — either accept the
  diagram convention and *say* it's not to scale, or make the real scale the point (Earth as one
  pixel, and then the emptiness).
- Asteroid belts are nearly empty. The dense boulder-field is a movie invention; typical
  separation is hundreds of thousands of kilometers.

### Gravity
The rubber-sheet grid is a legitimate teaching analogy, but it's an analogy, and viewers who
notice will point out it explains gravity using gravity. Use it and flag it in the narration
("this picture cheats, but it's useful"), or use geodesics — parallel paths converging on a
curved surface — instead.

### Light and relativity
- Light doesn't visibly travel across a frame at watchable speed. Slowing it down is a
  deliberate visualization; say you're doing it.
- Redshift/blueshift is a spectral shift, not an object turning red.
- Time dilation is not a clock melting or running backwards; it's two clocks that were
  synchronized reading different values. Show the pair.

### Quantum
- Superposition is not an object flickering between two states, and not a ghostly translucent
  copy. Best honest visual: a probability distribution that collapses to one outcome on
  measurement.
- Entanglement is not a glowing string between particles, and nothing travels along it. Show
  correlated outcomes at two separated detectors.
- The double slit needs an actual interference pattern — many fringes, spacing even, intensity
  falling off from the center. Two bright stripes is the wrong picture and it's the thing the
  whole experiment disproves.

## Diagram-mode vs world-mode

Decide per shot which register you're in, and don't blend them by accident:

**World mode** — what it would actually look like. Accuracy constraints above apply in full.
**Diagram mode** — an intentional schematic: flat vector, clean background, labeled. Not-to-scale
is fine and expected here, because the frame reads as a diagram.

The trap is a shot that looks photoreal but is schematically wrong — that reads as an error
rather than a simplification. If you're simplifying, make the frame *look* like a diagram.

## Text in frames

Generated frames garble text. Symbols come out malformed, Greek letters get invented, digits
drift between shots. So:

- **No equations in generated imagery.** State them in narration, where they're always right.
- Numbers and units live in the voiceover, not in pixels.
- If a formula must be on screen, add it as a post overlay over a clean plate.
- Keep any unavoidable in-frame text to a few large words, and check every returned frame.

## The check before submitting

For each visual prompt:

1. What does the model produce if I *don't* specify the structure? If that default is wrong,
   spell out the correct structure.
2. World mode or diagram mode — and does the frame look like the mode it's in?
3. Any text, numbers, or equations baked in? Move them to narration.
4. Would a physics undergrad find anything to correct here?

Question 4 is the one that matters. Run it on every frame.
