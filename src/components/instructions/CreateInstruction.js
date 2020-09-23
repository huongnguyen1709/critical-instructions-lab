import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createInstruction } from '../../store/actions/instructionActions'
import { Redirect, Link } from 'react-router-dom'

class CreateInstruction extends Component {
    state = {
        title: '',
        content: '',
        image: null
    }

    handleChange = e => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleImage = e => {
        if (e.target.files[0])
            this.setState({
                image: e.target.files[0]
            })
    }

    handleSubmit = e => {
        e.preventDefault()
        this.props.createInstruction(this.state)
        this.props.history.push('/')
    }

    render() {
        const { auth } = this.props
        if (!auth.uid) return <Redirect to='/signin' />
        return (
            <div className="container">
                <form onSubmit={this.handleSubmit} className="white">
                    <h5 className="grey-text text-darken-3">New Instruction</h5>

                    <div className="input-field">
                        <label htmlFor="title">Title</label>
                        <input type="text" id="title" onChange={this.handleChange} />
                    </div>

                    <div className="input-field">
                        <label htmlFor="content">Instruction Content</label>
                        <textarea id="content" className="materialize-textarea" onChange={this.handleChange}></textarea>
                    </div>

                    <div className="file-field input-field mt-30">
                        <div class="btn">
                            <span>Select image</span>
                            <input id="image" type="file" accept="image/*" onChange={this.handleImage} />
                        </div>
                        <div class="file-path-wrapper">
                            <input class="file-path validate" type="text" />
                        </div>
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
    return {
        auth: state.firebase.auth,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        createInstruction: instruction => dispatch(createInstruction(instruction))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateInstruction);