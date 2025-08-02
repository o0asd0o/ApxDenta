-- CreateIndex
CREATE INDEX "idx_staff_email_first_last" ON "Staff"("email", "firstName", "lastName");
