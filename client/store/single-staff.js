import axios from 'axios'

// ACTION TYPES
const GET_SINGLE_STAFF = 'GET_SINGLE_STAFF'

// INITIAL STATE
const singleStaff = {}

// ACTION CREATORS
const getSingleStaff = staff => ({type: GET_SINGLE_STAFF, staff})

// THUNK CREATORS
export const getSingleStaffFromApi = id => async dispatch => {
  try {
    const {data} = await axios.get(`/api/staffs/${id}`)
    dispatch(getSingleStaff(data || singleStaff))
  } catch (err) {
    console.error(err)
  }
}

// REDUCER
export default function(state = singleStaff, action) {
  switch (action.type) {
    case GET_SINGLE_STAFF:
      return action.staff
    default:
      return state
  }
}
