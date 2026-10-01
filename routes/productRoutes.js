const express=require('express')
const {getProducts,getProductById,createProduct,removeProduct,replaceProductController}=require('../controllers/productController')

const {cacheMiddleware}=require('../middleware/cache')

const router=express.Router();
router.get('/products',cacheMiddleware,getProducts)
router.get('/products/:id',cacheMiddleware,getProductById)
router.post('/products',express.json(),createProduct)
router.delete('/products/:id',removeProduct)
router.put('/products/:id',express.json(),replaceProductController)
module.exports=router