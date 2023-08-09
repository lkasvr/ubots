-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Subject" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "desc" TEXT,
    "teamId" INTEGER NOT NULL,
    CONSTRAINT "Subject_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team" ("id") ON DELETE NO ACTION ON UPDATE CASCADE
);
INSERT INTO "new_Subject" ("id", "name", "teamId") SELECT "id", "name", "teamId" FROM "Subject";
DROP TABLE "Subject";
ALTER TABLE "new_Subject" RENAME TO "Subject";
CREATE UNIQUE INDEX "Subject_name_key" ON "Subject"("name");
CREATE UNIQUE INDEX "Subject_teamId_key" ON "Subject"("teamId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
