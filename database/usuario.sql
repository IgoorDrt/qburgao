CREATE TABLE IF NOT EXISTS `xdev`.`usuarios` (
`idusuarios` INT NOT NULL AUTO_INCREMENT,
`email` VARCHAR(45) NOT NULL,
`senha` VARCHAR(100) NOT NULL,
`tipo` INT NOT NULL,
PRIMARY KEY (`idusuarios`))
ENGINE = InnoDB;