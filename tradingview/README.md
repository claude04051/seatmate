# Multi-Timeframe Chart Analyzer & Trade Signal Bot (TradingView Pine Script v5)

A TradingView indicator that reads trend/momentum across three timeframes, filters
for trend strength and volume, scores confluence, and draws a full entry / stop /
multi-target trade plan directly on the chart — then tracks how those signals
actually performed.

## How it analyzes the chart

| Layer | Timeframe | What it checks |
|---|---|---|
| Macro trend | Higher TF (default `D`) | Price vs. EMA(200) → bullish/bearish bias (required for direction) |
| Momentum | Mid TF (default `60`) | Fast EMA vs. slow EMA cross state |
| Trigger | Chart TF | Fast/slow EMA cross, RSI zone, candlestick pattern (engulfing, hammer, shooting star) |

### Precision filters (what makes signals stricter)

- **ADX trend-strength gate** — no signal fires unless ADX ≥ your threshold, so
  setups are skipped in flat/choppy conditions where EMA crosses whipsaw.
- **Volume confirmation** — a signal scores a point only when volume is above its
  average (auto-passes on symbols with no volume data).
- **Mid-timeframe agreement** — optionally require the mid TF to agree, not just
  the macro trend.
- **Confirmed-bar & non-repainting** — triggers only on closed bars, and
  higher-timeframe values are read with `lookahead_off` and a realtime offset so
  levels don't shift after the fact.

Each condition contributes to a **confluence score (0–6)**. A long/short signal
fires only when the EMA cross just happened, the macro bias agrees, ADX confirms
strength, and the score meets your `Minimum Confluence Score`.

## Marks the whole chart automatically

As soon as you add the indicator it runs across all loaded history and marks
**every** setup it finds — each one keeps its own entry line, stop line, three
take-profit lines and risk/reward zones, frozen between the entry bar and the bar
where it hit TP or SL. Scroll back and you'll see the full trade history painted
on the chart, not just the latest signal.

- `Mark EVERY historical setup` (default on) — turn off to show only the most
  recent setup.
- `Show detailed Entry/SL/TP label` (default on) — turn off to reduce clutter when
  many setups are on screen (lines, zones and TP/SL markers still show).
- TradingView caps drawings at 500 each, so the most recent ~100 setups stay
  visible; older ones drop off automatically as you load more history.

## The trade plan drawn on each setup

On every signal:
- A triangle marker and a solid **entry** line.
- A dashed **stop-loss** line (ATR-based, optionally anchored to the nearest
  confirmed pivot swing — whichever is wider/safer).
- Three **take-profit** lines at configurable R multiples (default TP1 = 1R,
  TP2 = 2R, TP3 = 3R).
- Red **risk zone** and green **reward zone** boxes.
- A label listing exact Entry / SL / TP1 / TP2 / TP3, the confluence score, and ADX.

### Active trade management

- When **TP1** is hit → stop auto-moves to **breakeven** (risk removed).
- When **TP2** is hit → stop trails to TP1, then optionally ATR-trails the rest.
- The setup closes at **TP3**, at the (possibly moved) **stop**, or on **expiry**,
  stamping a `TP3` / `SL` / `EXIT+` / `EXPIRED` label with the realized R multiple.

### Performance panel

The top-right panel shows live bias for each timeframe, RSI, ADX, both scores, the
active trade's levels — and **historical win-rate, W/L count, average R, and total
R** for every signal the script produced on that chart. This lets you judge the
signal's real edge on your instrument before trusting it live.

## Installing on TradingView

1. Open any chart → **Pine Editor** tab (bottom panel).
2. **Open → New blank indicator**, delete the placeholder, paste
   `chart-analyzer-bot.pine`, click **Add to Chart**.
3. Tune inputs via the gear icon.
4. **Alerts** — two options:
   - *Rich alerts:* create an alert on the indicator and choose **"Any alert()
     function call"** — messages include live Entry/SL/TP1/TP2/TP3.
   - *Classic:* pick the `Long Entry Signal` / `Short Entry Signal` conditions.

## Tuning for precision vs. frequency

- `Minimum Confluence Score` 6 = only fully-aligned setups (fewest, highest
  quality); lower to 3–4 for more signals.
- `Minimum ADX` — raise (25–30) to trade only strong trends.
- `Reward` R-multiples — widen TP3 in trending markets, tighten in ranges.
- Match the timeframe stack to your chart: e.g. on a 15m chart use `240` mid /
  `D` macro.

## Notes / limitations

- Tracks one setup at a time (flat → long/short → flat); it does not stack trades.
- This is an **indicator** (visual plan + alerts + on-chart stats), not a
  `strategy()` — it doesn't place real orders. The same logic can be ported to a
  strategy for the Strategy Tester's full backtest/P&L report — ask if you want it.
- On-chart win-rate is based on the levels as drawn (intrabar high/low touches);
  real fills, slippage, and spread will differ.
- Not financial advice; validate on your instrument/timeframe before trading live.
