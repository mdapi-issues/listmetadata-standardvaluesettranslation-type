# listmetadata-standardvaluesettranslation-type

> Minimal working example to demonstrate a bug in listMetadata where the FileProperties for StandardValueSetTranslation have a broken type property

[![Actions Status](https://github.com/mdapi-issues/listmetadata-standardvaluesettranslation-type/workflows/Test%20and%20Release/badge.svg)](https://github.com/mdapi-issues/listmetadata-standardvaluesettranslation-type/actions)

## Steps to reproduce the issue

Create a scratch org with the Translation Workbench enabled

```console
sfdx force:org:create -f config/project-scratch-def.json -s
```

push some translation for a StandardValueSet (here: `StandardValueSetTranslation:LeadSource-de`)

```console
sfdx force:source:push
```

list StandardValueSetTranslations using `listMetadata`

```console
sfdx force:mdapi:listmetadata -m StandardValueSetTranslation
```

```diff
- actual
+ expected
```

```diff
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
-    "type": { "$": { "xsi:nil": "true" } }
+    "type": "StandardValueSetTranslation"
  }
]
```
