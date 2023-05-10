/*
  Warnings:

  - Added the required column `exerciseId` to the `sessions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `workoutId` to the `sessions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "sessions" ADD COLUMN     "exerciseId" TEXT NOT NULL,
ADD COLUMN     "workoutId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "set_types" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "set_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sets" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "setTypeId" INTEGER NOT NULL,
    "sequenceNumber" INTEGER NOT NULL DEFAULT 1,
    "weight" DOUBLE PRECISION NOT NULL,
    "repsCount" INTEGER NOT NULL,
    "isCompleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "sets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "body_measurements" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "weight" DOUBLE PRECISION,
    "height" DOUBLE PRECISION,
    "chest" DOUBLE PRECISION,
    "nect" DOUBLE PRECISION,
    "shoulders" DOUBLE PRECISION,
    "leftBicep" DOUBLE PRECISION,
    "rightBicep" DOUBLE PRECISION,
    "leftForearm" DOUBLE PRECISION,
    "rightForearm" DOUBLE PRECISION,
    "waist" DOUBLE PRECISION,
    "thighs" DOUBLE PRECISION,
    "calves" DOUBLE PRECISION,

    CONSTRAINT "body_measurements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ExerciseToRoutine" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ExerciseToRoutine_AB_unique" ON "_ExerciseToRoutine"("A", "B");

-- CreateIndex
CREATE INDEX "_ExerciseToRoutine_B_index" ON "_ExerciseToRoutine"("B");

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "exercises"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_workoutId_fkey" FOREIGN KEY ("workoutId") REFERENCES "workouts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sets" ADD CONSTRAINT "sets_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "sessions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sets" ADD CONSTRAINT "sets_setTypeId_fkey" FOREIGN KEY ("setTypeId") REFERENCES "set_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "body_measurements" ADD CONSTRAINT "body_measurements_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExerciseToRoutine" ADD CONSTRAINT "_ExerciseToRoutine_A_fkey" FOREIGN KEY ("A") REFERENCES "exercises"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExerciseToRoutine" ADD CONSTRAINT "_ExerciseToRoutine_B_fkey" FOREIGN KEY ("B") REFERENCES "routines"("id") ON DELETE CASCADE ON UPDATE CASCADE;
