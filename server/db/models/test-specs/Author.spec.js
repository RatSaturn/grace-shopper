const {expect} = require('chai')
const db = require('../../index')

const Author = db.model('author')

describe('Author model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('Author Name', () => {
    describe('Data Type', () => {
      let author

      beforeEach(async () => {
        author = await Author.create({
          name: 'Harry Belafonte'
        })
      })

      it('returns a string', () => {
        expect(typeof author.name).to.equal('string')
      })
    }) // end describe('Data Type')
  }) // end describe('Author name')
}) // end describe('Author model')
