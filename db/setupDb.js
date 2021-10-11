const sequelize = require("./db");
const Category = require("../models/category");
const Item = require("../models/itemInfo");

async function setupDb() {
    Category.hasMany(Item);
    Item.belongsTo(Category);

    await sequelize.sync()
}

module.exports = setupDb;