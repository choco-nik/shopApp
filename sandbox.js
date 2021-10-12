const sequelize = require("./db");
const setup = require("./setupDb");
const item = require("./models/itemInfo");
const categories = require("./models/category");
const app = require("./app");


const lamp = await Item.create({
    title: "Palm Tree Table Lamp",
    imageUrl: "https://shop.simiglighting.com/wp-content/uploads/2021/04/O1CN01KsZCnX1amQ3Ffb1op_3152273372-600x600.jpg",
    price: 35.00, 
    description:"Retro gold palm tree table lamp"
});

sandbox();

module.exports = sandbox;