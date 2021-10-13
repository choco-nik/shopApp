const express = require("express");
const setupDb = require("./db/setupDb");
const Category = require("./models/category");
const Item = require("./models/itemInfo");
const path = require("path");
const Handlebars = require("handlebars");
const expressHandlebars = require("express-handlebars");
const {
    allowInsecurePrototypeAccess,
  } = require("@handlebars/allow-prototype-access");
  
const app = express();
app.use(express.json());

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

const handlebars = expressHandlebars({
    handlebars: allowInsecurePrototypeAccess(Handlebars),
});

app.engine("handlebars", handlebars);
  app.set("view engine", "handlebars");
  app.set('views', path.join(__dirname, 'views'));

// Get all the categories Postman
//app.get("/categories", async (req,res) => {
    //const categories = await Category.findAll();
    //res.json(categories);
//});

// Get for cart
app.get("/cart.handlebars", async (req, res) => {
    const item = await Item.findAll();
    if (!item){
        return res.sendStatus(404);
    }
    res.render("cart", { item });
});

// Get for website
app.get("/", async (req, res) => {
    const categories = await Category.findAll();
    res.render("home", { categories });
});

// Get for Groceries Page 
app.get("/groceries.handlebars", async (req, res) => {
    const item = await Item.findAll();
    if (!item){
        return res.sendStatus(404);
    }
    res.render("groceries", { item });
});


// Get for Homeware pages
app.get("/homeware.handlebars", async (req, res) => {
    const item = await Item.findAll({
        where:{
            categoryId: 2
        }
    });
    if (!item){
        return res.sendStatus(404);
    }
    res.render("homeware", { item });
});

// Get for Sport pages
app.get("/sport.handlebars", async (req, res) => {
    const item = await Item.findAll({
        where:{
            categoryId: 3
        }
    });
    if (!item){
        return res.sendStatus(404);
    }
    res.render("sport", { item });
});

// Get for Womens pages
app.get("/womens.handlebars", async (req, res) => {
    const item = await Item.findAll({
        where:{
            categoryId: 4
        }
    });
    if (!item){
        return res.sendStatus(404);
    }
    res.render("womens", { item });
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
//createTable();
module.exports = app;  
