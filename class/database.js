const mysql = require("mysql2");

class Database {
	constructor(host, username, password, database) {
		this.host = host;
		this.username = username;
		this.password = password;
		this.database = database;

		try {
			this.connection = mysql.createConnection({
				host: this.host || "localhost",
				user: this.username || "binemmanuel",
				password: this.password || "SMARTlogin89",
				database: this.database || "homestead",
			});
		} catch (error) {
			console.log(error);
		}
	}

	getConnection() {
		return this.connection;
	}
}

module.exports.Database = Database;
