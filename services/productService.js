const {getProducts,getProudctById,writeProducts}=require('../database/productDatabase')

async function fetchProducts(){
    return await getProducts()
}

async function fetchProductById(id) {
    return await getProudctById(id)
}

async function addProduct(product){
    const data=await getProducts()
    const toPush={
        id:Date.now(),
        ...product
    }
    data.push(toPush)
    await writeProducts(data)
    return toPush
}
module.exports = {fetchProducts,fetchProductById,addProduct}