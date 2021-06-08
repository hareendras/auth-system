const express = require("express");
const { Database } = require("./class/database");
const app = express();
const server = require("http").Server(app);
const { User } = require("./class/user");
const { passwordHash, uniqueRandom } = require("./functions");

const PORT = process.env.PORT || 8080;

app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));

app.post("/user/login/", async (req, res) => {
	const requiredFields = ["userId", "password"];

	const userId = req.body.userId || "";
	const password = req.body.password || "";

	// if (userId == "") {
	// 	res.json({
	// 		error: true,
	// 		message: "Please enter your user ID",
	// 		requiredFields: requiredFields,
	// 	});

	// 	return;
	// } else if (User.verifyUsername(userId)) {
	// 	res.json({
	// 		error: true,
	// 		message: "Invalid user ID",
	// 		requiredFields: requiredFields,
	// 	});

	// 	return;
	// } else if (password == "") {
	// 	res.json({
	// 		error: true,
	// 		message: "Please enter your password",
	// 		requiredFields: requiredFields,
	// 	});

	// 	return;
	// }














	let uId = await User.verifyUsername(userId);
	console.log(uId);

	// Response if verification was a success.
	res.json({
		error: false,
		message: "Authenticated successfully",
	});
});

app.post("/user/signup/", async (req, res) => {
	const requiredFields = [
		"userId",
		"fullName",
		"phoneNumber",
		"dateOfBirth",
		"occupation",
		"houseNumber",
		"streetAddress",
		"residentsStatus",
		"residentOf",
		"hasPets",
		"password",
	];

	const userId = req.body.userId || "";
	const fullName = req.body.fullName || "";
	const phoneNumber = req.body.phoneNumber || "";
	const dateOfBirth = req.body.dateOfBirth || "";
	const occupation = req.body.occupation || "";
	const houseNumber = req.body.houseNumber || "";
	const streetAddress = req.body.streetAddress || "";
	const residentsStatus = req.body.residentsStatus || "";
	const residentOf = req.body.residentOf || "";
	const hasPets = req.body.hasPets || "";
	let password = req.body.password || "";

	if (userId == "") {
		res.json({
			error: true,
			message: "Please enter your user ID",
			requiredFields: requiredFields,
		});

		return;
	} else if (userId.length > 8 || userId.length < 6) {
		let message =
			userId.length < 6 ? "User ID too short" : "User ID too long";
		res.json({
			error: true,
			message: `${message}, enter 6 to 8 character`,
			requiredFields: requiredFields,
		});

		return;
	} else if (fullName == "") {
		res.json({
			error: true,
			message: "Please enter your full name",
			requiredFields: requiredFields,
		});

		return;
	} else if (phoneNumber == "") {
		res.json({
			error: true,
			message: "Please enter your phone number",
			requiredFields: requiredFields,
		});

		return;
	} else if (dateOfBirth == "") {
		res.json({
			error: true,
			message: "Please select your date of birth",
			requiredFields: requiredFields,
		});

		return;
	} /*  else if (occupation == "") {
		res.json({
			error: true,
			message: "Please enter your occupation",
			requiredFields: requiredFields,
		});

		return;
	} */ else if (houseNumber == "") {
		res.json({
			error: true,
			message: "Please enter your house number",
			requiredFields: requiredFields,
		});

		return;
	} else if (streetAddress == "") {
		res.json({
			error: true,
			message: "Please enter your street address",
			requiredFields: requiredFields,
		});

		return;
	} else if (residentsStatus == "") {
		res.json({
			error: true,
			message: "Please select a residents status",
			requiredFields: requiredFields,
		});

		return;
	} else if (residentOf == "") {
		res.json({
			error: true,
			message: "Please select resident of",
			requiredFields: requiredFields,
		});

		return;
	} else if (hasPets == "") {
		res.json({
			error: true,
			message: "Please tell if you have pets",
			requiredFields: requiredFields,
		});

		return;
	} else if (password == "") {
		res.json({
			error: true,
			message: "Please enter your password",
			requiredFields: requiredFields,
		});

		return;
	}

	// Hash the password
	try {
		password = await passwordHash(password);
	} catch (error) {
		console.log(error);
	}

	const user = new User({
		userId: uniqueRandom(100000, 999999),
		fullName: fullName,
		phoneNumber: "08134" + uniqueRandom(100000, 999999),
		dateOfBirth: dateOfBirth,
		occupation: occupation,
		houseNumber: houseNumber,
		streetAddress: streetAddress,
		residentsStatus: residentsStatus,
		residentOf: residentOf,
		hasPets: hasPets,
		password: password,
	});

	user.createAccount();

	res.json({
		error: false,
		message: "Account created successfully",
	});
});

app.get("/test", async (req, res) => {
	try {
		const db = new Database();

		console.log(db.getConnection());
	} catch (error) {
		console.log(error);
	}

	res.send(`<h1>Hello</h1>`);
});

server.listen(PORT, () => {
	console.log(`Server running at https://localhost:${PORT}/`);
});
