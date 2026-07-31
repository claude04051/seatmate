# TradingView Chart Analyzer — two versions

| File | Use it if you want |
|---|---|
| **`simple-entry-sl-tp.pine`** ← **start here** | Just three lines on the chart: **entry, stop loss, take profit**. Nothing else. |
| **`simple-entry-sl-tp-strategy.pine`** | The **same logic as a backtest** — run it to see net profit, win rate, profit factor, drawdown and the equity curve in TradingView's Strategy Tester. |
| `chart-analyzer-bot.pine` | The full version: multi-timeframe scoring, historical setups, performance dashboard. |

## Backtesting it (`simple-entry-sl-tp-strategy.pine`)

Same analysis, same levels — but every locked plan is placed as a real order, so
TradingView's Strategy Tester reports whether it actually made money.

1. Pine Editor → paste `simple-entry-sl-tp-strategy.pine` → Save → **Add to chart**.
2. Open the **Strategy Tester** tab at the bottom. You get net profit, **win rate**,
   **profit factor**, **max drawdown**, average trade and the full equity curve.
3. Match its settings to the indicator's (same Plan Timeframe etc.) so the backtest
   describes the setups you're actually being shown.

**How the trades are modelled**

- Each plan becomes a **limit order at the entry**, bracketed by the **stop** and
  the **target** — the same three prices the indicator draws.
- **Position size comes from risk**, not a fixed share count:
  `qty = (equity × Risk %) ÷ (entry − stop)`, so every trade risks the same
  percentage of the account. Default 1%.
- Exit levels are **snapshotted at fill**, so a later re-plan can never move the
  stop on a trade that's already running.
- Defaults include **0.05% commission and 2 ticks of slippage** — results with
  zero costs are fiction, so they're on from the start.

**Backtest-specific settings**

| Setting | What it does |
|---|---|
| Risk per trade (%) | Position sizing; 1% is the usual starting point |
| Give up if entry not filled within N bars | Cancels stale resting orders (0 = never) |
| Close an open trade if the trend flips | Off by default — stop and target only |
| Backtest From / To | Restrict the test to a date window |

**Reading the result honestly:** a strategy needs a decent sample before it means
anything — under ~30 trades the numbers are noise. Check that **profit factor > 1.3**
and that max drawdown is something you could actually sit through. Test more than
one symbol; a result that only works on one ticker is usually curve-fitted.
Past performance is not a promise about the future.

---

# 1. Simple Entry / SL / TP  (`simple-entry-sl-tp.pine`)

Builds **one locked trade plan** on a fixed timeframe and projects it as three
levels: entry, stop loss, take profit.

## How to actually use it

### Step 1 — match the Plan Timeframe to your horizon

| You hold trades for | Set Plan Timeframe to | View the chart at |
|---|---|---|
| Days to a few weeks | **Daily** (default) | Daily or 4H |
| Weeks to months | **Weekly** | Weekly or Daily |
| Months or longer | **Monthly** | Monthly or Weekly |

Never view a chart *above* the plan timeframe — the status box warns you if you do.

### Step 2 — read the status box, bottom left

```
✔ PLAN LOCKED on Daily · AAPL · 3650 days of history read
Holding this plan — it will not move until price hits it or the trend flips
UPTREND  (up 85/100 · down 15/100) · volume confirms buying
Pattern: bull flag
Plan: bull flag: buy flag support, target measured move
LONG · entry 2.31% away · R:R 2.45
```

That is the whole briefing: the verdict, the score behind it, what volume says,
the pattern found, the strategy applied, and how far price must travel.

### Step 3 — decide whether the setup is worth taking

Take it seriously when **all** of these hold:

- Verdict reads **UPTREND** or **DOWNTREND**, not *NO CLEAR TREND*
- Winning score is **70+** and clearly beats the other side
- Volume line says **"volume confirms"** — not *"mixed"* or *"no volume data"*
- Pattern is a **named** one (bull flag, double bottom, breakout), not generic
  *trend* or *range*
- **R:R is 2.0 or better**

Skip it when the verdict is *NO CLEAR TREND* — a range fade is the weakest setup
the script produces. Waiting costs nothing.

### Step 4 — place the orders (do not market-buy)

The entry sits **below** price for longs and **above** price for shorts on
purpose — it is a level price still has to come to. So:

1. **Limit order** at the ENTRY price
2. **Stop-loss order** at the STOP LOSS price
3. **Take-profit order** at the TAKE PROFIT price

If entry is <1% away it is imminent; 5%+ makes it a watchlist item, not a trade.

### Step 5 — size the position off the stop

This is the most valuable number on the chart. Risk a fixed slice of your account
(1–2% is the common rule):

```
shares = (account × risk%) ÷ (entry − stop)
```

£10,000 account, 1% risk (£100), entry 250, stop 240 → £100 ÷ 10 = **10 shares**.
Because the stop is set by structure rather than a round guess, this keeps every
trade the same real risk regardless of volatility.

### Step 6 — let the alerts do the watching

⏰ → Create Alert → this indicator → choose:

- **Price reached entry** — your cue to act
- **Uptrend confirmed** / **Downtrend confirmed** — for scanning a watchlist

### A strong two-pass workflow

Because the plan timeframe is fixed, you can run the analysis twice:

1. Set Plan Timeframe = **Weekly**, note the verdict (the big-picture direction).
2. Switch it to **Daily** and take the entry only if it agrees with the weekly
   verdict.

Trading daily setups in the direction of the weekly trend filters out most of the
weak signals.

### What to watch out for

- **It is not a backtest.** It shows no proof of edge on your symbol. If you want
  historical win-rate, profit factor and expectancy, run the full version
  (`chart-analyzer-bot.pine`) which tracks every setup it ever produced.
- **After a stop is hit it plans again immediately.** A fresh plan appearing right
  after a loss is not a signal to jump back in — judge it on Step 3 like any other.
- **No-volume symbols lose the strongest angle.** Many forex and index CFDs carry
  no real volume; the score goes neutral there, so lean harder on structure.
- Nothing here is financial advice — validate on your own instrument before
  risking money.

---

## Reference

**What the analysis actually does** (all of it happens under the hood — none of it
is drawn):

### Trend detection — scored 0–100 from four independent angles

No single lagging indicator gets to declare a trend on its own. Each angle
contributes points, and the trend is only *followed* once the score clears
`Trend Score needed to follow trend` (default 60) and beats the opposing score:

| Angle | Weight | What earns the points |
|---|---|---|
| **Market structure** | 30 | Higher highs **and** higher lows — the actual definition of an uptrend (15 for one of the two) |
| **Volume** | 25 | OBV above its average **and** more volume on up bars than down bars (12 for one of the two) |
| **MA alignment** | 20 | Price above both EMAs and fast above slow |
| **Directional strength** | 15 | ADX above threshold with DI+ leading |
| **Higher timeframe** | 10 | The auto-derived higher timeframe agrees |

**Volume can veto a trend outright.** If OBV and up/down volume both point the
other way, the trend is rejected no matter how good the price action looks —
that's the classic "rally on falling volume" trap. Symbols with no volume feed
score neutral instead of being penalised.

### Chart patterns — each with its own trade plan

When a pattern is found it *overrides* the generic pullback logic, because a
pattern implies a specific entry, invalidation and objective:

| Pattern | Entry | Stop | Target |
|---|---|---|---|
| **Bull flag** (strong pole, tight drift, drying volume) | Flag support | Below flag low | Measured move of the pole |
| **Bear flag** | Flag resistance | Above flag high | Measured move of the pole |
| **Double bottom** | Neckline retest | Below the double low | Pattern height projected up |
| **Double top** | Neckline retest | Above the double top | Pattern height projected down |
| **Ascending triangle** (flat highs, rising lows) | Rising support | Below the last low | Breakout measured move |
| **Volume breakout/breakdown** (structure break on ≥1.5× volume) | Retest of the broken level | Beyond it | 75% of the impulse |

If no pattern qualifies — or its entry is already out of reach — it falls back to
the confluence method below.

### The rest of the pipeline

1. **Regime.** ADX separates genuinely trending markets from chop; each gets a
   different playbook.
2. **Higher-timeframe context.** Derived automatically from the timeframe you're on
   (daily → weekly, weekly → monthly, monthly → yearly, intraday → 4H/daily).
3. **Mode selection.** Confirmed trend → buy pullbacks / sell bounces. No trend →
   fade the range extremes instead.
4. **Structure mapping.** It remembers the last several confirmed swing highs and
   lows (not just one) and measures the live impulse leg between the most recent
   pair.
5. **Confluence entry.** It builds a candidate list from the 38.2% / 50% / 61.8%
   Fibonacci retracements of the leg, the fast EMA, **every remembered swing**,
   swings on the opposite side (broken resistance becomes support and vice versa),
   and **round numbers**. In range mode it uses the range edges instead. It then:
   - discards levels on the wrong side of price,
   - **discards levels too far away to realistically fill** (`Max Entry Distance
     (ATR)`), so you never get shown a price that would take months to reach,
   - picks whichever surviving level has the most agreement clustered around it,
     ties going to the one nearest price.

   If nothing is within reach it falls back to the nearest real structure, and
   only then to a modest pullback from price.
6. **Stop placement.** Beyond the structure that would invalidate the idea, plus an
   ATR buffer, and never closer than a minimum ATR distance so normal noise can't
   stop you out.
7. **Target projection.** A Fibonacci extension of the measured leg (or the opposite
   range edge), floored at your minimum reward:risk so a setup is never shown with
   a worse payoff than you accept.
8. **Direction stability.** A flip from long to short (or back) has to persist for
   several bars before the levels redraw the other way, so the setup doesn't swap
   sides on every marginal bar.

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
most relevant setup for the timeframe on screen.

### The plan does not move when you switch chart timeframes

The levels are built on a **fixed Plan Timeframe** (default **Daily**) — not on
whatever chart you happen to be looking at. Flip the chart between 1H, daily,
weekly and monthly and the entry, stop and target stay exactly where they were,
because every measurement (swings, ATR, EMAs, ADX, volume, patterns) is requested
from the plan timeframe.

Set `Plan Timeframe` to Weekly or Monthly if you want a slower, bigger-picture
plan. Setting it to `Chart` restores the old behaviour of following the chart.

**One rule:** view the chart at the plan timeframe **or lower**. Looking at a
monthly chart while planning on Daily means the daily structure can't be resolved
properly — the status box warns you when that happens.

### Plan locking

By default (`Plan Updates` = *Hold until hit or invalidated*) the script commits
**one** plan and holds it. The levels stop drifting bar to bar. A plan is only
replaced when:

- price reaches the **stop**, or
- price reaches the **target**, or
- the trend direction **flips** (switch off with `Invalidate plan if trend
  direction flips`).

Choose *Recalculate every bar* if you'd rather see the levels update continuously.

### Waiting for history

`Minimum History Before Planning (days)` (default 30) stops it from planning off a
thin chart. The requirement is converted into **plan-timeframe bars** and measured
there — so a 5-minute chart, which only loads a few days of candles, no longer
blocks a Daily plan that has years of history behind it. Until the requirement is
met it shows `⏳ COLLECTING HISTORY` with the bar count it needs versus what it has;
scroll left to pull in more.

### Switching timeframes

With `Plan Timeframe` set to `Chart`, every reading comes from the chart's own
candles, so changing the timeframe re-runs the whole analysis on those bars — and
the levels will move each time you switch. With any fixed plan timeframe (the
default), they stay put. Either way it reads whatever symbol the chart is on, so
switching tickers re-analyses the new one.

**Status readout (bottom-left):** because bigger timeframes take a moment to load
history, a small box tells you where the analysis stands:

- `⏳ ANALYZING AAPL · Weekly — loading history (32/50 bars)` — still working, the
  levels aren't final yet.
- When it's finished, the box turns green (uptrend), red (downtrend) or grey (no
  clear trend) and reports the whole verdict:

  ```
  ✔ AAPL · Weekly · 1240 bars read — safe to switch timeframe
  UPTREND  (up 85/100 · down 15/100) · volume confirms buying
  Pattern: bull flag
  Plan: bull flag: buy flag support, target measured move
  LONG · entry 2.31% away (1.4 ATR) · R:R 2.45
  ```

  So you get the verdict, the score behind it, what volume is saying, the pattern
  found, the strategy being applied, and how far price must travel to reach the
  entry — without measuring anything yourself.

Wait for the green ✔ before switching, and you'll know every timeframe was read
completely. Turn it off with the `Show analysis status` setting.

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
