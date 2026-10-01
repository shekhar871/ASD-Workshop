const express=require('express')
const productRoutes=require('./routes/productRoutes')
const app=express()
app.use('/', productRoutes)
app.listen(3000,()=>{
    console.log('Server running on port 3000');
})