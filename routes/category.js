const router = require('express').Router();
const {category: categoryModel} = require('../models');



router.get('/categories', async (req,res)=> {
    try {
        const categories = await categoryModel.find();
        res.json({
            status: true,
            categories
        })
    }catch(err) {
        res.status(500).json({
            status: false,
            message: err.message
        });
    }
});

router.post('/categories', async (req,res)=> {
    const {type} = req.body;
    try {
        const category = new categoryModel({
            type
        });

        await category.save();
        res.json({
            status: true,
            message: 'Successfully saved'
        })
    }catch(err) {
        res.status(500).json({
            status: false,
            message: err.message
        });
    }
});

module.exports = router;