const router = require('express').Router()
const {where, Op} = require('sequelize')
const sequelize = require('../db/config/sequelize.config');
const {Product, Category} = require('../db/models/associations');


// Fetch Product
router.route('/getProduct').get(async (req, res) => 
{
    try {
        const data = await Product.findAll();

        if (data) {
        return res.json(data);
        } else {
        res.status(400);
        }
    } catch (err) {
        console.error(err);
        res.status(500).json("Error");
    }
});

//Create Product
router.route('/create').post(async (req, res) => {

    try {
      const existinProduct = await Product.findOne({
        where: {
          name: req.body.name
        },
      });
  
      if (existinProduct) {
        res.status(201).send('Exist');
      } else {
        const newData = await Product.create({
          name: req.body.name,
          price: req.body.price,
          // category_id: req.body.category_id,
        });
        
         // Add categories to the product
         if (req.body.category_id && req.body.category_id.length > 0) {
          await newData.addCategories(req.body.category_id);
      }
        
        res.status(200).json(newData);
      }
    } catch (err) {
      console.error(err);
      res.status(500).send('An error occurred');
    }
});

// Fetch Product
router.route('/getProductCategories').get(async (req, res) => 
{
    try {
        const data = await Product.findAll({
          include: Category
        });

        if (Product) {
          // Extract categories from each product and flatten them
          const productCategories = Product.map(product => product.Categories).flat();

          return res.json(productCategories);
      } else {
          res.status(400).json("No products found");
      }
    } catch (err) {
        console.error(err);
        res.status(500).json("Error");
    }
});

module.exports = router;