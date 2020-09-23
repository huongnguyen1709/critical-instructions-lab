import React, { Component } from 'react'
import InstructionSummary from '../instructions/InstructionSummary';
import { withAlert } from 'react-alert'

class StudentInstruc extends Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            instructions: [],
            instructionId: '',
            disabled: false,
        };
    }

    onMoveToNextIns = () => {
        const { instructions, answer } = this.props
        const { index } = this.state
        const newInstruction = instructions[index]
        if (answer === true) {
            this.setState({
                instructions: [
                    ...this.state.instructions,
                    newInstruction
                ],
                index: index + 1,
                instructionId: newInstruction.id
            })
            if (index === instructions.length - 1) {
                this.setState({
                    index: 0,
                    disabled: true
                })
            }
            this.props.onReceiveDetail(newInstruction)
            this.props.onResetAnswer()
        } else {
            const alert = this.props.alert;
            console.log('you need to answer first')
            alert.show('you need to pass the question !')
        }
    }

    onShowDetail = (instruction) => {
        this.props.onShowDetail()
        this.props.onReceiveDetail(instruction)
    };

    onShowQuestion = () => {
        this.props.onShowQuestion()
    }

    render() {
        const { instructions, disabled, instructionId } = this.state
        console.log(instructionId)
        return (
            <div className="col s12 m6 offset-m2">
                <div className="section">
                    {
                        instructions && instructions.map(instruction => {
                            return (
                                <div className="card" key={instruction.id} onClick={() => this.onShowDetail(instruction)} >
                                    <InstructionSummary instruction={instruction} />
                                </div>
                            )
                        })
                    }
                </div>

                {/* Button to show Next Instruction Summary */}
                <button disabled={disabled ? disabled : null} className="btn waves-effect waves-light flex-row" onClick={this.onMoveToNextIns}>See Instructions
                 <i className="material-icons ">arrow_downward</i>
                </button>

                <button className="btn waves-effect waves-light flex-row" onClick={this.onShowQuestion}>QuestionPopUp</button>


            </div>

        );
    }
}


export default withAlert()(StudentInstruc);