-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Assistant" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "teamId" INTEGER,
    CONSTRAINT "Assistant_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Assistant" ("id", "name", "teamId") SELECT "id", "name", "teamId" FROM "Assistant";
DROP TABLE "Assistant";
ALTER TABLE "new_Assistant" RENAME TO "Assistant";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
