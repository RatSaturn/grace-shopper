import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import classnames from 'classnames'
import BookCard from './book-card'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Collapse from '@material-ui/core/Collapse'

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

class BookView extends Component {
  state = {expanded: this.props.expanded}

  handleExpandClick = () => {
    this.setState(state => ({expanded: !state.expanded}))
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
          <Typography
            variant="h6"
            align="center"
            color="textSecondary"
            gutterBottom
          >
            {this.props.title}
          </Typography>
          <Grid container justify="center" alignItems="center">
            {this.props.books.map(book => (
              <BookCard key={book.id} book={book} />
            ))}
          </Grid>
        </Collapse>
      </div>
    )
  }
}

BookView.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(BookView)
