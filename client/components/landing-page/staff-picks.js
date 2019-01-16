import React, {Component} from 'react'
import Staffs from './staff-data'
import {connect} from 'react-redux'
import {getStaffsFromApi} from '../../store'

export class StaffPicks extends Component {
  async componentDidMount() {
    try {
      await this.props.getStaffsFromApi()
    } catch (err) {
      console.error(err)
    }
  }

  render() {
    return <Staffs staffs={this.props.staffs} />
  }
}

const mapState = state => ({
  staffs: state.staffs
})

const mapDispatch = {
  getStaffsFromApi
}

export default connect(mapState, mapDispatch)(StaffPicks)
