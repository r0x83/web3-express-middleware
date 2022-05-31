const express = require('express');
const app = express();
const {web3api, configureWeb3} = require("./middleware");
configureWeb3('7bb88087b3164f9985ad54c1cf1c693bacf2e99b3271aa1ab1e30f97a9c02bdb')

app.use(web3api); // middleware for api

app.get('/', (req, res) => {
  console.log("hi")
  res.status(200).send(`hye there`);
});


app.listen(3000)