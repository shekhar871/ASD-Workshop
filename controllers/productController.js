const {fetchProducts,fetchProductById,addProduct}=require('../services/productService')
const {setCache,deleteCache}=require('../middleware/cache')

async function getProducts(req, res){
    const products = await fetchProducts()
    setCache(req.url, products)
    res.json(products)
}


async function getProductById(req, res) {

    const product = await fetchProductById(req.params.id)
    if (!product){
        return res.status(404).json({
            message: 'Product not found'
        })
    }
    setCache(req.url, product)
    res.json(product)
}


async function createProduct(req,res) {
    try{
        const {name,price}=req.body
        const newProduct={name,price}
        deleteCache('/products')
        const result=await addProduct(newProduct)
        res.status(201).json(result)
    } catch(err){
        res.status(500).json({error:err.message})
    }
}

module.exports = {getProducts,getProductById,createProduct}