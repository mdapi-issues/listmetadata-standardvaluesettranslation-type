import { expect } from 'chai';
import { fixNilType } from '../src/workaround';
import * as actual from './fixtures/actual.json';
import * as describeMetadataResult from './fixtures/describeMetadataResult.json';
import * as expected from './fixtures/expected.json';

describe('workaround', function () {
  it('fixes the type in FileProperties for StandardValueSetTranslation', async () => {
    const result = fixNilType(actual, describeMetadataResult);
    expect(result).to.deep.equal(expected);
  });
});
