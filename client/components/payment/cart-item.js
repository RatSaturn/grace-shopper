import React from 'react'
import {updateCartOnServer} from '../../store'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import CardActions from '@material-ui/core/CardActions'
import Select from '@material-ui/core/Select'
import {withStyles} from '@material-ui/core'
import PropTypes from 'prop-types'

const styles = () => ({
  card: {
    display: 'flex'
  },
  details: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justify: 'space-around',
    wrap: 'wrap'
  },
  content: {
    flex: '1 0 auto'
  },
  cover: {
    width: 151
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    justify: 'flex-end'
  },
  playIcon: {
    height: 38,
    width: 38
  }
})

const CartItem = props => {
  const {imageUrl, title, author, price, id, booksForOrder} = props.book
  const {classes} = props

  const loop = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  const displayPrice = (booksForOrder.quantity * price).toString().split('')
  displayPrice.splice(displayPrice.length - 2, 0, '.')

  return (
    <Card className={classes.card} style={{width: '70vw', height: '150px'}}>
      <div className={classes.details}>
        <CardMedia
          className={classes.cover}
          style={{height: '10vw'}}
          image={imageUrl}
          title={title}
        />
        <CardContent className={classes.content}>
          <Link to={`/allbooks/${id}`}>
            <Typography gutterBottom variant="headline" component="h2">
              {title}
            </Typography>
          </Link>
          <Typography component="p">
            {author}
            {'    '}${displayPrice}
          </Typography>
        </CardContent>

        <CardActions className={classes.controls}>
          <Typography component="h5">Quantity:</Typography>
          <Select
            id="quantity-dropdown"
            value={booksForOrder.quantity}
            onChange={event =>
              props.updateCartOnServer({
                bookId: id,
                quantity: event.target.value
              })
            }
          >
            {loop.map(num => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </Select>
        </CardActions>
        <CardActions className={classes.controls}>
          <button
            type="button"
            onClick={() =>
              props.updateCartOnServer({
                bookId: id,
                quantity: 0
              })
            }
          >
            Remove Item
          </button>
        </CardActions>
      </div>
    </Card>
  )
}

const mapDispatch = dispatch => {
  return {
    updateCartOnServer(bookUpdate) {
      dispatch(updateCartOnServer(bookUpdate))
    }
  }
}

CartItem.propTypes = {
  classes: PropTypes.object.isRequired
}

export default connect(null, mapDispatch)(withStyles(styles)(CartItem))
