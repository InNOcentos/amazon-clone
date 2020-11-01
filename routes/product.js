const router = require('express').Router();
const {product: productModel} = require('../models');

const upload = require('../middlewares/upload_photo');

router.get('/products', async (req,res)=> {
    try {
        const products = await productModel.find();
        res.json({
            status: true,
            products
        })
    }catch(err) {
        res.status(500).json({
            status: false,
            message: err.message
        });
    }
});

router.get('/products/:productId', async (req,res)=> {
    const {productId} = req.params;
    try {
        const product = await productModel.findOne({_id: productId});
        res.json({
            status: true,
            product
        })
    }catch(err) {
        res.status(500).json({
            status: false,
            message: err.message
        });
    }
});

router.post('/products', upload.single('photo'), async (req,res)=> {
    const {ownerID,categoryID,title,description,price,stockQuantity} = req.body;
    try {
        const product = new productModel({
            ownerID,
            categoryID,
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

router.put('/products/:productId',upload.single('photo'), async (req,res)=> {
    const {productId} = req.params;
    const {title,description,price,stockQuantity,ownerID,categoryID,} = req.body;
    try {
        const product = await productModel.findOneAndUpdate({_id: productId}, {
            $set: {
                title,
                price,
                categoryID,
                description,
                photo: req.file.location,
                stockQuantity,
                ownerID
            }
        }, {upsert: true});
        res.json({
            status: true,
            updatedProduct: product
        })
    }catch(err) {
        res.status(500).json({
            status: false,
            message: err.message
        });
    }
});

router.delete('/products/:productId', async (req,res)=> {
    const {productId} = req.params;
    try {
        const product = await productModel.deleteOne({_id: productId});
        res.json({
            status: true,
            product
        })
    }catch(err) {
        res.status(500).json({
            status: false,
            message: "Successfully deleted"
        });
    }
});

module.exports = router;