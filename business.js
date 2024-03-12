const { Client } = require('pg');

const client = new Client({
	host: 'localhost',
	port: 5432,
	database: 'messaging_db',
	user: 'tomconchie',
	password: '1234',
})

const getAll = async () => {
	await client.connect()
	const query = `SELECT * FROM businesses;`
	const { rows } = await client.query(query)
	return rows;
}

const getById = async (id) => {
	await client.connect()
	const query = `SELECT * FROM businesses WHERE id = '${id}';`
	const { rows } = await client.query(query)
	return rows;
}

const create = async ({ name, phone, email, tpn }) => {
	await client.connect()
	const query = `INSERT INTO businesses (name, phone, email, tpn) VALUES ('${name}', '${phone}', '${email}', '${tpn}')`
	const { rows } = await client.query(query)
	return rows;
}

const updateById = async (id, { email, phone }) => {
	await client.connect()
	const query = `UPDATE businesses SET email = '${email}', phone = '${phone}' WHERE id = '${id}'`
	const { rows } = await client.query(query)
	return rows;
}