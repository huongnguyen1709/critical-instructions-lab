export const addQuestion = (question, instructionId) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore()
        firestore.collection('questions').add({
            ...question,
            instructionId: instructionId
        }).then(() => {
            dispatch({ type: 'ADD_QUESTION', question })
        }).catch(err => {
            dispatch({ type: 'ADD_QUESTION_ERROR', err })
        })
    }
}