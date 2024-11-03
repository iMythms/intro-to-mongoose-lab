require('dotenv').config()
const mongoose = require('mongoose')
const Customer = require('./models/Customer')
const prompt = require('prompt-sync')()

const username = prompt('What is your name? ')

console.log(`Your name is ${username}`)
