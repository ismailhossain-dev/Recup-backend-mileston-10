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

    app.post("/products", async (req, res) => {
      //send data mongodb body
      const newProduct = req.body;
      const result = await productsCollection.insertOne(newProduct);
      res.send(result);
    });
    //Get All Product data Access Data From a Cursor docs
    app.get("/products", async (req, res) => {
      const cursor = productsCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });
    //Get Single Data
    app.get("/products/:id", async (req, res) => {
      const id = req.params.id;

      const query = { _id: new ObjectId(id) };
      const result = await productsCollection.findOne(query);

      res.send(result);
    });

    //patch
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

    //delete
    app.delete("/products/:id", async (req, res) => {
      const id = req.params.id;
      //client connect with mongodb id or convert object id
      const query = { _id: new ObjectId(id) };
      const result = await productsCollection.deleteOne(query);
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
