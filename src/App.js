import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import NavBar from './components/navbar/NavBar'
import SignIn from './components/auth/SignIn'
import SignUp from './components/auth/SignUp'
import InstructionDetail from './components/instructions/InstructionDetail'
import CreateInstruction from './components/instructions/CreateInstruction'
import HomePage from './components/dashboard/HomePage'
import EditInstruction from './components/instructions/EditInstruction'
import TeacherDashboard from './components/dashboard/TeacherDashboard'

function App(props) {
    const { auth } = props
    return (
        <BrowserRouter>
            <div className="App">
                <NavBar />
                <Switch>
                    <Route exact path='/' component={TeacherDashboard} />
                    <Route path='/signin' component={SignIn} />
                    <Route path='/signup' component={SignUp} />
                    <Route exact path='/instruction/:id' component={InstructionDetail} />
                    <Route path='/create' component={CreateInstruction} />
                    <Route path='/instruction/:id/edit' component={EditInstruction} />
                </Switch>
            </div>
        </BrowserRouter>
    );
}

export default App;