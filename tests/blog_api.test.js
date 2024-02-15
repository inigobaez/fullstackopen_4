const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

const initialBlogs = [
  {
    title: 'one',
    author: '1 author',
    url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
    likes: 2,
  }, {
    title: 'two',
    author: '2 author',
    url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
    likes: 5,
  },
  {
    title: 'three',
    author: '3 author',
    url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
    likes: 4,
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})
  const blogObjects = initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)

})
describe('testing GET', () => {

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  test('test db is used and returns the initial length right', async () => {
    const response = await api.get('/api/blogs').expect(200)
    expect(response.body).toHaveLength(3)
  })
  test('unique identifier property of the blog posts is named id', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
    expect(response.body[0]['id']).toBeDefined()
  })

})
describe('testing POST', () => {

  test('a valid blog can be added', async () => {
    const newBlog = {
      title: 'four',
      author: '4 author',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 6,
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)

    const response = await api
      .get('/api/blogs')
      .expect(200)

    expect(response.body).toHaveLength(initialBlogs.length + 1)
    expect(response.body[response.body.length - 1]['title']).toContain('four')
  })

  test('default value for likes if not provided should be 0', async () => {
    const newBlog = {
      title: 'four',
      author: '4 author',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf'
    }
    const createdBlogResponse = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
    expect(createdBlogResponse.body['likes']).toBe(0)

  })
  test('blog without title will be rejected with status 400', async () => {
    const newBlog = {
      author: '5 author',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf'
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  }, 100000)
  test('blog without url will be rejected with status 400', async () => {
    const newBlog = {
      title: 'six',
      author: '6 author',
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  }, 100000)
})

describe('testing DELETE', () => {
  test('existing blog is deleted', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)

    const firstBlogId = response.body[0]['id']
    await api
      .delete(`/api/blogs/${firstBlogId}`)
      .expect(204)
  }, 100000)
  test('deleteting non existing blog is rejected with 400', async () => {


    const fakeId = '821h54h9f'
    await api
      .delete(`/api/blogs/${fakeId}`)
      .expect(400)
  }, 100000)
})

describe('testing UPDATE', () => {
  test('existing blog is updated', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)

    const firstBlogId = response.body[0]['id']
    const updatedBlogResponse = await api
      .put(`/api/blogs/${firstBlogId}`)
      .send({ ...initialBlogs[0], likes: 100 })
      .expect(200)

    expect(updatedBlogResponse.body.likes).toBe(100)

  }, 100000)
  test('updating non existing blog is rejected with 400', async () => {


    const fakeId = '7676545rcxfdx'
    await api
      .put(`/api/blogs/${fakeId}`)
      .send({ ...initialBlogs[0], likes: 100 })
      .expect(400)


  }, 100000)
})




afterAll(async () => {
  await mongoose.connection.close()
})