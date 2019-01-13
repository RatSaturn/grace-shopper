'use strict'

const db = require('../server/db')
const {
  User,
  Book,
  Genre,
  Order,
  BooksForOrders,
  Staff
} = require('../server/db/models')
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
        : Math.ceil(Math.random() * 10000),
      currencyCode: book.saleInfo.listPrice
        ? book.saleInfo.listPrice.currencyCode
        : 'USD',
      imageUrl: book.volumeInfo.imageLinks
        ? book.volumeInfo.imageLinks.thumbnail
        : 'http://www.surprisingdiscoveries.com/uploads/3/2/2/1/32211241/4591772_orig.jpg',
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

  const genres = await Promise.all(
    genresList.map(genre => Genre.create({type: genre}))
  )

  console.log(`seeded ${genres.length} genres`)

  let [order, book1, book2, book3] = await Promise.all([
    Order.create({pending: true}),
    Book.findById(1),
    Book.findById(2),
    Book.findById(3)
  ])

  await Promise.all([
    BooksForOrders.create({
      orderId: order.id,
      bookId: book1.id,
      quantity: 1,
      price: book1.price
    }),
    BooksForOrders.create({
      orderId: order.id,
      bookId: book2.id,
      quantity: 1,
      price: book2.price
    }),
    BooksForOrders.create({
      orderId: order.id,
      bookId: book3.id,
      quantity: 1,
      price: book3.price
    })
  ])
  order = await Order.create({pending: true})

  await Promise.all([
    BooksForOrders.create({
      orderId: order.id,
      bookId: book1.id,
      quantity: 2,
      price: book1.price
    }),
    BooksForOrders.create({
      orderId: order.id,
      bookId: book2.id,
      quantity: 2,
      price: book2.price
    }),
    BooksForOrders.create({
      orderId: order.id,
      bookId: book3.id,
      quantity: 2,
      price: book3.price
    })
  ])
  order = await Order.create({pending: true})

  await Promise.all([
    BooksForOrders.create({
      orderId: order.id,
      bookId: book1.id,
      quantity: 3,
      price: book1.price
    }),
    BooksForOrders.create({
      orderId: order.id,
      bookId: book2.id,
      quantity: 3,
      price: book2.price
    }),
    BooksForOrders.create({
      orderId: order.id,
      bookId: book3.id,
      quantity: 3,
      price: book3.price
    })
  ])

  console.log('seeded 3 pending orders')

  const allStaffs = [
    {
      name: 'Michelle Urena',
      imageUrl:
        'https://proxy.duckduckgo.com/iu/?u=http%3A%2F%2Fwondrouspics.com%2Fwp-content%2Fuploads%2F2011%2F12%2FCute_kitten.jpg&f=1',
      contactUrl: 'https://www.linkedin.com/in/michelle-urena'
    },
    {
      name: 'Jing Lu',
      imageUrl:
        'https://proxy.duckduckgo.com/iu/?u=http%3A%2F%2F4.bp.blogspot.com%2F-W-Q7_l1OoxY%2FUWAJSrtvn_I%2FAAAAAAAASVM%2FeMqye-hpAu4%2Fs1600%2Fworld-s-cutest-kitten.jpg&f=1',
      contactUrl: 'https://www.linkedin.com/in/jing-lu-b8b6106b/'
    },
    {
      name: 'Tatiana Scott',
      imageUrl:
        'https://proxy.duckduckgo.com/iu/?u=http%3A%2F%2Fimages.agoramedia.com%2FEHBlogImages%2Fethan-zohn-the-zohn-zone%2F2014%2F03%2FLucy.jpg&f=1',
      contactUrl: 'https://www.linkedin.com/in/tatianascott/'
    },
    {
      name: 'Sher-Min Yang',
      imageUrl:
        'https://proxy.duckduckgo.com/iu/?u=https%3A%2F%2Fs-media-cache-ak0.pinimg.com%2F736x%2Fb4%2F6b%2F07%2Fb46b079df6f47c093f7c123e70776892--fluffy-kittens-cute-kitten-fluffy.jpg&f=1',
      contactUrl: 'https://www.linkedin.com/in/sher-min-yang-7653a78b/'
    }
  ]

  const [michelle, jing, tatiana, sherMin] = await Promise.all(
    allStaffs.map(staff => Staff.create(staff))
  )
  await Promise.all([
    michelle.addBooks([book1, book2]),
    jing.addBooks([book2, book3]),
    tatiana.addBooks([book1, book3]),
    sherMin.addBooks([book1, book2, book3])
  ])

  console.log('seeded 4 staffs and their book picks')
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
