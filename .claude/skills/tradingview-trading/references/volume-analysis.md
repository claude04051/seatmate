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

## Volume Spread Analysis (VSA)

A more granular methodology (Tom Williams, building on Wyckoff) that reads each bar
as a three-way relationship between **volume (effort), spread/range (result), and
where the close falls within that range**. It's discretionary and has no peer-
reviewed validation, but it's a real, widely-taught system with specific named
setups worth recognizing rather than folklore:

- **Effort vs. Result is the core law.** They should agree — high volume producing a
  wide-range bar with real progress is a healthy move. When they diverge, something
  is fighting the obvious direction: high volume + narrow spread/little progress =
  **absorption** (aggressive orders being soaked up by an opposing side), a warning
  the move may stall or reverse.
- **No Demand**: narrow-spread up bar on low volume during an uptrend — buyers
  aren't showing up, the rally may be stalling.
- **No Supply**: narrow-spread down bar on low volume during a downtrend — sellers
  have dried up, often precedes a bounce.
- **Stopping Volume**: a down bar with very high volume and a wide spread that
  closes in the upper half (well off the lows) — heavy selling hit the tape but was
  absorbed; smart-money demand may be entering.
- **Climactic action (Selling/Buying Climax)**: after a sustained trend, an
  extreme-volume, wide-spread bar (the highest volume in weeks) that reverses on the
  next bar — the final panic wave being absorbed, often marking exhaustion.
- **Upthrust**: price spikes above a prior high intrabar on rising volume, then
  closes back below it — a stop-hunt/trap signaling weakness, not strength (the
  VSA/Wyckoff analog of a failed breakout).
- **Shakeout**: the bullish mirror — a sharp spike below support on high volume that
  closes back up, shaking out weak longs while supply gets absorbed; a sign of
  strength.
- **Test bar**: a lower-volume bar probing a prior low/support after selling has
  already dried up — a "clean" low-volume test confirms supply is gone.

These setups are rarely standalone signals — practitioners stack a sequence (e.g.
Selling Climax → Test → No Supply) to time a low-risk entry, mirroring the Wyckoff
accumulation phases in `references/chart-patterns.md`.

## Order flow, footprint charts & tape reading

A finer-grained lens than bar-level volume: **footprint charts** split each candle's
volume by price level into buy-initiated (hit the ask) vs. sell-initiated (hit the
bid) volume instead of just a single OHLC bar.

- **Delta** = ask volume − bid volume at a price/bar; positive = buyers aggressing,
  negative = sellers aggressing. **Delta divergence** — price makes a new high while
  delta makes a lower high — warns a move is losing fuel, the order-flow analog of
  RSI/MACD divergence.
- **Imbalance**: a price level where one side heavily out-traded the diagonally
  opposite level (commonly a 300%/3:1 threshold). **Stacked imbalances** (several
  consecutive same-side imbalances) mark zones that tend to act as support/resistance
  on retest.
- **Absorption**: heavy aggressive volume hits a price but price doesn't move —
  passive resting orders (often institutional/iceberg) are absorbing it. This is the
  order-flow-chart version of VSA's "high volume, narrow spread."
- **Iceberg orders**: large orders showing only a small visible "tip," refilling as
  filled, used to hide true size and avoid moving the market — a common cause of
  absorption at a level.
- **Platform note**: TradingView added native footprint charts (volume-at-price,
  delta, POC, Value Area) on its Premium+ tiers, and exposed the underlying data to
  Pine Script via `request.footprint()` for building custom order-flow indicators
  and alerts (see `references/platform-guide.md`). It still lacks a true real-time
  Level 2/DOM order-book view — dedicated platforms like Bookmap, Sierra Chart, and
  ATAS are the specialized tools for that if the user asks about true order-book
  reading, not TradingView itself.

## Dark pool prints & unusual options activity

Separate data feeds from on-exchange volume bars, but widely watched alongside
"volume hype" screening as leading/confirming signals of institutional positioning —
worth mentioning to a user chasing unusual-volume names even though TradingView's own
volume bars don't include this data directly.

- **Dark pools**: private venues where institutions execute large blocks off-exchange
  to avoid moving the market before the trade is filled and publicly reported (with a
  delay). Third-party trackers surface large block prints and whether they printed
  near the bid or ask, as a rough proxy for institutional buy/sell intent.
- **Unusual options activity (UOA)**: a contract's volume or open interest spiking
  well above its norm, especially when volume exceeds open interest (signaling new
  positioning, not closing an existing one) and/or volume runs several multiples
  above average. **Sweep orders** — routed aggressively across exchanges to fill
  immediately, often paying through the ask — read as higher-conviction than a
  passive block trade.
- Treat specific numeric "accuracy" claims for combining dark-pool and options-flow
  data (these circulate a lot in trading-education marketing) with real skepticism
  unless the user provides a credible source — much of this space is vendor
  marketing rather than independently validated research.

## Float rotation & short interest (amplifiers of a volume spike)

Context that explains *why* the same dollar volume produces a much bigger price
swing on some names than others — especially relevant for the low-float "volume
hype" names this skill flags as higher-risk.

- **Float rotation** = today's volume ÷ float (e.g. 20M volume ÷ 5M float = 4x
  rotation). Low float means less supply to absorb demand, so a given amount of
  buying moves price much further. Rule-of-thumb practitioner tiers (not rigorously
  validated — treat as a risk flag, not a timing signal): 1-2x rotation = building
  momentum; 2-3x = extreme activity, watch for exhaustion; 4-5x+ often marks
  *climactic* buying rather than a fresh start — names that rotate float multiple
  times in one session frequently reverse hard once early momentum fades.
- **Days to Cover (DTC)** = short interest ÷ average daily volume — how many days
  shorts would need to fully cover at normal volume. Traders start watching above
  ~5-6 days; double-digit DTC on a small cap is classic short-squeeze fuel, since a
  sudden volume/price spike compresses the *effective* cover time and can force
  shorts to buy simultaneously — the feedback loop behind historical squeezes.

## What the evidence actually says about volume spikes

Practitioner RVOL/float-rotation thresholds above are heuristics, not proven rules —
be honest about that distinction with the user. The academic literature is more
cautious and more interesting:
- Abnormal volume is a real, documented predictor of returns, but studies find a
  pattern of short-run continuation followed by long-run reversal as the volume
  spike mean-reverts.
- **Who is trading matters more than how much.** Research (e.g. Ülkü, *Journal of
  Forecasting*, 2019) finds high *institutional* buying volume with a rising price is
  less likely to reverse (informed flow), while high volume from *retail/attention-
  driven* buying on a rising price is *more* likely to reverse — the opposite
  intuition from "big volume always confirms the move."
- A recent systematic test of intraday OHLCV-only signals found both "volume spike →
  continuation" and "volume dry-up → reversal" failed as standalone rules once tested
  rigorously. **The takeaway for this skill**: raw volume-spike size alone is weak
  and context-dependent — combine it with price structure, an identifiable catalyst,
  and (where available) order-flow/absorption evidence rather than treating a big
  volume bar as a signal by itself.

## Quick synthesis checklist

When asked "is this volume meaningful," walk through:
1. Is it elevated vs. this stock's own recent average (not just "big number")?
2. Is there a level/pattern trigger nearby that this volume is confirming?
3. Is price confirming volume's direction, or diverging from it (VSA effort-vs-
   result, OBV/A-D divergence)?
4. Is there an identifiable catalyst — and does the float/short-interest picture
   explain why this move is unusually large?
5. Is the move already extended (exhaustion/climax risk) or just starting
   (confirmation of a fresh move)?
