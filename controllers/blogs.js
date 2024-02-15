const blogsRouter = require('express').Router()
const Blog = require('../models/blog')


blogsRouter.get('/', async (request, response) => {


  const blogs = await Blog.find({})
  response.json(blogs)

})

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)
  const createdBlog = await blog.save()
  response.status(201).json(createdBlog)

})
blogsRouter.delete('/:id', async (request, response) => {
  const result = await Blog.findByIdAndDelete(request.params.id)
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