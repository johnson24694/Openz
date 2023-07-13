import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";

const ViewAllHouses = (props) => {
    const [houseList, setHouseList] = useState([]);
    const navigate = useNavigate();
    const {id} = useParams();
    
    useEffect( () => {
        axios.get('http://localhost:8000/api/houses',{withCredentials: true})
        .then(res => {
            console.log(res);
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
        <div className="mt-5 px-4 py-4">
            <h1 className="h1 display-2">Welcome to Openz!</h1>
            <table className = "table table-striped table-hover border mt-5 px-4 py-4">
                <thead>
                    <h4>My Open Houses:</h4>
                    <i className="fa-solid fa-user"></i>
                    <tr className="h1 display-6">
                        <th>Name|  </th>
                        <th>Location|  </th>
                        <th>Date Open|  </th>
                        <th>Time Open|  </th>
                        <th>Favorite|  </th>
                        <th>Notes|  </th>
                    </tr>
                    
                </thead>
                <tbody>
                    {
                    houseList.map((houseList, index)=>{
                    return (
                        <tr className="table-warning" key={index}>
                            <td>{houseList.name}</td> 
                            <td>{houseList.location}</td>
                            <td>{houseList.dateOpen}</td>
                            <td>{houseList.timeOpen}</td>
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
                            <td>{houseList.notes}</td>
                            
                            <td><Link to={`/house/${houseList._id}`}> View </Link></td>
                            <td><Link to={`/house/${houseList._id}/edit`}> Edit </Link></td>
                            <td><button className="btn btn-danger" onClick={() => handleDelete(houseList._id)}> Delete </button></td>
                        </tr>
                        )})
                    }
                </tbody>
            </table>
            <Link to={`/houses/new`}><button className="btn btn-primary btn-lg mx-3 px-5 py-3 mt-2">Add an Open House</button></Link>
            <button  className="btn btn-primary btn-lg mx-3 px-5 py-3 mt-2" onClick={logout}>Logout</button>
        </div>
    )
}

export default ViewAllHouses;