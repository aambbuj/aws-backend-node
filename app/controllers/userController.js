const db = require("../models");
const User = db.users;
const Role = db.roles;
const Op = db.Sequelize.Op;

const bcrypt = require('bcrypt');
const saltRounds = 10;

const jwt = require('jsonwebtoken');
const getUserDetails  = require('./globalController');

////////////////////////////////// Create and Save a new User //////////////////////
exports.create = (req, res) => {

  const userDetails =  { name,email,phone,password} = req.body;
    // Validate request
    if (userDetails.name && userDetails.email && userDetails.phone && userDetails.password) {
      try {

        bcrypt.hash(userDetails.password, saltRounds, function (err,   hash) {
             userDetails.role_id = req.role.id;
            User.create(userDetails,userDetails.password=hash).then(data => {
              const secretKey = jwt.sign({ email: data.email}, 'jwt-super-secret-key',{ noTimestamp:true, expiresIn: '1h' });
              const accessToken = jwt.sign({ id: data.id}, `${secretKey}`);
              res.json({ success:'User create successfull.',status:true,data:data,accessToken:accessToken,tokenType:'x-access-token',secret_key:secretKey});
            })
            .catch(err => {
              if (err.name === 'SequelizeConnectionRefusedError') {
                res.send({ warning:"Please Check Your Internet Connection .", status:false }); 
              }
              if (err.name === 'SequelizeUniqueConstraintError') {
                res.send({ warning:err.original.sqlMessage, status:false}); 
              }else{
                res.send({ error:'Internal Server Error',status:false }); 
              }
            });
          });
            
      } catch (error) {
        return res.status(500).json({
          status: 'error',
          error: 'Internal Server Error'
        });
      }
    }else{
      res.send({
        warning:"Please fill all the fields.",
        status:false,
        data:[]
      }); 
    }
};


///////////////////// Login user ///////////////////////////////////////////////////
exports.login = (req, res) => {
    const userInfo = {email,password} = req.body;
    User.findOne({ where: { email: userInfo.email } 
      }).then(function (user) {
     if (!user) {
        res.send({status:false,warning:'plese check youe email'});
     } else {
        bcrypt.compare(userInfo.password, user.password, function (err, result) {
      if (result == true) {
        if (user.iflogin === false) {

         let userDetails = { id  : user.id , name : user.name, email: user.email, phone : user.phone ,shop_id : user.shop_id ,iflogin : user.iflogin};
          const access_token_key = jwt.sign(userDetails, 'jwt-super-secret-key');
          // const accessToken = jwt.sign({ id: User.id , email : User.email}, `${secretKey}`);
            ///////////// update token and ifLOgin status /////////////////////////
          User.update({iflogin:true}, {
            where: { id: user.id }
          }).then(num => {
              if (num == 1) {
                res.send({status:true,data:user,success:'Success',tokenType:'Bearer',access_token:access_token_key});
              } else {
                res.send({status:false,warning:'Something went wrong ,please try once'});
              }
            })
            .catch(err => {
              res.send({status:false,error:'Internal server error'});
  
            });
        }else{
          res.send({status:false,warning:'user already login,please change your password'});
        }


      } else {
        res.send({status:false,warning:'Incorrect password'});
      }
  })
 }
}).catch(err => {
  
  if(err.name === 'SequelizeConnectionRefusedError'){
    res.send({status:false,warning:'Please check your internet connection',data:[]});
  }
});;

};

////////////////// Logout //////////////////////////////////////////////////////////
exports.logout = async (req, res) => {
  User.update({token:null,iflogin:0,secret_key:null}, {
    where: { id: req.body.id }
  }).then(user => {
    res.send({status:true,success:'Success'});

  }).catch(err => {
    res.send({status:false,error:'Internal server error'});
  })
}


exports.userContent = (req, res) => {
	User.findOne({
		where: {id: req.userId},
		attributes: ['name','email'],
		include: [{
			model: Role,
			attributes: ['id', 'name'],
			through: {
				attributes: ['userId', 'roleId'],
			}
		}]
	}).then(user => {
		res.status(200).json({
			"description": "User Content Page",
			"user": user
		});
	}).catch(err => {
		res.status(500).json({
			"description": "Can not access User Page",
			"error": err
		});
	})
}

exports.adminBoard = (req, res) => {
  //res.send('lllllllllllll')
	User.findOne({
		where: {id: req.body.id},
		attributes: ['name', 'email'],
		include: [{
			model: Role,
			attributes: ['id', 'name'],
			through: {
				attributes: ['userId', 'roleId'],
			}
		}]
	}).then(user => {
		res.status(200).json({
			"description": "Admin Board",
			"user": user
		});
	}).catch(err => {
		res.status(500).json({
			"description": "Can not access Admin Board",
			"error": err
		});
	})
}

exports.managementBoard = (req, res) => {
	User.findOne({
		where: {id: req.userId},
		attributes: ['name','email'],
		include: [{
			model: Role,
			attributes: ['id', 'name'],
			through: {
				attributes: ['userId', 'roleId'],
			}
		}]
	}).then(user => {
		res.status(200).json({
			"description": "Management Board",
			"user": user
		});
	}).catch(err => {
		res.status(500).json({
			"description": "Can not access Management Board",
			"error": err
		});
	})
}
