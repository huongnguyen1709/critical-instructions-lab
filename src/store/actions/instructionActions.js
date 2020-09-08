export const createInstruction = instruction => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        // make async call to database
        const firebase = getFirebase()
        const firestore = getFirestore()
        const profile = getState().firebase.profile
        const authorId = getState().firebase.auth.uid
        const file = instruction.image

        if (file) {
            console.log(file)
            const storageRef = firebase.storage().ref(`images/${file.name}`)
            const uploadTask = storageRef.put(file)
            uploadTask.on(
                "state_changed",
                snapshot => { },
                error => {
                    console.log(error)
                },
                () => {
                    firebase.storage()
                        .ref("images")
                        .child(instruction.image.name)
                        .getDownloadURL()
                        .then(url => {
                            console.log(url)
                            firestore.collection('instructions').add({
                                ...instruction,
                                image: url,
                                authorFirstName: profile.firstName,
                                authorLastName: profile.lastName,
                                authorId: authorId,
                                createdAt: new Date()
                            }).then(() => {
                                dispatch({ type: 'CREATE_INSTRUCTION', instruction })
                            }).catch((error) => {
                                dispatch({ type: 'CREATE_INSTRUCTION_ERROR', error })
                            })
                        })
                }
            )
        } else {
            firestore.collection('instructions').add({
                ...instruction,
                image: 'image not found',
                authorFirstName: profile.firstName,
                authorLastName: profile.lastName,
                authorId: authorId,
                createdAt: new Date()
            }).then(() => {
                dispatch({ type: 'CREATE_INSTRUCTION', instruction })
            }).catch((error) => {
                dispatch({ type: 'CREATE_INSTRUCTION_ERROR', error })
            })
        }

    }
}