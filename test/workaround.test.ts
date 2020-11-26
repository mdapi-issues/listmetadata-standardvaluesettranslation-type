import { expect } from 'chai';
import { promises } from 'fs';
import * as path from 'path';
import { fixNilType } from '../src/workaround';
import * as describeMetadataResult from './fixtures/describeMetadataResult.json';
import * as expected from './fixtures/expected.json';

describe('workaround', function () {
  it('fixes the type in FileProperties for StandardValueSetTranslation', async () => {
    const buf = await promises.readFile(
      path.join(__dirname, 'fixtures', 'actual.json')
    );
    const actual = JSON.parse(buf.toString());
    const result = fixNilType(actual, describeMetadataResult);
    expect(result).to.deep.equal(expected);
  });
});
