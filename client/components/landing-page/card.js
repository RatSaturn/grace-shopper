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
  const {book} = props
  return (
    <Card className={classes.card}>
      <CardMedia className={classes.media} image={book.imageUrl} title="book" />
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

// import React from 'react'
// import {Link} from 'react-router-dom'

// const BookComponent = props => {
//   const {id, imageUrl, title, authors, price} = props.book
//   const displayPrice = price.toString().split('')
//   displayPrice.splice(displayPrice.length - 2, 0, '.')
//   return (
//     <div>
//       <img src={imageUrl} />
//       <p>
//         <Link exact to={`/allbooks/${id}`}>
//           {title}
//         </Link>
//       </p>

//       {authors.map(author => <p key={author}>{author}</p>)}
//       <p>${displayPrice}</p>
//     </div>
//   )
// }

// export default BookComponent
