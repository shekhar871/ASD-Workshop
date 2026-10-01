const {fetchProducts,fetchProductById,addProduct,deleteProduct}=require('../services/productService')
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
        const result=await addProduct(newProduct)
        deleteCache('/products/')
        deleteCache('/products')
        res.status(201).json(result)
    } catch(err){
        res.status(500).json({error:err.message})
    }
}

async function removeProduct(req,res){
    const id=req.params.id
    try{
        const result=await deleteProduct(id)
        if (result!=null){
            deleteCache('/products')
            deleteCache('/products/')
            deleteCache(`/products/${id}`)
            deleteCache(`/products/${id}/`)
            res.json(result)
        } else {
            res.status(404).json({error:"Couldnt find item"})
        }
    } catch(err){
        res.status(500).json({error:err.message})
    }
}
module.exports = {getProducts,getProductById,createProduct,removeProduct}