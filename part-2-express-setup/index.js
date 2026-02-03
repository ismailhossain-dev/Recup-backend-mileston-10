//express setup
const express = require("express");
//connection server to client cors req structure
const cors = require("cors");
const app = express();
//express code na chole 3000 ta cholbe
const port = process.env.PORT || 3000;
//middleware connection backend & server
app.use("cors");
app.use("express.json()");
app.get("/", (req, res) => {
  res.send("Hello Crud operation");
});

app.listen(port, () => {
  console.log(`Simple Crud server is running on port ${port}`);
});
//start nodemon index.js
//npm i express cors
