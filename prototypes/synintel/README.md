# SynIntel.ai — partner prototype walkthrough (Techtaru Digital)

Same format as the Muthokunju prototype: a self-contained HTML walkthrough with framed screenshots, a recorded video, and the live console embedded inside it.

- `dist/SynIntel_Prototype_Walkthrough.html` — **the deliverable** (single file, opens offline)
- `dist/SynIntel_Prototype.zip` — walkthrough + console + video + screenshots, packaged like the reference zip
- `src/console.html` — the interactive SynIntel console (10 screens covering all 8 capability areas)
- `src/walkthrough.html` — walkthrough template (`{{SHOT_*}}`, `{{VIDEO}}`, `{{CONSOLE}}` placeholders)
- `build.py` — inlines everything into `dist/` (`python3 build.py`)

Before sending: search the walkthrough for `class="fill"` and `DRAFT` — those mark Techtaru facts
(headcounts, start dates, case studies, domain evidence) that must be confirmed or replaced.
After editing `src/console.html`, re-take the screenshots in `src/shots/` before rebuilding.
