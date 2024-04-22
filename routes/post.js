const express = require('express');
const router = express.Router();
const Post = require('../database/schema/post');
const { ObjectId, default: mongoose } = require('mongoose');

//get all posts
router.get('/',paginate(Post),async (req, res) => {
    try {
        return res.status(201).json(res.paginate)
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

//get post by id
router.get('/:id',async (req, res) => {
    const id = req.params.id;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)){
            return res.status(401).json({msg: "No such post with that id"})
        }
        const post = await Post.findById(id).populate('author');
        if (!post){
            return res.status(401).json({msg: "No such post"});
        }
        return res.status(200).json(post);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

//get psot by a single user
router.get('/userspost/:id',async (req, res) => {
    const id = req.params.id;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)){
            return res.status(401).json({msg: "No such post with that id"})
        }
        const post = await Post.find({ author: id}).populate('author');
        if (!post){
            return res.status(401).json({msg: "No such post"});
        }
        return res.status(200).json(post);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

//delete a post
router.delete('/:id',async (req, res) => {
    const id = req.params.id;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)){
            return res.status(401).json({msg: "No such post with that id"})
        }
        const post = await Post.deleteOne({_id: id});
        if (!post){
            return res.status(401).json({msg: "No such post"});
        }
        return res.status(200).json({msg: "Post Deleted succesfully"});
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

//update a post
router.patch('/:id',async (req, res) => {
    const id = req.params.id;
    const updates = req.body;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)){
            return res.status(401).json({msg: "No such post with that id"})
        }
        const post = await Post.updateOne({_id: id}, {$set: updates });
        if (!post){
            return res.status(401).json({msg: "No such post"});
        }
        return res.status(200).json({msg: "Post updated succesfully",post});
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

//post a blog
router.post('/',async (req, res) => {
    const { title, content, author } = req.body
    try {
        const post = await Post.create({ title, content, author });
        const populated = await post.populate('author');
        return res.status(201).json({msg: 'created post', post: populated})
    } catch (error) {
        console.log(error)
        return res.sendStatus(500);
    }
});




//pagination function
function paginate(model){
    return async(req, res, next) => {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;

        const start = (page - 1) * limit
        const end = page * limit

        const results = {}

        try {
            const totalDocs = await model.countDocuments().exec();

            if(end < totalDocs){
                results.nextPage = {
                    page: page + 1,
                    limit: limit
                }
            }
            if(start > 0){
                results.previousPage = {
                    page: page - 1,
                    limit: limit
                }
            }
    
            results.results = await model.find().populate('author').limit(limit).skip(start).exec();
            res.paginate = results;
            next()
        } catch (error) {
            console.log(error);
            res.status(500);
        }

    }
}


module.exports = router;