import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getSingleBookFromApi, updateCartOnServer} from '../store'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import CardActions from '@material-ui/core/CardActions'
import Select from '@material-ui/core/Select'
import {withStyles} from '@material-ui/core'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'

const styles = () => ({
  card: {
    display: 'flex',
    flexDirection: 'row'
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
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

export class SingleBook extends Component {
  async componentDidMount() {
    const id = this.props.match.params.bookId
    try {
      await this.props.getSingleBookFromApi(id)
    } catch (err) {
      console.error(err)
    }
  }

  render() {
    const {classes, singleBook} = this.props
    let displayPrice
    if (singleBook.price) {
      displayPrice = singleBook.price.toString().split('')
      displayPrice.splice(displayPrice.length - 2, 0, '.')
    }

    return (
      <Grid
        container
        spacing={16}
        style={{paddingLeft: '15%'}}
        direction="column"
        alignItems="stretch"
        justify="space-between"
        alignContent="stretch"
      >
        <Card className={classes.card} style={{width: '70vw'}}>
          <Grid container>
            <Grid item>
              <CardMedia
                className={classes.cover}
                style={{height: '20vw'}}
                image={singleBook.imageUrl}
                title={singleBook.title}
              />
            </Grid>
            <Grid item className={classes.details}>
              <Grid item>
                <CardContent className={classes.content}>
                  <Typography gutterBottom variant="headline" component="h2">
                    {singleBook.title}
                  </Typography>
                  <Typography component="p">
                    {singleBook.author}
                    <br />
                    ${displayPrice}
                  </Typography>
                </CardContent>
              </Grid>
              <Grid item>
                <CardContent className={classes.content}>
                  <Typography component="p" style={{padding: '15%'}}>
                    {singleBook.description}
                  </Typography>
                </CardContent>
              </Grid>
              <Grid item>
                {' '}
                <CardActions className={classes.controls}>
                  <Typography component="h5">
                    <button
                      type="button"
                      onClick={() =>
                        this.props.updateCartOnServer({
                          bookId: singleBook.id,
                          book: singleBook,
                          quantity: 1
                        })
                      }
                    >
                      Add to Cart
                    </button>
                  </Typography>
                </CardActions>
              </Grid>
            </Grid>
          </Grid>
        </Card>
      </Grid>
    )
  }
}
/**
 * CONTAINER
 */
const mapState = state => {
  return {
    singleBook: state.singleBook,
    cart: state.cart
  }
}
const mapDispatch = dispatch => ({
  getSingleBookFromApi: id => dispatch(getSingleBookFromApi(id)),
  updateCartOnServer: bookInfo => dispatch(updateCartOnServer(bookInfo))
})
SingleBook.propTypes = {
  classes: PropTypes.object.isRequired
}

export default connect(mapState, mapDispatch)(withStyles(styles)(SingleBook))
