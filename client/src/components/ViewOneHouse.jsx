import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {useParams, useNavigate, Link } from "react-router-dom";
import { format } from 'date-fns';
import { GoogleMap, DirectionsRenderer } from 'react-google-maps';

const ViewOneHouse = (props) => {
    const [houseList, setHouseList] = useState([]);
    const [directions, setDirections] = useState(null);
    const {id} = useParams();
    const navigate = useNavigate(); 
    const [map, setMap] = useState(null);
    const [marker, setMarker] = useState(null);


    const initMap = () => {
        const mapOptions = {
        center: { lat: 41.280170, lng: -96.189760 },
        zoom: 12,
        };
        const map = new google.maps.Map(document.getElementById('map'), mapOptions);
        const marker = new google.maps.Marker({
        position: { lat: 41.280170, lng: -96.189760 },
        map: map,
        });
        setMap(map);
        setMarker(marker);
    };

    useEffect(() => {
        axios.get("http://localhost:8000/api/house/" + id)
            .then( res => {
                console.log(res.data);
                initMap();
                setHouseList(res.data);
            })
            .catch( err => console.log(err) );
    }, []);

    const handleDelete = (houseID) => {
        axios.delete(`http://localhost:8000/api/house/${id}`)
            .then(res => {
                console.log("***delete successful***", res.data)
                const filteredHousesList = (house => {
                    return house._id != houseID});
                    setHouseList(filteredHousesList);
                    navigate('/dashboard')
                })
    }

    const logout = () => {
        axios.post('http://localhost:8000/api/logout', {}, {withCredentials:true})
            .then(res => {
                navigate('/')
                console.log('User is logged out')
            })
            .catch(err => {
                console.log(err);
            })
    }

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
        });
    };

    const formatTime = (time) => {
        if (time) {
          const [hours, minutes] = time.split(':');
          const formattedHours = parseInt(hours) % 12 || 12;
          const period = parseInt(hours) < 12 ? 'AM' : 'PM';
          return `${formattedHours}:${minutes} ${period}`;
        }
        return '';
      };
      
    

    return (
        <div>
            <div>
                <nav class="navbar navbar-expand-lg bg-body-tertiary">
                    <div class="container-fluid">
                        <a class="navbar-brand" href="#"> <img src = "https://cdn-icons-png.flaticon.com/128/846/846449.png" alt="Logo" width="30" height="24" class="d-inline-block align-text-top"></img>       Openz</a>
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                            <div class="navbar-nav">
                            <Link to={`/dashboard`} class="nav-link active" aria-current="page">View All Houses</Link>
                            <a href="#" onClick={logout} class="nav-link" aria-current="page">Log Out</a>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
            <h2 className="h6 display-6">Details</h2>
            <p className='fw-semibold mt-3'>{houseList.name}</p>
            <div>Located at <Link>{houseList.location}</Link></div>
            <div>Open House on {formatDate(houseList.dateOpen)} <span>at {formatTime(houseList.timeOpen)}</span></div>
            <div><span>Is this a Favorite? {houseList.favorite ? <span>Yes</span> : <span>No</span>}</span></div>
            <p><span className='fw-semibold'>My Notes:  </span><span className='fst-italic'>{houseList.notes}</span></p>
            <button className="btn btn-danger btn-md mx-3 px-4 py-2 mt-1" onClick={() => handleDelete(houseList._id)}> Delete </button>
            <div  className="mt-3" id="map" style={{ height: '400px' }}></div>
        </div>
    );
}
export default ViewOneHouse;
