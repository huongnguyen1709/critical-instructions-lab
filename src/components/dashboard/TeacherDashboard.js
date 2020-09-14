import React, { Component } from 'react'
import InstructionList from '../instructions/InstructionList'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import StudentInstructions from '../instructions/StudentInstructions'

class TeacherDashboard extends Component {
    state = {}
    render() {
        const { instructions, auth } = this.props
        return (
            <div className="container">
                <div className="row">
                    <div className="col s12 m6 offset-m2">
                        {
                            auth.uid ? <InstructionList instructions={instructions} /> : <StudentInstructions instructions={instructions} />
                        }

                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        instructions: state.firestore.ordered.instructions,
        auth: state.firebase.auth
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'instructions' }
    ])
)(TeacherDashboard);