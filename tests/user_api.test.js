const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const app = require('../app')
const User = require('../models/user')

const api = supertest(app)

const initialUsers = [
  {
    username: 'inigo',
    name: 'inigo',
    password: '123',

  }, {
    username: 'inigo2',
    name: 'inigo2',
    password: '123',
  },
  {
    username: 'inigo3',
    name: 'inigo3',
    password: '123',
  }
]


beforeEach(async () => {
  await User.deleteMany({})


  const userObjects = await Promise.all(initialUsers
    .map(async (user) =>
      new User({ ...user, passwordHash: await bcrypt.hash(user.password, 10) })))



  const promiseArray = userObjects.map(user => user.save())
  await Promise.all(promiseArray)

})

/*############## GET #########################*/


describe('testing GET', () => {

  test('users are returned as json', async () => {
    await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  test('test db is used and returns the initial length right', async () => {
    const response = await api.get('/api/users').expect(200)
    expect(response.body).toHaveLength(3)
  })

})


/*############## POST #########################*/

describe('testing POST', () => {
  test('valid user is added', async () => {
    const validUser = { username: 'inigo5', name: 'inigo5', password: '123' }
    const response = await api.post('/api/users').send(validUser).expect(201)
    expect(response.body.id).toBeDefined()
    const { body } = await api.get('/api/users').expect(200)
    expect(body.length).toBe(initialUsers.length + 1)
  })
  test('invalid user is rejected', async () => {
    const invalidUser = { username: 'in', name: 'inigo5', password: '12' }

    const response = await api.post('/api/users').send(invalidUser).expect(400)
    expect(response.body.error).toContain('username and password must have at least 3 characters')

  })
})



afterAll(async () => {
  await mongoose.connection.close()
})