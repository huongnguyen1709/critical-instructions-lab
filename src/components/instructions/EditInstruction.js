import React, { Component } from 'react'
import { connect } from 'react-redux'
import { editInstruction } from '../../store/actions/instructionActions'
import { Redirect, Link } from 'react-router-dom'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'

class EditInstruction extends Component {
    state = {
        id: '',
        title: '',
        content: '',
        newImage: null,
        imageOnChange: null,
        imageFileName: '',
    }

    UNSAFE_componentWillMount() {
        const { instructionId, instruction } = this.props
        if (instructionId && instruction) {
            this.setState({
                id: instructionId,
                title: instruction.title,
                content: instruction.content,
                newImage: instruction.image,
                imageOnChange: instruction.image,
                imageFileName: instruction.imageFileName
            })
        }
    }

    componentWillReceiveProps(nextProps) {
        const { instructionId, instruction } = nextProps
        if (instructionId && instruction) {
            this.setState({
                id: instructionId,
                title: instruction.title,
                content: instruction.content,
                newImage: instruction.image,
                imageOnChange: instruction.image,
                imageFileName: instruction.imageFileName
            })
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleImage = e => {
        if (e.target.files && e.target.files[0]) {
            this.setState({
                newImage: e.target.files[0],
                imageOnChange: URL.createObjectURL(e.target.files[0])
            })
        } else {
            this.setState({
                newImage: null,
                imageOnChange: 'There is no image'
            })
        }

    }

    handleSubmit = (e) => {
        e.preventDefault()
        const { auth, instruction } = this.props
        if (auth.uid === instruction.authorId) {
            this.props.editInstruction(this.state)
            this.props.history.push('/') //inside this component, we have access to route information on the props that happens automatically when we use the router
        }
    }

    render() {
        var { title, content, imageOnChange, imageFileName } = this.state
        const { auth } = this.props
        if (!auth.uid) return <Redirect to='/signin' />
        console.log(this.state.newImage)
        return (
            <div className="container">
                <form onSubmit={this.handleSubmit} className="cyan lighten-5 text-darken-3">
                    <h5>Editing</h5>
                    <div className="input-field">
                        <label htmlFor="title" className={title ? 'active' : null}>Title</label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="input-field">
                        <label htmlFor="content" className={content ? 'active' : null}>Project Content</label>
                        <textarea
                            id="content"
                            className="materialize-textarea"
                            value={content}
                            onChange={this.handleChange}
                        ></textarea>
                    </div>
                    <div className="input-field flex-row mt-30">
                        {imageOnChange ? <img src={imageOnChange} alt={imageFileName} className="center" /> : null}
                    </div>

                    <div className="file-field input-field mt-60">
                        <div class="btn">
                            <span>Change image</span>
                            <input id="image" type="file" accept="image/*" onChange={this.handleImage} />
                        </div>
                        <div class="file-path-wrapper">
                            <input class="file-path validate" type="text" />
                        </div>
                    </div>

                    <div className="flex-row mt-30">
                        <Link to='/' className="btn teal lighten-1 z-depth-0">Cancel</Link>
                        <button className="btn teal lighten-1 z-depth-0">Save</button>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const instructionId = ownProps.match.params.id
    const instructions = state.firestore.data.instructions
    const instruction = instructions ? instructions[instructionId] : null
    return {
        auth: state.firebase.auth,
        instruction: instruction,
        instructionId: instructionId
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        editInstruction: (instruction) => dispatch(editInstruction(instruction))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: 'instructions' }
    ])
)(EditInstruction);