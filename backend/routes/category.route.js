const router = require('express').Router()
const {where, Op} = require('sequelize')
const sequelize = require('../db/config/sequelize.config');
const Category = require('../db/models/category.model');


// Fetch Category
router.route('/getCategory').get(async (req, res) => 
{
    try {
        const data = await Category.findAll();

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

//Create Category
router.route('/create').post(async (req, res) => {

    try {
      const existinCategory = await Category.findOne({
        where: {
          name: req.body.name
        },
      });
  
      if (existinCategory) {
        res.status(201).send('Exist');
      } else {
        const newData = await Category.create({
          name: req.body.name,
          tax_information: req.body.tax_information,
          description: req.body.description 
        });
        res.status(200).json(newData);
      }
    } catch (err) {
      console.error(err);
      res.status(500).send('An error occurred');
    }
});

//Update Category
router.route('/update/:param_id').put(async (req, res) => {
    try {
      const name = req.body.name;
      const categoryId = req.params.param_id;
      
      const existingData = await Category.findOne({
        where: {
            name: name,
        },
      });
  
      if (existingData) {
        res.status(202).send('Exist');
      } else {
        const [affectedRows] = await Category.update(
          {
            name: req.body.name,
          },
          {
            where: { category_id: categoryId },
          }
        );
        res.status(200).json({ message: "Data updated successfully", affectedRows });
      }
    } catch (err) {
      console.error(err);
      res.status(500).send('An error occurred');
    }
  });

  //Delete Category
  router.route('/delete/:param_id').delete(async (req, res) => 
  {
    const id = req.params.param_id;
    await Category.destroy({
              where : {
                category_id: id
              }
          }).then(
              (del) => {
                  if(del){
                      res.json({success : true})
                  }
                  else{
                      res.status(400).json({success : false})
                  }
              }
          ).catch(
              (err) => {
                  console.error(err)
                  res.status(409)
              }
          );
        });


module.exports = router;