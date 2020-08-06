import React from 'react';
import { Link } from 'react-router-dom';

export default function () {
	return (

        <div id="content-wrapper" className="d-flex flex-column">
            <div className="container my-auto">
                <p>No existe esa página</p>
                <Link to='/' className="btn btn-warning">Regresar</Link>
            </div>
        </div>
	)
}