const mongoose = require('mongoose')

const uri = 'mongodb+srv://admin:Ew9mg35ppQCje0Ss@usersdb.nukhxn7.mongodb.net/?retryWrites=true&w=majority&appName=UsersDB'


mongoose.connect(uri)

const db = mongoose.connection

db.on('error', (err) => {
  console.error('DB Connection Errror', err)
})

db.on('open', (err) => {
  console.log('DB Connection Success')
})

module.exports = db