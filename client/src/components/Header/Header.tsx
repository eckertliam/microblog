import React from 'react';
import { Navbar, NavbarBrand } from 'react-bootstrap';
import './Header.css';

export default function Header(): JSX.Element {
    // TODO: Add nav links
    return (
        <Navbar className='navbar'>
            <NavbarBrand className='brand' href='/'>Microblog</NavbarBrand>
        </Navbar>
    )
}