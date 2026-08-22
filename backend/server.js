require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { MongoClient, ObjectId } = require("mongodb");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

const client = new MongoClient(process.env.MONGO_URI);

let db;

async function startServer() {
  try {
    // Connect to MongoDB
    await client.connect();
    db = client.db("dayflow");
    console.log("Connected successfully to MongoDB Atlas (database: dayflow)");

    // Health check route
    app.get("/", (req, res) => {
      res.json({
        message: "DayFlow API is running",
        database: "connected"
      });
    });

    // GET /employees - Get all employees
    app.get("/employees", async (req, res) => {
      try {
        const employees = await db
          .collection("employees")
          .find()
          .toArray();

        res.json(employees);
      } catch (error) {
        res.status(500).json({
          message: "Failed to fetch employees",
          error: error.message
        });
      }
    });

    // POST /employees - Create a new employee
    app.post("/employees", async (req, res) => {
      try {
        const employee = req.body;

        const result = await db
          .collection("employees")
          .insertOne(employee);

        res.status(201).json({
          message: "Employee created",
          id: result.insertedId
        });
      } catch (error) {
        res.status(500).json({
          message: "Failed to create employee",
          error: error.message
        });
      }
    });

    // PUT /employees/:id - Update an employee by ID
    app.put("/employees/:id", async (req, res) => {
      try {
        const id = req.params.id;

        if (!ObjectId.isValid(id)) {
          return res.status(400).json({
            message: "Invalid employee ID"
          });
        }

        const updateData = { ...req.body };
        delete updateData._id; // Ensure immutable _id is not modified

        const result = await db.collection("employees").updateOne(
          { _id: new ObjectId(id) },
          { $set: updateData }
        );

        if (result.matchedCount === 0) {
          return res.status(404).json({
            message: "Employee not found",
            id: id
          });
        }

        res.json({
          message: "Employee updated",
          matchedCount: result.matchedCount,
          modifiedCount: result.modifiedCount
        });
      } catch (error) {
        res.status(500).json({
          message: "Failed to update employee",
          error: error.message
        });
      }
    });

    // DELETE /employees/:id - Delete an employee by ID
    app.delete("/employees/:id", async (req, res) => {
      try {
        const id = req.params.id;

        if (!ObjectId.isValid(id)) {
          return res.status(400).json({
            message: "Invalid employee ID"
          });
        }

        const result = await db
          .collection("employees")
          .deleteOne({
            _id: new ObjectId(id)
          });

        if (result.deletedCount === 0) {
          return res.status(404).json({
            message: "Employee not found"
          });
        }

        res.json({
          message: "Employee deleted",
          deletedCount: result.deletedCount
        });
      } catch (error) {
        res.status(500).json({
          message: "Failed to delete employee",
          error: error.message
        });
      }
    });

    // Start listening
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
}

startServer();