# Worklog

A lightweight, bilingual work journal built with plain HTML, CSS, and JavaScript. Record daily work, organize it with categories, and find entries by month, date, or keyword.

[Open Worklog](https://thedevhublab.github.io/Worklog/)

[🇰🇷 한국어 안내](README_KR.md) · [🇺🇸 English](README.md)

## Features

- **Daily work entries** — Create, edit, and delete entries with a date, title, details, category, and time spent. Titles are required (up to 80 characters); details support up to 3,000 characters. Time is entered in half-hour increments, from 0 to 24 hours.
- **Monthly dashboard** — See the number of entries this month, all-time entries, and distinct days with entries.
- **Calendar and month navigation** — Browse entries by month using a localized month picker. Month names, year labels, dates, and calendar controls follow the selected language.
- **Flexible browsing** — Filter by month and category, search titles, details, and category names, and sort by newest, oldest, or title (A–Z).
- **Custom categories** — Add, rename, and remove categories. Each custom category has a Korean and an English label so it displays correctly when switching languages. The built-in categories are Planning, Meetings, Development, Design, Operations, and Other (with Korean labels in the Korean interface). Removing a category keeps its entries and reassigns them to Other when available.
- **Korean and English interface** — Switch languages from the interface. The preference is remembered in this browser. Built-in category labels and interface text are localized; custom category translations are entered and maintained by the user. No automatic translation service is used.
- **JSON backup and restore** — Export categories and entries to a JSON file. Import a backup to merge its data with the current browser data; matching entry IDs are replaced by the imported versions.
- **Responsive layout** — The journal adapts to smaller screens; the entry form moves into a mobile-friendly panel.

## Getting started

Open `index.html` in a modern browser. No package installation or build step is required.

1. Add an entry with its date, title, and any optional details, category, and time spent.
2. Use the month picker, category filter, search, or sort menu to find entries.
3. Manage bilingual category names in category management.
4. Use **Export JSON** periodically to keep a backup. Import a JSON backup to restore or merge saved data.

## Data and privacy

Worklog has no server-side database or account sync. Entries, categories, category labels, and the language preference are saved in the browser's `localStorage` on the device and browser where you use the app. Clearing browser site data can erase them, so export a backup before clearing it. Data does not automatically move between browsers or devices.

The app does not call a translation API. It requests DM Sans and Noto Sans KR font files from Google Fonts when available and uses local fallback fonts otherwise.

## Project files

```text
outputs/
├── index.html      # App structure
├── style.css       # Layout, styling, and responsive rules
├── script.js       # Entries, filtering, localization, storage, and JSON backup
├── README.md       # English documentation
└── README_KR.md    # Korean documentation
```

## Built with

- HTML
- CSS
- Vanilla JavaScript
- Browser `localStorage` for local persistence
