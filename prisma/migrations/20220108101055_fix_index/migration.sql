-- DropIndex
DROP INDEX "News_genre_createdAt_idx";

-- CreateIndex
CREATE INDEX "News_genre_cursor_idx" ON "News"("genre", "cursor");
