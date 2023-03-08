import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faSignIn } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
type props = {
    isNotDark?: boolean;
};
const Navbars: React.FC<props> = ({ isNotDark }: props) => {
    const users = { isadmin: false };
    return (
        <Navbar bg={!isNotDark ? 'dark' : undefined} expand="lg" variant="dark" className="px-3">
            <Navbar.Brand as={NavLink} to="/" className={`${users.isadmin ? 'headerbar-200 me-1' : 'me-5'}`}>
                Quotivate
            </Navbar.Brand>
            *
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
                <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
                    <Nav.Link as={NavLink} to="/">
                        Home
                    </Nav.Link>
                    <Nav.Link as={NavLink} to="/Quotes">
                        Quotes
                    </Nav.Link>
                    <NavDropdown title="Topics" id="navbarScrollingDropdown">
                        <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                        <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action5">Something else here</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                <Form className="d-flex flex-grow-1 w-100 justify-content-end">
                    <Form.Control type="search" placeholder="Search" className="me-2 w-75" aria-label="Search" />
                    <Button variant="outline-success" className="me-5">
                        Search
                    </Button>
                </Form>
                <Nav.Link as={NavLink} to="/register" href="#action1" className="text-white mx-3">
                    <FontAwesomeIcon icon={faUserPlus} /> Register
                </Nav.Link>
                <Nav.Link href="#action1" className="text-white" as={NavLink} to="/login">
                    <FontAwesomeIcon icon={faSignIn} /> Login
                </Nav.Link>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default Navbars;
