const jwt = require('jsonwebtoken');
const db = require("../models/index.js");
const config = require('../config/config.js');
//const db = require('../config/db.config.js');
const Role = db.roles;
const User = db.users;
module.exports =  getUserDetails = (req, res ) => {
    const token = req.headers.authorization.split(' ')[1];  
	if (!token){
		return res.status(403).send({ 
			auth: false, message: 'No token provided.' 
		});
	}

	jwt.verify(token, "jwt-super-secret-key", (err, decoded) => {
		if (err){
			return res.status(500).send({ 
					auth: false, 
					message: 'Fail to Authentication. Error -> ' + err 
				});
		}
		
		next();
	});
}
