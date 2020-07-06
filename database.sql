
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "first_name" VARCHAR(200) NOT NULL,
	  "email" VARCHAR(500) NOT NULL,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
);

CREATE TABLE "list" (
	"list_id" SERIAL PRIMARY KEY,
	"user_id" INTEGER NOT NULL,
	"list_type" VARCHAR(200) NOT NULL,
	"name" VARCHAR(200) NOT NULL,
	"address" VARCHAR(400) NOT NULL,
	"rating" INTEGER NOT NULL,
	"place_id" INTEGER NOT NULL,
);
