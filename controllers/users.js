const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')


usersRouter.get('/', async (request, response) => {


  const users = await User.find({}).populate('blogs', { id: 1, url: 1, title: 1, author: 1 })
  response.json(users)

})

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  if (!username || !password) {
    return response.status(400).send({ error: 'username and password are required' })
  }
  if (username.length < 3 || password.length < 3) {
    return response.status(400).send({ error: 'username and password must have at least 3 characters' })
  }
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)
  const user = new User({ username, name, passwordHash })
  const createdUser = await user.save()
  response.status(201).json(createdUser)

})
module.exports = usersRouter