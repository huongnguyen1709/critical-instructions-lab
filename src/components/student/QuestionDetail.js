import React, { Component } from 'react';
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'

class QuestionDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            question: {},
            selectedOption: '',
            answer: false
        };
    }

    onShowQuestion = () => {
        this.props.onShowQuestion()
    }

    handleOptionChange = e => {
        const selectedOption = e.target.value
        const { questions, instruction } = this.props
        this.setState({
            selectedOption: selectedOption,
            answer: questions && questions.map(question => {
                if (question.instructionId === instruction.id && selectedOption === question.rightAnswer) {
                    return true
                } else return false
            })
        });


    }

    handleSubmit = e => {
        e.preventDefault()

        console.log('You have selected: ', this.state.selectedOption)


        console.log(this.state.answer)
        this.props.onAnswer(this.state.answer)
        this.props.onShowQuestion()
    }

    render() {
        const { questions, instruction } = this.props
        console.log(this.state.answer)
        const showQuestionDetail = questions && questions.map(question => {
            if (question.instructionId === instruction.id) {
                return (
                    <div className="section" key={question.id}>
                        <div className="card z-depth-0">
                            <form onSubmit={this.handleSubmit}>
                                <div className="card-content flex-column">
                                    <span className="card-title teal-text center heading">{instruction.title}</span>

                                    <h6>{question.question}</h6>
                                    <h6>
                                        <label>
                                            <input className="with-gap" name="answer" type="radio" value={question.rightAnswer} onChange={this.handleOptionChange} />
                                            <span>{question.rightAnswer}</span>
                                        </label>
                                    </h6>
                                    <h6>
                                        <label>
                                            <input className="with-gap" name="answer" type="radio" value={question.answer2} onChange={this.handleOptionChange} />
                                            <span>{question.answer2}</span>
                                        </label>
                                    </h6>
                                    <h6>
                                        <label>
                                            <input className="with-gap" name="answer" type="radio" value={question.answer3} onChange={this.handleOptionChange} />
                                            <span>{question.answer3}</span>
                                        </label>
                                    </h6>
                                    <h6>
                                        <label>
                                            <input className="with-gap" name="answer" type="radio" value={question.answer4} onChange={this.handleOptionChange} />
                                            <span>{question.answer4}</span>
                                        </label>
                                    </h6>

                                </div>
                                <div className="flex-row">
                                    <button className="btn teal lighten-1 z-depth-0" onClick={this.onShowQuestion}>Back</button>
                                    <button className="btn teal lighten-1 z-depth-0" >Answer</button>
                                </div>
                            </form>

                        </div>
                    </div>
                )
            } else {
                return <div key="no-question">There is no question</div>
            }


        })
        return (
            <div>
                {showQuestionDetail}
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const questions = state.firestore.ordered.questions
    return {
        questions: questions,
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        {
            collection: 'questions'
        }
    ])
)(QuestionDetail);