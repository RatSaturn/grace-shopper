import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import classnames from 'classnames'
import Card from './book-card'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Collapse from '@material-ui/core/Collapse'
import {connect} from 'react-redux'
import {getBooksFromApi} from '/Users/sy/Documents/grace-shopper/client/store'

const styles = theme => ({
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  }
})

class NewArrivals extends Component {
  state = {expanded: false}

  handleExpandClick = () => {
    this.setState(state => ({expanded: !state.expanded}))
  }

  async componentDidMount() {
    try {
      await this.props.getBooksFromApi()
    } catch (err) {
      console.error(err)
    }
  }
  render() {
    const {classes} = this.props
    return (
      <div align="center">
        <div>
          <Typography
            variant="h6"
            align="center"
            color="textSecondary"
            gutterBottom
          >
            Browse Our Selection
          </Typography>
          <IconButton
            className={classnames(classes.expand, {
              [classes.expandOpen]: this.state.expanded
            })}
            align="center"
            onClick={this.handleExpandClick}
            aria-expanded={this.state.expanded}
            aria-label="Show more"
          >
            <ExpandMoreIcon fontSize="large" />
          </IconButton>
        </div>

        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
          <Grid container justify="center" alignItems="center">
            {this.props.books.map(book => <Card key={book.id} book={book} />)}
          </Grid>
        </Collapse>
      </div>
    )
  }
}

NewArrivals.propTypes = {
  classes: PropTypes.object.isRequired
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    books: state.books
  }
}

const mapDispatch = dispatch => {
  return {
    getBooksFromApi() {
      dispatch(getBooksFromApi())
    }
  }
}

export default connect(mapState, mapDispatch)(withStyles(styles)(NewArrivals))
