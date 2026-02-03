const express = require("express");
//cors middleware use na korle amder data client fetch korthe parbo na cors sever and client relations kore
const cors = require("cors");
//call express
const app = express();

//process.env.PORT express take astese
const port = process.env.PORT || 3000;
//cors ke function hisabe call kore disi
app.use(cors());
//express.json() ta jodi na take tahole client teke kichu data send  ba post korle backend access korthe chaile backend undefined dekay
app.use(express.json());

//express root get
app.get("/", (req, res) => {
  res.send("users server is available");
});
//main code
//create data
const users = [
  { id: 1, name: "Sabana", email: "sabana@gmail.gmail.com" },
  { id: 2, name: "Sabnur", email: "sabnur@gmail.gmail.com" },
  { id: 3, name: "Sabananur", email: "sabananur@gmail.gmail.com" },
];

app.get("/users", (req, res) => {
  res.send(users);
});

//post data
app.post("/users", (req, res) => {
  //console
  console.log("post method called", req.body);
  //terminal teke data payer pore set kore ditese body te
  const newUser = req.body;
  //client teke from jotho gola backend data patabe segolo backend asbe and client ekta data barebe jey data client teke pataitese
  newUser.id = users.length + 1;
  users.push(newUser);
  res.send(users);
});

//express port uporer Port set
app.listen(port, () => {
  console.log(`User Sever started on Port : ${port}`);
});
