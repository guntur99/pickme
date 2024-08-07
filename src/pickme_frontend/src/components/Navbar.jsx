import { useEffect, useState } from 'react';
import { Link, NavLink } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { pickme_backend } from 'declarations/pickme_backend';
import Spinner from 'react-bootstrap/Spinner';
import InputGroup from 'react-bootstrap/InputGroup';
import { useAuth } from '../AuthProvider';

export default function Navbar() {
    
    const { isAuth, principal, logout } = useAuth();
    const [username, setUsername] = useState('');
    const [uname, setUname] = useState('');
    const [isRegistered, setIsRegistered] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [show, setShow] = useState(false);
    const [out, setLogout] = useState(false);
    const [existUsername, setExistUsername] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleLogoutClose = () => setLogout(false);

    useEffect(() => {
        pickme_backend.checkUserById(principal).then((res) => {
            if (res.ok) {
                setIsRegistered(true);
                setUname(res.ok.username);
            }else{
                if (!isRegistered) {
                    handleShow(); //check if profile data is not completed
                }
            }
        });
    }, []);

    function handleSignIn(e) {
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        }

        pickme_backend.checkUsername(username).then((res) => {
            const available = res.ok;
            if (available.length === 0) {
                setExistUsername(false);
                setIsLoading(true);
                pickme_backend.register(principal, username, "", "", "", "", "Basic", "Basic", "", 50).then((res) => {
                    if (res) {
                        setIsLoading(false);
                        setShow(false);
                    }
                });
            }else{
                setExistUsername(true);
            }
        });
    }

    return (
        <>
            <main>
                <div className="stretched dark">
                    <header id="header" className="dark header-size-md floating-nft-header floating-header" style={{ 
                        position: 'fixed',
                        overflow: 'hidden',
                        backgroundColor: '#333',
                        top: 0,
                        width: '100%',
                        zIndex: 999,
                    }} data-sticky-shrink="false">
                        <div id="header-wrap" className="border-0">
                            <div className="container">
                                <div className="header-row">
                                    <div id="logo" className="me-5">
                                        <NavLink to="/"><img src={`theme/images/icons/pick-me-logo.svg`} alt="Pick Me" className="pick-me-navbar py-3"/></NavLink>
                                    </div>
                                    <div className="header-misc ms-auto">
                                        <div className="header-misc ms-0">
                                            {isAuth &&
                                                <div className="header-misc">
                                                    <div className="header-misc-icon tooltips">
                                                        <Link className="header-icon-notification " to="/event/create">
                                                            <i className="bi-calendar-plus-fill text-light text-opacity-75"></i>
                                                        </Link>
                                                        <span className="tooltiptext fs-6">Event</span>
                                                    </div>
                                                    <div className="header-misc-icon tooltips">
                                                        <Link className="header-icon-notification " to="/profile">
                                                            <i className="bi-person-bounding-box text-light text-opacity-75"></i>
                                                        </Link>
                                                        <span className="tooltiptext fs-6">Profile</span>
                                                    </div>
                                                    <div className="header-misc-icon tooltips">
                                                        <button onClick={logout} id="logout" className="header-icon-notification">
                                                            <i className="bi-door-open-fill text-light text-opacity-75"></i>
                                                        </button>
                                                        <span className="tooltiptext fs-6">Logout</span>
                                                    </div>
                                                </div> 
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="header-wrap-clone"></div>
                    </header>
                    <div id="wrapper" className="noice-effect overflow-hidden"></div>
                </div>
            </main>

            <Modal show={show} onHide={handleClose} size="" backdrop="static" keyboard={false} data-bs-theme="dark">
                <Modal.Header>
                    <div className="mx-2 text-light fs-5 fw-bold">Sign In</div>
                </Modal.Header>
                <Modal.Body>
                    <Container className="my-1 text-light">
                        <Row className="my-1">
                            <Form.Label className="fs-6">Username</Form.Label>
                            <InputGroup hasValidation>
                                <InputGroup.Text>@</InputGroup.Text>
                                <Form.Control 
                                    type="text" 
                                    required 
                                    isInvalid 
                                    className="text-light border" 
                                    minLength={7} 
                                    disabled={isLoading}
                                    onChange={(e) => setUsername(e.target.value)}
                                    style={{ 
                                        maxWidth: "100%",
                                        padding: "0.5em 1em",
                                    }} />
                                    {existUsername === true ? 
                                    <Form.Control.Feedback className="fs-6" type="invalid">
                                        Please pick another username.
                                    </Form.Control.Feedback> 
                                    : 
                                    <></> 
                                    }
                            </InputGroup>
                        </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="light" onClick={handleSignIn} disabled={isLoading}>
                {isLoading ? (
                    <>
                        <Spinner
                            as="span"
                            animation="grow"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                        /> Loading...
                    </>
                    
                ):
                    "Continue"
                }
                </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={out} onHide={handleLogoutClose} size="" backdrop="static" keyboard={false} data-bs-theme="dark">
                <Modal.Body>
                    <Container className="my-1 text-light">
                        <Form.Label className="fs-5">Are you sure to Logout?</Form.Label>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="dark" onClick={handleLogoutClose}>
                        No
                    </Button>
                    <Button variant="light" onClick={logout}>
                        Yes, logout!
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}