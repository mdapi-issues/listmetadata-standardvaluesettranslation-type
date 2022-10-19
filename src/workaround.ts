import type {
  DescribeMetadataResult,
  FileProperties,
} from "jsforce/api/metadata";

export function fixNilType(
  fileProperties: Array<FileProperties>,
  describeMetadataResult: DescribeMetadataResult
): Array<FileProperties> {
  return fileProperties.map((fileProperty) => {
    if (
      (!fileProperty.type ||
        typeof fileProperty.type !== "string" ||
        !fileProperty.type.length) &&
      typeof fileProperty.fileName === "string"
    ) {
      // Problem: listMetadata returns some entries with `"type": { "$": { "xsi:nil": "true" } }`.
      // Currently this is known for entries of `StandardValueSetTranslation` and `GlobalValueSetTranslation`.
      // Workaround: try to determine type based on fileName
      const filePropertyDirectoryName = fileProperty.fileName.split("/")[0];
      const metadataType = describeMetadataResult.metadataObjects.find(
        (type) => type.directoryName === filePropertyDirectoryName
      );
      if (metadataType) {
        fileProperty.type = metadataType.xmlName;
      }
    }
    return fileProperty;
  });
}
