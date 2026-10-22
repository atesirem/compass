#!/usr/bin/env bash
# Dumps the database to backups/<timestamp>.sql.gz. Usage: npm run db:backup
# Needs pg_dump (PostgreSQL client tools) and DATABASE_URL (read from .env if not set).
set -euo pipefail

cd "$(dirname "$0")/.."

if [ -z "${DATABASE_URL:-}" ] && [ -f .env ]; then
  # Take the value as plain text (no shell evaluation of special characters)
  DATABASE_URL="$(grep -E '^DATABASE_URL=' .env | head -n1 | cut -d= -f2- | sed -e 's/^"//' -e 's/"$//')"
  export DATABASE_URL
fi
: "${DATABASE_URL:?DATABASE_URL is not set}"

# pg_dump does not understand Prisma's ?schema=public suffix
URL="${DATABASE_URL%%\?*}"

mkdir -p backups
OUT="backups/$(date +%Y%m%d-%H%M%S).sql.gz"
pg_dump --no-owner --no-privileges "$URL" | gzip > "$OUT"
echo "Backup written: $OUT ($(du -h "$OUT" | cut -f1))"

# Keep the 14 newest dumps
ls -1t backups/*.sql.gz 2>/dev/null | tail -n +15 | xargs -I{} rm -- {} || true
