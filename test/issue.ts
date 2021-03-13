import type { Connection, FileProperties } from 'jsforce';

export async function listStandardValuSetTranslations(
  conn: Connection
): Promise<Array<FileProperties>> {
  let fileProperties = await conn.metadata.list({
    type: 'StandardValueSetTranslation'
  });
  if (!Array.isArray(fileProperties)) {
    fileProperties = [fileProperties];
  }
  return fileProperties;
}
