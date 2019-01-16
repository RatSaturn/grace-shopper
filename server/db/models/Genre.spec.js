const {expect} = require('chai')
const db = require('../Index')

const Genre = db.model('genre')

describe('Genre model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('Data Type', () => {
    describe('Correct Genre type', () => {
      let genre

      beforeEach(async () => {
        genre = await Genre.create({
          type: 'Drama'
        })
      })

      it('returns a string', () => {
        expect(typeof genre.type).to.equal('string')
      })
    }) // end describe('Correct Genre Type')
  }) // end describe('Data Type')
}) // end describe('Genre model')
