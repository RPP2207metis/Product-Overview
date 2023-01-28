CREATE TABLE `Product Overview` (
	`Product` INT,
	`Name` VARCHAR,
	`Slogan` TEXT,
	`Description` VARCHAR,
	`Category` VARCHAR,
	`Default_price` INT
);

CREATE TABLE `Styles` (
	`id` INT,
	`product_id` INT,
	`name` VARCHAR,
	`original_price` INT,
	`sale_price` INT,
	`default` BOOLEAN
);

CREATE TABLE `Features` (
	`id` INT,
	`product_id` INT,
	`feature` VARCHAR,
	`value` VARCHAR
);

CREATE TABLE `Photos` (
	`id` INT,
	`styles_id` INT,
	`url` VARCHAR,
	`thumbnail_url` VARCHAR
);

CREATE TABLE `Skus` (
	`id` INT,
	`style_id` INT,
	`size` VARCHAR,
	`quantity` INT
);

CREATE TABLE `Related` (
	`id` INT,
	`product_id` INT,
	`related_product_id` INT
);

