import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './screens/login/Login';
import Home from './screens/home/Home';
class Controller extends Component {
    render() {
        return (<Router>
            <div>
                <Route exact path="/" render={(props) => <Login />} />
                <Route exact path="/home" render={(props) => sessionStorage.getItem('access_token') !== null ? <Home /> : <Login />} />
            </div>
        </Router>
        )
    }
}
export default Controller;