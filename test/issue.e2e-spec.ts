import { Org } from '@salesforce/core';
import { expect } from 'chai';
import listStandardValuSetTranslations from './issue';

describe('listMetadata', function () {
  this.slow(5000);
  this.timeout(20000);
  it('invalid type on FileProperties for StandardValueSetTranslation', async () => {
    const org = await Org.create({});
    const conn = org.getConnection();
    const fileProperties = await listStandardValuSetTranslations(conn);

    expect(fileProperties.length).to.deep.equal(1);
    expect(fileProperties[0].fileName).to.deep.equal(
      'standardValueSetTranslations/LeadSource-de.standardValueSetTranslation'
    );
    expect(fileProperties[0].type).to.not.deep.equal(
      'StandardValueSetTranslation'
    );
  });
});
