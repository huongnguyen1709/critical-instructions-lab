import authReducer from './authReducer'
import instructionReducer from './instructionReducer'
import questionReducer from './questionReducer'
import { combineReducers } from 'redux'
import { firestoreReducer } from 'redux-firestore'
import { firebaseReducer } from 'react-redux-firebase'

const rootReducer = combineReducers({
    auth: authReducer,
    instruction: instructionReducer,
    question: questionReducer,
    // sync data from firestore database
    firestore: firestoreReducer,
    // authentication
    firebase: firebaseReducer
})

export default rootReducer