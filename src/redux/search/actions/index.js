import {REQUEST_SEARCH_PENDING, REQUEST_SEARCH_SUCCESS, REQUEST_SEARCH_FAILED} from '../constants'
import {Url}  from '../../../utils/URL'
import axios from 'axios'


export const requestSearch = (input, value) => (dispatch) => {
    console.log(input, value)
    dispatch({type: REQUEST_SEARCH_PENDING});
    const token = localStorage.getItem('token')
    axios.post(`${Url}/api/searchValue`, {
        "input_values": input,
        "search_values": value,
        // "user":1
    },{
    headers: {
        'Authorization': `Bearer ${token}`,
    }
    }).then(res => {
        console.log(res)
        dispatch({type: REQUEST_SEARCH_SUCCESS, payload: res.data})
    }).catch(err => {
        console.log(err)
        dispatch({type: REQUEST_SEARCH_FAILED, payload: err})
    })
}


