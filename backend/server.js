require("dotenv").config();

const express = require("express");
const { MongoClient } = require("mongodb");

const app = express();
const PORT = 5000;

app.use(express.json());

const client = new MongoClient(process.env.MONGO_URI);

let db;

async function startServer() {
  try {
    await client.connect();

    db = client.db("dayflow");

    console.log("MongoDB connected successfully");

    app.get("/", (req, res) => {
      res.json({
        message: "DayFlow API is running",
        database: "connected"
      });
    });

    app.get("/employees", async (req, res) => {
      const employees = await db
        .collection("employees")
        .find()
        .toArray();

      res.json(employees);
    });

    app.post("/employees", async (req, res) => {
      const employee = req.body;

      const result = await db
        .collection("employees")
        .insertOne(employee);

      res.json({
        message: "Employee created",
        id: result.insertedId
      });
    });

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
  }
}

startServer();