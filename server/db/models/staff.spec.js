const chai = require('chai')
const expect = chai.expect
const db = require('../index')

// Models
const Staff = db.model('staff')

describe('Staff model', () => {
  describe('Validations', () => {
    let staff

    beforeEach(() => {
      staff = Staff.build()
    })

    it('requires `imageUrl`', async () => {
      staff.name = 'Lisa Evers'
      staff.bio =
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
      // staff.imageUrl = 'https://cdn.pixabay.com/photo/2016/06/18/17/42/image-1465348_960_720.jpg'
      staff.contactUrl = 'https://www.linkedin.com'

      try {
        await staff.validate()
        throw new Error('validate succeeded but should have failed')
      } catch (err) {
        expect(err.message).to.contain('imageUrl')
      }
    })

    it('requires `contactUrl`', async () => {
      staff.name = 'Lisa Evers'
      staff.bio =
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
      staff.imageUrl =
        'https://cdn.pixabay.com/photo/2016/06/18/17/42/image-1465348_960_720.jpg'
      // staff.contactUrl = 'https://www.linkedin.com'

      try {
        await staff.validate()
        throw new Error('validate succeeded but should have failed')
      } catch (err) {
        expect(err.message).to.contain('contactUrl')
      }
    })
  })
})
