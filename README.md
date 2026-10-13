# Worklog

A lightweight bilingual work journal built with HTML, CSS, and vanilla JavaScript. Record daily work, organize it with categories, and review entries by month, category, or keyword.

## Live app

[Open Worklog](https://thedevhublab.github.io/Worklog/) · [한국어 안내](README_KR.md)

## Features

- **Daily entries:** Create, edit, duplicate, and delete records with a work date, optional deadline, title, details, category, and optional time spent. Duplicating opens an unsaved draft for today with the source fields copied. Titles are required and limited to 80 characters; details support up to 3,000 characters. Time accepts 0–24 hours in half-hour increments.
- **Work status:** Use the left Status menu to view all entries or filter by `Create`, `In Progress`, `Complete`, or `Cancel`. Change a status from the list or editor; it is saved with the entry in browser storage. Existing entries and older backups without a status default to `Create`.
- **Status summary:** Compare all-time status totals with the currently selected month. Select a status card to filter the entry list.
- **Weekly summary:** Review entries from a Monday-to-Sunday week, including each day's records and status totals. Move between weeks or return to the current week.
- **Deadlines:** Set an optional deadline separately from the work date. Past deadlines are marked overdue unless the entry is `Complete` or `Cancel`. Older records without a deadline remain valid.
- **New-day prompt:** After the date changes, on the next visit or while the app remains open, Worklog asks whether to start an entry for today. Confirming opens a new entry with today's date; previous entries stay saved under their dates.
- **Monthly dashboard:** See this month's entry count, all-time entries, and the number of distinct days with records. The dashboard's current-month total is separate from the month selected for browsing.
- **Localized calendars:** Select a month or a date with Worklog's custom calendar controls. Month names, weekdays, labels, and year navigation follow the selected interface language.
- **Search, filters, and sorting:** Filter by month and category; search titles, details, and category names; sort by newest, oldest, or title.
- **Custom bilingual categories:** Add, rename, and delete categories. Enter the Korean and English names yourself; Worklog does not use an automatic translation API. Deleting a category preserves its entries and reassigns them to another category. At least one category must remain.
- **Korean and English interface:** Switch languages from the header. The preference is saved in this browser, and current search, category, and month selections remain in place.
- **JSON backup and restore:** Export entries (including deadlines), categories, and translations. Import validates the whole file before asking to merge it. Older entries without deadlines or status remain supported. Matching entry IDs are replaced; entries without IDs receive new IDs. Current version 1 backups and legacy array-style entry backups are supported.
- **CSV export:** Export the currently filtered entries with dates, titles, details, categories, statuses, time spent, and deadlines. UTF-8 BOM and CSV escaping support spreadsheet apps and Korean text.
- **Responsive and accessible UI:** Layout adapts to mobile and desktop. Inputs have labels, errors are announced beside fields, focus is visible, and dialogs support keyboard navigation and Escape to close.
- **Reduced motion:** Respects the device's reduced-motion preference.

## Getting started

Open the index.html file in a modern browser. No package installation, build step, account, or server is required for local use.

1. Enter a date, a title, and any optional details, category, and time.
2. Browse with the month picker, category and status filters, search, and sort menu. Use the weekly summary to review one Monday-to-Sunday period.
3. Add both Korean and English labels when creating a custom category.
4. Use Duplicate on a repeated task, adjust the new draft, and save it. Set a deadline when needed.
5. Export the current filtered list as CSV for spreadsheet analysis. Export a JSON backup regularly; importing merges it with the current browser data.

## Data and privacy

Worklog is a static client-side app. Entries (including deadlines), categories, category translations, and language preference are stored in the current browser's localStorage. There is no account, server database, or automatic cross-device sync. Clearing browser data can remove records; use JSON export to keep a separate backup.

The app does not send journal data to a translation service. DM Sans and Noto Sans KR are requested from Google Fonts when available; system fonts are used as fallbacks.

## Project structure

<pre>
Worklog/
├── .gitignore       Git ignore rules
├── index.html       App structure
├── style.css        Design system, layout, and responsive styles
├── script.js        Records, validation, localization, storage, and backups
├── README.md        English documentation
├── README_KR.md     Korean documentation
└── LICENSE          MIT License
</pre>

## Technology

- HTML
- CSS
- Vanilla JavaScript
- Browser localStorage
- GitHub Pages static hosting

## Testing

The project does not currently include a `tests/` directory or an automated test suite. When automated checks are added, `tests/` is the place to keep them. Tests can help verify data validation, status and deadline handling, backup compatibility, and CSV formatting after code changes. The folder is for development checks and is not required to run the app.

## Known limitations

- Data belongs to the browser and device where it was entered. It does not sync between devices or browsers.
- Browser storage can be cleared and may have limited capacity. Keep JSON backups.
- The Google Fonts connection is optional; the app remains usable if it is unavailable.
- Offline installation as a PWA is not included yet.

## Possible next improvements

- Add an actual, up-to-date app screenshot to this README.
- Consider an installable offline PWA while preserving local-first storage.
- Add more interface languages and user-controlled export options.

## License

Distributed under the MIT License. See [LICENSE](LICENSE).
