import React from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

const styles = () => ({
  appBar: {
    top: 'auto',
    bottom: 0
  },
  toolbar: {
    alignItems: 'center',
    justifyContent: 'space-around'
  }
})

function BottomAppBar(props) {
  const {classes} = props
  return (
    <AppBar position="fixed" color="primary" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        {' '}
        <Typography
          variant="subtitle2"
          color="inherit"
          className={classes.grow}
        >
          Contact Us
        </Typography>
      </Toolbar>{' '}
    </AppBar>
  )
}

BottomAppBar.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(BottomAppBar)
