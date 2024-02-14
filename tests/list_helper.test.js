const listHelper = require('../utils/list_helper')

describe('dummy', () => {
  test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
  })
})


describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    }
  ]

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })
})
describe('favorite blog', () => {

  const listWithOneBlog = [
    {
      _id: '1',
      title: 'one',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    }
  ]

  const listMultipleBlogWithDifferentLikeScore = [
    {
      _id: '1',
      title: 'one',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 2,
    }, {
      _id: '2',
      title: 'two',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
    },
    {
      _id: '3',
      title: 'three',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 4,
    }
  ]

  const listMultipleBlogWithSomeEqualLikeScore = [
    {
      _id: '1',
      title: 'one',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 2,
      __v: 0
    },
    {
      _id: '2',
      title: 'two',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    },
    {
      _id: '3',
      title: 'three',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    },
    {
      _id: '4',
      title: 'four',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 3,
      __v: 0
    },
    {
      _id: '5',
      title: 'five',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 4,
      __v: 0
    }


  ]
  test('when an empty list is given, null', () => {
    expect(listHelper.favoriteBLog([])).toBe(null)
  })

  test('when list has only one blog, equals the first element in list', () => {
    expect(listHelper.favoriteBLog(listWithOneBlog)).toEqual(listWithOneBlog[0])
  })
  test('when list has multiple blogs each one with different like score, it returns the one that has more likes', () => {
    expect(listHelper.favoriteBLog(listMultipleBlogWithDifferentLikeScore)).toEqual(listMultipleBlogWithDifferentLikeScore[1])
  })
  test('when list has multiple blogs, some with same score, it returns the first that has more likes', () => {
    expect(listHelper.favoriteBLog(listMultipleBlogWithDifferentLikeScore)).toEqual(listMultipleBlogWithDifferentLikeScore[1])
  })
  test('when list has multiple blogs, some with same score, it returns the first that has more likes', () => {
    expect(listHelper.favoriteBLog(listMultipleBlogWithSomeEqualLikeScore)).toEqual(listMultipleBlogWithSomeEqualLikeScore[2])
  })
})
describe('most blogs', () => {

  const blogListWithTwoAuthorHavingTheSameAmountOfBlog = [
    {
      _id: '1',
      title: 'one',
      author: 'peter',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 2,
      __v: 0
    },
    {
      _id: '2',
      title: 'two',
      author: 'elena',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    },
    {
      _id: '3',
      title: 'three',
      author: 'peter',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    },
    {
      _id: '4',
      title: 'four',
      author: 'elena',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    }, {
      _id: '5',
      title: 'five',
      author: 'oscar',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    }]
  test('empty list return null', () => {
    expect(listHelper.mostBlogs([])).toBe(null)
  })

  test('two author having same number of blogs return the first one', () => {
    const expectedResult = {
      'author': 'peter',
      'blogs': 2
    }
    expect(listHelper.mostBlogs(blogListWithTwoAuthorHavingTheSameAmountOfBlog)).toEqual(expectedResult)
  })



})

describe('most likes', () => {
  const differentLikeScoreAuthorBlogList = [
    {
      id: '1',
      title: 'one',
      author: 'elena',
      likes: 2,
    },
    {
      id: '2',
      title: 'two',
      author: 'peter',
      likes: 3,
    },
    {
      id: '3',
      title: 'three',
      author: 'elena',
      likes: 2,
    },
    {
      id: '4',
      title: 'four',
      author: 'oscar',
      likes: 2,
    },
  ]
  const sameLikeScoreAuthorBlogList = [
    {
      id: '1',
      title: 'one',
      author: 'elena',
      likes: 2,
    },
    {
      id: '2',
      title: 'two',
      author: 'peter',
      likes: 4,
    },
    {
      id: '3',
      title: 'three',
      author: 'elena',
      likes: 2,
    },
    {
      id: '4',
      title: 'four',
      author: 'oscar',
      likes: 2,
    },
  ]
  test('empty list return null', () => {
    expect(listHelper.mostLikes([])).toBe(null)
  })
  test('list with differente like score by author return the most liked author', () => {
    const expectedResult = {
      'author': 'elena',
      'likes': 4
    }
    expect(listHelper.mostLikes(differentLikeScoreAuthorBlogList)).toEqual(expectedResult)
  })

  test('list with same like score by author return the first most liked author', () => {
    const expectedResult = {
      'author': 'elena',
      'likes': 4
    }
    expect(listHelper.mostLikes(sameLikeScoreAuthorBlogList)).toEqual(expectedResult)
  })

})