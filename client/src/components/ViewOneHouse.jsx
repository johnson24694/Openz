import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {useParams, useNavigate, Link } from "react-router-dom";

const ViewOneHouse = (props) => {
    const [houseList, setHouseList] = useState([])
    const {id} = useParams();
    const navigate = useNavigate(); 

    useEffect(() => {
        axios.get("http://localhost:8000/api/house/" + id)
            .then( res => {
                console.log(res.data);
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

    return (
        <div className="mt-5 px-3 py-4">
            <h2 className="h1 display-2">{houseList.name} Details</h2>
            <p>Name:  {houseList.name}</p>
            <p>Location:  {houseList.location}</p>
            <p>Date Open:  {houseList.dateOpen}</p>
            <p>Time Open:  {houseList.timeOpen}</p>
            <p>Favorite:  {houseList.favorite ? (<p>Yes</p>) : <p>No</p>}</p>
            <p>Notes:  {houseList.notes}</p>
            <Link to={`/dashboard`}><button className="btn btn-primary btn-lg mx-3 px-5 py-3 mt-2">Back to Houses</button></Link>
            <button className="btn btn-danger btn-lg mx-3 px-5 py-3 mt-2" onClick={() => handleDelete(houseList._id)}> Delete </button>
        </div>
    );
}
export default ViewOneHouse;
