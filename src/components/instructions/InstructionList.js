import React from 'react'
import InstructionSummary from './InstructionSummary';
import { Link } from 'react-router-dom'

const InstructionList = ({ instructions, authUid }) => {
    if (instructions && instructions.length > 0) {
        return (
            <div className="row">
                <div className="col s12 m6 offset-m2">
                    <div className="section">
                        {
                            instructions.map(instruction => {
                                return (
                                    <Link to={'/instruction/' + instruction.id} key={instruction.id}>
                                        <InstructionSummary instruction={instruction} authUid={authUid} />
                                    </Link>
                                )
                            })
                        }
                    </div>
                </div>
            </div>

        );
    } else if (!instructions || instructions.length === 0) {
        return (
            <div className="container center black-text">
                <p>There is no Instruction to view ...</p>
                <p>Please add Instruction ...</p>
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

export default InstructionList;