const { Client } = require('pg');
const { readFileSync } = require('node:fs');

const client = new Client({
	host: 'localhost',
	port: 5432,
	database: 'point_of_sale_db',
	user: 'tomconchie',
	password: '1234',
})

const buildTable = ({ tableName, columns }) => {
	const columnString = columns.map((column) => {
		return `${column.name} ${column.type}`
	}).join(", ")
	return `CREATE TABLE ${tableName}(${columnString})`
}


async function execute() {
	await client.connect()
	const tableData = readFileSync('table-data.txt').toString().split(`\n\n`).map((tableString) => {
		const tableInfo = tableString.split(`\n`)
		const tableName = tableInfo[0].replace(/\t/g, "")
		const columns = tableInfo.slice(1).map(columnString => {
			const colData = columnString.split("-")
			return { name: colData[0], type: colData[1] }
		})
		return { tableName: tableName, columns: columns }
	})

	const tableCreators = tableData.map(buildTable)
	await Promise.all(tableCreators.map(async (tCS) => client.query(tCS)))

	await client.end()
}

execute()