import { Org } from '@salesforce/core';
import { FileProperties } from 'jsforce';

export default async function listStandardValuSetTranslations(): Promise<
  Array<FileProperties>
> {
  const org = await Org.create({});
  const conn = org.getConnection();
  let fileProperties = await conn.metadata.list({
    type: 'StandardValueSetTranslation'
  });
  if (!Array.isArray(fileProperties)) {
    fileProperties = [fileProperties];
  }
  return fileProperties;
}
