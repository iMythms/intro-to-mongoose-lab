require('dotenv').config()
const mongoose = require('mongoose')
const Customer = require('./models/Customer')
const prompt = require('prompt-sync')()

const username = prompt('What is your name? ')

console.log(`Your name is ${username}`)

const connect = async () => {
	await mongoose.connect(process.env.MONGODB_URI)
	console.log('Connected to MongoDB')

	await mongoose.disconnect()
	console.log('Disconnected from MongoDB')

	process.exit()
}

/* Ex1: Developing the user interface
• Start by displaying a welcome message to the user.
• Implement a simple menu system that lets the user choose an action (Create, View, Update, Delete, Quit). 
  Use prompt-sync to get the user’s choice and handle it accordingly.
• When figuring out what the user wants to do, it’s probably easiest to prompt them to choose from various options in a numbered list. 
  This way, the user just enters a number and the application knows what to do next.
• When dealing with choosing a specific customer to update or delete, it’s probably easiest to list the customers in the database 
  along with their ids. Then prompt the user to enter id of the user that needs to be updated/deleted.
*/

/* Ex2: Sample exchange
Use the following example as a guide when designing your application:

Starting the application
Welcome to the CRM

What would you like to do?

  1. Create a customer
  2. View all customers
  3. Update a customer
  4. Delete a customer
  5. quit

Number of action to run: 
# user inputs 3
*/

/* Ex3: Updating a customer
Below is a list of customers: 

id: 658226acdcbecfe9b99d5421 --  Name: Matt, Age: 43
id: 65825d1ead6cd90c5c430e24 --  Name: Vivienne, Age: 6

Copy and paste the id of the customer you would like to update here: 
# user inputs 658226acdcbecfe9b99d5421

What is the customers new name?
# user inputs Bilbo
What is the customers new age?
# user inputs 50
*/

/* Ex4: Choosing next action
What would you like to do?

  1. Create a customer
  2. View all customers
  3. Update a customer
  4. Delete a customer
  5. Quit

Number of action to run: 
# user inputs 2
*/

/* Ex5: Viewing updated customers
id: 658226acdcbecfe9b99d5421 --  Name: Bilbo, Age: 50
id: 65825d1ead6cd90c5c430e24 --  Name: Vivienne, Age: 6
*/

/* Ex6: Choosing next action
What would you like to do?

  1. Create a customer
  2. View all customers
  3. Update a customer
  4. Delete a customer
  5. Quit

Number of action to run: 
# user inputs 5
*/

/* Note: Exiting the application
  • When you run your CRM application using node app.js, it starts an active session. 
    For the application to exit cleanly, it is essential to close the MongoDB connection. 
    This prevents potential issues like memory leaks or hanging processes.

  • When the exit condition is met (e.g., the user selects ‘Quit’), call mongoose.connection.close() in app.js. 
    This command safely closes the connection to your MongoDB database.
*/

// Establishing the connection
connect()
