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


async function deleteProduct(id){
    const data=await getProducts()
    const toDelete=data.find((x)=>x.id==id)
    if (toDelete){
        await writeProducts(data.filter((x)=>x.id!=id))
        return toDelete
    } else {
        return null
    }
}
module.exports = {fetchProducts,fetchProductById,addProduct,deleteProduct}