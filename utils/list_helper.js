// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1
}
const totalLikes = (blogs) => {
  return blogs.reduce((sum, item) => {
    return sum + item.likes
  }, 0)
}
const favoriteBLog = (blogs) => {
  if (blogs.length === 0) return null
  return blogs.reduce((favBlogSoFar, currentBlog) => favBlogSoFar.likes > currentBlog.likes ? favBlogSoFar : currentBlog)

}
const mostBlogs = (blogs) => {

  if (blogs.length === 0) return null

  const authors = []

  for (let i = 0; i < blogs.length; i++) {

    const authorIndex = authors.findIndex(a => a.author === blogs[i].author)
    if (authorIndex === -1) {
      authors.push({ 'author': blogs[i]['author'], 'blogs': 1 })
    } else {
      authors[authorIndex]['blogs'] = authors[authorIndex]['blogs'] + 1
    }
  }

  return authors.reduce((bestAuthor, currentAuthor) => bestAuthor.blogs >= currentAuthor.blogs ? bestAuthor : currentAuthor)
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null

  const authors = []

  for (let i = 0; i < blogs.length; i++) {

    const authorIndex = authors.findIndex(a => a.author === blogs[i].author)
    if (authorIndex === -1) {
      authors.push({ 'author': blogs[i]['author'], 'likes': blogs[i]['likes'] })
    } else {
      authors[authorIndex]['likes'] = authors[authorIndex]['likes'] + blogs[i]['likes']
    }
  }

  return authors.reduce((bestAuthor, currentAuthor) => bestAuthor.likes >= currentAuthor.likes ? bestAuthor : currentAuthor)
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBLog,
  mostBlogs,
  mostLikes
}