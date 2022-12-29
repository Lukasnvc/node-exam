require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");

const app = express();
const port = process.env.PORT || 8080;
const URI = process.env.URI;

app.use(cors());
app.use(express.json());

const client = new MongoClient(URI);

//   ii. Extra: Leisti užpildyti tik vieną kartą  - NELEIS UZPILDYTI ANTRA KARTA, NES MONGODB NEPRIIMS PASIKARTOJANCIO _ID

app.post("/api/fill", async (req, res) => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const uniqueData = await response.json();

    const mapped = uniqueData.map((elem) => ({
      _id: elem.id,
      name: elem.name,
      email: elem.email,
    }));
    const mappedAddress = uniqueData.map((elem) => ({
      _id: elem.id,
      city: elem.address.city,
      street: elem.address.street,
    }));

    const con = await client.connect();
    const users = await con.db("exam").collection("users").insertMany(mapped);
    const address = await con
      .db("exam")
      .collection("address")
      .insertMany(mappedAddress);
    await con.close();
    res.send("Added");
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post("/api/users", async (req, res) => {
  try {
    const con = await client.connect();
    const users = await con.db("exam").collection("users").insertOne({
      name: req.body.name,
      email: req.body.email,
      _id: req.body.id,
    });
    const address = await con.db("exam").collection("address").insertOne({
      city: req.body.city,
      street: req.body.street,
      _id: req.body.id,
    });

    await con.close();
    res.send("Added");
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/api/users", async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db("exam")
      .collection("users")
      .aggregate([
        {
          $lookup: {
            from: "address",
            localField: "_id",
            foreignField: "_id",
            as: "address",
          },
        },
      ])
      .toArray();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/api/users/names", async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con.db("exam").collection("users").find().toArray();
    console.log(data);
    const show = data.map((value) => {
      return {
        id: value._id,
        name: value.name,
      };
    });
    res.send(show);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/api/users/emails", async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con.db("exam").collection("users").find().toArray();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(port, () => {
  console.log(`Server is running on : ${port}`);
});

app.get("/api/users/address", async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db("exam")
      .collection("users")
      .aggregate([
        {
          $lookup: {
            from: "address",
            localField: "_id",
            foreignField: "_id",
            as: "address",
          },
        },
        {
          $project: {
            _id: 1,
            name: 1,
            address: 1,
          },
        },
      ])
      .toArray();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});
