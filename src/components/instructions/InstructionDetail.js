import React from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import moment from 'moment'

const InstructionDetail = (props) => {
    const { instruction, auth } = props
    if (!auth.uid) return <Redirect to='/signin' />
    if (instruction) {
        return (
            <div className="container section project-details">
                <div className="card z-depth-0">
                    <div className="card-content">
                        <span className="card-title">{instruction.title}</span>
                        <img src="" alt="" />
                        <p>{instruction.content}</p>
                    </div>
                    <div className="card-action grey lighten-4 grey-text">
                        <div>Posted by {instruction.authorFirstName} {instruction.authorLastName}</div>
                        <div>{moment(instruction.createdAt.toDate()).calendar()}</div>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div className="container center">
                <p>Loading instruction...</p>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const id = ownProps.match.params.id
    const instructions = state.firestore.data.instructions
    const instruction = instructions ? instructions[id] : null
    return {
        instruction: instruction,
        auth: state.firebase.auth
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'instructions' }
    ])
)(InstructionDetail);