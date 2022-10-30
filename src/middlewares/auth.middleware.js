const jwt = require("../lib/jwt.lib")

const auth = (request, response, next) => {
    try{
        const authorization = request.headers.authorization || ""
        const token = authorization.replace("Bearer ", "")
        const verifiedToken = jwt.verify(token)
        console.log("imprimiendo el verifiedToken:", verifiedToken)
        next()
    }catch(error) {
        response.status(error.status || 401)
        response.json({
            success: false,
            error: error.message
        })
    }
}

module.exports = auth