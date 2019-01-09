'use strict'

const db = require('../server/db')
const {User, Book} = require('../server/db/models')
const jsonFiles = [
  require('../script/booksFromGoogle/business.json'),
  require('../script/booksFromGoogle/childrenFiction.json'),
  require('../script/booksFromGoogle/classicLiteraryFiction.json'),
  require('../script/booksFromGoogle/fantasyFiction.json'),
  require('../script/booksFromGoogle/healthFitness.json'),
  require('../script/booksFromGoogle/historicalFiction.json'),
  require('../script/booksFromGoogle/history.json'),
  require('../script/booksFromGoogle/humor.json'),
  require('../script/booksFromGoogle/magicRealismFiction.json'),
  require('../script/booksFromGoogle/memoir.json'),
  require('../script/booksFromGoogle/modernFiction.json'),
  require('../script/booksFromGoogle/mysteryFiction.json'),
  require('../script/booksFromGoogle/narrative.json'),
  require('../script/booksFromGoogle/religion.json'),
  require('../script/booksFromGoogle/selfHelp.json'),
  require('../script/booksFromGoogle/youngAdultFiction.json')
]

const genresList = [
  'Business',
  `Children's Fiction`,
  'Classic Literary Fiction',
  'Fantasy Fiction',
  'Health/Fitness',
  'Historical Fiction',
  'History',
  'Humor',
  'Magic Realism',
  'Memoir',
  'Modern Fiction',
  'Mystery Fiction',
  'Narrative',
  'Religion',
  'Self Help',
  'Young Adult Fiction'
]

const allBooks = jsonFiles
  .map((categoryBook, index) =>
    categoryBook.items.map(book => ({
      title: book.volumeInfo.title,
      subtitle: book.volumeInfo.subtitle,
      authors: book.volumeInfo.authors,
      genre: genresList[index],
      languange: book.volumeInfo.language,
      publisher: book.volumeInfo.publisher,
      publishedDate: book.volumeInfo.publishedDate,
      description: book.volumeInfo.description,
      pageCount: book.volumeInfo.pageCount,
      price: book.saleInfo.listPrice
        ? Math.ceil(book.saleInfo.listPrice.amount * 100)
        : 0,
      currencyCode: book.saleInfo.listPrice
        ? book.saleInfo.listPrice.currencyCode
        : 'USD',
      imageUrl: book.volumeInfo.imageLinks
        ? book.volumeInfo.imageLinks.thumbnail
        : null,
      inventory: Math.ceil(Math.random() * 10)
    }))
  )
  .reduce((allBooks, categoryBooks) => allBooks.concat(categoryBooks), [])

console.log(allBooks.length)

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'})
  ])

  console.log(`seeded ${users.length} users`)

  const books = await Promise.all(allBooks.map(book => Book.create(book)))

  console.log(`seeded ${books.length} books`)

  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
