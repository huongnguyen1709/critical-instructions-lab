import React, { useState } from 'react'
import InstructionSummary from './InstructionSummary';
import { Link } from 'react-router-dom'

const StudentInstructions = ({ instructions }) => {
    const [index, setIndex] = useState(0);

    const onMoveInstruction = () => {
        setIndex(index + 1)
        if (index === instructions.length - 1) {
            setIndex(0)
        }

    }

    const onStudentPage = () => {
        if (instructions) {
            return (
                <div>
                    <Link to={'/instruction/' + instructions[index].id} key={instructions[index].id}>
                        <InstructionSummary instruction={instructions[index]} />
                    </Link>
                    <button className="btn waves-effect waves-light flex-row" onClick={() => onMoveInstruction()}>More
                        <i className="material-icons ">arrow_downward</i>
                    </button>
                </div>
            )
        }
    }
    return (
        <div className="instruction-list section">
            {onStudentPage()}
        </div>
    );

}

export default StudentInstructions;