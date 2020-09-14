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
                        .child(file.name)
                        .getDownloadURL()
                        .then(url => {
                            console.log(url)
                            firestore.collection('instructions').add({
                                ...instruction,
                                image: url,
                                imageFileName: file.name,
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
                image: null,
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

export const editInstruction = (instruction) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase()
        const firestore = getFirestore()
        const imageFileName = instruction.imageFileName
        const newImageFile = instruction.newImage
        console.log(imageFileName)
        console.log(newImageFile)

        if (newImageFile && typeof newImageFile.name === 'undefined') {
            console.log('case 1')
            firestore.collection('instructions').doc(instruction.id).update({
                title: instruction.title,
                content: instruction.content
            }).then(() => {
                dispatch({ type: 'EDIT_INSTRUCTION', instruction })
            }).catch(err => {
                dispatch({ type: 'EDIT_INSTRUCTION_ERROR', err })
            })
        } else if (newImageFile && newImageFile.name !== imageFileName) { // delete ko duoc
            console.log('case 2')
            const imageRef = firebase.storage().ref(`images/${imageFileName}`)
            imageRef.getDownloadURL().then(url => {
                imageRef.delete().then(() => {
                    console.log('delete image successful')
                })
            }).catch(err => {
                console.log('There is no image to delete')
            })

            const newImageRef = firebase.storage().ref(`images/${newImageFile.name}`)
            const uploadTask = newImageRef.put(newImageFile)
            uploadTask.on(
                "state_changed",
                snapshot => { },
                error => {
                    console.log(error)
                },
                () => {
                    firebase.storage()
                        .ref("images")
                        .child(newImageFile.name)
                        .getDownloadURL()
                        .then(url => {
                            firestore.collection('instructions').doc(instruction.id).update({
                                title: instruction.title,
                                content: instruction.content,
                                image: url,
                                imageFileName: newImageFile.name
                            }).then(() => {
                                dispatch({ type: 'EDIT_INSTRUCTION', instruction })
                            }).catch(err => {
                                dispatch({ type: 'EDIT_INSTRUCTION_ERROR', err })
                            })
                        })
                })

        } else {
            console.log('case 3')

            const imageRef = firebase.storage().ref(`images/${imageFileName}`)
            imageRef.getDownloadURL().then(Response => {
                imageRef.delete().then(() => {
                    console.log('delete image successful')
                })
            }).catch(err => {
                console.log('There is no image to delete')
            })

            firestore.collection('instructions').doc(instruction.id).update({
                title: instruction.title,
                content: instruction.content,
                image: null,
                imageFileName: 'There is no image'
            }).then(() => {
                dispatch({ type: 'EDIT_INSTRUCTION', instruction })
            }).catch(err => {
                dispatch({ type: 'EDIT_INSTRUCTION_ERROR', err })
            })
        }
    }
}

export const deleteInstruction = (instructionId, instruction) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore()
        const firebase = getFirebase()
        console.log(instruction.image)
        if (instruction.image === null) {
            firestore
                .collection('instructions')
                .doc(instructionId)
                .delete()
                .then(() => {
                    dispatch({ type: 'DELETE_INSTRUCTION', instructionId })
                })
                .catch(err => {
                    dispatch({ type: 'DELETE_INSTRUCTION_ERROR', err })
                })
        } else {
            const imageFileName = instruction.imageFileName
            const imageRef = firebase.storage().ref(`images/${imageFileName}`)
            imageRef.delete().then(() => {
                firestore
                    .collection('instructions')
                    .doc(instructionId)
                    .delete()
                    .then(() => {
                        dispatch({ type: 'DELETE_INSTRUCTION', instructionId })
                    })
                    .catch(err => {
                        dispatch({ type: 'DELETE_INSTRUCTION_ERROR', err })
                    })
            })
        }

    }
}