const express = require('express');
const verifyToken = require('./middlewareauth')

const router = express.Router();



router.get('/',verifyToken, async (req, res) => {
    res.send('Hello World!')
});

module.exports = router;
