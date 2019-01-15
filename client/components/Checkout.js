import React, {Component} from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import Stepper from '@material-ui/core/Stepper'
import StepLabel from '@material-ui/core/StepLabel'
import Step from '@material-ui/core/Step'

const styles = theme => ({
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

const steps = ['Shipping address', 'Order summary', 'Checkout']

export class Checkout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      redirect: false,
      shippingInformation: {}
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
    const shippingInformation = {
      firstName: event.target.firstName.value,
      lastName: event.target.lastName.value,
      addressLineOne: event.target.addressLineOne.value,
      addressLineTwo: event.target.addressLineTwo.value,
      city: event.target.city.value,
      state: event.target.country.value,
      zipcode: event.target.zipcode.value,
      country: event.target.zipcode.value
    }
    this.setState({shippingInformation})
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
            Checkout
          </Typography>
          <Stepper activeStep={steps[0]} className={classes.stepper}>
            {steps.map(label => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <Typography variant="h6" gutterBottom>
            Shipping address
          </Typography>

          <form onSubmit={this.handleSubmit} name="checkout">
            <Grid container spacing={24}>
              <Grid item xs={12} sm={6}>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="firstName">First Name</InputLabel>
                  <Input id="firstName" name="firstName" autoFocus />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="lastName">Last Name</InputLabel>
                  <Input name="lastName" type="lastName" id="lastName" />
                </FormControl>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="addressLineOne">Address line 1</InputLabel>
                <Input
                  name="addressLineOne"
                  type="addressLineOne"
                  id="addressLineOne"
                />
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="addressLineTwo">Address line 2</InputLabel>
                <Input
                  name="addressLineTwo"
                  type="addressLineTwo"
                  id="addressLineTwo"
                />
              </FormControl>
            </Grid>

            <Grid container spacing={24}>
              <Grid item xs={12} sm={6}>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="city">City</InputLabel>
                  <Input id="city" name="city" autoFocus />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="state">State/Province/Region</InputLabel>
                  <Input name="state" type="state" id="state" />
                </FormControl>
              </Grid>
            </Grid>

            <Grid container spacing={24}>
              <Grid item xs={12} sm={6}>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="zipcode">Zip / Postal code</InputLabel>
                  <Input
                    id="zipcode"
                    name="zipcode"
                    autoComplete="zipcode"
                    autoFocus
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="country">Country</InputLabel>
                  <Input name="country" type="country" id="country" />
                </FormControl>
              </Grid>
            </Grid>
            <div className={classes.buttons}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.button}
              >
                Next
              </Button>
            </div>
          </form>
        </Paper>
      </div>
    )
  }
}

const mapState = state => ({
  cart: state.cart,
  user: state.user
})

Checkout.propTypes = {
  classes: PropTypes.object.isRequired
}

export default connect(mapState)(withStyles(styles)(Checkout))
