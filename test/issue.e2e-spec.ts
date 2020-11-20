import { expect } from 'chai';
import reproduceIssue from '../src/issue';

describe('issue', function () {
  it('incorrectly DESCRIPTION', async () => {
    expect(reproduceIssue()).to.deep.equal(true);
  });
});
