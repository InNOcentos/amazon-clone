const dotenv = require('dotenv').config({
    path: './settings.env'
});

if (dotenv.error) {
    console.error(`Can't get env variables. Error: ${ dotenv.error }`);
    process.exit(1);
}

module.exports = {
    db_name: process.env.DB_NAME,
    db_user: process.env.DB_USER,
    db_password: process.env.DB_PASSWORD
}