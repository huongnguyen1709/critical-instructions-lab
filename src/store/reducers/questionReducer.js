const initState = {}

const questionReducer = (state = initState, action) => {
    switch (action.type) {
        case 'ADD_QUESTION':
            console.log('add question', action.question)
            return state
        case 'ADD_QUESTION_ERROR':
            console.log('add question error', action.error)
            return state
        default: return state
    }
}

export default questionReducer