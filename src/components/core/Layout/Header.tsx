import React from 'react';
import { Nav, Navbar, NavDropdown, Dropdown, DropdownButton } from 'react-bootstrap/';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faSignIn } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import useUserStore, { StoreStateInterface } from 'store/userStore';

type props = {
    isNotDark?: boolean;
    userlogOut?: any;
};
const Navbars: React.FC<props> = ({ isNotDark, userlogOut }: props) => {
    const user = useUserStore((state: StoreStateInterface) => state.user);
    return (
        <Navbar bg={!isNotDark ? 'dark' : undefined} expand="lg" variant="dark" className="px-3">
            <Navbar.Brand as={NavLink} to="/" className={`${user?.isAdmin ? 'headerbar-200 me-1' : 'me-5'}`}>
                Quotivate
            </Navbar.Brand>

            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
                <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
                    <Nav.Link as={NavLink} to="/">
                        Home
                    </Nav.Link>

                    <NavDropdown title="Topics" id="navbarScrollingDropdown">
                        <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                        <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action5">Something else here</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                {user ? (
                    <DropdownButton variant="dark" id="dropdown-item-button" title={user.username}>
                        <Dropdown.Item as="button">profile</Dropdown.Item> <Dropdown.Divider />
                        <Dropdown.Item as="button" onClick={() => userlogOut()}>
                            Logout
                        </Dropdown.Item>
                    </DropdownButton>
                ) : (
                    <>
                        <Nav.Link as={NavLink} to="/register" href="#action1" className="text-white mx-3">
                            <FontAwesomeIcon icon={faUserPlus} /> Register
                        </Nav.Link>
                        <Nav.Link href="#action1" className="text-white" as={NavLink} to="/login">
                            <FontAwesomeIcon icon={faSignIn} /> Login
                        </Nav.Link>
                    </>
                )}
            </Navbar.Collapse>
        </Navbar>
    );
};

export default Navbars;
