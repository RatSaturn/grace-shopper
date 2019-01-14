'use strict'

const db = require('../server/db')
const {
  User,
  Book,
  Genre,
  Order,
  BooksForOrders,
  Staff,
  StaffBooks
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
  'Health Fitness',
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

const staffMembers = [
  {
    name: 'Michelle Ureña',
    imageUrl: 'https://ca.slack-edge.com/T024FPYBQ-UDNRVP8F3-97e2dc5ec3e2-512',
    contactUrl: 'https://www.linkedin.com/in/michelle-urena'
  },
  {
    name: 'Jing Lu',
    imageUrl: 'https://ca.slack-edge.com/T024FPYBQ-UDQ5FHHBJ-0a445d2f78c4-512',
    contactUrl: 'https://www.linkedin.com'
  },
  {
    name: 'Tatiana Scott',
    imageUrl: 'https://ca.slack-edge.com/T024FPYBQ-UDPBG8UM9-c9111106f20c-512',
    contactUrl: 'https://www.linkedin.com/in/tatianascott/'
  },
  {
    name: 'Sher-Min Yang',
    imageUrl: 'https://ca.slack-edge.com/T024FPYBQ-UDQR9CRPU-37c4b1ab83a4-512',
    contactUrl: 'https://www.linkedin.com/'
  }
]

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

  const staff = await Promise.all(
    staffMembers.map(member => Staff.create(member))
  )

  console.log(`seeded ${staff.length} staff members`)

  const [
    michelle,
    mBook1,
    mBook2,
    mBook3,
    mBook4,
    mBook5,
    mBook6
  ] = await Promise.all([
    Staff.findById(1),
    Book.findOne({
      where: {
        title: 'American Like Me'
      }
    }),
    Book.findOne({
      where: {
        title: 'The Brief Wondrous Life of Oscar Wao'
      }
    }),
    Book.findOne({
      where: {
        title: 'Harry Potter Series Box Set (Books 1-7)'
      }
    }),
    Book.findOne({
      where: {
        title: 'Speak'
      }
    }),
    Book.findOne({
      where: {
        title: 'Born A Crime'
      }
    }),
    Book.findOne({
      where: {
        title: "A People's History of the United States"
      }
    })
  ])

  const [jing, jBook1, jBook2, jBook3, jBook4, jBook5] = await Promise.all([
    Staff.findById(2),
    Book.findOne({
      where: {
        title: 'The 7 Habits of Highly Effective People'
      }
    }),
    Book.findOne({
      where: {
        title: 'The Road Less Traveled'
      }
    }),
    Book.findOne({
      where: {
        title: 'A Simple Act of Gratitude'
      }
    }),
    Book.findOne({
      where: {
        title: 'Gifted Hands'
      }
    }),
    Book.findOne({
      where: {
        title: 'The Last Lecture'
      }
    })
  ])

  const [
    tatiana,
    tBook1,
    tBook2,
    tBook3,
    tBook4,
    tBook5,
    tBook6
  ] = await Promise.all([
    Staff.findById(3),
    Book.findOne({
      where: {
        title: "Lilith's Brood"
      }
    }),
    Book.findOne({
      where: {
        title: 'Quiet'
      }
    }),
    Book.findOne({
      where: {
        title: 'Of Water and the Spirit'
      }
    }),
    Book.findOne({
      where: {
        title: 'Kindred'
      }
    }),
    Book.findOne({
      where: {
        title: 'Fledgling'
      }
    }),
    Book.findOne({
      where: {
        title: 'Earth Mother Astrology'
      }
    })
  ])

  await Promise.all([
    michelle.addBooks([mBook1, mBook2, mBook3, mBook4, mBook5, mBook6]),
    jing.addBooks([jBook1, jBook2, jBook3, jBook4, jBook5, mBook3]),
    tatiana.addBooks([tBook1, tBook2, tBook3, tBook4, tBook5, tBook6])
  ])
  console.log(`seeded staff's picks`)

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

  const sherMin = await Staff.findById(4)
  await sherMin.addBooks([book1, book2, book3])

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
