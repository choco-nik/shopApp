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
        return res.sendStatus(404);
    }
    await category.destroy();
    res.sendStatus(200);
});

// Replace a Category by its ID
app.put("/categories/:id", async (req,res) => {
    const categoryID = req.params.id;
    const category = await Category.findByPk(categoryID);
    if (!category){
        return res.sendStatus(404);
    }
    await category.update(req.body);
    res.status(200).json(category);
});

// Get all the item in a category
app.get("/categories/:id/items", async (req,res) => {
    const items = await Item.findAll();
    res.json(items);
});

// Get an item in a category
app.get("/items/:id", async (req,res) => {
    const categoryID = req.params.id;
    const item = await Item.findByPk(categoryID);
    if (!item){
        return res.sendStatus(404);
    }
    res.status(200).json(item);
});

// Create an item in a category
app.post("/categories/:id/items", async (req, res) => {
    const categoryID = req.params.id;
    const category = await Category.findByPk(categoryID);

    const { title, imageUrl, price, description } = req.body;
    await category.createItem({ title, imageUrl, price, description });
    res.status(201).json(category);
});

// Delete an item by its ID
app.delete("/items/:id", async (req,res) => {
    const itemID = req.params.id;
    const item = await Item.findByPk(itemID);
    if (!item){
        return res.sendStatus(404);
    }
    await item.destroy();
    res.sendStatus(200);
});

// Replace an item by its ID
app.put("/items/:id", async (req,res) => {
    const categoryID = req.params.id;
    const item = await Item.findByPk(categoryID);
    if (!item){
        return res.sendStatus(404);
    }
    await item.update(req.body);
    res.status(200).json(item);
});

setupDb();

module.exports = app;
