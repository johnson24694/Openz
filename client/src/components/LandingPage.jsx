import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate, Link } from "react-router-dom";
import { Carousel } from 'react-bootstrap';

const LandingPage= (props) => {
    const navigate = useNavigate()
    
    return (
        <div>
            <div>
                <nav class="navbar navbar-expand-xlg bg-body-tertiary">
                    <div class="container-fluid">
                        <a class="navbar-brand" href="#"> <img src = "https://cdn-icons-png.flaticon.com/128/846/846449.png" alt="Logo" width="30" height="24" class="d-inline-block align-text-top"></img>       Openz</a>
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                            <div class="navbar-nav">
                            <Link to={`/register`} class="nav-link active" aria-current="page">Register Now</Link>
                            <Link to={`/login`} class="nav-link">Log in</Link>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
            <p className="h6 display-6">All your open houses.  All in one place.</p>
            <div className='carousel-div d-flex justify-content-center align-items-center'>
                <Carousel className="carousel">
                <Carousel.Item className="carousel-item" interval={3000}>
                    <img
                    className="d-block custom-carousel-image"
                    src="https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=1600"
                    alt="First slide"
                    />
                    <Carousel.Caption>
                    <h3>Keep track of the open houses you visit.</h3>
                    
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={2000}>
                    <img
                    className="d-block custom-carousel-image"
                    src="https://images.pexels.com/photos/2326926/pexels-photo-2326926.jpeg?auto=compress&cs=tinysrgb&w=1200"
                    alt="Second slide"
                    />
                    <Carousel.Caption>
                    <h3>Customize your open house selections.</h3>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                    className="d-block custom-carousel-image"
                    src="https://images.pexels.com/photos/1170686/pexels-photo-1170686.jpeg?auto=compress&cs=tinysrgb&w=1600"
                    alt="Third slide"
                    />
                    <Carousel.Caption>
                    <h3>Plan your weekend!</h3>
                    </Carousel.Caption>
                </Carousel.Item>
                </Carousel>
            </div>
        </div>    
    )
}
export default LandingPage;