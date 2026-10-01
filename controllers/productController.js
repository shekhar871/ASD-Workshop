const {fetchProducts,fetchProductById}=require('../services/productService')
const {setCache}=require('../middleware/cache')

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

module.exports = {getProducts,getProductById}