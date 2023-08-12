-- CreateTable
CREATE TABLE "PressureEquipment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "DesignCodes" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "pressureEquipmentId" TEXT NOT NULL,
    CONSTRAINT "DesignCodes_pressureEquipmentId_fkey" FOREIGN KEY ("pressureEquipmentId") REFERENCES "PressureEquipment" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
