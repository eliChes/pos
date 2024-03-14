const UserRole = require("./userRole.model");
const MasterList = require("./masterlist.model");
const Category = require("./category.model");
const Product = require("./product.model");

UserRole.hasMany(MasterList, { foreignKey: "col_roleID"});
MasterList.belongsTo(UserRole, { foreignKey: "col_roleID"});

// Category.hasMany(Product, { foreignKey: "category_id" });
// Product.belongsTo(Category, { foreignKey: "category_id" });


// Define associations
Product.belongsToMany(Category, { through: 'ProductCategories' });
Category.belongsToMany(Product, { through: 'ProductCategories' });


module.exports = { 
                    MasterList, 
                    UserRole,
                    Category,
                    Product,
                };