import {REQUEST_SEARCH_PENDING, REQUEST_SEARCH_SUCCESS, REQUEST_SEARCH_FAILED} from '../constants'


const initialState = {
    inputValues: "",
    searchValue: "",
    searchResult : "",
    isPending : false,
    error: '',
}

export const requestSearch = (state=initialState, action={}) => {
    switch(action.type) {
        case REQUEST_SEARCH_PENDING:
            return Object.assign({}, state, { isPending: true });

        case REQUEST_SEARCH_SUCCESS:
            console.log(action.payload)
            return Object.assign({}, state, {
                inputValues: action.payload.input_values,
                searchValue: action.payload.search_values,
                searchResult: action.payload.status,
                isPending: false,
              });

        case REQUEST_SEARCH_FAILED:
            return Object.assign({}, state, {
                error: action.payload,
                isPending: true,
            });

        default:
            return state;
        
    }
}