import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {AllBooks} from './AllBooks'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('AllBooks', () => {
  let allBooks
  const bookArray = [
    {
      id: 1,
      title: "Harry Potter and the Sorcerer's Stone",
      author: 'J.K. Rowling',
      imageUrl:
        'https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwifwd64z-HfAhUvWN8KHUJaB20QjRx6BAgBEAU&url=https%3A%2F%2Fwww.akc.org%2Fexpert-advice%2Fhealth%2Fpuppies-how-much-exercise%2F&psig=AOvVaw0KQnWmZUhYE6Xe7O-A2Si4&ust=1547154943916326',
      price: 19.95,
      format: 'Hardcover'
    },
    {
      id: 2,
      title: 'Harry Potter and the Chamber of Secrets',
      author: 'J.K. Rowling',
      imageUrl:
        'https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwifwd64z-HfAhUvWN8KHUJaB20QjRx6BAgBEAU&url=https%3A%2F%2Fwww.akc.org%2Fexpert-advice%2Fhealth%2Fpuppies-how-much-exercise%2F&psig=AOvVaw0KQnWmZUhYE6Xe7O-A2Si4&ust=1547154943916326',
      price: 19.95,
      format: 'Hardcover'
    },
    {
      id: 3,
      title: 'Harry Potter and the Prisoner of Azkaban',
      author: 'J.K. Rowling',
      imageUrl:
        'https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwifwd64z-HfAhUvWN8KHUJaB20QjRx6BAgBEAU&url=https%3A%2F%2Fwww.akc.org%2Fexpert-advice%2Fhealth%2Fpuppies-how-much-exercise%2F&psig=AOvVaw0KQnWmZUhYE6Xe7O-A2Si4&ust=1547154943916326',
      price: 19.95,
      format: 'Hardcover'
    },
    {
      id: 4,
      title: 'Harry Potter and the Goblet of Fire',
      author: 'J.K. Rowling',
      imageUrl:
        'https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwifwd64z-HfAhUvWN8KHUJaB20QjRx6BAgBEAU&url=https%3A%2F%2Fwww.akc.org%2Fexpert-advice%2Fhealth%2Fpuppies-how-much-exercise%2F&psig=AOvVaw0KQnWmZUhYE6Xe7O-A2Si4&ust=1547154943916326',
      price: 19.95,
      format: 'Hardcover'
    }
  ]
  beforeEach(() => {
    allBooks = shallow(<AllBooks books={bookArray} />)
  })

  it('renders a Book Component for every book on props', () => {
    expect(allBooks.find('.singleBookContainer')).to.have.lengthOf(4)
  })
})
