-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema mandados
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mandados
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mandados` DEFAULT CHARACTER SET utf8 ;
USE `mandados` ;

-- -----------------------------------------------------
-- Table `mandados`.`categoria`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mandados`.`categoria` (
  `idCategorias` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `imagen` VARCHAR(250) NULL DEFAULT NULL,
  PRIMARY KEY (`idCategorias`))
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `mandados`.`tipousuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mandados`.`tipousuario` (
  `idtipoUsuario` INT NOT NULL,
  `tipoUsuario` ENUM('C', 'E') NOT NULL,
  PRIMARY KEY (`idtipoUsuario`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `mandados`.`usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mandados`.`usuarios` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `correo` VARCHAR(250) NOT NULL,
  `contrasena` VARCHAR(250) NOT NULL,
  `nombre` VARCHAR(45) NOT NULL,
  `apellido` VARCHAR(45) NOT NULL,
  `telefono` VARCHAR(45) NOT NULL,
  `idtipo` INT NOT NULL DEFAULT '1',
  `activo` TINYINT NULL DEFAULT '1',
  `imagen` VARCHAR(250) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `idtipo_idx` (`idtipo` ASC) VISIBLE,
  CONSTRAINT `idtipo`
    FOREIGN KEY (`idtipo`)
    REFERENCES `mandados`.`tipousuario` (`idtipoUsuario`))
ENGINE = InnoDB
AUTO_INCREMENT = 24
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `mandados`.`pedido`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mandados`.`pedido` (
  `idPedido` INT NOT NULL AUTO_INCREMENT,
  `idUsuario` INT NOT NULL,
  `direccion` VARCHAR(45) NOT NULL,
  `estado` ENUM('AC', 'EN', 'C') NULL DEFAULT 'AC',
  `formapago` ENUM('EFECTIVO', 'TARJETA') NOT NULL,
  `codtarjeta` VARCHAR(12) NULL DEFAULT NULL,
  `fechatarjeta` DATE NULL DEFAULT NULL,
  `hora` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `numtarjeta` VARCHAR(3) NULL DEFAULT NULL,
  `total` DECIMAL(10,0) NULL DEFAULT NULL,
  PRIMARY KEY (`idPedido`),
  INDEX `idUsuario_idx` (`idUsuario` ASC) VISIBLE,
  CONSTRAINT `idUsuario`
    FOREIGN KEY (`idUsuario`)
    REFERENCES `mandados`.`usuarios` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 6
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `mandados`.`tienda`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mandados`.`tienda` (
  `idTienda` INT NOT NULL AUTO_INCREMENT,
  `nombreTienda` VARCHAR(45) NOT NULL,
  `telefono` VARCHAR(8) NOT NULL,
  `direccion` VARCHAR(250) NOT NULL,
  `idCategoria` INT NOT NULL,
  `activo` TINYINT NOT NULL DEFAULT '1',
  `imagen` VARCHAR(250) NOT NULL,
  PRIMARY KEY (`idTienda`),
  INDEX `idCategoria_idx` (`idCategoria` ASC) VISIBLE,
  CONSTRAINT `idCategoria`
    FOREIGN KEY (`idCategoria`)
    REFERENCES `mandados`.`categoria` (`idCategorias`))
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `mandados`.`productos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mandados`.`productos` (
  `idproductos` INT NOT NULL AUTO_INCREMENT,
  `nombreProducto` VARCHAR(45) NOT NULL,
  `precioProducto` VARCHAR(45) NOT NULL,
  `cantidad` INT NOT NULL,
  `estado` ENUM('AGOTADO', 'DISPONIBLE') NOT NULL DEFAULT 'DISPONIBLE',
  `imagen` VARCHAR(250) NOT NULL,
  `idtienda` INT NOT NULL,
  PRIMARY KEY (`idproductos`),
  INDEX `idtienda_idx` (`idtienda` ASC) VISIBLE,
  CONSTRAINT `idtienda`
    FOREIGN KEY (`idtienda`)
    REFERENCES `mandados`.`tienda` (`idTienda`))
ENGINE = InnoDB
AUTO_INCREMENT = 6
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `mandados`.`detallepedido`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mandados`.`detallepedido` (
  `idDetalle` INT NOT NULL AUTO_INCREMENT,
  `idpedido` INT NOT NULL,
  `idproducto` INT NOT NULL,
  `cantidad` INT NOT NULL DEFAULT '1',
  PRIMARY KEY (`idDetalle`),
  INDEX `idpedido_idx` (`idpedido` ASC) VISIBLE,
  INDEX `idproducto_idx` (`idproducto` ASC) VISIBLE,
  CONSTRAINT `idpedido`
    FOREIGN KEY (`idpedido`)
    REFERENCES `mandados`.`pedido` (`idPedido`),
  CONSTRAINT `idproducto`
    FOREIGN KEY (`idproducto`)
    REFERENCES `mandados`.`productos` (`idproductos`))
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8mb3;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
