// Then create a Node application called bamazonCustomer.js. Running this application will first display all of the items available for sale. Include the ids, names, and prices of products for sale.

// The app should then prompt users with two messages.

// The first should ask them the ID of the product they would like to buy.
// The second message should ask how many units of the product they would like to buy.
// Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.

// If not, the app should log a phrase like Insufficient quantity!, and then prevent the order from going through.
// However, if your store does have enough of the product, you should fulfill the customer's order.

// This means updating the SQL database to reflect the remaining quantity.
// Once the update goes through, show the customer the total cost of their purchase.

// Dependencies
var mysql = require('mysql');
var inquirer = require('inquirer');
// npm package that makes the table more reader friendly
var Table = require('cli-table');

// Create connection to mysql
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Coco72913",
    database: "bamazon"
})
// intialize the connection
connection.connect(function (err) {
    if (err) throw err;
    console.log("Connection successful!");
    makeTable();
})

var makeTable = function () {
    connection.query("SELECT * FROM products", function (err, res) {
        // loops through of the data FROM products and consolelogs the response
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].item_id + " || " + res[i].product_name + " || " + res[i].department_name + " || " + res[i].price$ + " || " + res[i].stock_quantity + "\n");
        }
        promptCustomer(res);

    })
}

var promptCustomer = function (res) {
    // Create an inquirer prompt that asks the user what they'd like to purchase
    inquirer.prompt([{
        type: "input",
        name: "choice",
        message: "What is the name of the product you would like to purchase? [Quit with 'Q']"
    }]).then(function (answer) {
        var correct = false;
        // Quit with 'Q'
        if (answer.choice.toUpperCase() == "Q") {
            process.exit();
        }
        // loops through query
        for (var i = 0; i < res.length; i++) {
            // if the query is equal to a product name it'll set correct to true
            if (res[i].product_name == answer.choice) {
                correct = true;
                var product_name = answer.choice;
                var item_id = i;
                //Create a second inquirer prompt to see how many they would like to buy
                inquirer.prompt({
                    type: "input",
                    name: "quant",
                    message: "How many would you like to purchase? [Quit with 'Q']",
                    // user validation checks it is a number
                    validate: function (value) {

                        if (isNaN(value) == false) {
                            return true;
                        } else {
                            return false;
                        }
                    }
                }).then(function (answer) {
                    // if number is not larger than current stock quantity it will purchase that product
                    if ((res[item_id].stock_quantity = answer.quant) > 0) {
                        // Updates the stock quantity
                        connection.query("UPDATE products SET stock_quantity='" +
                            (res[item_id].stock_quantity - answer.quant) + "' WHERE product_name='"
                            + product_name + "'", function (err, res2) {
                                console.log("Product purchased!");
                                makeTable();
                            })
                        // if quantity is not available or quantity input is not an input, it will let the user know input was not valid
                    } else {
                        console.log("Not a valid selection!");
                        promptCustomer(res);
                    }
                })
            }
        }
        if (i==res.length && correct==false){
            console.log("Not a valid selection!");
            promptCustomer(res);
        }
    }
    )
}


