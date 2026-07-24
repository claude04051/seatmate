# Multi-Timeframe Chart Analyzer & Trade Signal Bot (TradingView Pine Script v5)

A TradingView indicator that reads trend/momentum across three timeframes, scores
confluence, and draws a live entry / stop-loss / take-profit setup directly on the
chart whenever conditions align.

## How it analyzes the chart

| Layer | Timeframe | What it checks |
|---|---|---|
| Macro trend | Higher TF (default `D`) | Price vs. EMA(200) → bullish/bearish bias |
| Momentum | Mid TF (default `60`) | Fast EMA vs. slow EMA cross state |
| Trigger | Chart TF | Fast/slow EMA cross, RSI zone, candlestick pattern (engulfing, hammer, shooting star) |

Each condition contributes to a **confluence score (0–5)**. A long/short signal only
fires when:
- The chart-timeframe EMA cross just happened (`ta.crossover`/`crossunder`),
- The higher-timeframe bias agrees with the trade direction,
- The score meets your `Minimum Confluence Score` input,
- The bar is confirmed (no repainting mid-bar).

## What gets drawn on the chart

On every signal:
- A triangle marker at the trigger bar.
- Three dashed lines: **entry** (blue), **stop loss** (red), **take profit** (green).
- Two shaded zones: red = risk (entry→SL), green = reward (entry→TP).
- A label with exact Entry / SL / TP prices and the confluence score.
- Lines/zones keep extending right until price hits SL, hits TP, or the setup
  expires (`Invalidate After N Bars`), at which point a `TP HIT` / `SL HIT` /
  `EXPIRED` label is stamped.
- An always-visible panel (top right) showing HTF/mid/chart bias, RSI, both
  scores, and the active trade's levels.

Stop loss = ATR-based buffer, optionally widened to the recent swing high/low.
Take profit = entry ± (risk distance × Reward:Risk ratio input).

## Installing on TradingView

1. Open any chart on [tradingview.com](https://www.tradingview.com) → **Pine Editor** tab (bottom panel).
2. Click **Open** → **New blank indicator**, delete the placeholder code.
3. Paste the full contents of `chart-analyzer-bot.pine`.
4. Click **Add to Chart**. Adjust inputs via the gear icon.
5. To get pinged instead of watching the chart: click **Alert (clock icon)** →
   Condition = this indicator → choose `Long Entry Signal` or `Short Entry Signal` →
   set notification method (popup, app push, webhook, email).

## Tuning

- `Minimum Confluence Score`: raise to 5 for only the highest-conviction, fully
  aligned setups; lower to 2–3 for more frequent but weaker signals.
- `Reward:Risk Ratio`: default 2.0 (TP is twice as far as SL). Raise for trend
  markets, lower for choppy/ranging ones.
- `Require Candlestick Confirmation`: turn off if you want pure EMA/RSI/HTF
  logic without waiting for a pattern bar.
- Timeframe pair (`htf1`/`htf2`) should scale with your chart TF — e.g. on a
  15m chart, a sensible stack is `240` (mid) / `D` (macro).

## Notes / limitations

- Only one setup is tracked at a time (flat → long/short → flat). It won't
  stack multiple simultaneous trades.
- This is an **indicator**, not a strategy — it does not place real orders or
  backtest P&L. To backtest, the same logic can be ported into a
  `strategy()` script using `strategy.entry` / `strategy.exit` calls in place
  of the drawing logic — ask if you want that version too.
- Not financial advice; validate on historical data for your instrument/timeframe
  before trusting live signals, and always confirm HTF data is available for
  the symbol (very low-liquidity/exotic symbols may lack higher-timeframe history).
