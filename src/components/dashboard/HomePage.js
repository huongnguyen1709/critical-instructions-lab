import React, { Component } from 'react'
import { connect } from 'react-redux'
import TeacherDashboard from './TeacherDashboard';
import StudentDashboard from './StudentDashboard';

class HomePage extends Component {
    state = {}
    render() {
        const { auth } = this.props
        return (
            <div>
                {
                    auth.uid ? <TeacherDashboard /> : <StudentDashboard />
                }
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        auth: state.firebase.auth
    }
}

export default connect(mapStateToProps)(HomePage)