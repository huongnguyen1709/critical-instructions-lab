import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom'

class StudentInstruction extends Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            instructionId: '',
            disabled: false,
            instructionDetail: {}
        };
    }

    onShowNextInstruc = () => {
        const { index } = this.state
        const { instructions } = this.props
        this.setState({
            index: index + 1
        })
        if (index === instructions.length - 1) {
            this.setState({
                index: 0,
                disabled: true
            })
        }

    }

    onActionInstruc = () => {
        const { index, disabled } = this.state
        if (index > 0) {
            return (
                <div className="card-action grey lighten-4 grey-text flex-row">
                    <button className="btn teal lighten-1 z-depth-0" onClick={this.onShowNextInstruc}>Back</button>
                    <button disabled={disabled ? disabled : null} className="btn teal lighten-1 z-depth-0" onClick={this.onShowNextInstruc}>Next</button>
                </div>
            )
        }
        else if (index === 0) {
            return (
                <div className="card-action grey lighten-4 grey-text flex-right">
                    <button disabled={disabled ? disabled : null} className="btn teal lighten-1 z-depth-0" onClick={this.onShowNextInstruc}>Next</button>
                </div>
            )
        }
    }

    render() {
        const { instructions } = this.props
        const { index } = this.state
        console.log(index)
        const instruction = instructions && instructions[index] ? instructions[index] : null
        if (instructions && instructions.length > 0) {
            return (
                <div className="container section">
                    <div className="card z-depth-0">
                        <div className="card-content flex-column">
                            <span className="card-title teal-text center heading">{instruction.title}</span>
                            <p className="mt-30">{instruction.content}</p>
                            {instruction.image ? <img src={instruction.image} alt={instruction.imageFileName} /> : null}
                        </div>

                        {this.onActionInstruc()}

                    </div>
                </div>
            );
        } else {
            return (
                <div className="container center black-text">
                    <p>There is no instruction to view ...</p>
                </div>
            );
        }

    }
}

export default StudentInstruction;