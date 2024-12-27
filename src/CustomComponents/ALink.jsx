import React from 'react'
import { Link } from "react-router-dom";

const ALink = ({ value, path, className }) => {
    return (
        <Link to={path} className={`text-sm text-gray-600  ${className}`}>
            {value}
        </Link>
    )
}

export default ALink
