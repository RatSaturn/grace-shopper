'use strict'

const db = require('../server/db')
const {User, Book} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'})
  ])
  console.log(`seeded ${users.length} users`)

  const books = await Promise.all([
    Book.create({
      title: "Harry Potter and the Sorcerer's Stone",
      author: 'JK Rowling',
      price: 19.95,
      imageUrl:
        'https://images-na.ssl-images-amazon.com/images/I/51HSkTKlauL._SX346_BO1,204,203,200_.jpg',
      inventory: 5
    }),
    Book.create({
      title: 'Harry Potter and the Chamber of Secrets',
      author: 'JK Rowling',
      price: 21.95,
      imageUrl:
        'https://images-na.ssl-images-amazon.com/images/I/51jNORv6nQL._SX340_BO1,204,203,200_.jpg',
      inventory: 5
    })
  ])

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
