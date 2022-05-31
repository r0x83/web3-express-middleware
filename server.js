const express = require('express');
const app = express();
const {web3api, configureWeb3} = require("./routes/middleware");
configureWeb3('7bb88087b3164f9985ad54c1cf1c693bacf2e99b3271aa1ab1e30f97a9c02bdb',"http://localhost:5001")

// middleware for api
// app.use(web3api); 

// app.get('/', (req, res) => {
//   console.log("hi")
//   res.status(200).send(`hye there`);
// });

// calling middleware from inside
app.get('/',web3api({isPrivate: true}),(req, res) => {
    res.status(200).send(`hey there`);
  });


app.listen(3000)