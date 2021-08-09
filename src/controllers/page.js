const express = require('express');
const path = require('path');
const pageRouter = express.Router();

// pageRouter.use('/', (req, res) => {
//     res.sendFile(path.join(__dirname, '../views/index.html'));
// });
pageRouter.use('/about', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/about.html'));
});
pageRouter.get('/products', (req, res) => {
    res.send("All products...");
});
pageRouter.post('/products', (req, res) => {
    res.send(`Created a new product`);
});
pageRouter.post('/products/:productId', (req, res) => {
    res.send(`Updated a product with an id of ${req.params.productId}`);
});
module.exports = pageRouter;