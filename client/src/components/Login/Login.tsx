import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import './Login.css';
import Header from '../Header/Header';

interface LoginState {
    username: string;
    password: string;
}

export default function Login(): JSX.Element {
    const [loginState, setLoginState] = useState<LoginState>({
        username: '',
        password: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        setLoginState({
            ...loginState,
            [name]: value
        });
    }

    // TODO: replace placeholder with actual login functionality
    const handleSubmit = (e: React.FormEvent): void => {
        e.preventDefault();
        console.log(loginState);
    }

    // TODO: handle reroute to register page
    return (
        <>
            <Header />
            <Container className='login-container'>
                <Form onSubmit={handleSubmit} className='login-form'>
                    <h2 className='login-header'>Login</h2>
                    <Form.Group controlId='form-username'>
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type='text'
                            name='username'
                            value={loginState.username}
                            onChange={handleChange}
                            placeholder='Username'
                        />
                    </Form.Group>
                    <Form.Group controlId='form-password'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type='password'
                            name='password'
                            value={loginState.password}
                            onChange={handleChange}
                            placeholder='Password'
                        />
                    </Form.Group>
                    <Button variant='primary' type='submit' className='login-btn'>
                        Login
                    </Button>
                </Form>
            </Container>
        </>
    )
}