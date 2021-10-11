const express = require("express");
const setupDb = require("./db/setupDb");
const Category = require("./models/category");
const Item = require("./models/itemInfo");

const app = express();
app.use(express.json());

// Get all the categories
app.get("/categories", async (req,res) => {
    const categories = await Category.findAll();
    res.json(categories);
});

//Get a category by its ID
app.get("/categories/:id", async (req,res) => {
    const categoryID = req.params.id;
    const category = await Category.findByPk(categoryID);
    if (!category){
        return res.sendStatus(404)
    }
    res.status(200).json(category);
});

// Create a Category
app.post("/categories", async (req, res) => {
    const { title } = req.body;
    const category = await Category.create({ title });
    res.status(201).json(category);
});

// Delete a Category by its ID
app.delete("/categories/:id", async (req,res) => {
    const categoryID = req.params.id;
    const category = await Category.findByPk(categoryID);
    if (!category){
        return res.sendStatus(400);
    }
    await category.destroy();
    res.sendStatus(200);
});

// Replace a Category by its ID
app.put("/categories/:id", async (req,res) => {
    const categoryID = req.params.id;
    const category = await Category.findByPk(categoryID);
    if (!category){
        return res.sendStatus(400);
    }
    await category.update(req.body);
    res.status(200).json(category);
});

setupDb();

module.exports = app;
