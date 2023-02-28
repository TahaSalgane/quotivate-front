import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser, faGauge, faUsers, faQuoteRight, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
export default function Sidebar() {
    return (
        <div
            className="bg-dark text-white d-flex flex-column flex-shrink-0 p-3 "
            style={{ width: '100%', height: '92vh' }}
        >
            <ul className="nav nav-pills flex-column mb-auto">
                <div className="dropdown">
                    <Link to="profil" className="text-center mx-5 text-reset text-decoration-none">
                        <FontAwesomeIcon className="fa-4x" icon={faCircleUser} />
                        <br />
                    </Link>
                    <h3 className="p-3">Skalo Taha</h3>
                    <hr />
                </div>
                <li>
                    <Link to="dashboard" className="nav-link text-white">
                        <FontAwesomeIcon size="xs" className="me-1" icon={faGauge} />
                        <span>Dashboard</span>
                    </Link>
                </li>
                <li>
                    <Link to="Users" className="nav-link text-white">
                        <FontAwesomeIcon size="xs" className="me-1" icon={faUsers} />
                        Users
                    </Link>
                </li>
                <li>
                    <Link to="quotes" className="nav-link text-white">
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
