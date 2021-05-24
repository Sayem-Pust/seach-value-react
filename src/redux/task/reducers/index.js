import {REQUEST_TASK_PENDING, REQUEST_TASK_SUCCESS, REQUEST_TASK_FAILED} from '../constants'


const initialState = {
    isPending: false,
    redult: "",
    err: "",
}

export const requestTask = (state=initialState, action={}) => {
    switch(action.type){
        case REQUEST_TASK_PENDING:
            return Object.assign({}, state, {isPending: true})

        case REQUEST_TASK_SUCCESS:
            return Object.assign({}, state, {result: action.payload, isPending: false})

        case REQUEST_TASK_FAILED:
            return Object.assign({}, state, {err: action.payload, isPending: false})

        default:
            return state
    }
}

