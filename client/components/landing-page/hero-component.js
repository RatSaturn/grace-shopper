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
        This is the place where one book leads to a entire fullstack. From Magic
        Realism to Mystery Fiction, the literary journey and possibilities are
        astoundingly endless. The staff is composed of a group of dedicated
        bookworms that are passionate about making sure that we offer the best
        and most unique collection of books.
      </Typography>
    </div>
  )
}

HeroComponent.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(HeroComponent)
