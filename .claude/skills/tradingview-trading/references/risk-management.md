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

## Sizing based on your actual edge: Kelly Criterion

For a user who has enough of a track record to know their real win rate and
average win/loss ratio, the Kelly Criterion gives a mathematically-grounded (not
just rule-of-thumb) position size:

`Kelly % = W − [(1 − W) / R]`

where W = win rate (as a decimal) and R = average win ÷ average loss. Example: 50%
win rate, average win = 2× average loss → Kelly % = 0.5 − (0.5/2) = 25% of capital.

Full Kelly maximizes long-run compounded growth but produces extreme volatility and
is highly sensitive to estimation error — real trading edges are never known with
certainty the way a casino game's odds are, so an overestimated edge blows up a
full-Kelly account fast. In practice, use **fractional Kelly** — half-Kelly (50% of
the calculated size) or quarter-Kelly (25%) — which retains most of the growth rate
while cutting volatility/drawdown risk substantially. This is a refinement on top of
the flat 0.5-2%-per-trade rule above, useful once a user has real statistics to
plug in — for a newer trader without a track record yet, the flat % rule is the
right default.

## Expectancy: the metric that actually matters

Win rate alone is a misleading way to judge a system. **Expectancy** captures
whether a strategy makes money on average per trade:

`Expectancy = (Win% × Avg Win) − (Loss% × Avg Loss)`

Best expressed in **R-multiples** (R = the dollar amount initially risked on a
trade, from Van Tharp): record each trade's result as a multiple of its own risk
(risked $200, made $400 → +2.0R). A 40%-win-rate system with an average 3:1
reward:risk can have far higher expectancy than a 70%-win-rate system with 1:1
payoffs — win rate and expectancy are not the same thing, and a trade plan's
stated risk/reward ratio (above) is what determines which regime a setup falls
into. A professional benchmark is roughly 0.2R-0.8R average expectancy per trade;
consistently negative average R signals a system (or its execution) needs fixing,
regardless of how often it "wins."

## Correlation risk & portfolio heat

Per-trade risk % isn't the whole risk picture once a user holds multiple
positions. **Portfolio heat** = total % of account at risk if every open position
hit its stop simultaneously (sum of per-trade risk %) — a common guideline is
keeping total heat around 5-6% of equity.

The trap: positions with high pairwise correlation (roughly ≥0.7) behave as one
overlapping bet, not independent ones. Three "volume hype" momentum names in the
same sector, each individually risking 1%, can behave like a single 2-3% risk
position in a sector-wide selloff — exactly when diversification is needed most,
correlations tend to spike toward 1.0. When a user is holding several correlated
positions (same sector, same catalyst type, or just "everything green/red
together" days), flag that their real risk is higher than the sum of individual
stop distances suggests, and suggest sizing each position down accordingly.

## Why drawdowns are asymmetric

Percentage losses and the gain required to recover from them are not symmetric,
because recovery is calculated off a smaller base:

`Required gain to recover = 1 / (1 − drawdown%) − 1`

| Drawdown | Gain needed to recover |
|---|---|
| 10% | 11% |
| 20% | 25% |
| 30% | 43% |
| 50% | 100% |
| 70% | 233% |

This convexity is the actual mathematical argument for strict per-trade risk caps
(the 0.5-2% rule above isn't arbitrary): a trader risking 1% per trade needs
roughly 70 consecutive full losses to reach a 50% drawdown, while one risking
10-20% per trade can be functionally wiped out in a handful of bad trades. Worth
surfacing explicitly if a user is considering an oversized position — the math, not
just "be careful," is often what changes minds.

## Trade journaling

Track, at minimum: ticker, direction, entry/exit price, position size, $ P&L, the
**R-multiple result**, and a consistent **setup-type label** (e.g. "VWAP bounce,"
"breakout retest," "gap-and-go") so performance can be sliced by strategy rather
than judged only in aggregate. More advanced practice adds the pre-trade thesis
written *before* entry, the market/volatility regime, whether the trader actually
followed their own plan, and emotional state — psychological "leaks" (FOMO entries,
moved stops, revenge-sizing after a loss) often explain more of a trader's results
than any indicator choice. The single most useful trend to watch over time is
**average R-multiple**: a rising or consistently-positive average R signals a real,
improving edge; a declining average R flags execution drift even when win rate
looks stable.

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
