-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`

DROP table if exists flowers;
DROP table if exists gemstones;
DROP table if exists cats;

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

CREATE table gemstones (
	id BIGINT GENERATED ALWAYS AS IDENTITY,
	name VARCHAR NOT NULL,
	properties VARCHAR NOT NULL,
	birth_stone BOOLEAN NOT NULL
);

INSERT INTO gemstones (name, properties, birth_stone) VALUES
('Amethyst', 'Cleansing, Protective, Inspiring', true),
('Citrine', 'Positivity, Abundance, Manifestation', true),
('Labradorite', 'Safe Exploration, Intuition, Peaceful', false),
('Thulite', 'Love, Optimism, Compassion', false);

CREATE table cats (
	id BIGINT GENERATED ALWAYS AS IDENTITY,
	name VARCHAR NOT NULL,
	color VARCHAR NOT NULL,
	favorite_food VARCHAR NOT NULL,
	age INT NOT NULL
);

INSERT INTO cats (name, color, favorite_food, age) VALUES
('Boi George', 'Tuxedo', 'Tuna', 1),
('Prince', 'Tuxedo', 'Chicken Hearts', 2),
('Orange Kitty', 'Orange', 'Salmon', 13),
('Ada', 'Grey', 'Nothing', 13),
('Blue Diamond', 'White', 'Everything', 3),
('Eddy Boi', 'Grey', 'Avocado', 4);