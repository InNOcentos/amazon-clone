const router = require('express').Router();
const {product: productModel} = require('../models');

router.post('/products',async (req,res)=> {
    const {title,description,photo,price,stockQuantity} = req.body;
    try {
        const product = new productModel({
            title,
            description,
            photo,
            price,
            stockQuantity
        });
        await product.save();
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