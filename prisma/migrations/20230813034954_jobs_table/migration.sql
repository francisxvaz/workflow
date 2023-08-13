-- CreateTable
CREATE TABLE "Job" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "pressureEquipmentId" TEXT NOT NULL,
    "designCodeId" TEXT NOT NULL,
    "engineerId" TEXT NOT NULL,
    CONSTRAINT "Job_pressureEquipmentId_fkey" FOREIGN KEY ("pressureEquipmentId") REFERENCES "PressureEquipment" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Job_designCodeId_fkey" FOREIGN KEY ("designCodeId") REFERENCES "DesignCodes" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Job_engineerId_fkey" FOREIGN KEY ("engineerId") REFERENCES "Engineer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_DesignCodes" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "pressureEquipmentId" TEXT NOT NULL,
    CONSTRAINT "DesignCodes_pressureEquipmentId_fkey" FOREIGN KEY ("pressureEquipmentId") REFERENCES "PressureEquipment" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_DesignCodes" ("id", "name", "pressureEquipmentId") SELECT "id", "name", "pressureEquipmentId" FROM "DesignCodes";
DROP TABLE "DesignCodes";
ALTER TABLE "new_DesignCodes" RENAME TO "DesignCodes";
CREATE TABLE "new_PressureEquipment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL
);
INSERT INTO "new_PressureEquipment" ("id", "name") SELECT "id", "name" FROM "PressureEquipment";
DROP TABLE "PressureEquipment";
ALTER TABLE "new_PressureEquipment" RENAME TO "PressureEquipment";
CREATE TABLE "new_Engineer" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL
);
INSERT INTO "new_Engineer" ("id", "name") SELECT "id", "name" FROM "Engineer";
DROP TABLE "Engineer";
ALTER TABLE "new_Engineer" RENAME TO "Engineer";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
