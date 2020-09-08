import authReducer from './authReducer'
import instructionReducer from './instructionReducer'
import { combineReducers } from 'redux'
import { firestoreReducer } from 'redux-firestore'
import { firebaseReducer } from 'react-redux-firebase'

const rootReducer = combineReducers({
    auth: authReducer,
    instruction: instructionReducer,
    // sync data from firestore database
    firestore: firestoreReducer,
    // authentication
    firebase: firebaseReducer
})

export default rootReducer