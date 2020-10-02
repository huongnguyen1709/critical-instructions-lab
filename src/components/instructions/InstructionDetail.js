import React from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect, Link } from 'react-router-dom'
import moment from 'moment'
import { deleteInstruction } from '../../store/actions/instructionActions'

const InstructionDetail = (props) => {
    const { instruction, auth, instructionId } = props
    if (!auth.uid) return <Redirect to='/signin' />

    const onDelete = (instructionId, instruction) => {
        if (auth.uid === instruction.authorId) {
            if (window.confirm('Are you sure you want to delete ?')) {
                props.deleteInstruction(instructionId, instruction)
                props.history.push('/')
            }
        }
    }

    const onActionInstruction = () => {
        if (auth.uid === instruction.authorId) {
            return (
                <div>
                    <Link to={'/instruction/' + instructionId + '/edit'} className="btn teal lighten-1 z-depth-0 mr-30" >Edit</Link>
                    <Link to={'/instruction/' + instructionId + '-' + instruction.authorId + '/newQuestion'} className="btn teal lighten-1 z-depth-0 mr-30" >Add Question</Link>
                    <Link to={'/instruction/' + instructionId + '/' + instruction.title + '/question'} className="btn teal lighten-1 z-depth-0 mr-30" >See Question</Link>
                    <button className="btn teal lighten-1 z-depth-0" onClick={() => onDelete(instructionId, instruction)}>Delete</button>
                </div>
            )

        }
    }

    const onAuthor = () => {
        if (auth.uid && auth.uid === instruction.authorId) {
            return (
                <div>
                    <div>Posted by You</div>
                    <div>{moment(instruction.createdAt.toDate()).calendar()}</div>
                </div>
            )
        } else if (auth.uid) {
            return (
                <div>
                    <div>Posted by {instruction.authorFirstName} {instruction.authorLastName}</div>
                    <div>{moment(instruction.createdAt.toDate()).calendar()}</div>
                </div>
            )
        }
    }

    if (instruction) {
        return (
            <div className="container section">
                <div className="card z-depth-0">
                    <div className="card-content flex-column">
                        <span className="card-title teal-text center heading">{instruction.title}</span>
                        <p className="mt-30">{instruction.content}</p>
                        {instruction.image ? <img src={instruction.image} alt={instruction.imageFileName} /> : null}
                    </div>
                    <div className="card-action grey lighten-4 grey-text flex-row">
                        <Link to='/' className="btn teal lighten-1 z-depth-0">Back</Link>
                        <span className="center">
                            {onAuthor()}
                        </span>
                        {onActionInstruction()}
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
    const instructionId = ownProps.match.params.id
    const instructions = state.firestore.data.instructions
    const instruction = instructions ? instructions[instructionId] : null
    return {
        instruction: instruction,
        auth: state.firebase.auth,
        instructionId: instructionId
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteInstruction: (instructionId, instruction) => dispatch(deleteInstruction(instructionId, instruction))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: 'instructions' }
    ])
)(InstructionDetail);