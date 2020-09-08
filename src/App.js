import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import NavBar from './components/navbar/NavBar'
import SignIn from './components/auth/SignIn'
import SignUp from './components/auth/SignUp'
import InstructionDetail from './components/instructions/InstructionDetail'
import CreateInstruction from './components/instructions/CreateInstruction'
import HomePage from './components/dashboard/HomePage'

function App(props) {
    return (
        <BrowserRouter>
            <div className="App">
                <NavBar />
                <Switch>
                    <Route exact path='/' component={HomePage} />
                    <Route path='/signin' component={SignIn} />
                    <Route path='/signup' component={SignUp} />
                    <Route path='/instruction/:id' component={InstructionDetail} />
                    <Route path='/create' component={CreateInstruction} />
                </Switch>
            </div>
        </BrowserRouter>
    );
}

export default App;