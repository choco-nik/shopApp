const sequelize = require("../db/db");
const { DataTypes, Model } = require("sequelize");

class Item extends Model {};
Item.init({
    title: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
    price: DataTypes.INTEGER,
    description: DataTypes.STRING
},
{
    sequelize,
    modelName: "item",
    timestamps: false
});

module.exports = Item;
