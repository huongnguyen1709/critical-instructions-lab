const initState = {}

const instructionReducer = (state = initState, action) => {
    switch (action.type) {
        case 'CREATE_INSTRUCTION':
            console.log('create instruction', action.instruction)
            return state
        case 'CREATE_INSTRUCTION_ERROR':
            console.log('create instruction error', action.error)
            return state
        case 'EDIT_INSTRUCTION':
            console.log('edited instruction', action.instruction)
            return state
        case 'EDIT_INSTRUCTION_ERROR':
            console.log('edit instruction error', action.err)
            return state
        case 'DELETE_INSTRUCTION':
            console.log('deleted instruction', action.id)
            return state
        case 'DELETE_INSTRUCTION_ERROR':
            console.log('deleted instruction error', action.err)
            return state
        default: return state
    }
}

export default instructionReducer