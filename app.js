require('dotenv').config()
const mongoose = require('mongoose')
const Customer = require('./models/Customer')
const prompt = require('prompt-sync')()

const connect = async () => {
	try {
		await mongoose.connect(process.env.MONGODB_URI)
		await main()
		await mongoose.disconnect()
	} catch (error) {
		console.error('Error connecting to MongoDB:', error)
	} finally {
		process.exit()
	}
}

const createCustomer = async () => {
	const customerData = {
		name: prompt('Enter customer name: '),
		age: parseInt(prompt('Enter customer age: ')),
	}
	const customer = await Customer.create(customerData)
	console.log(
		`id: ${customer._id} -- Name: ${customer.name}, Age: ${customer.age}`
	)
	console.log('Create Customer successfully')
}

const viewCustomers = async () => {
	const customers = await Customer.find({})
	console.log('\nBelow is a list of customers:')
	customers.forEach((customer) => {
		console.log(
			`id: ${customer._id} -- Name: ${customer.name}, Age: ${customer.age}`
		)
	})
}

const updateCustomer = async () => {
	const customers = await Customer.find({})
	console.log('\nBelow is a list of customers:')
	customers.forEach((customer) => {
		console.log(
			`id: ${customer._id} -- Name: ${customer.name}, Age: ${customer.age}`
		)
	})
	const id = prompt(
		'Copy and paste the id of the customer you would like to update here: '
	)
	const updatedCustomer = await Customer.findByIdAndUpdate(
		id,
		{
			name: prompt('Enter customer name: '),
			age: parseInt(prompt('Enter customer age: ')),
		},
		{ new: true }
	)
	console.log('Updated Customer successfully:', updatedCustomer)
}

const deleteCustomer = async () => {
	const customers = await Customer.find({})
	console.log('\nBelow is a list of customers:')
	customers.forEach((customer) => {
		console.log(
			`id: ${customer._id} -- Name: ${customer.name}, Age: ${customer.age}`
		)
	})
	const id = prompt(
		'Copy and paste the id of the customer you would like to delete here: '
	)
	await Customer.findByIdAndDelete(id)
	console.log('Deleted Customer successfully')
}

const welcomeMessage = () => {
	console.log('Welcome to the CRM\n')
}

const showMenu = () => {
	console.log('\nWhat would you like to do?')
	console.log('  1. Create a customer')
	console.log('  2. View all customers')
	console.log('  3. Update a customer')
	console.log('  4. Delete a customer')
	console.log('  5. Quit')
}

const main = async () => {
	welcomeMessage()
	while (true) {
		showMenu()
		const choice = parseInt(prompt('Number of action to run: '))

		switch (choice) {
			case 1:
				await createCustomer()
				break
			case 2:
				await viewCustomers()
				break
			case 3:
				await updateCustomer()
				break
			case 4:
				await deleteCustomer()
				break
			case 5:
				console.log('Exiting...')
				await mongoose.connection.close()
				return
			default:
				console.log('Invalid choice. Please enter a number between 1 and 5.')
		}
	}
}

connect()
