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
        var table = new Table({
            head: ["item_id", "product_name", "department_name", "price$", "stock_quantity"],
            colWidth: [50, 100]
        });
        for (var i = 0; i < res.length; i++) {
            // loops through of the data FROM products and push' responses to table
            table.push([res[i].item_id, res[i].product_name, res[i].department_name, res[i].price$, res[i].stock_quantity]);
        }
        console.log("ITEMS AVAIABLE (FULL INVENTORY)");
        console.log("================================================================================================================");
        // logs the table with items in for purchase
        console.log(table.toString());
        console.log("================================================================================================================");

        promptCustomer(res);
    }
    )
}
// prompts user with two messages
var promptCustomer = function (res) {
    inquirer.prompt([{
        type: "input",
        name: "choice",
        message: "What would you like to purchase? ['Q' to Quit]"
    }]).then(function (answer) {
        var correct = false;
        for (var i = 0; i < res.length; i++) {
            if (res[i].product_name == answer.choice) {
                correct = true;
                var product = answer.choice;
                var id = i;
                inquirer.prompt({
                    name: "quant",
                    type: "input",
                    message: "How many would you like to buy?",
                    // validates that user entered a number
                    validate: function (value) {
                        if (isNaN(value) == false) {
                            return true;
                        } else {
                            return false;
                        }
                    }
                }).then(function(answer){
                    if((res[id].stock_quantity-answer.quant)>0){
                        connection.query("UPDATE products SET stock_quantity='"+(res[id].stock_quantity-answer.quant)+"' WHERE product_name='"+product+"'", function(err, res2){
                            console.log("Product bought!");
                            makeTable();
                        })

                    } else {
                        console.log("Not a valid selection");
                        promptCustomer(res);
                    }

             })

            }
        }}
                          
