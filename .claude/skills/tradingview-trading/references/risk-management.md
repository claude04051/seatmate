# Risk Management & Trade Planning

This is the part that actually determines whether technical analysis translates
into a survivable trading process. A correct chart read with no risk management is
still a losing strategy over time; a mediocre read with strict risk management can
still be profitable. Always push the conversation here, not just to "is this
bullish or bearish."

## Position sizing

- **Risk a fixed, small % of account per trade** — commonly 0.5-2% for
  discretionary swing/day trading, lower for beginners or high-volatility names
  (like the low-float "volume hype" setups in `references/volume-analysis.md`).
  This is the single most important risk management concept: it's what keeps
  any one wrong trade from doing meaningful account damage.
- **Position size formula**:
  `shares = (account size × risk %) / (entry price − stop price)`
  e.g. a $10,000 account risking 1% ($100) on a stock entered at $50 with a stop
  at $48 (i.e. $2/share risk) → 50 shares. Note the size is *derived from the
  stop distance*, not picked first and then a stop fitted to it — sizing should
  never come before the stop placement.
- Volatile/low-liquidity names need smaller size for the same dollar risk because
  the stop needs to be wider (see ATR-based stops below) to avoid being
  whipsawed out by normal noise.

## Stop-loss placement

- A stop should sit at the price level that, if hit, means **the original idea is
  wrong** — not an arbitrary distance or a round number. E.g. below the pattern's
  invalidation level (broken neckline, broken trendline, below the handle low),
  not just "5% below entry" picked out of the air.
- **ATR-based stops**: a common systematic approach is entry ± (1.5-2× ATR) —
  scales the stop to the stock's actual current volatility instead of a fixed
  percentage, so a quiet stock and a wild one aren't given the same stop
  distance. See `references/indicators.md` for ATR.
- **Structure-based stops**: below the most recent swing low (long) / above the
  most recent swing high (short), or beyond the pattern's defining level — ties
  the stop directly to "the technical story broke," which is usually the more
  defensible placement for a discretionary trade.
- Avoid placing stops at obvious round numbers or exactly at an obvious swing
  point with no buffer — these are the first places a market tends to sweep
  through on stop-hunts before reversing. A small buffer beyond the level (not
  a huge one — defeats the point of a tight stop) is standard practice.

## Entries

- Prefer entering on **confirmation** (a closed candle breaking the trigger
  level, ideally on volume) over anticipating the break — chasing every
  potential setup before it confirms leads to far more false signals.
- **Retest entries** (waiting for a broken level to be retested and hold, per
  `references/trend-and-levels.md`) typically offer a tighter, more favorable
  risk/reward than entering on the initial breakout candle, at the cost of
  sometimes missing the move entirely if it never comes back to retest.
- Scaling in (partial size on initial confirmation, adding on further
  confirmation) is a legitimate way to balance not missing a move against not
  over-committing to an unconfirmed idea.

## Targets and risk/reward

- Derive targets from structure (measured pattern targets, prior swing
  highs/lows, next major resistance/support, fib extensions) rather than a
  round number or an arbitrary percentage.
- **Risk/reward ratio** = (target − entry) / (entry − stop). Many disciplined
  traders won't take a setup below roughly 1.5-2:1 reward-to-risk, since it
  changes the win rate needed to be profitable over time — worth explicitly
  calculating and stating this ratio in a trade plan output, not just the raw
  price levels.
- Consider scaling out at multiple targets (e.g. partial exit at a first level,
  let the rest run with a trailing stop to the next level) rather than an
  all-or-nothing single target, especially on trend-continuation setups.

## Trade planning discipline

- A complete trade plan is written *before* entering: entry trigger,
  invalidation/stop, target(s), position size, and the specific
  condition that would prove the thesis wrong — not decided in the moment
  under the emotion of a live, moving chart.
- State clearly what would change the read (see the Output format in
  SKILL.md's "What would change this read" section) — a trade plan that can't
  be proven wrong isn't a real plan.

## Psychology (worth a brief mention, not a lecture)

- The most common failure mode isn't bad analysis, it's abandoning the plan —
  moving a stop further away after being wrong, oversizing after a loss to
  "make it back," or exiting a winner early out of fear. If the user seems to
  be asking about this pattern in their own behavior rather than a chart, it's
  worth naming directly and gently rather than only talking about price action.
- Overtrading unusual-volume/"hype" names (see `references/volume-analysis.md`)
  is a specific, common trap — the excitement of a fast mover pulls traders into
  oversized, poorly planned entries. The size and stop discipline above matters
  most exactly in the setups that feel most urgent.

## Standard disclaimer to keep in mind

None of this is a guarantee — technical analysis describes probabilities based
on historical pattern behavior, not certainties, and past performance of a
pattern or setup doesn't guarantee this instance plays out the same way. Keep
trade-plan language framed as "if X, then Y is invalidated" rather than
predictions, and don't present any output from this skill as personalized
financial advice.
