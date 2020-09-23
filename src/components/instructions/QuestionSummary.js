import React from 'react'
import moment from 'moment'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Link } from 'react-router-dom'

const QuestionSummary = (props) => {
    const { question, instructionId } = props
    return (
        <div className="row">
            <div className="col s12 m4 offset-m4">
                <div className="card z-depth-0 instruction-summary">
                    <div className="card-content grey-text text-darken-3">
                        <span className="card-title teal-text center heading">{props.title}</span>
                        {
                            question && question.map(ques => {
                                return (
                                    <Link to={'/question/' + ques.id + '/edit'} key={ques.id}>
                                        <div className="card mt-60">
                                            <div className="card-content grey-text text-darken-3">
                                                <h6 className="bold">{ques.question}</h6>
                                                <h6>Option 1: &nbsp; <span className="italic">{ques.answer2}</span></h6>
                                                <h6>Option 2: &nbsp; <span className="italic">{ques.answer3}</span></h6>
                                                <h6>Option 3: &nbsp; <span className="italic">{ques.answer4}</span></h6>
                                                <h6>Right Answer: &nbsp; <span className="italic red-text">{ques.rightAnswer}</span></h6>
                                            </div>

                                        </div>
                                    </Link>

                                )
                            })
                        }

                        <Link to={'/instruction/' + instructionId} className="btn teal lighten-1 z-depth-0 mt-60">Back</Link>

                    </div>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state, ownProps) => {
    const instructionId = ownProps.match.params.id
    const title = ownProps.match.params.title
    const questions = state.firestore.ordered.questions
    const question = questions && questions.map(question => {
        if (question.instructionId === instructionId) return question
        else return null
    })
    return {
        questions: questions,
        auth: state.firebase.auth,
        title: title,
        instructionId: instructionId,
        question: question
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        {
            collection: 'questions'
        }
    ])
)(QuestionSummary);