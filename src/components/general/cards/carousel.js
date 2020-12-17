import React from "react";
import Carousel from "react-bootstrap/Carousel";


const CarouselCatalogo = () => {
    return (
        <Carousel>
            <Carousel.Item interval={1000}>
                <img
                    style={{width:"100%", height:"500px"}}
                    className="d-block w-100"
                    src="https://s2.qwant.com/thumbr/0x380/7/f/786f3ce47104030b039ad7de44588c0b0b3dd21ca6fb8bae9413c606355e62/BeyondTheTurntable-07.jpg?u=https%3A%2F%2Fwww.electronicbeats.net%2Fapp%2Fuploads%2F2018%2F09%2FBeyondTheTurntable-07.jpg&q=0&b=1&p=0&a=1"
                    alt="First slide"
                />
                <Carousel.Caption>
                    <h3>Dj Lucifer</h3>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval={500}>
                <img
                    style={{width:"100%", height:"500px"}}
                    className="d-block w-100"
                    src="https://s1.qwant.com/thumbr/0x380/9/4/d482643dcb11b59f9889796f2b8771f77c33b45708bb4674f6b771828e9b76/IMG_9731.jpg?u=https%3A%2F%2Fwww.edmtunes.com%2Fwp-content%2Fuploads%2F2017%2F07%2FIMG_9731.jpg&q=0&b=1&p=0&a=1"
                    alt="Third slide"
                />
                <Carousel.Caption>
                    <h3>Dj Cool</h3>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    style={{width:"100%", height:"500px"}}
                    className="d-block w-100"
                    src="https://s1.qwant.com/thumbr/0x380/b/e/e5448680c0440f12ab0e3d8c70dd0e7cb860a587726a0e268797c029c5884f/maxresdefault.jpg?u=https%3A%2F%2Fimg.youtube.com%2Fvi%2FIGUAChyue2I%2Fmaxresdefault.jpg&q=0&b=1&p=0&a=1"
                    alt="Third slide"
                />
                <Carousel.Caption>
                    <h3>Dj Bald</h3>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
};

export default CarouselCatalogo;

