const express=require('express')
const {getProducts,getProductById}=require('../controllers/productController');

const {cacheMiddleware}=require('../middleware/cache');

const router=express.Router();
router.get('/products',cacheMiddleware,getProducts)
router.get('/products/:id',cacheMiddleware,getProductById)
module.exports=router