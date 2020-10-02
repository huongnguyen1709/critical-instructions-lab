import React from 'react'
import moment from 'moment'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'

const InstructionSummary = ({ instruction, authUid, quesAvailable }) => {
    console.log(quesAvailable)
    const onAuthor = () => {
        if (authUid && authUid === instruction.authorId) {
            return (
                <p>Posted by You</p>
            )
        } else {
            return (
                <div>Posted by {instruction.authorFirstName} {instruction.authorLastName}</div>
            )
        }
    }

    return (
        <div className="card z-depth-0 instruction-summary">
            <div className="card-content grey-text text-darken-3">
                <span className="card-title font-weight-350">{instruction.title}</span>
                {authUid && !quesAvailable ? <h6 className="red-text mt-30">There is no question for this instruction. Please add the question to verify the understanding of student</h6> : null}
                <div className="mt-30">
                    {onAuthor()}
                    <p className="grey-text">{moment(instruction.createdAt.toDate()).calendar()}</p>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state, ownProps) => {
    const instructionId = ownProps.instruction.id
    const questions = state.firestore.ordered.questions
    let quesAvailable = false

    if (questions && questions.length > 0) {
        const question = questions.filter(question => {
            return question.instructionId === instructionId
        })
        if (question && questions.length > 0) {
            question.map(ques => {
                return quesAvailable = true
            })
        }
    }

    return {
        quesAvailable: quesAvailable
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        {
            collection: 'questions'
        }
    ])
)(InstructionSummary);