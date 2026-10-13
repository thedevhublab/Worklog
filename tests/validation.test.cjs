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
  Date, Math, Number, String, Set, Array, Object, JSON
});
vm.runInContext(slice('  const validDate =', '  const load=()=>') + [
  'this.validDate = validDate;',
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
assert.equal(context.normalizeHours('0'), '0');
assert.equal(context.normalizeHours('24'), '24');
assert.equal(context.normalizeHours('1.5'), '1.5');
assert.equal(context.normalizeHours('0.25'), null, 'quarter-hour increments are rejected');
assert.equal(context.normalizeHours('24.5'), null, 'time above 24 hours is rejected');
assert.equal(context.normalizeEntries([validEntry]).length, 1);
assert.equal(context.normalizeEntries([validEntry])[0].status, 'create', 'entries without a status keep backward compatibility');
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
  entries: [validEntry]
};
assert.equal(context.validateBackup(versionOneBackup).entries.length, 1, 'version 1 backup is accepted');
assert.equal(context.validateBackup([validEntry]).entries.length, 1, 'legacy array backup remains supported');
assert.equal(context.validateBackup({ ...versionOneBackup, entries: [{ ...validEntry, date: '2026-02-30' }] }), null);
assert.equal(context.validateBackup({ ...versionOneBackup, categories: '기획' }), null);
assert.equal(context.validateBackup({ ...versionOneBackup, entries: [{ ...validEntry, id: 'x' }, { ...validEntry, id: 'x' }] }), null);

console.log('Worklog validation tests passed.');
