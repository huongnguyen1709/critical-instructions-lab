import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import NavBar from './components/navbar/NavBar'
import SignIn from './components/auth/SignIn'
import SignUp from './components/auth/SignUp'
import InstructionDetail from './components/instructions/InstructionDetail'
import CreateInstruction from './components/instructions/CreateInstruction'
import EditInstruction from './components/instructions/EditInstruction'
import Dashboard from './components/dashboard/Dashboard'
import AddQuestion from './components/questions/AddQuestion'
import QuestionSummary from './components/instructions/QuestionSummary'
import EditQuestion from './components/questions/EditQuestion'

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <NavBar />
                <Switch>
                    <Route exact path='/' component={Dashboard} />
                    <Route path='/signin' component={SignIn} />
                    <Route path='/signup' component={SignUp} />
                    <Route exact path='/instruction/:id' component={InstructionDetail} />
                    <Route path='/create' component={CreateInstruction} />
                    <Route path='/instruction/:id/edit' component={EditInstruction} />
                    <Route path='/instruction/:id/newQuestion' component={AddQuestion} />
                    <Route exact path='/instruction/:id/:title/question' component={QuestionSummary} />
                    <Route path='/instruction/:instrucId/:title/question/:quesId/edit' component={EditQuestion} />
                </Switch>
            </div>
        </BrowserRouter>
    );
}

export default App;