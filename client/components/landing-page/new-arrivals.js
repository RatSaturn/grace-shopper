import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import classnames from 'classnames'
import Card from './card'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Collapse from '@material-ui/core/Collapse'

//this will eventually need to be mapped to a new arrivals data structure. Tbd.
//this page can be turned into a general template for rendering out a display of books

const styles = theme => ({
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  }
})

class NewArrivals extends Component {
  state = {expanded: false}

  handleExpandClick = () => {
    this.setState(state => ({expanded: !state.expanded}))
  }

  render() {
    const {classes} = this.props
    return (
      <div align="center">
        <div>
          <Typography
            variant="h6"
            align="center"
            color="textSecondary"
            gutterBottom
          >
            Browse our new arrivals!
          </Typography>
          <IconButton
            className={classnames(classes.expand, {
              [classes.expandOpen]: this.state.expanded
            })}
            align="center"
            onClick={this.handleExpandClick}
            aria-expanded={this.state.expanded}
            aria-label="Show more"
          >
            <ExpandMoreIcon fontSize="large" />
          </IconButton>
        </div>

        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
          <Grid container justify="center" alignItems="center">
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
          </Grid>
        </Collapse>
      </div>
    )
  }
}

NewArrivals.propTypes = {
  classes: PropTypes.object.isRequired
}
// const NewArrivals = () => {
// 	return (
// 		<div>
// 			<Typography
// 				variant="h6"
// 				align="center"
// 				color="textSecondary"
// 				gutterBottom
// 			>
// 				Browse our new arrivals!
// 			</Typography>
// 			<Grid container justify="center" alignItems="center">
// 				<Card />
// 				<Card />
// 				<Card />
// 				<Card />
// 				<Card />
// 				<Card />
// 			</Grid>
// 		</div>
// 	);
// };

export default withStyles(styles)(NewArrivals)
