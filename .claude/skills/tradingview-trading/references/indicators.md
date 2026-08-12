# Indicators Reference

Indicators are derived from price/volume — they lag or smooth the raw data, they
don't add new information the chart doesn't already contain. Use them to confirm a
price-action read, spot divergence, or quantify something (volatility, momentum)
that's hard to eyeball. Don't stack five indicators that all just restate "price went
up recently."

## Trend / Moving Averages

- **SMA (Simple Moving Average)**: unweighted average of the last N closes.
  Smoother, slower to react.
- **EMA (Exponential Moving Average)**: weights recent price more heavily —
  reacts faster than SMA. Most traders default to EMA for shorter periods.
- **Common periods**: 9/20 (short-term momentum), 50 (intermediate trend), 200
  (long-term trend/institutional reference). Price above a rising 200 SMA is
  the textbook definition of a long-term uptrend, and vice versa.
- **Golden Cross / Death Cross**: 50-period MA crossing above (golden) or below
  (death) the 200-period MA. A well-known long-term trend-change signal — but
  it's a *lagging* signal by design (needs the trend to already have moved
  significantly to trigger), so treat it as trend confirmation, not an entry
  timing tool.
- **Dynamic support/resistance**: in a trend, price often respects a specific
  MA on pullbacks (e.g. a strong uptrend "riding" the 20 EMA). Which MA it's
  respecting is chart-specific — check what's actually been holding on that
  ticker's chart rather than assuming.
- **VWAP (Volume Weighted Average Price)**: average price weighted by volume,
  typically reset daily. Heavily used intraday, especially by institutional
  and algorithmic traders as a "fair value" reference for the session — price
  above VWAP is intraday-bullish bias, below is bearish bias. Also see
  Anchored VWAP (anchored to a specific event/swing point rather than session
  start) for swing analysis.

## Momentum

- **RSI (Relative Strength Index)**, default 14-period, 0-100 scale:
  - >70 = overbought, <30 = oversold — but in a strong trend RSI can stay
    pinned above 70 (or below 30) for extended periods. Treat "overbought" as
    "momentum is strong," not "must reverse now," especially in trending
    markets.
  - **Divergence** is the higher-value signal: price makes a new high but RSI
    makes a *lower* high (bearish divergence) — momentum is fading even as
    price grinds higher, an early warning of exhaustion. The reverse (price
    lower low, RSI higher low) is bullish divergence. Divergence is a warning
    to watch for confirmation, not a standalone sell/buy trigger.
- **MACD (Moving Average Convergence Divergence)**: MACD line (12 EMA - 26
  EMA), signal line (9 EMA of MACD line), and histogram (the difference).
  - **Crossover**: MACD crossing above signal = bullish momentum shift, below
    = bearish. More reliable on higher timeframes; noisy intraday.
  - **Zero-line cross**: MACD crossing above/below zero indicates a
    shorter-term trend change (12 EMA crossing the 26 EMA outright).
  - **Divergence**: same concept as RSI divergence — price/MACD disagreeing
    on direction is an early exhaustion signal.
- **Stochastic Oscillator**: similar overbought/oversold framework to RSI
  (0-100, typically 80/20 thresholds) but measures close relative to the
  recent high-low range rather than average gain/loss. Reacts faster and
  whipsaws more than RSI — better suited to range-bound/choppy conditions
  than strongly trending ones.

## Volatility

- **Bollinger Bands**: a moving average (typically 20 SMA) plus/minus 2
  standard deviations. 
  - Bands widen with rising volatility, contract with falling volatility.
  - **Squeeze**: bands pinching tight signals a period of low volatility that
    frequently precedes a sharp directional move (volatility tends to mean-
    revert) — a squeeze alone doesn't say which direction, pair it with
    trend/pattern context.
  - Price touching the upper/lower band is *not* automatically
    overbought/oversold — in a strong trend price can "walk the band" for an
    extended stretch.
- **ATR (Average True Range)**: average size of price movement over N periods
  (typically 14), in price units, not a directional signal. The standard tool
  for setting a volatility-aware stop-loss distance (e.g. 1.5-2x ATR below
  entry) instead of an arbitrary round-number stop — see
  `references/risk-management.md`.

## Trend strength & direction

- **ADX / DMI (Average Directional Index / Directional Movement Index)**: three
  lines — +DI, -DI, and ADX. **ADX is non-directional** — it only measures trend
  *strength* (0-100), never direction; direction comes from whichever of +DI/-DI is
  on top. Thresholds: below 20 = no trend/ranging (favor mean-reversion tools like
  RSI/Stochastic/Bollinger fades); 20-25 = ambiguous; above 25 = trending market
  (favor trend-following tools — MAs, MACD, Supertrend); above 40 = strong trend.
  Rising ADX = trend strengthening regardless of direction; falling ADX = weakening
  even if price is still moving. Use ADX as a **regime filter** to decide which
  *other* indicators are even worth trusting on this chart right now, rather than
  as a standalone signal.
- **Parabolic SAR**: plots dots below price (uptrend) or above (downtrend) as a
  trailing stop that accelerates toward price as a trend matures (wide early in a
  trend, tighter later). When price crosses the dots, the system flips sides. Works
  well as a trailing-stop reference in trending markets; whipsaws badly in
  sideways/choppy conditions — pair with ADX > 25 before trusting its flips.
- **Supertrend**: an ATR-based trend-following overlay (default ATR length 10,
  multiplier 3) that trails in the trend's direction and flips (changing color)
  only when price closes through it. Functions as both a trend filter and a
  trailing stop simultaneously — popular specifically because it's a built-in
  TradingView study. Same caveat as Parabolic SAR: pair with an ADX filter to avoid
  trading its flips during low-trend chop.

## Intraday reference levels: Pivot Points

Computed from the prior session's high/low/close to project support/resistance for
the *current* session — a day-trading staple, distinct from the swing-oriented
support/resistance in `references/trend-and-levels.md`.

- **Standard/Classic**: PP = (H+L+C)/3, with R1/S1/R2/S2/R3/S3 derived from that
  pivot. The day-trading default.
- **Woodie's**: weights the close more heavily (PP = (H+L+2C)/4), reacting fastest
  to the latest price action.
- **Fibonacci Pivots**: same base PP, but the surrounding levels sit at 38.2%/
  61.8%/100% of the prior day's range from the PP — suits trend/swing traders more
  than pure scalpers.
- **Camarilla**: de-emphasizes the central pivot; computes 8 levels directly off
  the close with tighter spacing near price. The H3/L3 levels are typically treated
  as mean-reversion/fade zones (with a stop beyond H4/L4), while a close beyond
  H4/L4 signals breakout/trend continuation rather than reversal. Best suited to
  30m-1H charts.

## Trend/Momentum combo systems

- **Ichimoku Cloud** ("one glance"): five components computed from rolling
  highs/lows, not moving averages of price.
  - **Tenkan-sen** (Conversion Line) = (9-period high + 9-period low) / 2 — fast,
    reacts quickly.
  - **Kijun-sen** (Base Line) = (26-period high + 26-period low) / 2 — acts as
    dynamic support/resistance and a slower trend-confirmation baseline; also
    usable as a trailing-stop reference.
  - **Senkou Span A** = (Tenkan-sen + Kijun-sen) / 2, plotted **26 periods
    forward**. **Senkou Span B** = (52-period high + 52-period low) / 2, also
    plotted 26 periods forward. The shaded zone between them is the **Kumo
    (cloud)** — the only mainstream TA element that projects support/resistance
    *ahead* of price rather than describing the past.
  - **Chikou Span** (Lagging Span) = current close, plotted **26 periods back** —
    used as a confirmation filter: many Ichimoku traders only trust a signal when
    the Chikou Span sits clearly above (bullish) or below (bearish) the price it
    overlaps 26 bars ago, with no candles obstructing it.
  - **Reading it**: price above the cloud = bullish regime, below = bearish,
    inside = transition/no clear trend. **Cloud thickness = conviction** — a thick
    Kumo marks a strong, harder-to-break support/resistance zone; a thin one
    signals higher breakout odds. A **Kumo twist** (Span A crossing Span B inside
    the forward-projected cloud) is a genuinely anticipatory reversal signal,
    visible up to 26 periods before price reaches it.
  - A full bullish setup stacks several of these: price closes above the cloud,
    the cloud itself is green (Span A > Span B), Tenkan-sen crosses above
    Kijun-sen above the cloud, and the Chikou Span confirms clear of price. Only
    bring the full system into a chart read if the user is already using it or
    explicitly asks — it's powerful but visually dense for someone unfamiliar
    with it; a simpler "price above/below cloud + cloud color" read is usually
    enough for a general chart analysis.

## Multi-timeframe analysis (MTFA)

A formal practice, not just "also check the daily." Alexander Elder's **Triple
Screen** system is the classic framework: **Screen 1** (higher timeframe) sets the
dominant trend/bias using a trend tool; **Screen 2** (middle timeframe) uses an
oscillator (RSI/Stochastic) to find pullbacks *against* that trend — e.g. only look
for longs on daily-chart dips when the weekly trend is up; **Screen 3** (lower
timeframe) times the precise entry.

Practical rule of thumb: keep roughly a 4:1 to 6:1 ratio between adjacent
timeframes — e.g. weekly→daily→4H for swing trading, daily→1H→15min for active
trading, 1H→15min→5min for day trading. Wide enough to give real context, not so
wide the frames become unrelated. The core discipline: **the higher timeframe sets
directional bias; the lower timeframe only times entries in that direction** — a
technically clean lower-timeframe setup that fights the higher-timeframe trend
should be skipped or sized down, not treated as an independent signal.

## How to combine indicators without redundancy

Pick indicators from *different* categories rather than several from the same
one — e.g. one trend tool (MA/VWAP) + one momentum tool (RSI/MACD) + volume
is a complete, non-redundant read. Adding a second momentum oscillator on top
of RSI rarely adds new information since they're mathematically similar; it
just adds noise and false confidence from "three indicators agreeing" when
they're really measuring the same thing three ways.
