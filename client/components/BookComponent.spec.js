import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import BookComponent from './BookComponent'
import {Link} from 'react-router-dom'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('BookComponent', () => {
  let bookComponent
  const defaultBook = {
    id: 1,
    title: 'Harry Potter and the Goblet of Fire',
    authors: ['J.K. Rowling'],
    imageUrl:
      'https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwifwd64z-HfAhUvWN8KHUJaB20QjRx6BAgBEAU&url=https%3A%2F%2Fwww.akc.org%2Fexpert-advice%2Fhealth%2Fpuppies-how-much-exercise%2F&psig=AOvVaw0KQnWmZUhYE6Xe7O-A2Si4&ust=1547154943916326',
    price: 1995
  }
  const displayPrice = defaultBook.price.toString().split('')
  displayPrice.splice(displayPrice.length - 2, 0, '.')
  beforeEach(() => {
    bookComponent = shallow(<BookComponent book={defaultBook} />)
  })

  it('renders all book elements', () => {
    expect(bookComponent.find('p')).to.have.length(
      2 + defaultBook.authors.length
    )
  })

  it('renders the book cover image', () => {
    expect(
      bookComponent.contains(
        <img src="https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwifwd64z-HfAhUvWN8KHUJaB20QjRx6BAgBEAU&url=https%3A%2F%2Fwww.akc.org%2Fexpert-advice%2Fhealth%2Fpuppies-how-much-exercise%2F&psig=AOvVaw0KQnWmZUhYE6Xe7O-A2Si4&ust=1547154943916326" />
      )
    ).to.be.equal(true)
  })

  it('renders each title as a React link', () => {
    expect(
      bookComponent.contains(
        <Link exact to="/allbooks/1">
          Harry Potter and the Goblet of Fire
        </Link>
      )
    )
  })

  it('renders each book property in its own p', () => {
    expect(bookComponent.contains(<p>J.K. Rowling</p>)).to.be.equal(true)
    expect(bookComponent.contains(<p>${displayPrice}</p>)).to.be.equal(true)
  })
})
