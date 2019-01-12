import React from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import classnames from 'classnames'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'

import Typography from '@material-ui/core/Typography'

const styles = () => ({
  card: {
    maxWidth: 300,
    margin: 40
  },

  media: {
    height: 200,
    paddingTop: '56.25%' // 16:9
  },
  actions: {
    display: 'flex'
  }
})

const bookCard = props => {
  const {classes} = props
  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image="http://books.google.com/books/content?id=0GQoDgAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
        title="Paella dish"
      />
      <CardContent>
        <Typography component="p">Book Information Here</Typography>
      </CardContent>
    </Card>
  )
}

bookCard.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(bookCard)
