const { Client } = require('pg');
const { question } = require('readline-sync');

const client = new Client({
	host: 'localhost',
	port: 5432,
	database: 'messaging_db',
	user: 'tomconchie',
	password: '1234',
})

const buildInsertUserQuery = (username, password, email) => `INSERT INTO users (username, password, email) VALUES ('${username}','${password}','${email}')`


async function execute() {
	await client.connect()
	const username = question('Username: ')
	const password = question('Password: ')
	const email = question('Email: ')
	const query = buildInsertUserQuery(username, password, email)
	const { rows } = await client.query(query)
	console.log(rows)
	await client.end()
}

execute()