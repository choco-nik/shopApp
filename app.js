const express = require("express");
const setupDb = require("./db/setupDb");
const Category = require("./models/category");
const Item = require("./models/itemInfo");

const app = express();
app.use(express.json());

async function createTable() {
    await setupDb();
    const print = await Category.create({category:"Prints"});
    print.createItem({
        title: "Palm Print",
        imageUrl: "http://cdn.shopify.com/s/files/1/0421/2625/products/TheDen_Now_PalmLeafRetroArtPrint_Lifestyle.jpg?v=1596092827",
        price: 35.00, 
        description:"Palm print using hand-painting and digital designing"
    });

    const card = await Category.create({category:"Cards"});
    card.createItem({
        title: "Palm Tree Print Card ",
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOq5KR7qIrhGqyf32hehY_2xGM_XorEg3oig&usqp=CAU",
        price: 3.00, 
        description:"A6 card- Measurements 10x15cm"
    });

    const notebook = await Category.create({category:"Notebooks"});
    notebook.createItem({
        title: "A5 Palm Tree Notebooks ",
        imageUrl: "https://mybookmoment.com/wp-content/uploads/2021/06/palm-print-notebook.png",
        price: 6.99, 
        description:"A5 lined printed and gold foiled notebooks"
    }); 

    const bedsheet = await Category.create({category:"Bedsheets"});
    bedsheet.createItem({
        title: "Palm Tree Duvet Covers",
        imageUrl: "https://images.dunelm.com/30714649.jpg?$standardplayerdefault$&img404=noimagedefault",
        price: 40.00, 
        description:"Palm tree design, this bedding set is perfect for adding a touch of modern nature to your bedroom"
    });

    const lamp = await Category.create({category:"Lamp"});
    lamp.createItem({
        title: "Palm Tree Table Lamp",
        imageUrl: "https://shop.simiglighting.com/wp-content/uploads/2021/04/O1CN01KsZCnX1amQ3Ffb1op_3152273372-600x600.jpg",
        price: 35.00, 
        description:"Retro gold palm tree table lamp"
    });

    const cushion= await Category.create({category:"Cushions"});
    cushion.createItem({
        title: "Palm Tree Cushion",
        imageUrl: "https://kaleidoscope.scene7.com/is/image/OttoUK/553w/Velvet-Palm-Tree-Cushions~81W696FRSP_COL_GREEN.jpg",
        price: 20.00, 
        description:"Classic design cushion with exotic palm trees. Dimensions approx. 45 x 45 cm"
    });
}

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
createTable();
module.exports = app;  
