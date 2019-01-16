import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import Paper from '@material-ui/core/Paper'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import Button from '@material-ui/core/Button'

const styles = theme => ({
  listItem: {
    padding: `${theme.spacing.unit}px 0`
  },
  total: {
    fontWeight: '700'
  },
  title: {
    marginTop: theme.spacing.unit * 2
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
      marginTop: theme.spacing.unit * 6,
      marginBottom: theme.spacing.unit * 6,
      padding: theme.spacing.unit * 3
    }
  },
  stepper: {
    padding: `${theme.spacing.unit * 3}px 0 ${theme.spacing.unit * 5}px`
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  button: {
    marginTop: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit
  }
})

const steps = ['Shipping address', 'Payment details', 'Review your order']

export class ReviewOrder extends Component {
  constructor(props) {
    super(props)
    this.state = {
      redirect: false
    }
    this.displayPrice = this.displayPrice.bind(this)
    this.calculateTotal = this.calculateTotal.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.renderRedirect = this.renderRedirect.bind(this)
  }

  displayPrice(price) {
    let result = price.toString().split('')
    result.splice(result.length - 2, 0, '.')
    return result
  }

  calculateTotal(cart) {
    const displayTotal = cart
      .reduce((accum, book) => {
        return accum + book.price * book.booksForOrder.quantity
      }, 0)
      .toString()
      .split('')
    displayTotal.splice(displayTotal.length - 2, 0, '.')
    return displayTotal
  }

  handleSubmit(event) {
    event.preventDefault()
    this.setState({redirect: 'true'})
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to="./stripe-checkout" />
    }
  }

  render() {
    const {classes} = this.props
    return (
      <div className={classes.layout}>
        {this.renderRedirect()}
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Review Your Order
          </Typography>

          <Stepper activeStep={steps[1]} className={classes.stepper}>
            {steps.map(label => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <Typography variant="h6" gutterBottom>
            Order Summary
          </Typography>

          <List disablePadding>
            {this.props.cart.map(book => {
              return (
                <ListItem className={classes.listItem} key={book.id}>
                  <ListItemText primary={book.title} secondary={book.authors} />
                  <Typography variant="body2">
                    ${this.displayPrice(book.price)}
                  </Typography>
                </ListItem>
              )
            })}

            <ListItem className={classes.listItem}>
              <ListItemText primary="Total" />
              <Typography variant="subtitle1" className={classes.total}>
                ${this.calculateTotal(this.props.cart)}
              </Typography>
            </ListItem>

            <div id="confirm-purchase" className={classes.buttons}>
              <Button
                className={classes.button}
                type="submit"
                variant="contained"
                onClick={this.handleSubmit}
              >
                Proceed
              </Button>
            </div>
          </List>
        </Paper>
      </div>
    )
  }
}

ReviewOrder.propTypes = {
  classes: PropTypes.object.isRequired
}

const mapState = state => ({
  cart: state.cart,
  user: state.user
})

export default connect(mapState)(withStyles(styles)(ReviewOrder))
