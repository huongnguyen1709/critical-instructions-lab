import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { editQuestion } from '../../store/actions/questionActions'
import { deleteQuestion } from '../../store/actions/questionActions'

class EditQuestion extends Component {
    state = {
        question: '',
        rightAnswer: '',
        answer2: '',
        answer3: '',
        answer4: ''
    }

    UNSAFE_componentWillMount() {
        const { question } = this.props
        if (question) {
            this.setState({
                question: question.question,
                rightAnswer: question.rightAnswer,
                answer2: question.answer2,
                answer3: question.answer3,
                answer4: question.answer4
            })
        }
    }

    componentWillReceiveProps(nextProps) {
        const { question } = nextProps
        if (question) {
            this.setState({
                question: question.question,
                rightAnswer: question.rightAnswer,
                answer2: question.answer2,
                answer3: question.answer3,
                answer4: question.answer4
            })
        }
    }

    handleChange = e => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = e => {
        e.preventDefault()
        const { questionId, instructionId, title } = this.props
        this.props.editQuestion(this.state, questionId)
        this.props.history.push(`/instruction/${instructionId}/${title}/question`)
    }

    onDelete = () => {
        const { questionId, question, auth } = this.props
        if (auth.uid === question.authorId) {
            if (window.confirm('Are you sure you want to delete ?')) {
                this.props.deleteQuestion(question, questionId)
                this.props.history.push('/')
            }
        }
    }

    render() {
        const { auth, instructionId, title } = this.props
        const { question, rightAnswer, answer2, answer3, answer4 } = this.state
        if (!auth.uid) return <Redirect to='/signin' />
        return (
            <div className="container">
                <form onSubmit={this.handleSubmit} className="white">
                    <h5 className="grey-text text-darken-3">Editing Question</h5>

                    <div className="input-field">
                        <label htmlFor="question" className={question ? 'active' : null}>Question</label>
                        <input
                            type="text"
                            id="question"
                            onChange={this.handleChange}
                            value={question}
                        />
                    </div>

                    <div className="input-field">
                        <label htmlFor="rightAnswer" className={rightAnswer ? 'active' : null}>Right Answer</label>
                        <textarea
                            id="rightAnswer"
                            className="materialize-textarea"
                            onChange={this.handleChange}
                            value={rightAnswer}
                        ></textarea>
                    </div>

                    <div className="input-field">
                        <label htmlFor="answer2" className={answer2 ? 'active' : null}>Answer 2</label>
                        <textarea
                            id="answer2"
                            className="materialize-textarea"
                            onChange={this.handleChange}
                            value={answer2}
                        ></textarea>
                    </div>

                    <div className="input-field">
                        <label htmlFor="answer3" className={answer3 ? 'active' : null}>Answer 3</label>
                        <textarea
                            id="answer3"
                            className="materialize-textarea"
                            onChange={this.handleChange}
                            value={answer3}
                        ></textarea>
                    </div>

                    <div className="input-field">
                        <label htmlFor="answer4" className={answer4 ? 'active' : null}>Answer 4</label>
                        <textarea
                            id="answer4"
                            className="materialize-textarea"
                            onChange={this.handleChange}
                            value={answer4}
                        ></textarea>
                    </div>

                    <div className="flex-row">
                        <Link to={'/instruction/' + instructionId + '/' + title + '/question'} className="btn teal lighten-1 z-depth-0">Cancel</Link>
                        <div>
                            <button className="btn teal lighten-1 z-depth-0 mr-30" onClick={this.onDelete}>Delete Question</button>
                            <button className="btn teal lighten-1 z-depth-0" type="submit">Save</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const questionId = ownProps.match.params.quesId
    const instructionId = ownProps.match.params.instrucId
    const title = ownProps.match.params.title
    const questions = state.firestore.data.questions
    const question = questions ? questions[questionId] : null

    return {
        auth: state.firebase.auth,
        question: question,
        questionId: questionId,
        instructionId: instructionId,
        title: title
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        editQuestion: (question, questionId) => dispatch(editQuestion(question, questionId)),
        deleteQuestion: (question, questionId) => dispatch(deleteQuestion(question, questionId))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        {
            collection: 'questions'
        }
    ])
)(EditQuestion);