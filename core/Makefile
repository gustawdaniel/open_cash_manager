#main:
#	npx prisma migrate save --experimental
#	npx prisma migrate up --experimental --verbose
#	npx prisma generate

main:
	mysql < prisma/schema.sql
	npx prisma introspect
	npx prisma generate

up:
	npm run dev
