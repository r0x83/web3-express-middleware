const express = require('express');
const app = express();


app.get('/', (req, res) => {
  console.log("hi")
  res.status(200).send(`hye there`);
});


app.listen(3000)