const { Database } = require("./database");

class User extends Database {
	constructor(user = {}) {
		super();

		this.userId = user.userId || 0;
		this.fullName = user.fullName || "";
		this.phoneNumber = user.phoneNumber || "";
		this.dateOfBirth = user.dateOfBirth || "";
		this.occupation = user.occupation || "";
		this.houseNumber = user.houseNumber || 0;
		this.streetAddress = user.streetAddress || "";
		this.residentsStatus = user.residentsStatus || "";
		this.residentOf = user.residentOf || "";
		this.hasPets = user.hasPets || 0;
		this.password = user.password || "";
	}

	createAccount() {
		let result = false;
		this.connection.execute(
			`INSERT INTO
                hs_users(
                    userId,
                    fullName,
                    phoneNumber,
                    dateOfBirth,
                    occupation,
                    houseNumber,
                    streetAddress,
                    residentsStatus,
                    residentOf,
                    hasPets,
                    password
                )
                VALUES(
                    ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
                )`,
			[
				this.userId,
				this.fullName,
				this.phoneNumber,
				this.dateOfBirth,
				this.occupation,
				this.houseNumber,
				this.streetAddress,
				this.residentsStatus,
				this.residentOf,
				this.hasPets,
				this.password,
			],
			(error, result) => {
				if (error) {
					console.log(error.sqlMessage);
					return;
				}

				console.log(result.insertId);

				result = true;
			}
		);

		return result;
	}

	static async verifyUsername(uId) {
		let storedUserId = 0;
		const connection = new Database().getConnection();

		await connection.execute(
			`SELECT
				id
			FROM
				hs_users
			WHERE
				userId = ?`,
			[uId],
			(error, result) => {
				if (error) {
					console.log(error.sqlMessage);
					return;
				}

				for (let i = 0; i < result.length; i++) {
					const user = result[i];
					storedUserId = user.id;
				}
				console.log(`User ID from callback: ${storedUserId}`);
			}
		);

		return storedUserId;
	}
}

module.exports.User = User;
