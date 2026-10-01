const {getProducts,getProudctById}=require('../database/productDatabase')

async function fetchProducts(){
    return await getProducts()
}

async function fetchProductById(id) {
    return await getProudctById(id)
}

module.exports = {fetchProducts,fetchProductById}