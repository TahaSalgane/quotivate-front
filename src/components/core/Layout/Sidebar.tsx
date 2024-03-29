import React from 'react';
import { NavLink } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faGauge,
    faUsers,
    faQuoteRight,
    faRightFromBracket,
    faTags,
    faComment,
} from '@fortawesome/free-solid-svg-icons';

type Props = {
    userlogOut: () => void;
};
const Sidebar: React.FC<Props> = ({ userlogOut }: Props) => {
    return (
        <div
            className="bg-dark text-white d-flex flex-column flex-shrink-0 p-3 border-top rounded shadow-lg"
            style={{ width: '100%', height: '100vh' }}
        >
            <Nav variant="pills" defaultActiveKey="link-0" className="flex-column">
                <NavLink to="/admin/dashboard" className="nav-link text-white" end>
                    <FontAwesomeIcon size="xs" className="me-1" icon={faGauge} />
                    Dashboard{' '}
                </NavLink>
                <NavLink to="/admin/users" className="nav-link text-white" end>
                    <FontAwesomeIcon size="xs" className="me-1" icon={faUsers} />
                    Users{' '}
                </NavLink>
                <NavLink to="/admin/Quotes" className="nav-link text-white" end>
                    <FontAwesomeIcon size="xs" className="me-1" icon={faQuoteRight} />
                    Quotes{' '}
                </NavLink>
                <NavLink to="/admin/tags" className="nav-link text-white" end>
                    <FontAwesomeIcon size="xs" className="me-1" icon={faTags} />
                    Tags{' '}
                </NavLink>
                <NavLink to="/admin/comments" className="nav-link text-white" end>
                    <FontAwesomeIcon size="xs" className="me-1" icon={faComment} />
                    Comments{' '}
                </NavLink>
                <div onClick={() => userlogOut()} className="text-white" role="button" style={{ marginTop: '62vh' }}>
                    <FontAwesomeIcon className="me-1 fa-1x" icon={faRightFromBracket} />
                    <strong>Sign out</strong>
                </div>
            </Nav>
        </div>
    );
};
export default Sidebar;
