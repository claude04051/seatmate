# Chart Pattern Reference

Patterns are shorthand for crowd behavior — accumulation, distribution, exhaustion,
indecision. None of them "work" in isolation; they work as a prior that gets
confirmed or rejected by volume and follow-through. Always state the pattern's
typical failure mode, not just its textbook target.

For every pattern below: name it only if the structure is reasonably clean. Forcing
a label onto a messy chart is worse than saying "no clear pattern, this is a range."

## Reversal patterns

### Head and Shoulders (top) / Inverse Head and Shoulders (bottom)
- **Structure**: three peaks (or troughs) — left shoulder, higher head, right
  shoulder roughly matching the left. A "neckline" connects the two reaction
  points between the peaks/troughs.
- **Confirmation**: a close beyond the neckline, ideally with rising volume.
  Right shoulder often forms on *lower* volume than the head — a classic tell
  that buying (or selling) pressure is fading.
- **Target**: measure head-to-neckline distance, project it from the neckline
  break.
- **Failure mode**: price breaks the neckline but immediately reclaims it
  ("bull/bear trap") — treat the neckline break as confirmed only after it
  holds, not on the first touch.

### Double Top / Double Bottom
- **Structure**: two peaks (or troughs) at roughly the same level with a
  pullback between them ("M" or "W" shape).
- **Confirmation**: break of the middle pullback level (the "valley" for a
  double top, the "peak" for a double bottom). Second peak/trough on lower
  volume than the first is a bearish/bullish tell respectively.
- **Target**: height of the pattern projected from the breakout point.
- **Failure mode**: very common pattern, also very commonly fails to break the
  middle level and just chops — don't call it confirmed until that level breaks.

### Triple Top / Triple Bottom
- Same logic as double top/bottom with a third test of the level. A third
  failed attempt to break a level generally strengthens it as resistance/support
  — but if it does break on the third try, the move tends to be more forceful
  because more trapped traders are on the wrong side.

## Continuation patterns

### Triangles (Ascending, Descending, Symmetrical)
- **Ascending**: flat resistance on top, rising support below — buyers
  stepping in at progressively higher lows. Generally bullish continuation,
  breaks upward more often than not.
- **Descending**: flat support below, falling resistance above — mirror image,
  generally bearish continuation.
- **Symmetrical**: converging trendlines, both sides sloping toward each
  other — a pure volatility-contraction/indecision pattern. Breaks in the
  direction of the prevailing trend more often than not, but is the least
  directionally biased of the three.
- **Volume**: should contract as the triangle narrows (decreasing participation
  during consolidation), then expand sharply on the breakout. A breakout on
  flat/low volume is suspect.
- **Target**: height of the triangle's widest part projected from the breakout.

### Flags and Pennants
- Short, tight consolidation after a sharp directional move ("flagpole"),
  sloping counter to the trend (flag) or converging into a small symmetrical
  triangle (pennant).
- **Read**: a pause to digest the prior move, usually resolving in the
  direction of the flagpole. Volume should be light during the flag/pennant and
  pick back up on the breakout in the flagpole's direction.
- **Target**: flagpole height projected from the breakout point.
- These are among the more reliable continuation patterns specifically because
  they're short — the longer a "flag" drags on, the more it's actually turning
  into a different pattern (often a reversal).

### Wedges (Rising, Falling)
- Converging trendlines like a triangle, but both sloping the *same* direction.
- **Rising wedge**: both trendlines slope up, but converging — despite the
  "up" appearance, this is typically bearish, especially after an uptrend
  (momentum fading even as price grinds higher). Watch for volume drying up
  as it forms.
- **Falling wedge**: both trendlines slope down, converging — typically
  bullish, especially after a downtrend (selling pressure exhausting).
- Wedges are a case where the visual slope is counter to the eventual
  direction — worth explicitly flagging to the user since it's the most
  commonly misread pattern.

### Cup and Handle
- **Structure**: a rounded "U"-shaped recovery (the cup) followed by a small
  pullback/consolidation near the prior high (the handle), then a breakout.
- **Read**: the rounding bottom reflects a gradual shift from selling to
  buying pressure; the handle is a final shakeout of weak hands before
  continuation. Volume ideally: high on the left side of the cup (into the
  decline), lower at the bottom, and a clear pick-up on the breakout above
  the handle's resistance.
- **Target**: cup depth projected from the breakout point.
- **Failure mode**: a handle that drops more than ~half the cup's depth,
  or drags on far longer than the cup itself, weakens the pattern
  significantly — at that point it's more likely just a longer consolidation
  or a topping structure.

### Rectangles / Ranges
- Price bounces between clear horizontal support and resistance. Not
  inherently bullish or bearish — trade the range (buy support/sell
  resistance) until it breaks, then treat the breakout like any other
  level break: confirm with volume before trusting it.

## Candlestick patterns (short-term reversal/continuation signals)

These are lower-timeframe signals — most useful combined with a level (support/
resistance) or a longer-term pattern for context, not traded in isolation.

- **Doji**: open ≈ close, long wicks possible. Indecision; significance depends
  on context — a doji at a well-tested resistance level after an extended
  uptrend is a meaningful reversal warning, a doji in the middle of a range
  is noise.
- **Hammer / Hanging Man**: small body near the top of the range, long lower
  wick, little/no upper wick. A hammer after a downtrend suggests buyers
  rejected lower prices (bullish); the identical shape after an uptrend is
  called a hanging man and suggests the opposite (bearish) — context (prior
  trend) determines the name and the read, not the shape alone.
- **Shooting Star / Inverted Hammer**: mirror of the above — small body near
  the bottom, long upper wick. Shooting star after an uptrend = bearish
  rejection of higher prices. Inverted hammer after a downtrend = tentative
  bullish signal, ideally confirmed by the next candle.
- **Engulfing (Bullish/Bearish)**: a candle whose real body fully engulfs
  the prior candle's real body, in the opposite direction. Stronger when it
  occurs at a key level and on above-average volume.
- **Morning Star / Evening Star**: three-candle reversal — a strong candle in
  the trend direction, a small-bodied indecision candle (often gapping), then
  a strong candle in the opposite direction closing well into the first
  candle's body. One of the more reliable multi-candle reversal signals.
- **Marubozu**: a candle with no/almost no wicks — open equals the high (or
  low) and close equals the opposite extreme. Signals strong, one-sided
  conviction for that session.

## General rules for pattern-reading

1. **Timeframe context matters more than the shape.** A "head and shoulders"
   on a 5-minute chart is noise for a swing trader and signal for a scalper —
   always state the timeframe when naming a pattern.
2. **Volume should confirm the pattern's implied story** (see
   `references/volume-analysis.md`). A textbook shape with wrong-way volume is
   a weak read regardless of how clean the lines look.
3. **A pattern isn't "complete" until it breaks its trigger level** (neckline,
   trendline, handle resistance, etc.) with a close, not just an intraday
   wick through it. Say "forming" vs. "confirmed" explicitly.
4. **Failed patterns are information too.** A pattern that should have broken
   out and instead reverses hard is often a stronger signal in the opposite
   direction than the original pattern would have been (trapped traders
   capitulating).
