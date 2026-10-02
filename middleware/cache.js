const cache = {}
const TTL = 60 * 1000

function cacheMiddleware(req, res, next) {
    const key=req.url
    const cached=cache[key]
    if (cached){
        const age=Date.now()-cached.createdAt
        if (age<TTL){
            res.setHeader('X-Cache', 'HIT')
            return res.json(cached.data)
        }
        delete cache[key]
    }
    res.setHeader('X-Cache', 'MISS')
    next()
}

function setCache(key, data) {
    cache[key] = {
        data:data,
        createdAt:Date.now()
    }
}


function deleteCache(key){
    delete cache[key]
}
module.exports={cacheMiddleware,setCache,deleteCache}