
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { useHistory } from 'react-router-dom';

import arrowLeft from '../styles/svg/arrows/left-arrow.svg';


export default function ImageCarousel({ stay }) {

    const history = useHistory()

    function onClickItem(stayId) {
        history.push(`/details/${stayId}`)
    }

    return (
        <Carousel  showThumbs={false} showStatus={false} onClickItem={() => onClickItem(stay._id)}>
            <div>
                <img src={stay.imgUrls[0]} />
                {/* <button ><img style={{ width: "45px" }} src={arrowLeft} alt="" /></button> */}
            </div>
            <div>
                <img src={stay.imgUrls[1]} />
            </div>
            <div>
                <img src={stay.imgUrls[2]} />
            </div>
            <div>
                <img src={stay.imgUrls[3]} />
            </div>
            <div>
                <img src={stay.imgUrls[4]} />
            </div>
        </Carousel>
    );
}
;

