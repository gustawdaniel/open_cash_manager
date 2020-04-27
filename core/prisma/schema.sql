CREATE DATABASE IF NOT EXISTS cash;

USE cash;

DROP TABLE IF EXISTS Transaction;
DROP TABLE IF EXISTS Account;
DROP TABLE IF EXISTS Category;

CREATE TABLE Account
(
    id       INT                                         NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name     VARCHAR(191)                                NOT NULL,
    currency ENUM ('USD','PLN','GBP','EUR','BTC','GOLD') NOT NULL
);

CREATE TABLE Category
(
    id       INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    parentId INT,
    name     VARCHAR(191),
    color    CHAR(7),
    FOREIGN KEY (parentId) REFERENCES Category (id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE Transaction
(
    accountId   INT            NOT NULL,
    id          INT            NOT NULL AUTO_INCREMENT PRIMARY KEY,
    value       DECIMAL(20, 8) NOT NULL,
    date        DATE           NOT NULL,
    name        VARCHAR(191),
    categoryId  INT,
    description TEXT,
    FOREIGN KEY (accountId) REFERENCES Account (id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (categoryId) REFERENCES Category (id) ON DELETE SET NULL
);



