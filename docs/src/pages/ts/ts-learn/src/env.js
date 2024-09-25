// require('dotenv').config();
// console.log('USERNAME===',process.env.USERNAME);

const config = require('config')
const db = config.get('db')
console.log('db',db);
