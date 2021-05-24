import {REQUEST_TASK_PENDING, REQUEST_TASK_SUCCESS, REQUEST_TASK_FAILED} from '../constants'
import axios from 'axios'
import {Url} from '../../../utils/URL'


export const requestTask = (fromDate, toDate, user) => (dispatch) => {
    dispatch({type: REQUEST_TASK_PENDING})
    axios.post(`${Url}/api/searchTask`, {
        "from_date": fromDate,
        "to_date": toDate,
        "user": user
    }).then(res => {
        console.log(res)
        dispatch({type: REQUEST_TASK_SUCCESS, payload: res.data})
    }).catch(err => {
        dispatch({type: REQUEST_TASK_FAILED, payload: err})
    })
}
