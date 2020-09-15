import React from 'react'
import moment from 'moment'

const InstructionSummary = ({ instruction }) => {
    return (
        <div className="card z-depth-0 instruction-summary">
            <div className="card-content grey-text text-darken-3">
                <span className="card-title">{instruction.title}</span>
                <p>Posted by {instruction.authorFirstName} {instruction.authorLastName}</p>
                <p className="grey-text">{moment(instruction.createdAt.toDate()).calendar()}</p>
            </div>
        </div>
    );
}

export default InstructionSummary;