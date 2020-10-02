import React, { Component } from 'react'
import InstructionSummary from '../instructions/InstructionSummary';
import { withAlert } from 'react-alert'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'

class StudentInstruc extends Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            instructions: [],
            disabled: false,
            quesDisabled: true
        };
    }

    onMoveToNextIns = () => {
        const { instructions, answer, questions } = this.props
        const { index } = this.state
        const newInstruction = instructions[index]
        console.log(newInstruction)

        if (answer === true && newInstruction) {
            console.log('th1')
            this.setState({
                instructions: [
                    ...this.state.instructions,
                    newInstruction
                ],
                index: index + 1,
                instructionId: newInstruction.id,
            })

            if (index === instructions.length - 1) {
                this.setState({
                    index: 0,
                    disabled: true
                })
            }

            const question = questions.filter(question => {
                return question.instructionId === newInstruction.id
            })

            if (question && question.length > 0) {
                this.props.onResetAnswer()
                this.setState({
                    quesDisabled: false
                })
            } else {
                this.props.onHandleQuesAvai()
                this.setState({
                    quesDisabled: true
                })
            }
            this.props.onReceiveDetail(newInstruction)

        } else if (!newInstruction) {
            const alert = this.props.alert;
            alert.show('There is no instruction !')


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
        const { answer } = this.props
        console.log(answer)
        const { instructions, disabled, quesDisabled } = this.state
        console.log(quesDisabled)
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

                <button disabled={quesDisabled ? quesDisabled : null} className="btn waves-effect waves-light flex-row mt-30" onClick={this.onShowQuestion}>QuestionPopUp</button>


            </div>

        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const questions = state.firestore.ordered.questions
    return {
        questions: questions
    }
}

export default compose(
    withAlert(),
    connect(mapStateToProps),
    firestoreConnect([
        {
            collection: 'questions'
        }
    ])
)(StudentInstruc);