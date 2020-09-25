const initState = {}

const questionReducer = (state = initState, action) => {
    switch (action.type) {
        case 'ADD_QUESTION':
            console.log('add question', action.question)
            return state
        case 'ADD_QUESTION_ERROR':
            console.log('add question error', action.error)
            return state
        case 'EDIT_QUESTION':
            console.log('edited instruction', action.question)
            return state
        case 'EDIT_QUESTION_ERROR':
            console.log('edit instruction error', action.err)
            return state
        case 'DELETE_QUESTION':
            console.log('deleted instruction', action.id)
            return state
        case 'DELETE_QUESTION_ERROR':
            console.log('deleted instruction error', action.err)
            return state
        default: return state
    }
}

export default questionReducer