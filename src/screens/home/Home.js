import { render } from "react-dom";
import React, { Component, createElement } from 'react';
import Header from '../../common/Header';
import Input from '@material-ui/core/Input';
import './Home.css';
import Search from '@material-ui/icons/Search';
import SelectInput from "@material-ui/core/Select/SelectInput";
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { CardActionArea } from "@material-ui/core";
import ancimg from "../../static/anc.jpg";
import { BrowserRouter } from "react-router-dom";
import { FavoriteBorder } from "@material-ui/icons";
import { Favorite } from '@material-ui/icons';
//import Likes from "../../assets/Likes";
import Icon from '@material-ui/core/Icon';
import obj from '../../assets/Likes';
import { IconButton } from '@material-ui/core';
import profilepic from '../../static/me.jpg';
import color from "@material-ui/core/colors/amber";

let img;
let getImageHandler;
let imgData;
let getImageWithId;
let actData = "";
let cardDisplay;
let cardData = [];
let count = 0;
let mwidth = '0';
let media1;
let media2;
let imageCount;
let cardReturn = [];
let countReturn = 0;
let caption = [];
let indexCaption = 0;
let captionText = [[]];
let randomLikes;
let isClick = false;
let flag = false;
let mediaNumber = 0;
let likeHandler
let hearts = "FavoriteBorder";
let likeCount = 90;
let imageId = "";
let captionTIndex;


class Home extends Component {
    constructor() {
        super()
        this.state = {
            data: [{}],

        }
        this.isClick = false;
    }
    componentWillUnmount() {
        this.state = {
            data: [{}]
        }
    }
    getImageHandler = new Promise(function (Resolve, Reject) {
        let xhr = new XMLHttpRequest()
        let abc = this
        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                img = JSON.parse(this.response)
                imageCount = img.data.length
                console.log("First API Response", img)
                console.log('RESOLVED')
                Resolve(img)
            }

        };
        xhr.open('GET', 'https://graph.instagram.com/me/media?fields=id,caption&access_token=IGQVJXSjRlcmdJQkdZAc25Sal9tWkpQeG1sWm8tQ08tSjhEdWdpdmxPX1JDQ2pPUTVraWNaVlNvQnh5UF9sdklvQXJMR3RlNXowOUloRHFGd2tmV3dTRTgzSFBHUWFudi0zdG1YWTdCcEJvcVVWUUxucUZAjbEoyalRkY0hJ')
        xhr.send()

        //xhr = new XMLHttpRequest()

    }).then((img) => {
        //console.log('HIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII')
        //console.log('THIS IS FROM PROMISE 222222222222222222222222::::', img)
        let xhr = []
        let pqr = this
        let imgdata = img

        for (var i = 0; i < img.data.length; i++) {

            // console.log('THIS IS IMAGE DATA OF MY INSTAGRAM!!!!!!!!!!!!!', imgdata)

            xhr[i] = new XMLHttpRequest()
            let a = imgdata.data[i]
            caption[i] = imgdata.data[i].caption;
            if (caption[i] != undefined) {
                captionText[i] = caption[i].split('\n');
                captionText[i][2] = imgdata.data[i].id

                console.log('CAPTIONTEXT', i, captionText[i])
            }
            xhr[i].open('GET', 'https://graph.instagram.com/' + a.id + '?fields=id,media_type,media_url,username,timestamp&access_token=IGQVJXSjRlcmdJQkdZAc25Sal9tWkpQeG1sWm8tQ08tSjhEdWdpdmxPX1JDQ2pPUTVraWNaVlNvQnh5UF9sdklvQXJMR3RlNXowOUloRHFGd2tmV3dTRTgzSFBHUWFudi0zdG1YWTdCcEJvcVVWUUxucUZAjbEoyalRkY0hJ')
            xhr[i].send()

            xhr[i].onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    console.log('THIS IS FROM PROMISE', this.responseText)
                    actData = JSON.parse(this.responseText)
                    // //window.open(actualImg.media_url)
                    console.log('FROM HERE    JKJKJKJK THIS IS ACTDATA', actData)
                    pqr.setState({ data: actData })




                }

            }


        }

    })


    componentDidUpdate() {
        console.log('DIDUPDATE')
        flag = true;
        cardDisplay()
    }
    componentDidMount() {
        flag = false
    }



    likeHandler = (e, likeCount) => {


        //isClick = !isClick
        var a = document.getElementById(e)
        var b = document.getElementsByTagName('svg')[e + 1]
        console.log('HI there from like handler', e, a.getAttribute('style'))
        var c = a.getAttribute('style').split('"')
        var i = 0
        if (c[1].charAt(i) === 'M' && c[1].charAt(i + 1) === ' ') {

            document.getElementsByTagName('svg')[e + 1].setAttribute('style', 'fill : red')
            a.setAttribute('style', 'd : path("M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"); color : red')
            document.getElementById(likeCount).innerHTML = "" + (++likeCount) + " Likes"

            //this.updateLikeCount(count)
            // a.setAttribute('style', 'color : red')

        }
        else {
            //this.setState({ hearts: <FavoriteBorder /> })
            a.setAttribute('style', 'd: path("M 16.5 3 c -1.74 0 -3.41 0.81 -4.5 2.09 C 10.91 3.81 9.24 3 7.5 3 C 4.42 3 2 5.42 2 8.5 c 0 3.78 3.4 6.86 8.55 11.54 L 12 21.35 l 1.45 -1.32 C 18.6 15.36 22 12.28 22 8.5 C 22 5.42 19.58 3 16.5 3 Z m -4.4 15.55 l -0.1 0.1 l -0.1 -0.1 C 7.14 14.24 4 11.39 4 8.5 C 4 6.5 5.5 5 7.5 5 c 1.54 0 3.04 0.99 3.57 2.36 h 1.87 C 13.46 5.99 14.96 5 16.5 5 c 2 0 3.5 1.5 3.5 3.5 c 0 2.89 -3.14 5.74 -7.9 10.05 Z"); color : black')
            document.getElementsByTagName('svg')[e + 1].setAttribute('style', 'fill : black')
            document.getElementById(likeCount).innerHTML = "" + (likeCount) + " Likes"
            //this.updateLikeCount(likeCount)

        }


    }









    render() {
        { let a = getImageHandler }


        return (

            <div>
                <div className='topmostContainer'>

                    <h3>
                        Image Viewer
           </h3>
                    <div id='middleContainer' style={{ width: '30%', marginLeft: '60%', marginTop: '0', textAlign: 'center' }}>
                        <div id='searchBox' style={{ backgroundColor: '#c0c0c0', borderRadius: '4px', width: '300px' }}>
                            <Search style={{ color: 'black', marginTop: '3%' }} />
                            <Input id="inputSearch" type="text" placeholder="Search..."></Input>
                        </div>
                        <div style={{ marginTop: '0' }}>
                            <IconButton onClick={this.profileHandler} style={{ marginLeft: '100%', height: '100px', width: '50px', marginTop: 0 }}><img src={profilepic} style={{ height: '50px', width: '50px' }} alt='Not Found' /></IconButton>
                        </div>
                    </div>


                </div>

                <div>
                    <div id="containerForCards">

                        {countReturn > 0 ? cardReturn.map(a => {
                            return (a)
                        }) : ""
                        }
                    </div>


                    {
                        cardDisplay = () => {

                            media1 = this.state.data.media_url
                            imageId = this.state.data.id
                            //console.log('ID ->', imageId)
                            imageCount--;


                            if (media1 != undefined) {
                                {
                                    captionTIndex = captionText != undefined ? captionText.map(
                                        a => {
                                            let b = a[2] == imageId ? a : ""
                                            console.log('From Map', b[0])
                                            if (b != undefined || b != "") {
                                                return b
                                            }
                                        }) : ""

                                    for (let i = 0; i < captionTIndex.length; i++) {
                                        if (captionTIndex[i] != "") {
                                            captionTIndex[0] = captionTIndex[i]
                                        }
                                    }

                                }




                                cardReturn[countReturn++] = (
                                    <div>
                                        <Card style={{ width: '50%' }}>
                                            <CardHeader id='cardHead' title={this.state.data.username} subheader={new Date(this.state.data.timestamp).toLocaleDateString('en-IN') + " " + new Date(this.state.data.timestamp).getHours() + ":" + new Date(this.state.data.timestamp).getMinutes() + ":" + new Date(this.state.data.timestamp).getSeconds()}
                                            />
                                            <CardContent id="displayCards">
                                                <CardMedia image={media1} id="cardmedia" />
                                                {console.log('MEDIA1', media1)}
                                                <hr />
                                                {console.log(captionTIndex)}



                                                <Typography variant="body2">{captionTIndex != "" ? captionTIndex[0][0] : ""}</Typography><br />
                                                <Typography variant="body2" id="caption">{captionTIndex != "" ? captionTIndex[0][1] : ""}</Typography><br />


                                                <span onClick={this.likeHandler.bind(this, mediaNumber, likeCount)}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" width="50px" height="50px"><path d="M0 0h24v24H0z" fill="none" /><path id={mediaNumber} style={{ d: 'path("M 16.5 3 c -1.74 0 -3.41 0.81 -4.5 2.09 C 10.91 3.81 9.24 3 7.5 3 C 4.42 3 2 5.42 2 8.5 c 0 3.78 3.4 6.86 8.55 11.54 L 12 21.35 l 1.45 -1.32 C 18.6 15.36 22 12.28 22 8.5 C 22 5.42 19.58 3 16.5 3 Z m -4.4 15.55 l -0.1 0.1 l -0.1 -0.1 C 7.14 14.24 4 11.39 4 8.5 C 4 6.5 5.5 5 7.5 5 c 1.54 0 3.04 0.99 3.57 2.36 h 1.87 C 13.46 5.99 14.96 5 16.5 5 c 2 0 3.5 1.5 3.5 3.5 c 0 2.89 -3.14 5.74 -7.9 10.05 Z")' }} /></svg></span><span id={likeCount}>{likeCount}  Likes</span>
                                            </CardContent>

                                        </Card>
                                    </div>)



                                { mediaNumber++ }
                                { likeCount++ }
                                { captionTIndex = "" }


                            }

                            if (imageCount == 0) { this.setState({}) }

                        }
                    }





                </div>

            </div >

        )
    }
}
export default Home;