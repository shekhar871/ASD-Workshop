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


module.exports={getProducts,getProudctById}