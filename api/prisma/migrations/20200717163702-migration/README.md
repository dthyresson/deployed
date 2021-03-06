# Migration `20200717163702-migration`

This migration has been generated by A. David Thyresson at 7/17/2020, 4:37:02 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
DROP INDEX "public"."SiteToken.secret"

CREATE UNIQUE INDEX "Site.id_userId" ON "public"."Site"("id","userId")

CREATE UNIQUE INDEX "SiteToken.secret" ON "public"."SiteToken"("secret")

CREATE UNIQUE INDEX "SiteToken.siteId_secret" ON "public"."SiteToken"("siteId","secret")

CREATE UNIQUE INDEX "SiteToken.id_siteId_secret" ON "public"."SiteToken"("id","siteId","secret")
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200717134735-migration..20200717163702-migration
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
@@ -50,21 +50,23 @@
   deploys    Deploy[]
   siteTokens SiteToken[]
   @@index([name])
+  @@unique([id, userId])
 }
 model SiteToken {
   id        Int       @id @default(autoincrement())
   createdAt DateTime  @default(now())
   updatedAt DateTime  @updatedAt
   name      String
-  secret    String
+  secret    String    @unique
   revokedAt DateTime?
   site      Site      @relation(fields: [siteId], references: [id])
   siteId    String
-  @@index([secret])
+  @@unique([siteId, secret])
+  @@unique([id, siteId, secret])
 }
 model Deploy {
   id                     String    @id
```


