import { FavoriteBorder } from '@material-ui/icons';
import React, { Component } from 'react';
//import { FavoriteBorder } from "@material-ui/icons";
import { Favorite } from '@material-ui/icons';
//import Home from '../screens/home/Home';
var reLikes;
class Likes extends Component {

    constructor() {
        super()
        this.state = {
            isClick: false
        }

    }
    reLikes = (flag) => {
        console.log('HI FROM LIKES')
        this.render(flag)
        // this.setState({ isClick: flag })

    }
    render(flag) {
        console.log('FROM RENDER')
        //this.setState({ isClick: flag })
        // console.log('FROM Likes', this.props.isClick)

        return (
            this.state.isClick === true ? <Favorite style={{ color: 'red' }} /> : <FavoriteBorder />
        )
    }
}
const obj = new Likes()
export default obj;