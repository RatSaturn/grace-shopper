import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getSingleStaffFromApi} from '../store'
import BookComponent from './BookComponent'

export class SingleStaff extends Component {
  async componentDidMount() {
    const staffId = this.props.match.params.staffId
    try {
      console.log('SingleStaff did mount')
      console.log('staffId: ', staffId)
      await this.props.getSingleStaffFromApi(staffId)
    } catch (err) {
      console.error(err)
    }
  }

  render() {
    const singleStaff = this.props.singleStaff
    console.log('singleStaff: ', singleStaff)
    return !singleStaff.name ? null : (
      <div>
        <center>
          <img src={singleStaff.imageUrl} height="200" width="200" />
          <h2> {singleStaff.name}</h2>
          <a href={singleStaff.contactUrl}>{singleStaff.contactUrl}</a>
        </center>
        <div className="allbookscontainer">
          {singleStaff.books.map(book => (
            <BookComponent
              className="singleBookContainer"
              key={book.id}
              book={book}
            />
          ))}
        </div>
      </div>
    )
  }
}

const mapState = state => ({
  singleStaff: state.singleStaff
})

const mapDispatch = {
  getSingleStaffFromApi
}

export default connect(mapState, mapDispatch)(SingleStaff)
