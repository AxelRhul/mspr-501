/*
  Warnings:

  - You are about to drop the `VerificationRequest` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `accounts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `sessions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `userName` on the `Plant` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Comment` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Plant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Comment` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "VerificationRequest_identifier_token_key";

-- DropIndex
DROP INDEX "VerificationRequest_token_key";

-- DropIndex
DROP INDEX "accounts_provider_provider_account_id_key";

-- DropIndex
DROP INDEX "sessions_session_token_key";

-- DropIndex
DROP INDEX "users_email_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "VerificationRequest";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "accounts";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "sessions";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "users";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" DATETIME NOT NULL,
    CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "email" TEXT,
    "emailVerified" DATETIME,
    "image" TEXT
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" DATETIME NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Plant" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Plant_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Plant" ("id", "name") SELECT "id", "name" FROM "Plant";
DROP TABLE "Plant";
ALTER TABLE "new_Plant" RENAME TO "Plant";
CREATE TABLE "new_Comment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "content" TEXT NOT NULL,
    "plant_id" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Comment_plant_id_fkey" FOREIGN KEY ("plant_id") REFERENCES "Plant" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Comment" ("content", "createdAt", "id", "plant_id") SELECT "content", "createdAt", "id", "plant_id" FROM "Comment";
DROP TABLE "Comment";
ALTER TABLE "new_Comment" RENAME TO "Comment";
PRAGMA foreign_key_check("Plant");
PRAGMA foreign_key_check("Comment");
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");
