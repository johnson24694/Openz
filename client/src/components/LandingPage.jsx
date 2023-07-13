import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate, Link } from "react-router-dom";
import { Carousel } from 'react-bootstrap';

const LandingPage= (props) => {
    const navigate = useNavigate()
    
    return (
        <div>
            <h2 className="h1 display-1">Openz</h2>
            <h4>All your open houses.  All in one place.</h4>
            <Carousel>
                <Carousel.Item interval={1000}>
                    <img
                    className="d-block w-100"
                    src="https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=1600"
                    alt="First slide"
                    />
                    <Carousel.Caption>
                    <h3>Keep track of the open houses you visit.</h3>
                    
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={800}>
                    <img
                    className="d-block w-100"
                    src="https://images.pexels.com/photos/2326926/pexels-photo-2326926.jpeg?auto=compress&cs=tinysrgb&w=1200"
                    alt="Second slide"
                    />
                    <Carousel.Caption>
                    <h3>Customize your open house selections.</h3>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                    className="d-block w-100"
                    src="https://images.pexels.com/photos/1170686/pexels-photo-1170686.jpeg?auto=compress&cs=tinysrgb&w=1600"
                    alt="Third slide"
                    />
                    <Carousel.Caption>
                    <h3>Plan your weekend!</h3>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>

             <div>
                <h6>New here?</h6>
                <Link to={`/register`}>Register Now</Link>
             </div>
             <div>
                <h6>Welcome Back</h6>
                <Link to={`/login`}>Log in</Link>
             </div>
    </div>    
    )
}
export default LandingPage;