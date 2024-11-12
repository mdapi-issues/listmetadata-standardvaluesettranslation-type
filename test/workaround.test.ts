import { expect } from "chai";
import { promises } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { fixNilType } from "../src/workaround.js";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

describe("workaround", function () {
  let expected, describeMetadataResult;
  before(async () => {
    expected = JSON.parse(
      await promises.readFile(
        join(__dirname, "fixtures", "expected.json"),
        "utf8"
      )
    );
    describeMetadataResult = JSON.parse(
      await promises.readFile(
        join(__dirname, "fixtures", "describeMetadataResult.json"),
        "utf8"
      )
    );
  });
  it("fixes the type in FileProperties for StandardValueSetTranslation", async () => {
    const buf = await promises.readFile(
      join(__dirname, "fixtures", "actual.json")
    );
    const actual = JSON.parse(buf.toString());
    const result = fixNilType(actual, describeMetadataResult);
    expect(result).to.deep.equal(expected);
  });
});
