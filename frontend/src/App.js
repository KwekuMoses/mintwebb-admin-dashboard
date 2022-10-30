import React from 'react';
import ReactDOM from 'react-dom';
import { Redirect, Route } from 'react-router';
import { Switch, BrowserRouter, Link } from 'react-router-dom';
import { useState, createContext, useContext } from "react";
import Login from './Login';
import Register from './Register';
import Dashboard from './Dashboard';
import './Login.css';
export const UserContext = createContext();

// const UserContext = createContext();
// const [user, setUser] = useState("Jesse Hall");

function App() {
    const [user, setUser] = useState("")

    return (


        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={Login} />
                <Route exact path='/register' component={Register} />
                <Route path='/dashboard' component={Dashboard} user={user} />
                {/* <Route component={NotFound}/> */}
            </Switch>
        </BrowserRouter>
    );

}

export default App;
