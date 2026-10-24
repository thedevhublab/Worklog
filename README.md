# Worklog

A lightweight bilingual work journal built with HTML, CSS, and vanilla JavaScript. Record daily work, organize it with categories, and review entries by month, category, or keyword.

## Live app

[Open Worklog](https://thedevhublab.github.io/Worklog/) · [한국어 안내](README_KR.md)

## Features

- **Daily entries:** Create, edit, and delete records with a work date, optional deadline, title, details, category, and optional time spent. For a new entry, enable repeating and choose daily, weekly, every two weeks, monthly, or selected weekdays (Monday through Sunday) through an end date. Custom weekday schedules create entries only on the selected days in the inclusive date range. Matching occurrences are created together when saved. Monthly dates clamp to the last day of shorter months (for example, January 31 → February 28 → March 31). Recurring entries store `isRecurring` and a shared `recurrenceId`. A schedule can create up to 500 entries. Each occurrence remains a regular entry in status views, weekly summaries, search, CSV, and JSON backups; CSV includes a recurring indicator. Deadlines move by the same date offset as each occurrence. Titles are required and limited to 80 characters; details support up to 3,000 characters. Time accepts 0–24 hours in half-hour increments.
- **Work status:** Use the left Status menu to view all entries or filter by `Create`, `In Progress`, `Complete`, or `Cancel`. Change a status from the list or editor; it is saved with the entry in browser storage. Existing entries and older backups without a status default to `Create`.
- **Status summary:** Compare all-time status totals with the currently selected month. Select a status card to filter the entry list.
- **Data visualization:** Review daily workload for the selected month or the latest 12 months, entries by category, and entries by status. Switch between `All entries` and `Exclude recurring` to apply the same scope to dashboard totals, the status summary, and charts. The preference persists in this browser and across language changes. Charts use built-in HTML and CSS without external libraries.
- **Weekly summary:** Review entries from a Monday-to-Sunday week, including each day's records and status totals. Move between weeks or return to the current week.
- **Deadlines:** Set an optional deadline separately from the work date. Past deadlines are marked overdue unless the entry is `Complete` or `Cancel`. Older records without a deadline remain valid.
- **New-day prompt:** After the date changes, on the next visit or while the app remains open, Worklog asks whether to start an entry for today. Confirming opens a new entry with today's date; previous entries stay saved under their dates.
- **Monthly dashboard:** See this month's entry count, all-time entries, and the number of distinct days with records. The dashboard's current-month total is separate from the month selected for browsing.
- **Localized calendars:** Select a month or a date with Worklog's custom calendar controls. Month names, weekdays, labels, and year navigation follow the selected interface language.
- **Search, filters, and sorting:** Show the whole selected month or only one chosen day. Combine the date scope with status and category filters, and search titles, details, and category names. In one-day view, changing the date also updates the selected month. Sort by newest, oldest, or title.
- **Custom bilingual categories:** Add, rename, and delete categories. Enter the Korean and English names yourself; Worklog does not use an automatic translation API. Deleting a category preserves its entries and reassigns them to another category. At least one category must remain.
- **Korean and English interface:** Switch languages from the header. The preference is saved in this browser, and current search, category, and month selections remain in place.
- **JSON backup and restore:** Export entries (including deadlines), categories, and translations. Import validates the whole file before asking to merge it. Older entries without deadlines or status remain supported. Matching entry IDs are replaced; entries without IDs receive new IDs. Current version 1 backups and legacy array-style entry backups are supported.
- **CSV export:** Export the currently filtered entries with dates, titles, details, categories, statuses, time spent, and deadlines. UTF-8 BOM and CSV escaping support spreadsheet apps and Korean text.
- **Responsive and accessible UI:** Layout adapts to mobile and desktop. Inputs have labels, errors are announced beside fields, focus is visible, and dialogs support keyboard navigation and Escape to close.
- **Reduced motion:** Respects the device's reduced-motion preference.

## Getting started

Open the index.html file in a modern browser. No package installation, build step, account, or server is required for local use.

1. Enter a date, a title, and any optional details, category, and time.
2. Choose a month and switch between `Whole month` and `One day`. In one-day view, select a date to show only that day's entries. Combine this with category and status filters, search, and sorting. Use the weekly summary to review one Monday-to-Sunday period.
3. Add both Korean and English labels when creating a custom category.
4. To create a recurring schedule, open a new entry, enable `Repeat this entry`, choose daily, weekly, every two weeks, monthly, or custom weekdays, select any weekdays when using the custom option, and choose an end date before saving. Matching occurrences are stored as individual entries together. In analytics, switch whether recurring entries are included. Existing entries do not show recurrence controls while being edited.
5. Export the current filtered list as CSV for spreadsheet analysis. Export a JSON backup regularly; importing merges it with the current browser data.

## Data and privacy

Worklog is a static client-side app. Entries (including deadlines and recurrence markers), categories, category translations, language preference, and the analytics filter preference are stored in the current browser's localStorage. Recurring occurrences are independent entries linked by `recurrenceId`. Older entries and backups without recurrence fields are treated as regular entries. There is no account, server database, or automatic cross-device sync. Clearing browser data can remove records; use JSON export to keep a separate backup.

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
├── tests/
│   └── validation.test.cjs  Data, backup, recurrence date, and schedule ID tests
└── LICENSE          MIT License
</pre>

## Technology

- HTML
- CSS
- Vanilla JavaScript
- Browser localStorage
- GitHub Pages static hosting

## Testing

The app has no runtime dependencies. Run the data, backup, and recurrence schedule tests with Node.js from the `outputs/` directory:

<pre>
node tests/validation.test.cjs
</pre>

The tests are for development checks and are not required to run the app.

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
