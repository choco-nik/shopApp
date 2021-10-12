//const sandbox = require('./sandbox');
const sequelize = require("./db/db");
const setup = require("./db/setupDb");
const Item = require("./models/itemInfo");
const Category = require("./models/category");
const app = require("./app");


//Test to see if title ofa new category is = "Prints"
test("Category respects title argument", async() => {
    let category1 = await Category.create({
        title: "Prints"
    });
    expect(category1.title).toBe("Prints");
});

test("Item Price is more than 10 pence", async() => {
    let item1 = await Item.create({
        title: "Prints",
        imageUrl: "Hyperlink",
        price: 20.00,
        description: "Blouse"
    });
    expect(item1.price).toEqual(20);
});

test ("To find all items", async () => {
    const item2 = await Item.findByPk(categoryID);
    expect(item2.description).toBe("Blouse");
});

//supertest API testing if there's time