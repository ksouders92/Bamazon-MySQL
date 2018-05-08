DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INTEGER(100) NOT NULL,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(30),
  price$ DECIMAL(8,2),
  stock_quantity INTEGER(10),
  PRIMARY KEY (item_id)
);

INSERT INTO products (item_id, product_name, department_name, price$, stock_quantity)
VALUES (001, "Nintendo Switch", "electronics", 299.00, 207);

INSERT INTO products (item_id, product_name, department_name, price$, stock_quantity)
VALUES (002, "Apple Iphone X", "electronics", 999.99, 256);

INSERT INTO products (item_id, product_name, department_name, price$, stock_quantity)
VALUES (003, "Microsoft Surface Laptop", "electronics", 699.00, 567);

INSERT INTO products (item_id, product_name, department_name, price$, stock_quantity)
VALUES (004, "DJI Spark", "electronics", 499.00, 551);

INSERT INTO products (item_id, product_name, department_name, price$, stock_quantity)
VALUES (005, "Samsung Galaxy S8", "electronics", 599.99, 709);

INSERT INTO products (item_id, product_name, department_name, price$, stock_quantity)
VALUES (006, "Super Nintendo Electronic System (Classic)", "electronics", 99.95, 456);

INSERT INTO products (item_id, product_name, department_name, price$, stock_quantity)
VALUES (007, "Amazon Echo (2nd gen.)", "electronics", 99.99, 957);

INSERT INTO products (item_id, product_name, department_name, price$, stock_quantity)
VALUES (008, "Xbox One X", "electronics", 484.60, 430);

INSERT INTO products (item_id, product_name, department_name, price$, stock_quantity)
VALUES (009, "Apple Watch 3", "electronics", 329.00, 758);

INSERT INTO products (item_id, product_name, department_name, price$, stock_quantity)
VALUES (010, "Sony Alpha A7R III", "electronics", 3198.00, 79);