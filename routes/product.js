const router = require('express').Router();
const {product: productModel} = require('../models');

const upload = require('../middlewares/upload_photo');

router.post('/products', upload.single('photo'), async (req,res)=> {
    const {title,description,price,stockQuantity} = req.body;
    try {
        const product = new productModel({
            title,
            description,
            photo: req.file.location,
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