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

## How reliable are these patterns, really?

Before naming a pattern with confidence, know what the actual historical data says —
don't imply more certainty than the evidence supports.

- **Thomas Bulkowski's pattern statistics** (*Encyclopedia of Chart Patterns*,
  thepatternsite.com), based on tens of thousands of trades, are the most-cited
  empirical source in retail TA. Some figures: **cup and handle** ~54% average rise
  after a confirmed breakout, failing only ~5% of the time in a bull market — one of
  the better performers. **Double bottom** ~88% bullish success rate. **Ascending
  triangle** breaks upward ~63% of the time (~17% break-even failure). **Descending
  triangle** actually breaks upward 53% vs. down 47% — counter to the "textbook"
  bearish-continuation assumption. **Symmetrical triangle** ranks a weak 36th of 39
  bullish patterns in his data (~34% average rise, ~25% failure) — a useful corrective
  to treating all triangles as equally reliable.
- **Reliability has degraded over time.** Bulkowski's data shows breakout failure
  rates (move <10% after breakout) roughly doubling from the 1990s (~11-14%) to the
  2000s (~28-44%), which he attributes to markets becoming more efficient/algorithmic.
  Treat classic patterns as weaker signals today than the "textbook" success rates
  from older TA literature imply.
- **There is some independent academic support** for classic reversal patterns
  specifically: Lo, Mamaysky & Wang (*Journal of Finance*, 2000) found head-and-
  shoulders and double-bottom patterns carried statistically real incremental
  information in U.S. stocks 1962-1996, with conditioned strategies showing modest
  (5-7%/year) risk-adjusted excess returns. This support does *not* extend to
  harmonics or Elliott Wave below — be more confident asserting a head-and-shoulders
  or double-bottom read than a harmonic or Elliott count.

## Harmonic patterns (Fibonacci-ratio XABCD structures)

Five-point (X-A-B-C-D) patterns where each leg must fall within specific Fibonacci
retracement/extension bands; point D is the "Potential Reversal Zone" (PRZ) where the
projections converge and is the trade trigger. More precise-looking than classic
patterns, but with materially weaker evidence behind them — no independent academic
validation exists, and cited win rates (65-80% with strict ratios, dropping to 40-48%
with loose tolerances) mostly come from vendor/educator backtests, not independent
research. Present these as a lower-confidence tool than classic patterns.

| Pattern | B retraces XA | C retraces AB | D (relative to XA) |
|---|---|---|---|
| Gartley | 0.618 (tight) | 0.382–0.886 | 0.786 retracement |
| Bat | 0.382–0.500 (never >0.618) | 0.382–0.886 | 0.886 retracement — generally considered the cleanest/tightest of the family |
| Butterfly | 0.786 | 0.382–0.886 | 1.27 or 1.618 **extension** (D goes beyond X) |
| Crab | 0.382–0.618 | 0.382–0.886 | 1.618 extension (the most extreme) |
| Cypher | 0.382–0.618 | extends 1.13–1.414 beyond A | 0.786 of the XC leg (uses XC, not XA) |

Only call a harmonic pattern out when the ratios genuinely line up close to these
values — a rough eyeballed XABCD shape without checking the actual retracement/
extension percentages isn't a harmonic pattern, it's wishful pattern-matching.

## Elliott Wave theory

Trends unfold in 5 waves (impulse: 1-2-3-4-5), corrections in 3 (A-B-C). Three
**rules** (if violated, the count is wrong): Wave 2 never retraces more than 100% of
Wave 1; Wave 3 is never the shortest of waves 1/3/5; Wave 4 never enters Wave 1's
price territory. Common **guidelines** (not rules): alternation between sharp and
sideways corrections across waves 2 and 4; Wave 3 is most often the extended wave;
Wave 2 often retraces 50-61.8% of Wave 1, Wave 3 often extends to 161.8%+ of Wave 1.

**Be explicitly cautious with this one.** Elliott Wave is the most subjective
methodology in mainstream TA — different analysts routinely produce conflicting
counts on the same chart, and because only the three cardinal rules are strict, a
"wrong" count can always be relabeled after the fact to fit whatever price did next.
Critics (including a Batchelor & Ramyar study that found no significant evidence for
the claimed Fibonacci wave ratios) treat it as an unfalsifiable narrative rather than
a predictive tool. If a user asks for an Elliott Wave count, give one framed
explicitly as *one interpretation among several plausible counts*, not a confident
prediction — and prefer volume/structure-based reads (Wyckoff, classic patterns) when
you need a higher-confidence read.

## Wyckoff Method (accumulation/distribution phases)

A volume-and-price framework (Richard Wyckoff, early 1900s) for reading how a
"Composite Operator" (proxy for institutional/smart money) accumulates or distributes
a position across a range before the next trend move. Directly complements
`references/volume-analysis.md` — a breakout is more trustworthy when it fits this
sequence than when it doesn't.

**Accumulation (bottoming, A→E):**
- **Phase A**: stops the downtrend — Preliminary Support, Selling Climax (high
  volume), Automatic Rally, Secondary Test (lower volume than the climax).
- **Phase B**: range-building, multiple tests of the range boundaries.
- **Phase C — the Spring**: a false breakdown below range support (often on lighter
  volume) that quickly reclaims the range. The classic stop-hunt/shakeout, and
  typically the highest-conviction long entry in the whole schematic.
- **Phase D — Sign of Strength (SOS)**: a rally on widening spread and rising volume
  that clears range resistance, followed by a **Last Point of Support (LPS)** — a
  shallow pullback holding above former resistance on light volume.
- **Phase E**: markup — price leaves the range in a sustained uptrend.

**Distribution (topping) mirrors this**: Preliminary Supply → Buying Climax →
Automatic Reaction → Secondary Test, then Phase C's **Upthrust After Distribution
(UTAD)** — a false breakout *above* resistance trapping late buyers (the mirror of
the Spring) — then **Sign of Weakness (SOW)** and **Last Point of Supply (LPSY)**
before markdown.

**Practical use**: treat a breakout as structurally weak if it happens with no prior
Spring/UTAD and no SOS-then-LPS (or SOW-then-LPSY) sequence — that's the Wyckoff-based
version of "confirm the pattern with volume" from the general rules below.

## More patterns worth recognizing

- **Broadening formation / megaphone**: diverging trendlines (higher highs *and*
  lower lows) — rising instability/disagreement rather than a clean directional
  signal. Volume typically expands with each swing. Considered a weaker,
  volatility-signature pattern by most sources; confirm only on a third-swing break
  that holds.
- **Diamond top/bottom**: rare reversal — a broadening formation on one side
  narrowing into a symmetrical triangle on the other, forming a rhombus shape.
- **Rounding top**: the bearish inverse of a cup without a handle — a slow arc of
  declining highs over weeks/months reflecting a gradual buyer-to-seller shift.
- **Three Drives**: three symmetrical price legs, each completing near 1.13/1.27/
  1.618 extensions with 0.618/0.786 retracements between drives — structurally a
  cousin of the harmonic patterns above, same PRZ logic.
- **Gap taxonomy**: **common gaps** (noise, fill quickly, no real signal); **breakaway
  gaps** (mark the start of a new trend, often on a range breakout); **runaway/
  measuring gaps** (mid-trend continuation on high volume — roughly bisects the
  remaining move, usable as a rough target); **exhaustion gaps** (late-trend, weak
  follow-through, often reversed within days — the "last gasp"); **island reversal**
  (an exhaustion gap traps a small cluster of bars, then a breakaway gap in the
  opposite direction isolates that cluster like an island — one of the more visually
  unambiguous reversal signals when it occurs).

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
5. **Require multi-timeframe confluence for higher conviction.** The same
   directional read — trend, key level, and pattern — agreeing across at least two
   timeframes (e.g. the higher timeframe confirms the dominant direction, the
   pattern/trigger appears on the execution timeframe) is materially stronger than a
   pattern that only shows up on one timeframe and contradicts the higher-timeframe
   trend. A clean-looking pattern that fights the higher-timeframe trend is
   lower-conviction, not a free pass to ignore that trend.
6. **State your confidence tier.** Classic reversal/continuation patterns (head &
   shoulders, double top/bottom, triangles, flags, cup and handle) have the best
   evidence behind them. Wyckoff structure is a well-established professional
   framework but more discretionary to apply. Harmonic patterns and Elliott Wave
   counts are the least validated — use them as supporting context, not as the
   primary basis for a trade call.
