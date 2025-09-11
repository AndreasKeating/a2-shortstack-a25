# A2 — Short Stack Andreas Keating Onyos

Deployed: https://a2-shortstack-a25-lyzg.onrender.com 
Repo: https://github.com/AndreasKeating/a2-shortstack-a25

---

## What it does:
- Server serves files from "/public" and maintains a dataset in memory.
- Dataset fields (per row): "id", "model", "year", "mpg"  
  Derived field: "age = currentYear - year" (computed on the server).
- Results page shows the entire dataset currently in server memory.
- Forms on the homepage let you add and delete items.
- Front-end JS uses "fetch()" to call the server.
- All pages reachable from the homepage (link to Results).
- CSS in an external stylesheet; uses element, #id, and class selectors.
- Layout + font: Flexbox for header/nav and a non-default Google font.

## Achievements
- Accessibility polish: Associated "<label>"s with inputs via "for"/"id". Added a visible keyboard focus style (":focus-visible") for better tab navigation.
- Results summary: On "results.html", shows total count and average MPG computed client-side above the table.

---

## Quick start (local):

```bash
npm install
npm start
# open http://localhost:3000
