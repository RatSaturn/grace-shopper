import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
// import {Provider} from 'react-redux'
// import configureMockStore from 'redux-mock-store'

import {SingleBook} from './SingleBook'

const adapter = new Adapter()
enzyme.configure({adapter})

// const mockStore = configureMockStore()
// const store = mockStore({
//   id: 1,
//   title: 'Harry Potter and the Goblet of Fire',
//   author: 'J.K. Rowling',
//   imageUrl:
//     'https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwifwd64z-HfAhUvWN8KHUJaB20QjRx6BAgBEAU&url=https%3A%2F%2Fwww.akc.org%2Fexpert-advice%2Fhealth%2Fpuppies-how-much-exercise%2F&psig=AOvVaw0KQnWmZUhYE6Xe7O-A2Si4&ust=1547154943916326',
//   price: 19.95,
//   format: 'Hardcover'
// })

describe('SingleBook', () => {
  let singleBook
  const defaultBook = {
    id: 1,
    title: 'Harry Potter and the Goblet of Fire',
    author: 'J.K. Rowling',
    imageUrl:
      'https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwifwd64z-HfAhUvWN8KHUJaB20QjRx6BAgBEAU&url=https%3A%2F%2Fwww.akc.org%2Fexpert-advice%2Fhealth%2Fpuppies-how-much-exercise%2F&psig=AOvVaw0KQnWmZUhYE6Xe7O-A2Si4&ust=1547154943916326',
    price: 19.95,
    format: 'Hardcover'
  }
  beforeEach(() => {
    singleBook = shallow(<SingleBook singleBook={defaultBook} />)
  })

  it('renders the correct title', () => {
    expect(
      singleBook.contains(<div>Harry Potter and the Goblet of Fire</div>)
    ).to.be.equal(true)
  })

  it('renders the correct author', () => {
    expect(singleBook.contains(<div>J.K. Rowling</div>)).to.be.equal(true)
  })
})
