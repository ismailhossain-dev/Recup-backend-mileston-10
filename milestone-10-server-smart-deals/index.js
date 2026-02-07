const express = require("express");
const cors = require("cors");
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const port = process.env.PORT || 3000;
//middleWare
app.use(cors());
app.use(express.json());

const uri =
  "mongodb+srv://smartdeals:1ZxqqEzRBhebC3Cu@cluster0.l2qjtmo.mongodb.net/?appName=Cluster0";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

app.get("/", (req, res) => {
  res.send("Hello Smart deals");
});
//connect mongodb
async function run() {
  try {
    await client.connect();
    //my code
    const db = client.db("smart_db");
    const productsCollection = db.collection("products");
    const bidsCollection = db.collection("bids");
    //========send data database ========
    app.post("/products", async (req, res) => {
      //send data mongodb body
      const newProduct = req.body;
      const result = await productsCollection.insertOne(newProduct);
      res.send(result);
    });
    //========Get all products ==========
    app.get("/products", async (req, res) => {
      //const projectFields = {title: 1, price_min: 1, price_max: 1, image: 1}
      //const cursor = productCollection.find().sort({price_min: -1}).skip(2).limit(2).project(projectFields)

      console.log(req.query);
      const email = req.query.email;
      const query = {};
      if (email) {
        //email takle email ta set kore divo
        query.email = email;
      }
      const cursor = productsCollection.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });
    //======== get single data ===========
    app.get("/products/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await productsCollection.findOne(query);

      res.send(result);
    });

    //=============update related api ==============
    app.patch("/products/:id", async (req, res) => {
      const id = req.params.id;
      const updatedProduct = req.body;

      const query = { _id: new ObjectId(id) };

      const update = {
        $set: {
          name: updatedProduct.name,
          price: updatedProduct.price,
        },
      };

      const result = await productsCollection.updateOne(query, update);
      res.send(result);
    });

    //=========delete related api ============
    app.delete("/products/:id", async (req, res) => {
      const id = req.params.id;
      //client connect with mongodb id or convert object id
      const query = { _id: new ObjectId(id) };
      const result = await productsCollection.deleteOne(query);
      res.send(result);
    });
    //==========bids related api ================
    app.get("/bids", async (req, res) => {
      //====== getting data in email==============
      //url teke email ta nichi req.query mardome
      const email = req.query.email;
      console.log(email);
      const query = {};
      if (email) {
        //=query marde jodi take tahole buyer_email set kore dive
        query.buyer_email = email;
      }
      //=================
      const cursor = bidsCollection.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });

    //============bids post ============
    app.post("/bids", async (req, res) => {
      //client dat receive
      const newBid = req.body;
      const result = await bidsCollection.insertOne(newBid);
      res.send(result);
    });

    //====delete bids api ======
    app.delete("/bids", async (req, res) => {
      //url teke params er mardome data ene taki
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = bidsCollection.deleteOne(query);
      res.send(result);
    });
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`smart service on port ${port}`);
});
//v:3 6minute
//55 v:6 8minute
