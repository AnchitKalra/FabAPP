import React, { Component } from 'react';
import Header from '../../common/Header';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import './Login.css';
import { Link } from 'react-router-dom';

let path = '/';
class Login extends Component {

    constructor() {
        super();
        this.state = { username: "", password: "" }
    }
    userHandler = (e) => {
        console.log(e.target.value)
        this.setState({ username: e.target.value })
    }

    passwordHandler = (e) => {
        console.log(e.target.value)
        this.setState({ password: e.target.value })
    }

    loginHandler = () => {
        document.getElementById('auth').innerHTML = '';
        let username = 'user';
        let password = 'password';
        let a = this.state;
        if (a.username === "") {
            document.getElementById('user').innerHTML = 'required';
        }
        else {
            document.getElementById('user').innerHTML = "";
        }
        if (a.password === "") {
            document.getElementById('pass').innerHTML = 'required';
        }
        else {
            document.getElementById('pass').innerHTML = "";
        }
        if (a.username !== "" && a.password !== "") {
            if (a.username === username && a.password === password) {
                path = "/home";

                console.log('OK User authenticated');
                sessionStorage.setItem('access_token', 'IGQVJXSmpLSFcxSmRwd0FoWGF3RmI0U1FnWE1FM0NEVEtOd2pDcFBIbmhSRF83MlQ2MUlIdUl1ZAkpHanhQOGRBMGVkejJUamZAvbnlQTzdDQmF0cnJvXzdEdFpIaFNqSlo5UnZAZAWU1iUWxqZAnBOb3MxRUluZA0xyTjJvRUcw')



            }
            else {
                document.getElementById('auth').innerHTML = 'Incorrect username and/or password';
                path = "/";
            }
        }
        //this.setState({ username: "", password: "" })


    }
    render() {
        return (
            <div>
                <Header />
                <div className="cardContainer1">
                    <Card id="card">
                        <CardContent>
                            <Typography id="login">LOGIN</Typography>
                            <FormControl required onChange={this.userHandler}>
                                <InputLabel htmlFor="username">Username</InputLabel>
                                <Input type="text" id="username"></Input>
                            </FormControl>
                            <h5 id="user"></h5>
                            <FormControl required onChange={this.passwordHandler}>
                                <InputLabel htmlFor="password">Password</InputLabel>
                                <Input type="password" id="password"></Input>
                            </FormControl>
                            <h5 id="pass"></h5>
                            <h5 id="auth"></h5>


                            <Link to="/home"><Button onClick={this.loginHandler} variant="contained" color="primary">LOGIN</Button></Link>
                        </CardContent>
                    </Card>
                </div>


            </div>
        )
    }
}
export default Login;