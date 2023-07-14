import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";
import { format } from 'date-fns';
import { GoogleMap, DirectionsRenderer } from 'react-google-maps';


const ViewAllHouses = (props) => {

    const [houseList, setHouseList] = useState([]);
    const [directions, setDirections] = useState(null);
    const [map, setMap] = useState(null);
    const [marker, setMarker] = useState(null);
    const navigate = useNavigate();
    const {id} = useParams();

    const formatTimeToCivilian = (timeString) => {
        const [hours, minutes] = timeString.split(':');
        const dateObj = new Date();
        dateObj.setHours(hours);
        dateObj.setMinutes(minutes);
        return format(dateObj, 'h:mm a');
    }
    
    const initMap = () => {
        const mapOptions = {
        center: { lat: 41.256538, lng: -95.934502 },
        zoom: 12,
        };
        const map = new google.maps.Map(document.getElementById('map'), mapOptions);
        const marker = new google.maps.Marker({
        position: { lat: 41.256538, lng:-95.934502 },
        map: map,
        });
        setMap(map);
        setMarker(marker);
    };
    
    useEffect( () => {
        axios.get('http://localhost:8000/api/houses',{withCredentials: true})
        .then(res => {
            console.log(res);
            initMap();
            setHouseList(res.data)
        })},[]
    )

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

    const handleDelete = (id) => {
        axios.delete(`http://localhost:8000/api/house/${id}`)
            .then(res => {
                console.log("***delete successful***", res.data)
                const filteredHousesList = houseList.filter(house => {
                    return house._id != id});
                    setHouseList(filteredHousesList)
                });
    }

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
                            <Link to={`/houses/new`} class="nav-link active" aria-current="page">Add an Open House</Link>
                            <a href="#" onClick={logout} class="nav-link" aria-current="page">Log Out</a>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
            <h1 className="h6 display-6">My Open Houses</h1>
            <table className = "table table-striped table-hover border mt-3 px-4 py-4 ">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Location</th>
                        <th>Date Open</th>
                        <th>Time Open</th>
                        <th>Favorite</th>
                        <th>Notes</th>
                    </tr>
                </thead>
                <tbody>
                    {
                    houseList.map((houseList, index)=>{
                    return (
                        <tr className="table-light" key={index}>
                            <td>{houseList.name}</td> 
                            <td><Link>{houseList.location}</Link></td>
                            <td>{format(new Date(houseList.dateOpen), 'MM/dd/yyyy')}</td>
                            <td>{formatTimeToCivilian(houseList.timeOpen)}</td>
                            <td>
                            {houseList.favorite ? (
                                <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                className="bi bi-heart-fill"
                                viewBox="0 0 16 16"
                                >
                                <path
                                    fillRule="evenodd"
                                    d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
                                />
                                </svg>
                            ) : null}
                            </td>
                            <td className='fst-italic'>{houseList.notes}</td>
                            
                            <td><Link to={`/house/${houseList._id}`}> View </Link></td>
                            <td><Link to={`/house/${houseList._id}/edit`}> Edit </Link></td>
                            <td><button className="btn btn-danger" onClick={() => handleDelete(houseList._id)}> Delete </button></td>
                        </tr>
                        )})
                    }
                </tbody>
            </table>
            <div  className="mt-5" id="map" style={{ height: '400px' }}></div>
        </div>
    )
}

export default ViewAllHouses;