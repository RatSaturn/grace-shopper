import React from 'react'
import Typography from '@material-ui/core/Typography'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import StaffCard from './StaffCard'

const styles = () => ({
  heroContent: {
    maxWidth: 1000,
    margin: '0 auto'
  },
  bigAvatar: {
    margin: 30,
    width: 60,
    height: 60
  }
})

const Staffs = props => {
  const {classes, staffs} = props
  return (
    <div className={classes.heroContent}>
      <Typography
        variant="h6"
        align="center"
        color="textSecondary"
        gutterBottom
      >
        Staff Picks
      </Typography>
      <Grid container justify="center" alignItems="center">
        {staffs.map(staff => <StaffCard key={staff.id} staff={staff} />)}
      </Grid>
    </div>
  )
}

Staffs.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Staffs)
