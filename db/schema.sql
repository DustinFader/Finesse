-- Official DB Set-up Below --


--------------------------------------------------------------------------
-- INSTRUCTIONS:
-- log in to PSQL using the typical credentials from the bootcamp.
-- Create the database by entering "CREATE DATABASE finesse;"
-- \cd into the finesse database.
-- run this file by entering "\i db/schema.sql" in the command line.
-- This command should automatically prompt postgres to create the tables and all relevant references.
-- Refer to comments in the code if you need clarification on what it's doing.
-- If you have any questions, give me a shout and I'll try to answer them the best I can! Thanks! - Katelynn <3.
--------------------------------------------------------------------------


-- All "DROP TABLE IF EXISTS" lines run at the start of the file so that we can "clear" the database at any time and start with tables without any data.
-- This will happen any time you run the "\i db/schema.sql" command in postgres, meaning that running this command means you need to insert the dummy data once again.

DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS payments CASCADE;
DROP TABLE IF EXISTS categories CASCADE;


CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE categories (
  category_id SERIAL PRIMARY KEY NOT NULL, -- Slightly different from ERD, figured it was good to have consistent column names for foreign/primary keys.
  name VARCHAR(255) NOT NULL
);

CREATE TABLE payments (
  payment_id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  category_id INTEGER REFERENCES categories(category_id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  amount INTEGER NOT NULL,
  is_additive BOOLEAN NOT NULL
);

-- Due to the way our references work, we have to create the tables without the initial payment_id columns (above), and then add them after they've been created. (below)
-- This needs to happen because the commands run sequentially, and - as an example - users has to reference the payments table when it has not been created yet.
-- Thus, we simply create the tables without the problematic references first, then add them afterwords, below.

ALTER TABLE users
  ADD COLUMN payment_id INTEGER REFERENCES payments(payment_id) ON DELETE CASCADE;

ALTER TABLE categories
  ADD COLUMN payment_id INTEGER REFERENCES payments(payment_id) ON DELETE CASCADE;
