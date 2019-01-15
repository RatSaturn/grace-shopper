import React from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import classnames from 'classnames'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import {Link} from 'react-router-dom'

import Typography from '@material-ui/core/Typography'

const styles = () => ({
  card: {
    width: 150,
    height: 200,
    margin: 30
  },

  media: {
    height: 150,
    paddingTop: '56.25%' // 16:9
  },
  actions: {
    display: 'flex'
  }
})

const StaffCard = props => {
  const {classes, staff} = props
  const {id, name, imageUrl} = staff

  return (
    <Card className={classes.card}>
      <CardMedia className={classes.media} image={imageUrl} title={name} />
      <CardContent>
        <Typography component="p">
          <Link exact to={`/allStaffs/${id}`}>
            <b>{name}</b>
          </Link>
        </Typography>
      </CardContent>
    </Card>
  )
}

StaffCard.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(StaffCard)
