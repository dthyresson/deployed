# Migration `20200717171601-migration`

This migration has been generated by A. David Thyresson at 7/17/2020, 5:16:01 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql

```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200717163702-migration..20200717171601-migration
--- datamodel.dml
+++ datamodel.dml
@@ -1,7 +1,7 @@
 datasource DS {
   provider = "postgresql"
-  url = "***"
+  url = "***"
 }
 generator client {
   provider      = "prisma-client-js"
@@ -97,9 +97,9 @@
   errorAt                DateTime?
   successAt              DateTime?
   site                   Site      @relation(fields: [siteId], references: [id])
   siteId                 String
-  User                   User      @relation(fields: [userId], references: [id])
+  user                   User      @relation(fields: [userId], references: [id])
   userId                 Int
   @@index([status])
   @@index([buildId])
```


