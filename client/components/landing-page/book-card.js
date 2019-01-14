import React from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import classnames from 'classnames'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import {Link} from 'react-router-dom'

import Typography from '@material-ui/core/Typography'

const styles = () => ({
  card: {
    width: 200,
    height: 300,
    margin: 40
  },

  media: {
    height: 200,
    paddingTop: '56.25%' // 16:9
  },
  actions: {
    display: 'flex'
  }
})

const BookCard = props => {
  const {classes, book} = props
  const displayPrice = book.price.toString().split('')
  displayPrice.splice(displayPrice.length - 2, 0, '.')

  return (
    <Card className={classes.card}>
      <CardMedia className={classes.media} image={book.imageUrl} title="book" />
      <CardContent>
        <Typography component="p">
          <Link exact to={`/allbooks/${book.id}`}>
            <b>{book.title}</b>
          </Link>
        </Typography>

        {book.authors.map(author => (
          <Typography component="p" key={author}>
            {author}
          </Typography>
        ))}
        <Typography component="p">${displayPrice}</Typography>
      </CardContent>
    </Card>
  )
}

BookCard.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(BookCard)
