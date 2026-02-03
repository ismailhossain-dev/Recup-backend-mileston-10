//express setup
const express = require("express");
//mongodb
const { MongoClient, ServerApiVersion } = require("mongodb");
//connection server to client cors req structure
const cors = require("cors");
const app = express();
//express code na chole 3000 ta cholbe
const port = process.env.PORT || 3000;
//middleware connection backend & server
app.use(cors());
app.use(express.json());
//mongodb connection or location
const uri =
  "mongodb+srv://milestone-10-part-3:xMoedA7tPHTBvFJ4@cluster0.l2qjtmo.mongodb.net/?appName=Cluster0";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

//finished mongodb code
app.get("/", (req, res) => {
  res.send("Hello Crud operation");
});
//mongodb main code
async function run() {
  try {
    //uporer client er sathe try add kore diyesi
    await client.connect();
    //ping er mardome terminal bujtehe pari mongodb off naki on
    await client.db("admin").command({ ping: 1 });
    //connect hole console e dekabe
    console.log("Pinged your deployment. You successfully connect to Mongodb");
  } finally {
    //await clint.close
  }
}
//call run function
run().catch(console.dir);
//
app.listen(port, () => {
  console.log(`Simple Crud server is running on port ${port}`);
});

/*mongodb setup note
1.at least one user 
2.set uri with userId and password
3.create a mongodb client
4.add a run function to connect to the database
5.use tyr finally inside to to connect the client 
6.pint the database to see server is alive or not
*/
