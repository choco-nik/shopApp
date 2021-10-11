const express = require("express");
const setupDb = require("./db/setupDb");
const Category = require("./models/category");
const Item = require("./models/itemInfo");

const app = express();
app.use(express.json());

// Get 

// Create a Category
app.post("/categories", async (req, res) => {
    const { title } = req.body;
    const category = await Category.create({ title });
    res.status(201).json(category);
});


setupDb();

module.exports = app;
