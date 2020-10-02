export const addQuestion = (question, instructionId, authorId) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore()
        firestore.collection('questions').add({
            ...question,
            instructionId: instructionId,
            authorId: authorId
        }).then(() => {
            dispatch({ type: 'ADD_QUESTION', question })
        }).catch(err => {
            dispatch({ type: 'ADD_QUESTION_ERROR', err })
        })
    }
}

export const editQuestion = (question, questionId) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore()
        firestore.collection('questions').doc(questionId).update({
            ...question
        }).then(() => {
            dispatch({ type: 'EDIT_QUESTION', question })
        }).catch(err => {
            dispatch({ type: 'EDIT_QUESTION_ERROR', err })
        })
    }
}

export const deleteQuestion = (question, questionId) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore()
        firestore
            .collection('questions')
            .doc(questionId)
            .delete()
            .then(() => {
                dispatch({ type: 'DELETE_QUESTION', questionId })
            }).catch(err => {
                dispatch({ type: 'DELETE_QUESTION_ERROR', err })
            })
    }
}