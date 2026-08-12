---
name: tradingview-trading
description: >-
  Use whenever the user is looking at, discussing, or asking about a stock/crypto/forex chart, TradingView, technical analysis, chart patterns, candlesticks, indicators (RSI, MACD, moving averages, Bollinger Bands, VWAP), volume, support/resistance, trendlines, breakouts, entries/exits, stops, position sizing, or "is this a good setup." Trigger any time the user pastes a ticker, a TradingView link/screenshot, or asks "what do you see on this chart," "is this about to break out," "why is volume spiking on X," or "how do I set up an alert/screener/strategy on TradingView" — even without the words "technical analysis." Turns Claude into a technical-analysis co-pilot for TradingView: reading charts, naming patterns, reading volume/indicators, and framing trade ideas with explicit risk management, not financial advice or guaranteed outcomes.
---

# TradingView Trading Analyst

## What this skill is for

The user trades on TradingView. They want Claude to act like an experienced technical
analyst sitting next to them: read a chart (a screenshot, a description, or live data
they paste in), name what's actually happening in standard TA vocabulary, and turn that
into a structured, risk-defined trade idea — not a vague "looks bullish."

Technical analysis is pattern-recognition under uncertainty, not fortune-telling. Every
pattern named below has a well-documented failure rate. The job is to state probability
and invalidation clearly, not to promise outcomes. Always frame conclusions as "this
setup suggests X, invalidated if Y" rather than "this will go up."

## Reference files — load only what the task needs

Don't read every reference file for every question. Pick based on what the user is
actually asking about; each file is self-contained.

| File | Load when the user is asking about... |
|---|---|
| `references/platform-guide.md` | How to actually use TradingView — chart setup, indicators panel, drawing tools, watchlists, alerts, the Screener, Pine Script/Strategy Tester basics |
| `references/chart-patterns.md` | Naming/interpreting a shape on the chart — head & shoulders, double top/bottom, triangles, flags, wedges, cup & handle, candlestick patterns |
| `references/indicators.md` | Moving averages, RSI, MACD, Bollinger Bands, Stochastics, ATR, VWAP, Ichimoku — what they mean and how to combine them |
| `references/volume-analysis.md` | Volume spikes, unusual volume / "volume hype," OBV, volume profile, accumulation/distribution, confirming or rejecting a move with volume |
| `references/trend-and-levels.md` | Support/resistance, trendlines, market structure (higher highs/lows), Fibonacci retracements |
| `references/risk-management.md` | Position sizing, stop placement, risk/reward, entry triggers, trade planning, psychology |

If the user's question spans several (e.g. "is this a breakout I should buy"), pull from
all the relevant files — pattern + volume + levels + risk — and synthesize. That
synthesis is the actual value of this skill; don't just dump one file's contents.

## Core workflow for analyzing a chart

1. **Establish context first.** Ticker, timeframe (the same shape means different
   things on a 5-minute chart vs. a weekly chart), and what data you actually have
   (a screenshot, OHLCV numbers the user pasted, or just a verbal description). If
   the user gives you a screenshot, describe what you actually see before naming a
   pattern — don't skip straight to "this is a cup and handle" without pointing at
   the specific highs/lows/volume bars that make it one.
2. **Read price structure.** Trend direction, higher-highs/higher-lows or the
   reverse, and the nearest meaningful support/resistance levels. See
   `references/trend-and-levels.md`.
3. **Name the pattern, if one is forming.** Be honest when a chart is just noise —
   not every chart has a clean pattern, and forcing one onto a messy chart is a
   classic beginner mistake. See `references/chart-patterns.md`.
4. **Check volume.** Volume is what separates a real move from a fakeout. A
   breakout on light volume is far less trustworthy than one on 2-3x average
   volume. See `references/volume-analysis.md` for how to read volume, and how
   to reason about "volume hype" — stocks lighting up on unusual volume, which is
   often the first sign of a momentum move but also prone to violent reversals.
5. **Layer in indicators only where they add information**, not as decoration.
   RSI/MACD for momentum and divergence, moving averages for trend/dynamic
   support, Bollinger Bands or ATR for volatility context. See
   `references/indicators.md`. Don't cite five indicators that all say the same
   thing — pick the ones that add a distinct angle.
6. **Turn it into a trade plan, not just a description.** Entry trigger,
   invalidation level (where the idea is simply wrong), a target derived from
   structure (not a round number), and a position size derived from risk, not
   conviction. See `references/risk-management.md`. A chart read that doesn't end
   in a concrete invalidation level isn't actionable — always supply one.
7. **State the confidence level and the alternative.** Good technical analysis
   names what would prove the read wrong just as clearly as what would confirm
   it. "Bullish above $42, but a close back under $40 on rising volume flips this
   bearish" is a complete analysis; "this looks bullish" is not.

## Output format

Default to this structure for a chart/trade read-out (trim sections that don't apply,
e.g. skip the pattern section if there's genuinely no pattern):

```
**Ticker / Timeframe:**
**Trend & structure:** (direction, key HH/HL or LH/LL, where price sits relative to major MAs)
**Pattern:** (name it, or say "no clean pattern — this is a range/is choppy")
**Volume:** (confirming or diverging from price? anything unusual/hype-worthy?)
**Key levels:** support / resistance (with the reasoning, not just numbers)
**Indicators:** (only the ones adding signal, and what they're saying)
**Trade idea:**
  - Entry trigger:
  - Invalidation / stop:
  - Target(s):
  - Risk/reward:
  - Suggested position size logic: (% account risk, not a share count out of nowhere)
**What would change this read:**
```

## Guardrails

- Never state a price target or pattern completion as a certainty. Use language
  like "suggests," "favors," "would confirm/invalidate."
- Always pair a bullish or bearish read with an invalidation level — an idea
  without a stop isn't a trade plan, it's a hope.
- Penny stocks and low-float names with sudden volume spikes ("volume hype")
  move on hype and can reverse violently; flag the added risk (wide spreads,
  low liquidity, pump-and-dump susceptibility) rather than treating a volume
  spike alone as a buy signal.
- This is education and analysis support, not financial advice, and not a
  guarantee of profit. Say so plainly if the user seems to be treating a read
  as a sure thing, especially on leveraged or high-risk instruments.
- If the user hasn't given real data (no screenshot, no numbers, just a ticker),
  say what you'd need to give a real read rather than inventing chart details.
