import React from 'react'
import moment from 'moment'

const InstructionSummary = ({ instruction, authUid }) => {

    const onAuthor = () => {
        if (authUid && authUid === instruction.authorId) {
            return (
                <p>Posted by You</p>
            )
        } else if (authUid) {
            return (
                <div>Posted by {instruction.authorFirstName} {instruction.authorLastName}</div>
            )
        }
    }

    return (
        <div className="card z-depth-0 instruction-summary">
            <div className="card-content grey-text text-darken-3">
                <span className="card-title">{instruction.title}</span>
                {onAuthor()}
                <p className="grey-text">{moment(instruction.createdAt.toDate()).calendar()}</p>
            </div>
        </div>
    );
}

export default InstructionSummary;