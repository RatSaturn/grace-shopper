import axios from 'axios'

//ACTION TYPES
const GET_STAFFS = 'GET_STAFFS'

//INITIAL STATE
const allStaffs = []

//ACTION CREATORS
const getStaffs = staffs => ({
  type: GET_STAFFS,
  staffs
})

//THUNK CREATORS
export const getStaffsFromApi = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/staffs')
    dispatch(getStaffs(data || allStaffs))
  } catch (err) {
    console.error(err)
  }
}

//REDUCER
export default function(state = allStaffs, action) {
  switch (action.type) {
    case GET_STAFFS:
      return action.staffs
    default:
      return state
  }
}
