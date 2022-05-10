-- create the databases
CREATE DATABASE IF NOT EXISTS order_db;

-- create the users for each database
CREATE USER 'admin'@'%' IDENTIFIED BY 'admin';
-- CREATE USER 'mysql.infoschema'@'localhost' IDENTIFIED BY 'password';
CREATE USER 'orderdb'@'%' IDENTIFIED BY 'orderdb';

-- grant roles / privileges
GRANT ALL PRIVILEGES ON *.* TO 'admin'@'%' WITH GRANT OPTION;
-- grant ALL PRIVILEGES ON *.* to 'mysql.infoschema'@'localhost';
GRANT CREATE, ALTER, INDEX, LOCK TABLES, REFERENCES, UPDATE, DELETE, DROP, SELECT, INSERT ON order_db.* TO 'orderdb'@'%';

FLUSH PRIVILEGES;