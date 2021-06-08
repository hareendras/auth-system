const passwordHash = async (password) => {
	const bcrypt = require("bcrypt");

	try {
		const saltRounds = 10;
		const plaintextPassword = password;

		const hashedPassword = await bcrypt.hash(plaintextPassword, saltRounds);
		console.log(hashedPassword);

		return hashedPassword;
	} catch (error) {
		console.log(error);
	}
};

const verifyHash = (password, hash) => {
	const bcrypt = require("bcrypt");

	return bcrypt.compareSync(password, hash);
};

const uniqueRandom = (minimum, maximum) => {
	let previousValue;

	const number = Math.floor(
		Math.random() * (maximum - minimum + 1) + minimum
	);

	previousValue =
		number === previousValue && minimum !== maximum ? random() : number;

	return previousValue;
};

module.exports.passwordHash = passwordHash;
module.exports.uniqueRandom = uniqueRandom;
