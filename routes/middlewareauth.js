const jwt = require('jsonwebtoken');
const jwtsecret = 'my secret';


const verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    if (!token){
        return res.status(401).json({ error: "Access Denied"});
    }
    try {
        const decoded = jwt.verify(token, jwtsecret);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        console.log(`this error ${error}`);
        return res.status(401).json({ error: "Inavalid token"})
    }
}

module.exports = verifyToken;