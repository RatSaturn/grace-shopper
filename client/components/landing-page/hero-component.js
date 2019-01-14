import React from 'react'
import Typography from '@material-ui/core/Typography'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'

const styles = theme => ({
  heroContent: {
    maxWidth: 600,
    margin: '0 auto',
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`
  },
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: 'none'
  }
})

const HeroComponent = props => {
  const {classes} = props
  return (
    <div className={classes.heroContent}>
      <Typography variant="h3" align="center" color="textPrimary" gutterBottom>
        Welcome to BookStack!
      </Typography>
      <Typography
        variant="h6"
        align="center"
        color="textSecondary"
        component="p"
      >
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa, ipsam,
        eligendi, in quo sunt possimus non incidunt odit vero aliquid similique
        quaerat nam nobis illo aspernatur vitae fugiat numquam repellat.
      </Typography>
    </div>
  )
}

HeroComponent.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(HeroComponent)
