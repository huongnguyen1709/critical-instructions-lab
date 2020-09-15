import React, { Component } from 'react'
import InstructionSummary from './InstructionSummary';
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";

class StudentInstructions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            instructions: [],
            disabled: false,
            instructionDetail: {}
        };
    }

    componentDidMount() {
        const options = {
            onOpenStart: () => {
                console.log("Open Start");
            },
            onOpenEnd: () => {
                console.log("Open End");
            },
            onCloseStart: () => {
                console.log("Close Start");
            },
            onCloseEnd: () => {
                console.log("Close End");
            },
            inDuration: 250,
            outDuration: 250,
            opacity: 0.5,
            dismissible: false,
            startingTop: "4%",
            endingTop: "10%"
        };
        M.Modal.init(this.Modal, options);
        // If you want to work on instance of the Modal then you can use the below code snippet 
        // let instance = M.Modal.getInstance(this.Modal);
        // instance.open();
        // instance.close();
        // instance.destroy();
    }


    onMoveToNextIns = () => {
        const { instructions } = this.props
        const { index } = this.state
        const newInstruction = instructions[index]
        this.setState({
            instructions: [
                ...this.state.instructions,
                newInstruction
            ],
            index: index + 1
        })
        if (index === instructions.length - 1) {
            this.setState({
                index: 0,
                disabled: true
            })
        }

    }

    showDetail = (instruction) => {
        this.setState({

            instructionDetail: instruction
        });
    };

    render() {
        const { instructions, disabled, instructionDetail } = this.state
        console.log(this.state.instructionDetail)
        return (
            <div className="instruction-list section">
                {
                    instructions && instructions.map(instruction => {
                        return (
                            <a class="modal-trigger" href="#detail" key={instruction.id} onClick={() => this.showDetail(instruction)} >
                                <InstructionSummary instruction={instruction} />
                            </a>
                        )
                    })
                }

                {/* Instruction Detail */}
                <div ref={Modal => { this.Modal = Modal; }} id="detail" class="modal modal-fixed-footer">
                    <div className="modal-content deep-orange lighten-3">

                        <div className="card-content flex-column margin">
                            <span className="card-title teal-text center heading">{instructionDetail.title}</span>
                            <p className="mt-30">{instructionDetail.content}</p>
                            <img src={instructionDetail.image} alt="There is no chosen image" />
                        </div>
                    </div>
                    <div class="modal-footer deep-orange lighten-4">
                        <a href="#!" class="modal-close btn-flat">Back</a>
                    </div>
                </div>

                <button disabled={disabled ? disabled : null} className="btn waves-effect waves-light flex-row" onClick={this.onMoveToNextIns}>See Instructions
                 <i className="material-icons ">arrow_downward</i>
                </button>
            </div>
        );
    }
}


export default StudentInstructions;