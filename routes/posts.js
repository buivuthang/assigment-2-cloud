const express = require('express')
const router = express.Router()

//hien thi form de tao post
const Post = require('../models/Post')
    //hien thi tat ca cac bai viet
router.get('/', async(req, res) => {
    const posts = await Post.find().lean().sort({ date: -1 })
    res.render('posts/index', { posts })
})

//test the model
router.get('/add', (req, res) => {
    res.render('posts/add')
})

//tao post moi
router.post('/', async(req, res) => {
    const { title, text } = req.body

    let errors = []

    if (!title) errors.push({ msg: 'title is required' })
    if (!text) errors.push({ msg: 'text is required' })
    if (errors.length > 0) res.render('posts/add', { errors, title, text })
    else {
        const newPostData = { title, text }
        const newPost = new Post(newPostData)
        await newPost.save()
        res.redirect('/posts')
    }
})

//hien thi form 
router.get('/edit/:id', async(req, res) => {
    const post = await Post.findOne({ _id: req.params.id }).lean()
    res.render('posts/edit', { post })
})

//cap nhap thay doi 
router.put('/:id', async(req, res) => {
    const { title, text } = req.body
    await Post.findOneAndUpdate({ _id: req.params.id }, { title, text })
    res.redirect('/posts')
})

//xoa bai viet
router.delete('/:id', async(req, res) => {
    await Post.findOneAndRemove({ _id: req.params.id })
    res.redirect('/posts')
})
module.exports = router