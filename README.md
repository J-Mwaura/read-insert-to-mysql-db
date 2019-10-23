A simple node js application that reads and inserts data to a database
APIs used
-express
-express-handlebars
-body-parser
-mysql

database name salesdb on localhost
-table
CREATE TABLE IF NOT EXISTS `salesdb`.`category` (
    `id` INT(11) NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(45) NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE INDEX `id_UNIQUE` (`id` ASC))
  ENGINE = InnoDB
  AUTO_INCREMENT = 29
  DEFAULT CHARACTER SET = UTF-8;

