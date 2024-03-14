const router = require('express').Router()
const {where, Op} = require('sequelize')
const sequelize = require('../db/config/sequelize.config');
const ExtraOption = require('../db/models/extraOptions.model');


// Fetch Extra Option
router.route('/getExtraOption').get(async (req, res) => 
{
    try {
        const data = await ExtraOption.findAll();

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

//Create Extra Option
router.route('/create').post(async (req, res) => {

    try {
      const existinExtraOption = await ExtraOption.findOne({
        where: {
          name: req.body.name
        },
      });
  
      if (existinExtraOption) {
        res.status(201).send('Exist');
      } else {
        const newData = await ExtraOption.create({
          name: req.body.name,
          limit_quantity: req.body.limitQuantity,
          choose_one_option: req.body.chooseOneOption 
        });
        res.status(200).json(newData);
      }
    } catch (err) {
      console.error(err);
      res.status(500).send('An error occurred');
    }
});

module.exports = router;