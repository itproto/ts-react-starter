const sampleDictionary = {
  name: 'default',
  values: [
    {
      id: '1',
      from: 'Anthracite',
      to: 'Dark Grey'
    },
    {
      id: '2',
      from: 'Midnight Black',
      to: 'Black'
    },
    {
      id: '3',
      from: 'Mystic Silver',
      to: 'Silver'
    }
  ]
};

export const getSampleDictionary = () => ({ ...sampleDictionary });
