-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`

DROP table if exists flowers;
DROP table if exists gemstones;
DROP table if exists cats;
DROP table if exists zodiacs;
DROP table if exists family;

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

CREATE table zodiacs (
	id BIGINT GENERATED ALWAYS AS IDENTITY,
	name VARCHAR NOT NULL,
	months VARCHAR NOT NULL,
	birth_stone VARCHAR NOT NULL
);

INSERT INTO zodiacs (name, months, birth_stone) VALUES
('Aries', 'March 21 - April 19', 'Aquamarine and Diamond'),
('Taurus', 'April 20 - May 20', 'Diamond and Emerald'),
('Gemini', 'May 21 - June 20', 'Emerald and Moonstone'),
('Cancer', 'June 21 - July 22', 'Moonstone and Ruby'),
('Leo', 'July 23 - August 22', 'Ruby and Peridot'),
('Virgo', 'August 23 - September 22', 'Peridot and Sapphire'),
('Libra', 'September 23 - October 22', 'Sapphire and Tourmaline'),
('Scorpio', 'October 23 - November 21', 'Tourmaline and Citrine'),
('Sagittarius', 'November 22 - December 21', 'Citrine and Blue Topaz'),
('Capricorn', 'December 22 - January 19', 'Blue Topaz and Garnet'),
('Aquarius', 'January 20 - February 18', 'Garnet and Amethyst');

CREATE table family (
		id BIGINT GENERATED ALWAYS AS IDENTITY,
		name VARCHAR NOT NULL,
		gender VARCHAR NOT NULL,
		relationship VARCHAR NOT NULL,
		age INT NOT NULL
);

INSERT INTO family (name, gender, relationship, age) VALUES
('Ainsley', 'Female', 'Sister', 20),
('Teagan', 'Female', 'Sister', 17),
('Ramsey', 'Female', 'Sister', 27),
('Erin', 'Female', 'Mom', 48),
('Johnny', 'Male', 'Uncle', 58),
('Shannon', 'Female', 'Aunt', 53),
('Kevin', 'Male', 'Uncle', 51),
('Nicky', 'Male', 'Cousin', 16),
('Daniel', 'Male', 'Cousin', 18),
('Brennan', 'Male', 'Uncle', 43),
('Juliet', 'Female', 'Aunt', 38),
('Audrey', 'Female', 'Cousin', 4),
('Brooke', 'Female', 'Cousin', 0.5),
('Morgan', 'Female', 'Aunt', 37),
('Sue', 'Female', 'Grandma', 74),
('John', 'Male', 'Grandpa', 76);