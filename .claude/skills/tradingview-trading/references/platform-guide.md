# TradingView Platform Guide

Practical reference for using TradingView itself — where things live and how to set them
up. Use this when the user asks how to *do* something on TradingView, not just how to
read a chart.

## Chart basics

- **Symbol search** (top-left magnifying glass / type the ticker): supports stocks,
  crypto pairs, forex, futures, indices. Exchange matters — the same ticker can exist
  on multiple exchanges with different data (e.g. `BINANCE:BTCUSDT` vs `COINBASE:BTCUSD`).
- **Timeframe selector** (top toolbar): from 1-second up to monthly/yearly. Match
  timeframe to trading style:
  - Scalping: 1m–5m
  - Day trading: 5m–15m for entries, 1H for context
  - Swing trading: 1H–4H for entries, Daily for trend
  - Position/investing: Daily–Weekly
- **Chart types**: Candlesticks (default, best for pattern reading), Heikin Ashi
  (smooths noise, good for trend clarity but distorts real OHLC — don't read exact
  wicks off it), Line (best for pure trend/support-resistance without candle noise),
  Renko/Point-and-Figure (filters out time/volume, pure price-move charts).
- **Bar replay**: lets you scrub back in time and step forward bar-by-bar — the best
  way to practice pattern recognition and backtest a discretionary idea without
  hindsight bias.

## Drawing tools (left sidebar)

- **Trend line**: connect two+ swing highs or lows.
- **Horizontal line / horizontal ray**: mark support/resistance levels.
- **Fibonacci retracement**: drag from swing low to swing high (uptrend) or high to
  low (downtrend) to get the 23.6/38.2/50/61.8/78.6% retracement levels.
- **Rectangle**: mark consolidation/range zones.
- **Long/Short position tool**: drag out entry, stop, and target — TradingView
  auto-calculates risk/reward ratio. Genuinely useful for planning trades before
  entering, not just decoration.
- **Pitchfork / Gann tools**: advanced, niche — only reach for these if the user
  specifically asks.
- Keep drawings minimal. A chart with 15 trend lines is not more insightful than
  one with 2 — it's noise. Only draw what changes the read.

## Indicators panel ("Indicators" button, top toolbar)

- Search by name (RSI, MACD, Bollinger Bands, VWAP, etc.) or browse Technicals /
  Financials / Community Scripts.
- Each indicator has a gear icon for settings (periods, source, colors) — default
  settings (e.g. RSI 14, MACD 12/26/9) are standard and usually the right call unless
  the user has a specific reason to change them.
- **Pine Script** is TradingView's scripting language for custom indicators and
  strategies. Current version is **v6** (released late 2024, actively updated since)
  — basics:
  - Every script starts with `//@version=6` and a declaration:
    `indicator("My Indicator")` or `strategy("My Strategy")`.
  - `close`, `open`, `high`, `low`, `volume` are built-in series referring to the
    current chart's OHLCV.
  - `ta.sma(close, 20)`, `ta.rsi(close, 14)`, `ta.crossover(a, b)` etc. are built-in
    functions for common TA calculations — prefer these over hand-rolling the math.
  - `plot()` draws a line on the chart; `plotshape()`/`plotchar()` mark conditions
    (e.g. a buy signal) with a shape.
  - A `strategy()` script additionally uses `strategy.entry()` / `strategy.close()`
    to define backtestable trade logic, and shows results in the **Strategy Tester**
    tab (see below).
  - **v6-specific things worth knowing**: `bool` values can no longer be `na` (must
    be strictly `true`/`false`, no implicit casting); `and`/`or` now short-circuit;
    `request.security()` and other `request.*()` calls now accept *series* (dynamic,
    can change bar-to-bar) symbol/timeframe arguments and can run inside loops and
    exported functions, capped at 40 dynamic request calls per script; `enum` types
    give type-safe dropdown inputs; `log.info()`/`log.warning()`/`log.error()` write
    to a dedicated Pine Logs pane for real debugging instead of plotting hacks;
    `request.footprint()` (Premium/Ultimate only) exposes per-bar bid/ask volume,
    delta, POC, and Value Area data for building order-flow indicators natively.
  - **Repainting**: a script "repaints" when it recalculates past values as new
    data arrives — most commonly from a `request.security()` call reading a
    higher-timeframe value before that HTF bar has closed. Always default to
    `lookahead=barmerge.lookahead_off` and only act on confirmed/closed bars;
    `lookahead_on` guarantees repainting on the realtime bar and invalidates
    backtest accuracy — flag this to a user asking for a custom indicator/strategy.
  - Keep scripts the user asks for simple and readable; comment the logic, and be
    explicit that backtest performance on past data does not guarantee future results
    (overfitting to historical price action is a real risk with custom strategies —
    see Strategy Tester pitfalls below).

## Strategy Tester

For `strategy()` scripts, results appear in a dedicated tab with several sub-tabs
(Overview, Performance Summary, List of Trades, Properties):

- **Profit factor** = gross profit ÷ gross loss. >1 is profitable; >1.5 considered
  solid; 1.8+ strong.
- **Sharpe ratio**: risk-adjusted return; >0.75 is acceptable for a retail strategy,
  2.0+ looks institutional on paper — but a backtest Sharpe of 2.0 commonly
  degrades to roughly 1.0-1.5 once traded live, so treat backtest Sharpe as an
  upper bound, not an expectation.
- **Sortino ratio**: like Sharpe but penalizes only downside volatility.
- **Max drawdown**: largest peak-to-trough equity decline; a conservative strategy
  typically targets under 20%.
- **Realism settings matter**: set `commission_type`/`commission_value` to match a
  real broker and add slippage in ticks — backtests without these overstate results,
  sometimes substantially, especially for high-frequency strategies.
- **Deep Backtesting** (Premium+ plans): tests against a symbol's full available
  history (up to 2,000,000 bars) instead of just what's loaded on the chart —
  triggers automatically when an extended date range is selected. Results show only
  in the Strategy Report tab, not plotted on the chart, and can differ numerically
  from a standard backtest due to the larger dataset.
- **Walk-forward validation** (a methodology to apply manually using Deep
  Backtesting date ranges, not a built-in button): optimize on an in-sample window,
  validate on a later out-of-sample window, then roll forward. A healthy strategy
  typically retains 50-70% of its in-sample performance out-of-sample — expect a
  real drop, and be skeptical of a strategy whose out-of-sample results match its
  in-sample results almost exactly (a sign of overfitting, not robustness).
- **Common pitfalls** to flag when a user shares backtest results: overfitting/
  curve-fitting (every added parameter exponentially raises the odds of a
  coincidental fit to this specific historical data), survivorship bias (testing
  only currently-listed symbols hides delisted/failed ones), and ignoring
  commission/slippage as above.

## Watchlists & alerts

- **Watchlists** (right sidebar): organize tickers into lists (e.g. "Momentum
  watch," "Core holdings"). Can sort by columns like % change, volume, RSI.
- **Alerts** (clock icon or right-click a level): five alert types — price,
  technical/indicator, drawing tool, strategy, and watchlist — and multiple
  conditions can be combined in one alert. Price operators: Crossing, Crossing Up,
  Crossing Down, Greater Than, Less Than. Drawing-tool alerts attach to trendlines/
  horizontal lines/Fib levels and move if the line is later edited.
- **Frequency**: Once, Every time, Once per bar close (the recommended default for
  anything feeding automation, since it filters intrabar noise), Once per minute.
  Alerts can be set to expire on a fixed date or left open-ended.
- Useful for "volume hype" workflows specifically — e.g. an alert on volume
  crossing X% above its moving average, or price crossing a breakout level, so the
  user doesn't have to watch the screen constantly.
- Alerts can notify via app push, email, SMS (paid plans), or **webhook** for
  connecting to bots/automation — only bring webhooks up if the user is clearly
  building automation. Mechanically: the alert's Notifications tab takes a webhook
  URL, and TradingView POSTs a JSON payload to it when the alert fires (a typical
  payload shape is something like
  `{"action":"buy","symbol":"BTCUSDT","qty":"10%","stopLoss":"2%"}`, defined by the
  user in the alert message). Requires an Essential plan or higher plus 2FA enabled
  on the account. The usual pipeline is TradingView alert → webhook → a relay
  service (e.g. TradersPost, PickMyTrade) → broker/exchange API. Recommend testing
  against a sandbox endpoint before pointing a webhook at a live relay, and using
  "Once per bar close" to avoid duplicate fills.

## Screener

TradingView runs several screener types as of 2026: **Stock**, **ETF**, **Bond**,
**Crypto Coins**, **CEX**, **DEX**, and **Pine Screener**. The Stock Screener has
the deepest filter set (fundamentals + technicals); Forex and Crypto screeners
mirror the mechanics with market-appropriate fields (crypto drops most
fundamentals in favor of volume/market-cap/exchange-availability filters, since
crypto trades 24/7 with no earnings reports).

- Filter by fundamentals (market cap, P/E) and technicals (RSI, volume vs. average,
  % change, price relative to moving averages, ATR, etc.).
- **Save filter combinations** ("Screens," via the three-dot menu) to reuse instead
  of rebuilding filters each session — recall from the Screens dropdown any time.
- **Pine Screener** is a separate tool: it scans a user's *watchlist* using a
  custom/community Pine indicator instead of built-in fields, useful once a user
  has a specific custom condition they want to scan for across many tickers.
  Constraints: one plot output per column script, no `strategy`/`alert` calls, max
  5 `request.security()` calls per script.
- **Unusual-volume/momentum screener recipe** (a community-standard combo worth
  suggesting when a user wants to find "what's exploding today," see
  `references/volume-analysis.md` for how to evaluate what a screen surfaces):
  average daily volume above ~1M shares, Relative Volume (RVOL) > 2, minimum price
  floor to avoid the thinnest names, and a meaningful % change threshold. For a
  volatility-contraction/squeeze setup specifically: dollar volume (volume × price)
  above a liquidity floor, plus Bollinger Bands sitting inside Keltner Channels on
  the daily as a precursor to expansion.
- Standard daily workflow: **screen → push results to a watchlist → set alerts on
  that watchlist** rather than re-running the screener manually throughout the day.

## Layouts & multi-chart

- Multiple chart layouts (2x2, etc.) let a user watch several timeframes or symbols
  at once — e.g. Daily for trend + 15m for entry timing on the same name. Chart
  count per layout is plan-gated (roughly 2 on the free/Essential tier scaling up to
  16 on the top Ultimate tier).
- **Linked charts**: match the colored "link" icon across panes so changing the
  symbol on one chart updates all linked panes at once — the standard way to build
  a "Weekly + Daily + 4H + 1H, same symbol" swing-analysis layout without manually
  re-entering the ticker four times.
- Layouts and drawings can be saved (Save-As, with a descriptive name like "swing"
  or "day-trading") and synced across devices on a paid plan, for instant recall.
- **Indicator hygiene**: experienced users cap themselves at roughly 2-4 indicators
  on a chart at once — one volume-based tool, one momentum/trend tool, optionally
  one structural tool (Fib/Volume Profile) — rather than stacking many redundant
  ones (see `references/indicators.md` on avoiding redundant indicators).
- **Bar Replay discipline**: step through bar-by-bar at a real decision-making
  pace rather than skipping quickly, and treat it as practice across different
  market regimes (trending, choppy, volatile) rather than only replaying the one
  setup that already looks good in hindsight.

## Recent platform additions worth knowing about

- **`request.footprint()`** in Pine Script (Premium/Ultimate) — order-flow data
  (bid/ask split, delta, POC/Value Area, imbalances) natively scriptable, letting
  custom strategies backtest order-flow-based logic inside TradingView for the
  first time (previously required a separate specialized platform).
- **AI Chart Copilot**: a side-panel AI assistant for chart-pattern analysis,
  alert-setup help, and news/filing summaries. Worth knowing it explicitly does
  **not** reliably generate working Pine Script code — for AI-authored indicators,
  point users to third-party Pine-focused tools rather than expecting the built-in
  copilot to write a script well.
- **Paper trading** remains free on every plan tier (roughly $100k virtual balance,
  tied per-chart) — worth suggesting to a user who wants to test a new strategy or
  this skill's trade-plan framework without risking real capital first.
- Broker/exchange integrations (native crypto exchanges plus traditional brokers
  like Interactive Brokers/OANDA) exist for paper and live execution, though the
  depth of integration varies by broker — some support full order routing from
  alerts, others (e.g. IBKR) remain more manual/one-click rather than fully
  automated from a Pine strategy.
