const genUniqId = require('../../src/utils/generateUniqueId');

describe('Generate Unique ID', () => {
  it('should generate an unique ID', () => {
    const id = genUniqId();

    expect(id).toHaveLength(8);
  });
});
