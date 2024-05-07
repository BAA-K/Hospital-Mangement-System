import React, { useEffect, useState } from 'react'
import { Navbar, Nav, Container, Image, Button } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'

import logoImage from '/images/logo.png'
import { useAppContext } from '../context/AppContext'
import { useMutation, useQueryClient } from 'react-query'
import { logoutPatient } from '../api-client'

const Header = (): React.JSX.Element => {
    const [isScrolled, setIsScrolled] = useState<boolean>(false)

    const { isLoggedIn } = useAppContext()
    const navigateTo = useNavigate()
    const { showToast } = useAppContext()
    const queryClient = useQueryClient()

    const mutation = useMutation(logoutPatient, {
        onSuccess: async (res) => {
            await queryClient.invalidateQueries("validateToken")
            showToast({ message: res.message, type: "SUCCESS" })
        },
        onError: (err: Error) => {
            showToast({ message: err.message, type: "ERROR" })
        }
    })

    const handleButtonClick = () => {
        isLoggedIn
            ? mutation.mutate()
            : navigateTo("/login")
    }

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            setIsScrolled(scrollTop > 0);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <Navbar expand="md" className={`header ${isScrolled ? 'scrolled' : ''}`} fixed='top' tabIndex={999}>
            <Container>
                <Navbar.Brand href="#">
                    <Image alt='Logo Image' width={125} height={65} src={logoImage} />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className='me-auto ms-auto link-container'>
                        <Link to={"/"} >Home</Link>
                        <Link to={"/appointment"} >Appointment</Link>
                        <Link to={"/about"} >About Us</Link>
                    </Nav>
                    <Button onClick={handleButtonClick} variant='dark' size='sm' type='button' className='login-button rounded-pill fw-bold'>{isLoggedIn ? "Logout" : "Login"}</Button>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header