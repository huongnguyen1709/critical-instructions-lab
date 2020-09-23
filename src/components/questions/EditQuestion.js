import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'

class EditQuestion extends Component {
    state = {
        question: '',
        rightAnswer: '',
        answer2: '',
        answer3: '',
        answer4: ''
    }


    handleChange = e => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = e => {
        e.preventDefault()
        const { instructionId } = this.props
        this.props.addQuestion(this.state, instructionId)
        this.props.history.push('/')
    }

    render() {
        const { auth } = this.props
        const { question, rightAnswer, answer2, answer3, answer4 } = this.state
        console.log(this.state)
        if (!auth.uid) return <Redirect to='/signin' />
        return (
            <div className="container">
                <form onSubmit={this.handleSubmit} className="white">
                    <h5 className="grey-text text-darken-3">Editing Question</h5>

                    <div className="input-field">
                        <label htmlFor="question">Question</label>
                        <input
                            type="text"
                            id="question"
                            onChange={this.handleChange}
                            value={question}
                        />
                    </div>

                    <div className="input-field">
                        <label htmlFor="rightAnswer">Right Answer</label>
                        <textarea
                            id="rightAnswer"
                            className="materialize-textarea"
                            onChange={this.handleChange}
                            value={rightAnswer}
                        ></textarea>
                    </div>

                    <div className="input-field">
                        <label htmlFor="answer2">Answer 2</label>
                        <textarea
                            id="answer2"
                            className="materialize-textarea"
                            onChange={this.handleChange}
                            value={answer2}
                        ></textarea>
                    </div>

                    <div className="input-field">
                        <label htmlFor="answer3">Answer 3</label>
                        <textarea
                            id="answer3"
                            className="materialize-textarea"
                            onChange={this.handleChange}
                            value={answer3}
                        ></textarea>
                    </div>

                    <div className="input-field">
                        <label htmlFor="answer4">Answer 4</label>
                        <textarea
                            id="answer4"
                            className="materialize-textarea"
                            onChange={this.handleChange}
                            value={answer4}
                        ></textarea>
                    </div>

                    <div className="flex-row">
                        <Link to='/' className="btn teal lighten-1 z-depth-0">Back</Link>
                        <button className="btn teal lighten-1 z-depth-0">Save</button>
                    </div>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    console.log(ownProps)

    return {

    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        {
            collection: 'questions'
        }
    ])
)(EditQuestion);