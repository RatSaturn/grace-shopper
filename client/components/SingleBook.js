import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getSingleBookFromApi, updateCartOnServer} from '../store'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import CardActions from '@material-ui/core/CardActions'
import {withStyles} from '@material-ui/core'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'

const styles = () => ({
  card: {
    display: 'flex',
    flexDirection: 'row',
    flex: '1 0 auto',
    alignItems: 'center',
    justify: 'center'
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
      <div>
        <Grid
          container
          spacing={8}
          style={{paddingLeft: '15%', marginTop: '2%'}}
          direction="column"
          alignItems="stretch"
          justify="space-between"
          alignContent="stretch"
        >
          <Grid item xs={12} sm={12} lg={12} xl={12}>
            <Card
              className={classes.card}
              style={{width: '60vw', height: '40vw'}}
            >
              <Grid
                container
                className={classes.card}
                spacing={8}
                direction="column"
                alignItems="stretch"
                justify="space-between"
                alignContent="stretch"
              >
                <Grid item xs={4} sm={4} lg={4} xl={4}>
                  <center>
                    <img
                      src={singleBook.imageUrl}
                      alt={singleBook.title}
                      className="single-book-image"
                    />
                  </center>
                </Grid>
                <Grid item xs={7} sm={7} lg={7} xl={7}>
                  <Grid
                    container
                    className={classes.details}
                    spacing={16}
                    direction="column"
                    alignItems="center"
                    justify="space-evenly"
                    alignContent="stretch"
                  >
                    <Grid item xs={12} sm={12} lg={12} xl={12}>
                      <CardContent className={classes.content}>
                        <center>
                          <Typography
                            gutterBottom
                            variant="headline"
                            component="h2"
                          >
                            {singleBook.title}
                          </Typography>
                        </center>
                        <center>
                          {singleBook.authors &&
                            singleBook.authors.map(author => (
                              <Typography component="h4" key={author}>
                                {author}
                              </Typography>
                            ))}
                          <Typography component="h4">
                            ${displayPrice}
                          </Typography>
                        </center>
                      </CardContent>
                    </Grid>
                    <Grid item xs={12} sm={12} lg={12} xl={12}>
                      <CardContent className={classes.content}>
                        <Typography component="p">
                          {singleBook.description}
                        </Typography>
                      </CardContent>
                    </Grid>
                    <Grid item xs={12} sm={12} lg={12} xl={12}>
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
                <Grid item xs={1} sm={1} lg={1} xl={1}>
                  {' '}
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </div>
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
