# AGENTS.md

# Anthropometry Calculator – Codex Agent Instructions

## Project overview
Web application for managing anthropometric data.  
The app contains several standalone HTML pages (no frameworks) that share common CSS and JavaScript.  
Pages include: home, login, worksheet, reports, ideal weight calculation, and patients list.

## File structure
- `index.html`          – Home page
- `login.html`          – Login page
- `worksheet.html`      – Main working table (calculation sheet)
- `report.html`         – Report page (later)
- `ideal-weight.html`   – Ideal weight tools (later)
- `patients.html`       – Patients list (later)

Folders:
- `css/main.css`        – All shared styling (no inline CSS)
- `js/main.js`          – Shared JS logic (navigation, helpers)
- `js/worksheet.js`     – Worksheet-specific logic
- `js/patients.js`      – Patients-specific logic

## How to work
- Use **semantic, clean HTML** for each page.
- All styles must go inside `css/main.css`.  
  No inline styles, no `<style>` tags.
- All JS must go into the appropriate file inside `/js`.  
  No inline event handlers (no `onclick`, etc.).
- Prefer small, well-named functions.  
  Use pure functions for calculations when possible.
- Keep UI simple, readable, and consistent across pages.

## Rules and limitations
- Do NOT introduce external dependencies (no React, no Bootstrap, no CDNs, no build tools).
- Do NOT create or rename pages or folders unless explicitly instructed.
- Preserve existing structure unless the instruction clearly requests otherwise.
- Before rewriting large blocks of code, show the diff and require confirmation.

## Autonomy
Codex is allowed to:
- Improve naming, formatting, and clarity.
- Add minimal comments where logic is not obvious.
- Suggest structural improvements **without applying them** unless confirmed.

Codex must NOT:
- Add new technologies or frameworks.
- Modify multiple pages at once unless asked.
- Change the project architecture on its own.

## Testing and validation
- After adding calculations, clearly document assumptions and units in comments.
- Ensure no browser console errors after changes.
- Follow accessibility basics (keyboard-friendly, readable UI).
