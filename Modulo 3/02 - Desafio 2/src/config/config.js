const dotenv = require('dotenv');
dotenv.config();
const { Command } = require('commander')

const program = new Command()

program 
    .option('--mode <mode>', 'Modo de trabajo', '')//development') //production
program.parse()

let environment;

console.log('config.js - PROGRAM: ' + program.opts().mode)

if (program.opts().mode == 'development') {
    environment = 'development'
} else {
    environment = 'production'
}

console.log('config.js - ENVIROMENT: ' + environment)

dotenv.config({
    path: environment === 'production' ? './.env.production' : './.env.development'
});

module.exports = {
    PORT: process.env.PORT,
    DB: process.env.DB,
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
    GMAIL_ACCOUNT: process.env.GMAIL_ACCOUNT,
    GMAIL_APP_PASSWD: process.env.GMAIL_APP_PASSWD,
    ENVIROMENT: process.env.ENVIROMENT
};
