import React, { Component } from 'react'
import InstructionList from '../instructions/InstructionList'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import StudentInstruc from '../student/StudentInstruc'
import InstrucDetail from '../student/InstrucDetail'
import QuestionDetail from '../student/QuestionDetail'

class TeacherDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showDetail: false,
            instruction: {},
            showQuestion: false,
            answer: true,
        };
    }

    onShowDetail = () => {
        const { showDetail } = this.state
        this.setState({
            showDetail: !showDetail
        })
    }

    onReceiveDetail = (instruction) => {
        this.setState({
            instruction: instruction
        })
    }

    onShowQuestion = () => {
        const { showQuestion } = this.state
        this.setState({
            showQuestion: !showQuestion
        })
    }

    onResetAnswer = () => {
        this.setState({ answer: false })
    }

    onAnswer = (answers) => {
        console.log(answers)
        answers.map(answer => {
            if (answer === true) {
                this.setState({ answer: true })
                return true
            }
            else {
                this.setState({ answer: false })
                console.log('answer is false')
                return false
            }
        })
    }

    onHandleQuesAvai = () => {
        this.setState({ answer: true })
    }

    render() {
        const { instructions, auth } = this.props
        const { showDetail, instruction, showQuestion, answer } = this.state
        return (
            <div className={showDetail ? 'container relative' : 'container'}>
                <div className={showDetail || showQuestion ? 'row invisible' : 'row'}>
                    {
                        auth.uid ?
                            <InstructionList instructions={instructions} authUid={auth.uid} /> :
                            <StudentInstruc
                                instructions={instructions}
                                onShowDetail={this.onShowDetail}
                                onReceiveDetail={this.onReceiveDetail}
                                onShowQuestion={this.onShowQuestion}
                                onInstructionId={this.onInstructionId}
                                answer={answer}
                                onResetAnswer={this.onResetAnswer}
                                onAnswerCheck={this.onAnswerCheck}
                                onHandleQuesAvai={this.onHandleQuesAvai}
                            />
                    }
                </div>

                <div className={showDetail ? 'popup' : null}>
                    {showDetail ? <InstrucDetail instruction={instruction} onShowDetail={this.onShowDetail} /> : null}
                </div>

                <div className={showQuestion ? 'popup' : null}>
                    {
                        showQuestion ?
                            <QuestionDetail
                                instruction={instruction}
                                onShowQuestion={this.onShowQuestion}
                                onAnswer={this.onAnswer}
                            /> : null
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        instructions: state.firestore.ordered.instructions,
        auth: state.firebase.auth
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        {
            collection: 'instructions'
        }
    ])
)(TeacherDashboard);