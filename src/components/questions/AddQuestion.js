import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { addQuestion } from '../../store/actions/questionActions'

class AddQuestion extends Component {
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
        const { instructionId, authorId } = this.props
        this.props.addQuestion(this.state, instructionId, authorId)
        this.props.history.push('/')
    }

    render() {
        const { auth, authorId } = this.props
        if (!auth.uid) return <Redirect to='/signin' />
        if (auth.uid !== authorId) return <Redirect to='/' />
        return (
            <div className="container">
                <form onSubmit={this.handleSubmit} className="white">
                    <h5 className="grey-text text-darken-3">Add Question</h5>

                    <div className="input-field">
                        <label htmlFor="question">Question</label>
                        <input type="text" id="question" onChange={this.handleChange} />
                    </div>

                    <div className="input-field">
                        <label htmlFor="rightAnswer">Right Answer</label>
                        <textarea id="rightAnswer" className="materialize-textarea" onChange={this.handleChange}></textarea>
                    </div>

                    <div className="input-field">
                        <label htmlFor="answer2">Answer 2</label>
                        <textarea id="answer2" className="materialize-textarea" onChange={this.handleChange}></textarea>
                    </div>

                    <div className="input-field">
                        <label htmlFor="answer3">Answer 3</label>
                        <textarea id="answer3" className="materialize-textarea" onChange={this.handleChange}></textarea>
                    </div>

                    <div className="input-field">
                        <label htmlFor="answer4">Answer 4</label>
                        <textarea id="answer4" className="materialize-textarea" onChange={this.handleChange}></textarea>
                    </div>

                    <div className="flex-row">
                        <Link to='/' className="btn teal lighten-1 z-depth-0">Back</Link>
                        <button className="btn teal lighten-1 z-depth-0">Create</button>
                    </div>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const instructionId = ownProps.match.params.id
    const authorId = ownProps.match.params.authorId
    return {
        auth: state.firebase.auth,
        instructionId: instructionId,
        authorId: authorId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addQuestion: (question, instructionId, authorId) => dispatch(addQuestion(question, instructionId, authorId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddQuestion);