const initState = {
    instructions: [
        { id: '1', title: 'help me find peach', content: 'blah blah blah' },
        { id: '2', title: 'collect all the stars', content: 'blah blah blah' },
        { id: '3', title: 'egg hunt with yoshi', content: 'blah blah blah' }
    ]
}

const instructionReducer = (state = initState, action) => {
    switch (action.type) {
        case 'CREATE_INSTRUCTION':
            console.log('create instruction', action.instruction)
            return state
        case 'CREATE_INSTRUCTION_ERROR':
            console.log('create instruction error', action.error)
            return state
        default: return state
    }
}

export default instructionReducer