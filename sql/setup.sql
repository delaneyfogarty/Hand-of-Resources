-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`

DROP table if exists flowers;

CREATE table flowers (
	id BIGINT GENERATED ALWAYS AS IDENTITY,
	name VARCHAR NOT NULL,
	color VARCHAR NOT NULL
);

INSERT INTO flowers (name, color) VALUES
('Rose', 'Red'),
('Lilac', 'Purple'),
('Daisy', 'White'),
('Tulip', 'Yellow'),
('Hydrangea', 'Blue');