const express = require("express");
const app = express();

const cors = require('cors');
const corsOptions ={
    origin:'http://localhost:8100', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}

app.use(cors(corsOptions));
app.use(express.json());

require("./app/routes/routes.js")(app);

const db = require("./app/models");

//  db.sequelize.sync();

// db.sequelize.sync({ alter: true }).then(() => {
//     console.log("Drop and re-sync db.");
//   });


  // db.sequelize.sync({ force: true }).then(() => {
  //   console.log("Drop and re-sync db.");
  // });

app.use(express.urlencoded({ extended: true }));


// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
