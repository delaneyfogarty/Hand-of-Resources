-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`

DROP table if exists flowers;
DROP table if exists gemstones;

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