-- CreateEnum
CREATE TYPE "ContentKind" AS ENUM ('EXPERIENCE', 'EDUCATION', 'COURSE', 'PROJECT');

-- CreateTable
CREATE TABLE "ContentItem" (
    "id" TEXT NOT NULL,
    "kind" "ContentKind" NOT NULL,
    "company" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "location" TEXT,
    "startYm" TEXT,
    "endYm" TEXT,
    "isCurrent" BOOLEAN NOT NULL DEFAULT false,
    "periodLabel" TEXT,
    "summary" TEXT NOT NULL,
    "highlights" JSONB,
    "tech" JSONB,
    "links" JSONB,
    "pinned" BOOLEAN NOT NULL DEFAULT false,
    "pinnedOrder" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ContentItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ContentItem_kind_idx" ON "ContentItem"("kind");

-- CreateIndex
CREATE INDEX "ContentItem_pinned_pinnedOrder_idx" ON "ContentItem"("pinned", "pinnedOrder");
