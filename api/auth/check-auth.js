const jwt = require('jsonwebtoken');

module.exports = (request, response, next) => {
    try {
        const token = request.headers.authorization.split(' ')[1];

        const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
        request.userData = decoded;
        next();
    }
    catch (error) {
        return response.status(401).json({
            message: 'Auth failed'
        })
    }
}