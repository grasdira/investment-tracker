/*
  Warnings:

  - The primary key for the `holdings` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `portfolios` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `transactions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Changed the type of `type` on the `transactions` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('BUY', 'SELL', 'DIVIDEND', 'STOCK_DIVIDEND', 'STOCK_SPLIT');

-- CreateEnum
CREATE TYPE "Currency" AS ENUM ('TWD', 'USD');

-- CreateEnum
CREATE TYPE "Market" AS ENUM ('TW', 'US');

-- CreateEnum
CREATE TYPE "AccountType" AS ENUM ('CASH');

-- DropForeignKey
ALTER TABLE "holdings" DROP CONSTRAINT "holdings_portfolio_id_fkey";

-- DropForeignKey
ALTER TABLE "portfolios" DROP CONSTRAINT "portfolios_user_id_fkey";

-- DropForeignKey
ALTER TABLE "transactions" DROP CONSTRAINT "transactions_portfolio_id_fkey";

-- AlterTable
ALTER TABLE "holdings" DROP CONSTRAINT "holdings_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "portfolio_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "holdings_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "holdings_id_seq";

-- AlterTable
ALTER TABLE "portfolios" DROP CONSTRAINT "portfolios_pkey",
ADD COLUMN     "account_number" TEXT,
ADD COLUMN     "account_type" "AccountType" DEFAULT 'CASH',
ADD COLUMN     "broker" TEXT,
ADD COLUMN     "currency" "Currency" NOT NULL DEFAULT 'TWD',
ADD COLUMN     "description" TEXT,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "market" "Market",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "user_id" SET DATA TYPE TEXT,
ALTER COLUMN "name" DROP DEFAULT,
ADD CONSTRAINT "portfolios_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "portfolios_id_seq";

-- AlterTable
ALTER TABLE "transactions" DROP CONSTRAINT "transactions_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "portfolio_id" SET DATA TYPE TEXT,
DROP COLUMN "type",
ADD COLUMN     "type" "TransactionType" NOT NULL,
ADD CONSTRAINT "transactions_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "transactions_id_seq";

-- AlterTable
ALTER TABLE "users" DROP CONSTRAINT "users_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "users_id_seq";

-- CreateIndex
CREATE INDEX "transactions_type_idx" ON "transactions"("type");

-- AddForeignKey
ALTER TABLE "portfolios" ADD CONSTRAINT "portfolios_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_portfolio_id_fkey" FOREIGN KEY ("portfolio_id") REFERENCES "portfolios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "holdings" ADD CONSTRAINT "holdings_portfolio_id_fkey" FOREIGN KEY ("portfolio_id") REFERENCES "portfolios"("id") ON DELETE CASCADE ON UPDATE CASCADE;
