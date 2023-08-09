/*
  Warnings:

  - Made the column `desc` on table `Request` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Request" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "status" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "subjectId" INTEGER NOT NULL,
    "clientId" INTEGER NOT NULL,
    "teamId" INTEGER,
    "assistantId" INTEGER,
    CONSTRAINT "Request_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject" ("id") ON DELETE NO ACTION ON UPDATE CASCADE,
    CONSTRAINT "Request_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Request_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Request_assistantId_fkey" FOREIGN KEY ("assistantId") REFERENCES "Assistant" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Request" ("assistantId", "clientId", "desc", "id", "status", "subjectId", "teamId") SELECT "assistantId", "clientId", "desc", "id", "status", "subjectId", "teamId" FROM "Request";
DROP TABLE "Request";
ALTER TABLE "new_Request" RENAME TO "Request";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
