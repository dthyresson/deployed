# Migration `20200715090018-create_schema`

This migration has been generated by A. David Thyresson at 7/15/2020, 9:00:18 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "public"."User" (
"createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,"email" text  NOT NULL ,"emailVerified" boolean   ,"id" SERIAL,"lastIp" text   ,"lastLogin" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,"loginsCount" integer  NOT NULL DEFAULT 0,"name" text  NOT NULL ,"nickname" text  NOT NULL ,"picture" text  NOT NULL ,"updatedAt" timestamp(3)  NOT NULL ,"userId" text  NOT NULL ,
    PRIMARY KEY ("id"))

CREATE TABLE "public"."Site" (
"accountName" text  NOT NULL ,"accountSlug" text  NOT NULL ,"createdAt" timestamp(3)  NOT NULL ,"id" text  NOT NULL ,"name" text  NOT NULL ,"screenshotUrl" text   ,"updatedAt" timestamp(3)  NOT NULL ,"url" text  NOT NULL ,"userId" integer  NOT NULL ,
    PRIMARY KEY ("id"))

CREATE TABLE "public"."Deploy" (
"createdAt" timestamp(3)  NOT NULL ,"id" text  NOT NULL ,"locked" boolean  NOT NULL ,"name" text  NOT NULL ,"publishedAt" timestamp(3)   ,"siteId" text  NOT NULL ,"title" text  NOT NULL ,"updatedAt" timestamp(3)  NOT NULL ,"url" text  NOT NULL ,"userId" integer  NOT NULL ,
    PRIMARY KEY ("id"))

CREATE UNIQUE INDEX "User.email" ON "public"."User"("email")

CREATE UNIQUE INDEX "User.userId" ON "public"."User"("userId")

ALTER TABLE "public"."Site" ADD FOREIGN KEY ("userId")REFERENCES "public"."User"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."Deploy" ADD FOREIGN KEY ("siteId")REFERENCES "public"."Site"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."Deploy" ADD FOREIGN KEY ("userId")REFERENCES "public"."User"("id") ON DELETE CASCADE  ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20200715090018-create_schema
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,55 @@
+datasource DS {
+  provider = "postgresql"
+  url = "***"
+}
+
+generator client {
+  provider      = "prisma-client-js"
+  binaryTargets = env("BINARY_TARGET")
+}
+
+model User {
+  id            Int      @id @default(autoincrement())
+  createdAt     DateTime @default(now())
+  updatedAt     DateTime @updatedAt
+  email         String   @unique
+  emailVerified Boolean?
+  lastIp        String?
+  lastLogin     DateTime @default(now())
+  loginsCount   Int      @default(0)
+  name          String
+  nickname      String
+  picture       String
+  userId        String   @unique
+  site          Site[]
+  deploy        Deploy[]
+}
+
+model Site {
+  id            String   @id
+  createdAt     DateTime
+  updatedAt     DateTime
+  name          String
+  accountName   String
+  accountSlug   String
+  url           String
+  screenshotUrl String?
+  user          User     @relation(fields: [userId], references: [id])
+  userId        Int
+  deploys       Deploy[]
+}
+
+model Deploy {
+  id          String    @id
+  createdAt   DateTime
+  updatedAt   DateTime
+  publishedAt DateTime?
+  name        String
+  title       String
+  url         String
+  locked      Boolean
+  site        Site      @relation(fields: [siteId], references: [id])
+  siteId      String
+  User        User      @relation(fields: [userId], references: [id])
+  userId      Int
+}
```

