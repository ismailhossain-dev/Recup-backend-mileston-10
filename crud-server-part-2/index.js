//express setup
const express = require("express");
//mongodb
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
//connection server to client cors req structure
const cors = require("cors");
const app = express();
//express code na chole 3000 ta cholbe
const port = process.env.PORT || 3000;
//middleware connection backend & server
app.use(cors());
//client teke server data receive korbe express website
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
//this express code root
app.get("/", (req, res) => {
  res.send("Hello Crud operation");
});
//mongodb main code
async function run() {
  try {
    //uporer client er sathe try add kore diyesi
    await client.connect();
    const userDB = client.db("userDB");
    const userCollection = userDB.collection("users");
    const practiceVideo4 = userDB.collection("practice4");
    //add database related apis here
    app.post("/users", async (req, res) => {
      //client ja ja kichu pataichi seta req.body pabo
      const newUser = req.body;
      console.log(newUser);
      //send data database or mongodb
      const result = await userCollection.insertOne(newUser);
      res.send(result);
    });

    //v:4 practice post
    app.post("/practice4", async (req, res) => {
      //receive clint data
      const user = req.body;
      console.log("practice route hitting");
      const result = await practiceVideo4.insertOne(user);
      res.send(result);
    });

    //v:5 get data
    app.get("/user", async (req, res) => {
      const cursor = userCollection.find();
      //cursor take array te convert korar jorno await use korbo
      const result = await cursor.toArray();
      res.send(result);
    });

    //v:6
    //delete user
    app.delete("/users/:id", async (req, res) => {
      //req.params er mardome amra client teke information nei
      // console.log(req.params.id);
      const id = req.params.id;
      //database id take object hisabe tai amra client id take object convert kortesi
      const query = { _id: new ObjectId(id) };
      const result = await userCollection.deleteOne(query);
      res.send(result);
    });

    //getting single data for user
    //test website http://localhost:3000/user/3045034549455
    app.get("/user/:id", async (req, res) => {
      const id = req.params.id;
      //client id ke objectid te convert korthe and find kortesi
      const query = { _id: new ObjectId(id) };
      console.log("need with id", id);
      const result = await userCollection.findOne(query);
      res.send(result);
    });

    //update data api
    app.patch("/users/:id", async (req, res) => {
      //client teke frontend value ta niye asteses
      const id = req.params.id;
      //UpdateUser data receive
      const updateUser = req.body;
      console.log("to update", id, updateUser);

      //send id mongodb and covert the object
      const query = { _id: new ObjectId(id) };
      const update = {
        $set: {
          name: updateUser.name,
          email: updateUser.email,
        },
      };
      //optional
      const options = {};
      const result = await userCollection.updateOne(query, update);
      res.send(result);
    });

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
