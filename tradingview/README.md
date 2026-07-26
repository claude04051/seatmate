# TradingView Chart Analyzer — two versions

| File | Use it if you want |
|---|---|
| **`simple-entry-sl-tp.pine`** ← **start here** | Just three lines on the chart: **entry, stop loss, take profit**. Nothing else. |
| `chart-analyzer-bot.pine` | The full version: multi-timeframe scoring, historical setups, performance dashboard. |

---

# 1. Simple Entry / SL / TP  (`simple-entry-sl-tp.pine`)

Reads whatever timeframe the chart is showing — daily, weekly, monthly, intraday —
works out the trend from that same timeframe, and projects **one current setup**.

**What the analysis actually does** (all of it happens under the hood — none of it
is drawn):

1. **Regime detection.** ADX measures whether the market is genuinely trending or
   just chopping. Trending and choppy markets get completely different setups.
2. **Higher-timeframe context.** The script derives a higher timeframe from the one
   you're on automatically (daily → weekly, weekly → monthly, monthly → yearly,
   intraday → 4H/daily) and checks whether it agrees with the chart's trend.
3. **Mode selection.** If the move has strength *and* the higher timeframe agrees,
   it plays the trend — buying pullbacks / selling bounces. If strength is missing
   or the higher timeframe disagrees, it treats the move as a range or
   counter-trend bounce and fades the extremes instead.
4. **Structure mapping.** It tracks the last confirmed swing high and swing low and
   measures the live impulse leg between them.
5. **Confluence entry.** It builds a list of candidate levels — the 38.2%, 50% and
   61.8% Fibonacci retracements of that leg, the fast EMA, and the swing anchoring
   the leg — keeps only those price still has to travel to reach, then picks the
   level with the most agreement clustered around it (ties go to the one nearest
   price). In range mode it uses the range edges instead.
6. **Stop placement.** Beyond the structure that would invalidate the idea, plus an
   ATR buffer, and never closer than a minimum ATR distance so normal noise can't
   stop you out.
7. **Target projection.** A Fibonacci extension of the measured leg (or the opposite
   range edge), floored at your minimum reward:risk so a setup is never shown with
   a worse payoff than you accept.

**What it draws — and this is all it draws:**

- **Blue line — LONG ENTRY / SHORT ENTRY** at a price that is *still ahead of the
  market*, so you can actually get filled. In an uptrend it sits **below** price
  (buy the pullback to support); in a downtrend it sits **above** price (sell the
  bounce into resistance). The label says LONG or SHORT, which tells you the
  direction it expects the stock to move.
- **Red dashed line — STOP LOSS**, placed beyond the last swing plus an ATR buffer.
- **Green dashed line — TAKE PROFIT**, at your chosen R multiple (default 2× the risk).

Each line carries a label with the exact price, and all three project forward to
the right so you can see the expected move.

The levels **recalculate on every new bar**, so what you see is always the latest,
most relevant setup for the timeframe on screen. Switch the chart from daily to
weekly to monthly and the levels re-derive from that timeframe.

**Settings worth touching:** `Minimum Reward:Risk` (never show a setup paying less
than this), `Target Extension (Fib)` for how far the projection runs, `Stop Buffer
(ATR)` and `Minimum Stop Distance (ATR)` for how much room the stop gets,
`Structure Lookback` for how major the swings must be (higher = bigger structure),
`Treat as trending above ADX` for how strict the trend/range split is, and
`Use higher-timeframe context` to turn the confirmation layer off.

There is also an optional alert ("Price reached entry") — it draws nothing on the
chart; create it via the ⏰ icon if you want to be told when price arrives.

---

# 2. Full version  (`chart-analyzer-bot.pine`)

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
  setups are skipped in flat/choppy conditions where EMA crosses whipsaw. The
  DMI direction must also agree (DI+ dominant for longs, DI− for shorts).
- **Direction filter** — trade Both, Long Only, or Short Only.
- **Volume confirmation** — a signal scores a point only when volume is above its
  average (auto-passes on symbols with no volume data).
- **Mid-timeframe agreement** — optionally require the mid TF to agree, not just
  the macro trend.
- **Confirmed-bar & non-repainting** — triggers only on closed bars, and
  higher-timeframe values are read with `lookahead_off` and a realtime offset so
  levels don't shift after the fact. Trade management (TP/SL hits, breakeven,
  trailing) is also evaluated only on confirmed bars *after* the entry bar, so a
  setup can never be instantly stopped/filled by price action that occurred
  before entry, and the stats don't flicker on the live bar.

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

### Analysis panel

The top-right panel shows live bias for each timeframe, RSI, ADX, both confluence
scores, and the active trade's levels — the current state of the market.

### Performance dashboard

A separate dashboard (position configurable — bottom-right by default) reports the
real, historical edge of the signals on that chart:

| Metric | Meaning |
|---|---|
| Win Rate | % of resolved setups that closed positive |
| Wins / Losses | count, plus breakeven (BE) exits |
| Profit Factor | gross winning R ÷ gross losing R (>1 = profitable) |
| Expectancy | average R gained per trade |
| Net Result | total R banked across all setups |
| Avg Win / Loss | average R of winners vs. losers |
| Best / Worst | largest single win and loss in R |
| Long W/L | long-only record and win % |
| Short W/L | short-only record and win % |
| Max Win/Loss Streak | longest consecutive runs |
| Current Streak | active streak |

This lets you judge the strategy's real edge on your instrument and timeframe
before trusting it live.

## How to read "when to enter / when to exit"

The script tells you in three places:

1. **On the chart** — a green ▲ triangle + a **"BUY / ENTER LONG"** label (or red ▼
   **"SELL / ENTER SHORT"**) appears at the entry bar, with the exact Entry, Stop and
   TP1/TP2/TP3 prices. When the trade finishes, an **"EXIT — TP HIT"** or
   **"EXIT — STOP HIT"** label is stamped at the close.
2. **The ACTION row** at the top of the analysis panel always says what to do *right
   now*: `BUY / ENTER LONG NOW`, `SELL / ENTER SHORT NOW`, `IN LONG — hold, stop …`,
   `EXIT NOW (…)`, or `WAIT — no valid setup`.
3. **Alerts** (if you set them up) — you get a message on entry (with all levels),
   when **TP1** is hit (move stop to breakeven), and on **exit** ("Close the
   position now").

**Not seeing any signals?** The filters are strict by design. If the dashboard shows
0 trades, loosen them in Settings: lower **Minimum Confluence Score** (try 3),
lower **Minimum ADX** (try 15), or turn off **Require Candlestick Confirmation**.

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
