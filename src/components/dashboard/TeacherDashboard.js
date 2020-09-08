import React, { Component } from 'react'
import Notifications from '../dashboard/Notifications'
import ProjectList from '../instructions/InstructionList'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'

class TeacherDashboard extends Component {
    state = {}
    render() {
        const { instructions } = this.props
        return (
            <div className="container">
                <div className="row">
                    <div className="col s12 m6">
                        <ProjectList instructions={instructions} />
                    </div>
                    <div className="col s12 m5 offset-m1">
                        <Notifications />
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        instructions: state.firestore.ordered.instructions,
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'instructions' }
    ])
)(TeacherDashboard);