# Volume Analysis (incl. "Volume Hype" / Unusual Volume)

Volume is the single most under-read piece of a chart and the best confirmation/
rejection tool available. Price tells you *what* happened; volume tells you *how
much conviction* was behind it. This file covers both the fundamentals and the
specific "volume hype" workflow — spotting stocks lighting up on unusual volume,
which is where a lot of momentum/breakout trading actually happens.

## Core principles

- **Volume should confirm price.** A breakout, breakdown, or trend move on rising
  volume is far more trustworthy than the same move on flat/declining volume — it
  means real participation is behind it, not just a thin order book drifting.
- **Volume divergence is a warning.** Price making new highs on *declining* volume
  (each push up attracts less participation than the last) is a classic distribution
  warning — the move is running out of real buyers even as price grinds higher. Same
  logic in reverse for downtrends losing selling pressure.
- **Climactic volume can mark exhaustion, not continuation.** A massive volume spike
  after an extended trend (a "blow-off top" or "capitulation bottom") often marks the
  *end* of the move, not acceleration — everyone who wanted in (or out) just did, and
  there's no fuel left. Context (how extended is the move already?) determines
  whether a volume spike means "breakout, get in" or "exhaustion, get cautious."
- **Volume at a level matters more than volume in open air.** High volume breaking a
  well-tested resistance level is meaningfully different from high volume in the
  middle of a range with no nearby level — the former shows real supply being
  absorbed, the latter can just be noise (news, index rebalancing, options
  expiry).

## Reading volume bars directly

- Compare each bar to its recent average (TradingView's volume pane can show a
  moving average of volume, typically 20-period — turn it on when precision matters).
- **Relative Volume (RVOL)**: current volume vs. the average volume *at this point
  in the session* for that time of day — the standard measure for "is this stock
  unusually active right now" intraday, since volume naturally clusters at the
  open/close. RVOL of 2x+ intraday is a common threshold for "worth paying
  attention to"; 5x+ is often what triggers momentum/day-trader interest broadly.
- A single oversized volume bar on an otherwise quiet chart (earnings, news,
  a halt-and-reopen) should be treated as an event marker, not a pattern — check
  what actually happened before reading it as a technical signal.

## "Volume Hype" — spotting unusual-volume momentum names

This is the workflow for "what's exploding today" / screener-driven momentum
trading, common with low-priced and low-float stocks:

1. **Screen for it** (see `references/platform-guide.md` for the Screener tool):
   filter for volume well above its average (e.g. `Volume > 3x average volume`)
   combined with meaningful price change (e.g. `|% change| > 5-10%`). Low-float
   and low-price names move disproportionately on the same dollar volume because
   there are fewer shares to absorb the buying/selling — that's *why* penny
   stocks are prone to explosive, fast moves in both directions.
2. **Find the catalyst.** Unusual volume without a clear reason (news, an
   earnings beat/miss, a filing, a sector-wide move, a mention going viral) is a
   bigger red flag than a green light — it can mean promotion/pump activity
   rather than a fundamentally driven move. Always try to identify *why* volume
   is elevated before treating it as tradeable signal.
3. **Read the volume shape, not just the total.** Is volume building steadily
   (accumulation, more sustainable) or did it spike in one or two huge bars and
   is already fading (often the sign of an unsustainable spike/pump that reverses
   just as fast)?
4. **Respect that this is the highest-risk category of setup.** Wide bid/ask
   spreads, low liquidity (hard to exit at your intended price), and genuine
   pump-and-dump schemes are all more common in low-float/high-volume-spike
   names. Flag this explicitly rather than treating a volume spike alone as a
   buy signal — it's a *reason to look closer*, not a signal to buy.
5. **If a trade plan does follow**, it needs tighter, faster risk management than
   a normal swing trade: smaller position size, a tight invalidation level (these
   names can round-trip a huge move in minutes), and explicit acknowledgment that
   slippage on entry/exit will be worse than in a liquid large-cap. See
   `references/risk-management.md`.

## Volume-based indicators

- **On-Balance Volume (OBV)**: running total that adds a day's volume when price
  closes up, subtracts it when price closes down. The *level* of OBV isn't
  meaningful — the *trend* and *divergence from price* are. OBV trending up while
  price chops sideways or drifts down suggests quiet accumulation; OBV trending
  down while price makes new highs suggests distribution into strength (same
  divergence logic as RSI/MACD, applied to volume instead of momentum).
- **Volume Profile** (Fixed Range or Session): shows volume traded *at each price
  level* over a chosen range, rather than over time. Produces a horizontal
  histogram alongside the chart.
  - **Point of Control (POC)**: the single price level with the most volume
    traded — often acts as a magnet/pivot price.
  - **Value Area (typically 70% of volume)**: the price range containing the
    bulk of trading — price tends to gravitate back inside the value area, and
    a clean break out of it (especially the POC-adjacent zone) with volume is a
    meaningful signal.
  - High-volume nodes tend to act as support/resistance (lots of participants
    have a position/reference price there); low-volume nodes ("volume gaps")
    tend to see price move through quickly since few participants are anchored
    there.
- **Accumulation/Distribution Line**: similar spirit to OBV but weights each
  bar's volume by where the close fell within that bar's range (close near the
  high = more accumulation credit, close near the low = more distribution
  credit), rather than a simple up/down day. Same divergence-based reading as
  OBV.
- **Chaikin Money Flow**: a bounded (-1 to +1) oscillator version of the same
  accumulation/distribution concept over a rolling window (commonly 20 periods)
  — useful for a quick "is money flowing in or out right now" read without
  eyeballing a raw cumulative line.

## Quick synthesis checklist

When asked "is this volume meaningful," walk through:
1. Is it elevated vs. this stock's own recent average (not just "big number")?
2. Is there a level/pattern trigger nearby that this volume is confirming?
3. Is price confirming volume's direction, or diverging from it?
4. Is there an identifiable catalyst?
5. Is the move already extended (exhaustion risk) or just starting
   (confirmation of a fresh move)?
