const fs=require('fs/promises')
const path=require('path')
const filePath=path.join(__dirname,'db.json')


async function getProducts(){
    const data=await fs.readFile(filePath,'utf-8')
    return JSON.parse(data)
}

async function getProudctById(id) {
    const data=await getProducts()
    return data.find((x)=>x.id==id)
}

async function writeProducts(data){
    await fs.writeFile(filePath,JSON.stringify(data,null,2))
}


module.exports={getProducts,getProudctById,writeProducts}