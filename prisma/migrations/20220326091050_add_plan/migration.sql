-- CreateEnum
CREATE TYPE "Plan" AS ENUM ('Normal', 'Plus');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "plan" "Plan" NOT NULL DEFAULT E'Normal';
