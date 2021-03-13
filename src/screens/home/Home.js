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
class Home extends Component {
    constructor() {
        super()
        this.state = {
            data: [{}]
        }
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
        xhr.open('GET', 'https://graph.instagram.com/me/media?fields=id,caption&access_token=IGQVJXZAm5qa2NHeUktcHJoSEpfOEhNWEpwVHNxUnFDRWhraXpWSUwxSzYyeGhaT3R5ZAHo4V2E2WU0xYUF2SXBuRzdOOS14THotb0lkdFZA6cTkweklXYVNUakRzcndPUDQwdUVoZAGtlRS14MmJ5YnRPX3UwVHh1NEpiNTl3')
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
                console.log('CAPTIONTEXT', captionText[i])
            }
            xhr[i].open('GET', 'https://graph.instagram.com/' + a.id + '?fields=id,media_type,media_url,username,timestamp&access_token=IGQVJXZAm5qa2NHeUktcHJoSEpfOEhNWEpwVHNxUnFDRWhraXpWSUwxSzYyeGhaT3R5ZAHo4V2E2WU0xYUF2SXBuRzdOOS14THotb0lkdFZA6cTkweklXYVNUakRzcndPUDQwdUVoZAGtlRS14MmJ5YnRPX3UwVHh1NEpiNTl3')
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
        cardDisplay()
    }









    render() {
        { let a = getImageHandler }
        return (

            <div>
                <div className='topmostContainer'>

                    <h3>
                        Image Viewer
           </h3>
                    <div style={{ width: '30%', marginLeft: '60%', marginTop: '0', textAlign: 'center' }}>
                        <div style={{ backgroundColor: '#c0c0c0', borderRadius: '4px', width: '300px' }}>
                            <Search style={{ color: 'black', marginTop: '3%' }} />
                            <Input id="inputSearch" type="text" placeholder="Search..."></Input>

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
                            imageCount--;


                            if (media1 != undefined) {

                                cardReturn[countReturn++] = (
                                    <div>
                                        <Card style={{ width: '50%' }}>
                                            <CardHeader id='cardHead' title={this.state.data.username} subheader={new Date(this.state.data.timestamp).toLocaleDateString('en-IN') + " " + new Date(this.state.data.timestamp).getHours() + ":" + new Date(this.state.data.timestamp).getMinutes() + ":" + new Date(this.state.data.timestamp).getSeconds()}
                                            />
                                            <CardContent id="displayCards">
                                                <CardMedia image={media1} id="cardmedia" />
                                                {console.log('MEDIA1', media1)}
                                                <hr />
                                                <Typography variant="body2">{captionText[indexCaption] != undefined ? captionText[indexCaption][0] : ""}</Typography>
                                                <Typography variant="body2" id="caption">{captionText[indexCaption] != undefined ? captionText[indexCaption++][1] : ""}</Typography><br />

                                            </CardContent>
                                        </Card>
                                    </div>)







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