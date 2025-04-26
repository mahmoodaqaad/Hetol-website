import React from 'react'
import { NavLink } from 'react-router-dom'
import './404.css'
const NotFound = () => {
    return (
        <div className='notFound'>
            This Page Not Found
            <NavLink to={"/"} className='btn btn-warning'>GO to Home</NavLink>
        </div>
    )
}

export default NotFound
