const sequelize = require("../db/db");
const { DataTypes, Model } = require("sequelize");


class Category extends Model {};
Category.init({
    title: DataTypes.STRING,
},
{
    sequelize,
    modelName: "category",
    timestamps: false
});

module.exports = Category;
