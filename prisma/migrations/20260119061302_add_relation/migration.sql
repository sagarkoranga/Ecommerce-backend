-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "userId" INTEGER;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "customer_login"("id") ON DELETE SET NULL ON UPDATE CASCADE;
