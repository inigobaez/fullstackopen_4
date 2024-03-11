const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')




blogsRouter.get('/', async (request, response) => {


  const blogs = await Blog.find({}).populate('user', { id: 1, username: 1, name: 1 })
  response.json(blogs)

})

blogsRouter.post('/', async (request, response) => {

  const user = await User.findById(request.user.id)

  const { author, title, url } = request.body
  const blog = new Blog(
    { author: author, title: title, url: url, user: user.id })
  const createdBlog = await blog.save()
  user.blogs = user.blogs.concat(createdBlog.id)
  await user.save()
  response.status(201).json(createdBlog)

})
blogsRouter.delete('/:id', async (request, response) => {


  const blog = await Blog.findById(request.params.id)
  if (!blog) {
    return response.status(404).json({ error: 'Resource not found' })
  }
  if (blog.user.toString() !== request.user.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const result = await Blog.deleteOne({ _id: request.params.id })
  if (!result) {
    return response.status(400).end()
  }
  return response.status(204).end()
})
blogsRouter.put('/:id', async (request, response) => {
  const blog = {
    name: request.body.author,
    url: request.body.url,
    likes: request.body.likes,
  }
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true, runValidators: true })
  if (!updatedBlog) {
    response.status(400)
  }
  response.status(200).json(updatedBlog)

})

module.exports = blogsRouter