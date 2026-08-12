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

## Trend/Momentum combo systems

- **Ichimoku Cloud**: a multi-part system (Tenkan-sen, Kijun-sen, Senkou Span
  A/B forming the "cloud," Chikou Span). Price above the cloud = bullish bias,
  below = bearish, inside = transition/no clear trend. Cloud thickness implies
  support/resistance strength. Powerful but visually dense — only bring this
  up if the user is already using it or explicitly asks, since it can clutter
  a chart read for someone who isn't familiar with it.

## How to combine indicators without redundancy

Pick indicators from *different* categories rather than several from the same
one — e.g. one trend tool (MA/VWAP) + one momentum tool (RSI/MACD) + volume
is a complete, non-redundant read. Adding a second momentum oscillator on top
of RSI rarely adds new information since they're mathematically similar; it
just adds noise and false confidence from "three indicators agreeing" when
they're really measuring the same thing three ways.
