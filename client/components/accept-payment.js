import React from 'react'
import {CardElement, injectStripe} from 'react-stripe-elements'
import withStyles from '@material-ui/core/styles/withStyles'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import Stepper from '@material-ui/core/Stepper'
import StepLabel from '@material-ui/core/StepLabel'
import Step from '@material-ui/core/Step'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Button from '@material-ui/core/Button'

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

class AcceptPayment extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      complete: false,
      error: ''
    }
    this.submit = this.submit.bind(this)
  }
  async submit() {
    let {token} = await this.props.stripe.createToken({name: 'Name'})
    let response
    if (token) {
      response = await fetch('/charge', {
        method: 'POST',
        headers: {'Content-Type': 'text/plain'},
        body: token.id
      })
      if (response.ok) this.setState({complete: true})
    }
    this.setState({error: 'Please enter a valid card number.'})
  }

  render() {
    const {classes} = this.props
    if (this.state.complete)
      return (
        <div className={classes.layout}>
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
            <center>
              <Typography varient="h3">Your purchase is complete.</Typography>
            </center>
          </Paper>
        </div>
      )

    return (
      <div className={classes.layout}>
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
            Payment Method
          </Typography>
          <CardElement />
          {this.state.error.length > 0 ? (
            <Grid item xs={12}>
              <Typography varient="h6">{this.state.error}</Typography>
            </Grid>
          ) : (
            <Grid item xs={12}>
              <Typography varient="h6">{this.state.error}</Typography>
            </Grid>
          )}
          <div className={classes.buttons}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={this.submit}
            >
              Submit
            </Button>
          </div>
        </Paper>
      </div>
    )
  }
}
AcceptPayment.propTypes = {
  classes: PropTypes.object.isRequired
}

export default injectStripe(withStyles(styles)(AcceptPayment))

// if (this.state.complete) return <h1>Your Purchase is Complete!</h1>
// return (
//   <div className="checkout">
//     <p>
//       To Complete Your Purchase, please enter your payment information
//       below:
//     </p>
//     <CardElement />

//     <button onClick={this.submit} type="button">
//       Submit
//     </button>
//   </div>
