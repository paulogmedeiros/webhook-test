/*
  Warnings:

  - The values [GET,DELETE,PATCH] on the enum `webhook_methods_method` will be removed. If these variants are still used in the database, this will fail.
  - The values [GET,DELETE,PATCH] on the enum `webhook_methods_method` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `webhook_methods` MODIFY `method` ENUM('POST', 'PUT') NOT NULL;

-- AlterTable
ALTER TABLE `webhook_requests` MODIFY `method` ENUM('POST', 'PUT') NOT NULL;
