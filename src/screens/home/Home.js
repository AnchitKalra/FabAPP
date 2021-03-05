import { render } from "react-dom";
import React, { Component } from 'react';
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
import Typography from '@material-ui/core/Typography';

let img;
let getImageHandler;
let imgData;
let getImageWithId;
let actData;
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
                img = JSON.parse(this.responseText)
                console.log('RESOLVED')
                Resolve(img)
            }

        };
        xhr.open('GET', 'https://graph.instagram.com/me/media?fields=id,caption&access_token=IGQVJXNndQR2lzSmVqVEdpRm1lZAXlCVjlOTjNSMnF5TXI5ZA2wybm9GeUV2Q2NfTlBLS1dhYTFGNUJYLVZArTENxRENPRlRITXVTc1ByQnY5UmprMi0tN0pWdGFDLW5JREY3NlM1cWRBQmNCVzBwLUVDSk5jOVo4cngtY1hJ')
        xhr.send()

        //xhr = new XMLHttpRequest()

    }).then((img) => {
        console.log('HIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII')
        console.log('THIS IS FROM PROMISE 222222222222222222222222::::', img)
        let xhr = new XMLHttpRequest()
        let pqr = this
        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                console.log('THIS IS FROM PROMISE', this.responseText)
                actData = JSON.parse(this.responseText)
                //window.open(actualImg.media_url)
                console.log('FROM HERE    JKJKJKJK THIS IS ACTDATA', actData)
                pqr.setState({ data: actData })




            }
        }
        let imgdata = img
        console.log('THIS IS IMAGE DATA OF MY INSTAGRAM!!!!!!!!!!!!!', imgdata)
        imgdata.data.forEach(a => {
            xhr.open('GET', 'https://graph.instagram.com/' + a.id + '?fields=id,media_type,media_url,username,timestamp&access_token=IGQVJXNndQR2lzSmVqVEdpRm1lZAXlCVjlOTjNSMnF5TXI5ZA2wybm9GeUV2Q2NfTlBLS1dhYTFGNUJYLVZArTENxRENPRlRITXVTc1ByQnY5UmprMi0tN0pWdGFDLW5JREY3NlM1cWRBQmNCVzBwLUVDSk5jOVo4cngtY1hJ')
            xhr.send()
        })

    })


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

                <div className="containerForCards">



                    <Card>
                        {console.log('FROM INSIDE:::::::::::::::::::::::::::>>>>>>>>>>>>>', this.state.data)}
                        <CardHeader id='cardHead' title={this.state.data.username} subheader={new Date(this.state.data.timestamp).toDateString()}
                        />
                        <img src='../../static/abc.jpg' height='300' width='300' />

                    </Card>
                </div>
            </div>

        )
    }
}
export default Home;