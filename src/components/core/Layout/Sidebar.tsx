import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGauge, faUsers, faQuoteRight, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
export default function Sidebar() {
    return (
        <div
            className="bg-dark text-white d-flex flex-column flex-shrink-0 p-3 border-top rounded shadow-lg"
            style={{ width: '100%', height: '100vh' }}
        >
            <ul className="nav nav-pills flex-column mb-auto">
                <li>
                    <Link to="dashboard" className="nav-link text-white">
                        <FontAwesomeIcon size="xs" className="me-1" icon={faGauge} />
                        <span>Dashboard</span>
                    </Link>
                </li>
                <li>
                    <Link to="admin/users" className="nav-link text-white">
                        <FontAwesomeIcon size="xs" className="me-1" icon={faUsers} />
                        Users
                    </Link>
                </li>
                <li>
                    <Link to="admin/quotes" className="nav-link text-white">
                        <FontAwesomeIcon size="xs" className="me-1" icon={faQuoteRight} />
                        Quotes
                    </Link>
                </li>
            </ul>
            <div className="dropdown">
                <Link to="#" className="p-3 d-flex align-items-center text-white text-decoration-none">
                    <FontAwesomeIcon className="me-1 fa-1x" icon={faRightFromBracket} />
                    <strong>Sign out</strong>
                </Link>
            </div>
        </div>
    );
}
