# listmetadata-standardvaluesettranslation-type

> Minimal working example to demonstrate a bug in listMetadata where the FileProperties for StandardValueSetTranslation have a broken type property

FileProperties with invalid type

```json
[
  {
    "createdById": "005P00000063pPzIAI",
    "createdByName": "User User",
    "createdDate": "1970-01-01T00:00:00.000Z",
    "fileName": "standardValueSetTranslations/LeadSource-de.standardValueSetTranslation",
    "fullName": "LeadSource-de",
    "id": "",
    "lastModifiedById": "005P00000063pPzIAI",
    "lastModifiedByName": "User User",
    "lastModifiedDate": "1970-01-01T00:00:00.000Z",
    "namespacePrefix": "",
    "type": { "$": { "xsi:nil": "true" } }
  }
]
```

where `"type": { "$": { "xsi:nil": "true" } }` should be `"type": "StandardValueSetTranslation"`
