const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const source = fs.readFileSync(path.join(__dirname, '..', 'script.js'), 'utf8');
const slice = (start, end) => {
  const from = source.indexOf(start);
  const to = source.indexOf(end, from);
  assert.notEqual(from, -1, 'missing source marker: ' + start);
  assert.notEqual(to, -1, 'missing source marker: ' + end);
  return source.slice(from, to);
};

let generatedId = 0;
const context = vm.createContext({
  DEFAULTS: ['기획', '회의', '개발', '디자인', '운영', '기타'],
  state: { storageProblem: false },
  window: { localStorage: {} },
  crypto: { randomUUID: () => 'generated-' + (++generatedId) },
  localDate: date => date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + String(date.getDate()).padStart(2, '0'),
  dateFromISO: value => { const [year, month, day] = value.split('-').map(Number); return new Date(year, month - 1, day); },
  addDays: (value, amount) => { const date = context.dateFromISO(value); date.setDate(date.getDate() + amount); return context.localDate(date); },
  Date, Math, Number, String, Set, Array, Object, JSON
});
vm.runInContext(slice('  const validDate =', '  const load=()=>') + [
  'this.validDate = validDate;',
  'this.recurrenceDates = recurrenceDates;',
  'this.selectAnalyticsEntries = selectAnalyticsEntries;',
  'this.normalizeHours = normalizeHours;',
  'this.normalizeEntries = normalizeEntries;',
  'this.normalizeCategories = normalizeCategories;',
  'this.normalizeTranslations = normalizeTranslations;'
].join('\n'), context);
vm.runInContext(slice('  const validateBackup=parsed=>', '  const importFile=async file=>') + 'this.validateBackup = validateBackup;', context);

const validEntry = {
  id: 'entry-1',
  date: '2026-10-11',
  title: 'Plan',
  content: 'Details',
  category: '기획',
  hours: '1.5',
  created: 100
};

assert.equal(context.validDate('2024-02-29'), true, 'leap day is valid');
assert.equal(context.validDate('2025-02-29'), false, 'impossible leap day is rejected');
assert.equal(context.validDate('2026-13-01'), false, 'invalid month is rejected');
assert.deepEqual(Array.from(context.recurrenceDates('2026-10-05', '2026-10-19', 'weekly')), ['2026-10-05', '2026-10-12', '2026-10-19']);
assert.deepEqual(Array.from(context.recurrenceDates('2026-10-05', '2026-10-26', 'biweekly')), ['2026-10-05', '2026-10-19']);
assert.deepEqual(Array.from(context.recurrenceDates('2026-10-05', '2026-10-07', 'daily')), ['2026-10-05', '2026-10-06', '2026-10-07'], 'daily schedules include every date in the inclusive range');
assert.deepEqual(Array.from(context.recurrenceDates('2026-10-05', '2026-10-15', 'custom', [3, 5])), ['2026-10-07', '2026-10-09', '2026-10-14'], 'custom schedules include only selected weekdays, Monday=1 through Sunday=7');
assert.deepEqual(Array.from(context.recurrenceDates('2026-10-05', '2026-10-05', 'custom', [2])), [], 'custom schedules can have no occurrence when the selected weekday is outside the range');
assert.deepEqual(Array.from(context.recurrenceDates('2026-10-05', '2026-10-15', 'custom', [])), [], 'custom schedules require selected weekdays');
assert.deepEqual(Array.from(context.recurrenceDates('2026-01-31', '2026-03-31', 'monthly')), ['2026-01-31', '2026-02-28', '2026-03-31'], 'monthly entries clamp to month end and keep the original day where possible');
assert.equal(context.recurrenceDates('2026-10-10', '2026-10-01', 'weekly'), null, 'end date before start date is rejected');
assert.equal(context.recurrenceDates('2020-01-01', '2030-01-01', 'weekly'), null, 'schedules above the entry limit are rejected');
assert.equal(context.normalizeHours('0'), '0');
assert.equal(context.normalizeHours('24'), '24');
assert.equal(context.normalizeHours('1.5'), '1.5');
assert.equal(context.normalizeHours('0.25'), null, 'quarter-hour increments are rejected');
assert.equal(context.normalizeHours('24.5'), null, 'time above 24 hours is rejected');
assert.equal(context.normalizeEntries([validEntry]).length, 1);
assert.equal(context.normalizeEntries([validEntry])[0].status, 'create', 'entries without a status keep backward compatibility');
assert.equal(context.normalizeEntries([validEntry])[0].isRecurring, false, 'legacy entries default to non-recurring');
assert.equal(context.normalizeEntries([validEntry])[0].recurrenceId, '', 'legacy entries default to no recurrence group');
const recurringEntry = { ...validEntry, id: 'recurring-1', isRecurring: true, recurrenceId: 'schedule-1' };
const recurringSibling = { ...recurringEntry, id: 'recurring-2', date: '2026-10-18' };
assert.equal(context.normalizeEntries([recurringEntry])[0].isRecurring, true);
assert.equal(context.normalizeEntries([recurringEntry])[0].recurrenceId, 'schedule-1');
assert.equal(context.normalizeEntries([recurringEntry, recurringSibling]).length, 2, 'occurrences can share one recurrence ID while keeping distinct entry IDs');
assert.equal(context.selectAnalyticsEntries([validEntry, recurringEntry], true).length, 2, 'analytics includes recurring records by default');
assert.equal(context.selectAnalyticsEntries([validEntry, recurringEntry], false).length, 1, 'analytics can exclude recurring records');
assert.equal(context.normalizeEntries([{ ...recurringEntry, recurrenceId: '' }]), null, 'recurring entries require a schedule ID');
assert.equal(context.normalizeEntries([{ ...validEntry, isRecurring: false, recurrenceId: 'schedule-1' }]), null, 'regular entries cannot have a schedule ID');
assert.equal(context.normalizeEntries([{ ...validEntry, status: 'inProgress' }])[0].status, 'inProgress');
assert.equal(context.normalizeEntries([{ ...validEntry, status: 'complete' }])[0].status, 'complete');
assert.equal(context.normalizeEntries([{ ...validEntry, status: 'cancel' }])[0].status, 'cancel', 'cancel status is saved as a normal entry state');
assert.equal(context.normalizeEntries([{ ...validEntry, title: '  ' }]), null, 'blank title is rejected');
assert.equal(context.normalizeEntries([{ ...validEntry, title: 'x'.repeat(81) }]), null, 'long title is rejected');
assert.equal(context.normalizeEntries([{ ...validEntry, content: 'x'.repeat(3001) }]), null, 'long details are rejected');
assert.equal(context.normalizeEntries([{ ...validEntry, hours: '1.25' }]), null, 'invalid time step is rejected');
assert.equal(context.normalizeEntries([{ ...validEntry, id: 'same' }, { ...validEntry, id: 'same' }]), null, 'duplicate IDs are rejected');
assert.match(context.normalizeEntries([{ ...validEntry, id: undefined }])[0].id, /^generated-/, 'missing IDs are generated');
assert.deepEqual(Array.from(context.normalizeCategories(['A', 'a', 'B'])), ['A', 'B']);
assert.equal(context.normalizeCategories(['']), null);
assert.equal(context.normalizeTranslations({ '기획': 'Planning' })['기획'], 'Planning');
assert.equal(context.normalizeTranslations({ '기획': 42 }), null);

const versionOneBackup = {
  app: 'Worklog',
  version: 1,
  categories: ['기획'],
  categoryTranslations: { '기획': 'Planning' },
  entries: [validEntry, recurringEntry, recurringSibling]
};
assert.equal(context.validateBackup(versionOneBackup).entries.length, 3, 'version 1 backup with recurrence fields is accepted');
assert.equal(context.validateBackup(versionOneBackup).entries[1].recurrenceId, 'schedule-1', 'backup preserves recurrence group IDs');
assert.equal(context.validateBackup([validEntry]).entries.length, 1, 'legacy array backup remains supported');
assert.equal(context.validateBackup({ ...versionOneBackup, entries: [{ ...validEntry, date: '2026-02-30' }] }), null);
assert.equal(context.validateBackup({ ...versionOneBackup, categories: '기획' }), null);
assert.equal(context.validateBackup({ ...versionOneBackup, entries: [{ ...validEntry, id: 'x' }, { ...validEntry, id: 'x' }] }), null);

console.log('Worklog validation tests passed.');
