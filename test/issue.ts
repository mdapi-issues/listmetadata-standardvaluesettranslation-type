import type { Connection } from "@salesforce/core";
import type { FileProperties } from "jsforce/api/metadata";

export async function listStandardValuSetTranslations(
  conn: Connection
): Promise<Array<FileProperties>> {
  let fileProperties = await conn.metadata.list({
    type: "StandardValueSetTranslation",
  });
  if (!Array.isArray(fileProperties)) {
    fileProperties = [fileProperties];
  }
  return fileProperties;
}
