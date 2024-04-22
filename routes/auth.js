const express = require('express');
const User = require('../database/schema/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { ObjectId, default: mongoose } = require('mongoose');


const jwtsecret = 'my secret';
const router = express.Router();

router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const user_ext = await User.findOne({ $or: [{ email}, {username}] });
        if (user_ext){
            return res.status(400).json({msg: "user exist"})
        }
        const hasshedPwd =await bcrypt.hash(password, 10)
        const user = User.create({username, email, password: hasshedPwd})
        return res.status(201).json({msg: "user created"})
    } catch (error) {
        console.log(error);
        return res.status(500);
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password){
            return res.status(401).json({msg: "email and password cannot be empty"})
        }
        const user = await User.findOne({ email });
        if (!user){
            return res.status(401).json({ msg: "user does not exist"});
        }
        const isvalid = await bcrypt.compare(password, user.password);
        if (!isvalid){
            return res.status(402).json({msg: "password is not correct"})
        }
        const token = jwt.sign({ userId: user._id }, jwtsecret, {
            expiresIn: '1h'
        });
        res.cookie('token', token, { httpOnly: true })
        return res.status(200).json({msg: "loggin success", token});
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: "login failed"})
    }
});


router.get('/account/:id',async (req, res) => {
    const id = req.params.id;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)){
            return res.status(401).json({msg: "No such user with that id"})
        }
        const user = await User.findById(id);
        if (!user){
            return res.status(401).json({msg: "No such user"});
        }
        const withoutpassword = {...user.toObject()}
        delete withoutpassword.password
        return res.status(200).json(withoutpassword);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

module.exports = router;