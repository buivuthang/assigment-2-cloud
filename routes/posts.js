const express = require('express')
const router = express.Router()

const Post = require('../models/Post')

router.get('/', async(req, res) => {
    const posts = await Post.find().lean().sort({ date: -1 })
    res.render('posts/index', { posts })
})

router.get('/add', (req, res) => {
    res.render('posts/add')
})

//add
router.post('/', async(req, res) => {
    const { title, price, description, photo } = req.body

    let errors = []

    if (!title) errors.push({ msg: 'Title is required' })
    if (!price) errors.push({ msg: 'Price is required' })
    if (!description) errors.push({ msg: 'Description is required' })
    if (!photo) errors.push({ msg: 'Photo URL is required' })
    if (errors.length > 0) res.render('posts/add', { errors, title, price, description, photo })
    else {
        const newPostData = { title, price, description, photo }
        const newPost = new Post(newPostData)
        await newPost.save()
        res.redirect('/posts')
    }
})

//show 
router.get('/edit/:id', async(req, res) => {
    const post = await Post.findOne({ _id: req.params.id }).lean()
    res.render('posts/edit', { post })
})

//update
router.put('/:id', async(req, res) => {
    const { title, price, description, photo } = req.body
    await Post.findOneAndUpdate({ _id: req.params.id }, { title, price, description, photo })
    res.redirect('/posts')
})

//delete
router.delete('/:id', async(req, res) => {
    await Post.findOneAndRemove({ _id: req.params.id })
    res.redirect('/posts')
})

module.exports = router