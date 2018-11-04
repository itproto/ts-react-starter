import { isEmptyString, isDirty, isDuplicateKey } from '../validation';
import { getSampleDictionary } from '../../../__fixtures__/dictionary.fixture';
import { DictValues } from '../../../@types/api';

describe('ditionary entries editor validation', () => {
  it('should validate empty string', () => {
    expect(isEmptyString(' ')).toBe(true);
    expect(isEmptyString(' x')).toBe(false);
  });

  let entries: DictValues[];
  const sampleEntry = {
    id: '1',
    from: 'Anthracite',
    to: 'Dark Grey'
  };

  beforeEach(() => {
    entries = getSampleDictionary().values;
  });

  it('should validate duplicate keys', () => {
    const duplicateEntries = [...entries, sampleEntry];
    expect(isDuplicateKey(sampleEntry.from, duplicateEntries)).toBe(true);

    expect(
      isDuplicateKey('1', [
        { from: '1', to: '2', id: 'x' },
        { from: '3', to: '4', id: 'x' },
        { from: '5', to: '6', id: 'x' }
      ])
    ).toBe(false);

    expect(
      isDuplicateKey('3', [
        { from: '1', to: '2', id: 'x' },
        { from: '3', to: '4', id: 'x' },
        { from: '5', to: '6', id: 'x' },
        { from: '3', to: '4', id: 'x' }
      ])
    ).toBe(true);
  });

  it('should validate dirty keys/values', () => {
    expect(isDirty(sampleEntry, entries)).toBe(false);

    expect(
      isDirty(
        {
          id: '1',
          from: 'Anthrac_', // dirty key
          to: 'Dark Grey'
        },
        entries
      )
    ).toBe(true);

    expect(
      isDirty(
        {
          id: '1',
          from: 'Anthrac_',
          to: 'Dark Grey' // not dirty value
        },
        entries,
        'to'
      )
    ).toBe(false);

    expect(
      isDirty(
        {
          id: '1',
          from: 'Anthrac_',
          to: 'Dark ' // dirty value
        },
        entries,
        'to'
      )
    ).toBe(true);
  });
});
