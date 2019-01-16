import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getSingleStaffFromApi} from '../store'
import BookCard from './landing-page/book-card'
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'

class SingleStaff extends Component {
  async componentDidMount() {
    const staffId = this.props.match.params.staffId
    try {
      await this.props.getSingleStaffFromApi(staffId)
    } catch (err) {
      console.error(err)
    }
  }

  render() {
    const singleStaff = this.props.singleStaff
    return !singleStaff.name ? null : (
      <div>
        <center>
          <img src={singleStaff.imageUrl} height="250" width="250" />
          <h2> {singleStaff.name}</h2>
          <a href={singleStaff.contactUrl}>{singleStaff.contactUrl}</a>
        </center>
        <Divider />
        <div className="allbookscontainer">
          <Grid container justify="center" alignItems="center">
            {singleStaff.books.map(book => (
              <BookCard key={book.id} book={book} />
            ))}
          </Grid>
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
