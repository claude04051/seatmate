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
  strategies. Basics:
  - Every script starts with `//@version=5` (or 6) and a declaration:
    `indicator("My Indicator")` or `strategy("My Strategy")`.
  - `close`, `open`, `high`, `low`, `volume` are built-in series referring to the
    current chart's OHLCV.
  - `ta.sma(close, 20)`, `ta.rsi(close, 14)`, `ta.crossover(a, b)` etc. are built-in
    functions for common TA calculations — prefer these over hand-rolling the math.
  - `plot()` draws a line on the chart; `plotshape()`/`plotchar()` mark conditions
    (e.g. a buy signal) with a shape.
  - A `strategy()` script additionally uses `strategy.entry()` / `strategy.close()`
    to define backtestable trade logic, and shows results in the **Strategy Tester**
    tab (win rate, profit factor, drawdown, etc.).
  - Keep scripts the user asks for simple and readable; comment the logic, and be
    explicit that backtest performance on past data does not guarantee future results
    (overfitting to historical price action is a real risk with custom strategies).

## Watchlists & alerts

- **Watchlists** (right sidebar): organize tickers into lists (e.g. "Momentum
  watch," "Core holdings"). Can sort by columns like % change, volume, RSI.
- **Alerts** (clock icon or right-click a level): trigger on price crossing a level,
  an indicator condition, or a drawn line being touched. Useful for "volume hype"
  workflows — e.g. an alert on volume crossing X% above its moving average, or price
  crossing a breakout level, so the user doesn't have to watch the screen constantly.
- Alerts can notify via app push, email, SMS (paid plans), or webhook (for
  connecting to bots/automation) — mention webhook only if the user is clearly
  building automation.

## Screener

- **Stock Screener** (bottom panel or dedicated tab): filter the entire market by
  fundamentals (market cap, P/E) and technicals (RSI, volume vs average, % change,
  price relative to moving averages, etc.).
- This is the tool for "find me stocks doing X right now" requests — e.g. filtering
  for `Volume > Average Volume * 3` and `% change > 5%` is the standard way to
  surface unusual-volume/momentum names. See `references/volume-analysis.md` for
  what to actually look for once a screener surfaces candidates.
- Crypto and Forex have their own dedicated screeners with the same mechanics.

## Layouts & multi-chart

- Multiple chart layouts (2x2, etc.) let a user watch several timeframes or symbols
  at once — e.g. Daily for trend + 15m for entry timing on the same name.
- Layouts and drawings can be saved and synced across devices on a paid plan.
