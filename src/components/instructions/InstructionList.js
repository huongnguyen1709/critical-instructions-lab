import React from 'react'
import InstructionSummary from './InstructionSummary';
import { Link } from 'react-router-dom'

const InstructionList = ({ instructions }) => {
    return (
        <div className="instruction-list section">
            {instructions && instructions.map(instruction => {
                return (
                    <Link to={'/instruction/' + instruction.id} key={instruction.id}>
                        <InstructionSummary instruction={instruction} />
                    </Link>
                )
            })}
        </div>
    );
}

export default InstructionList;