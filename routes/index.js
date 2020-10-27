const product = require('./product');
const category = require('./category');
const owner = require('./owner');

module.exports = {
    productRouter: product,
    categoryRouter: category,
    ownerRouter: owner
}