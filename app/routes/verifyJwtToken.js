const jwt = require('jsonwebtoken');
const db = require("../models/index.js");
const config = require('../config/config.js');
//const db = require('../config/db.config.js');
const Role = db.roles;
const User = db.users;

verifyToken = (req, res, next) => {
	//res.send(req.headers);
	if (req.headers.authorization) {

		const token = req.headers.authorization.split(' ')[1];

		jwt.verify(token, "jwt-super-secret-key", (err, decoded) => {
			if (err) {
				return res.status(500).send({
					auth: false,
					message: 'Fail to Authentication. Error -> ' + err
				});
			}
			req.AuthUser = decoded;
			next();
		});
	}
	if (!req.headers.authorization) {
		return res.status(403).send({
			auth: false, message: 'No token provided.'
		});
	}
}


 AdminRole = async (req, res, next) => {

	const role = await Role.findOne({where:{name:'admin'}});
	req.role = role;
	next();
	//res.status(403).send(role);
	//return;
}

SellerRole = async (req, res, next) => {

	const role = await Role.findOne({where:{name:'seller'}});
	req.role = role;
	next();
}


isAdmin = (req, res, next) => {
	User.findOne({ id: req.body.id })
		.then(user => {
			user.getRoles().then(roles => {
				for (let i = 0; i < roles.length; i++) {
					console.log(roles[i].name);
					if (roles[i].name.toUpperCase() === "ADMIN") {
						next();
						return;
					}
				}
				res.status(403).send("Require Admin Role!");
				return;
			})
		})
}

isPmOrAdmin = (req, res, next) => {

	User.findById(req.userId)
		.then(user => {
			user.getRoles().then(roles => {
				for (let i = 0; i < roles.length; i++) {
					if (roles[i].name.toUpperCase() === "PM") {
						next();
						return;
					}

					if (roles[i].name.toUpperCase() === "ADMIN") {
						next();
						return;
					}
				}

				res.status(403).send("Require PM or Admin Roles!");
			})
		})
}

const authJwt = {};
authJwt.verifyToken = verifyToken;
authJwt.isAdmin = isAdmin;
authJwt.isPmOrAdmin = isPmOrAdmin;
authJwt.AdminRole = AdminRole;
authJwt.SellerRole = SellerRole;

module.exports = authJwt;