import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import './Register.css';
import Header from '../Header/Header';

interface RegisterState {
    email: string;
    username: string;
    password: string;
    passwordConfirm: string;
}

export default function Register(): JSX.Element {
    const [registerState, setRegisterState] = useState<RegisterState>({
        email: '',
        username: '',
        password: '',
        passwordConfirm: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        setRegisterState({
            ...registerState,
            [name]: value
        });
    }

    // TODO: replace placeholder with actual register functionality
    const handleSubmit = (e: React.FormEvent): void => {
        e.preventDefault();
        console.log(registerState);
    }

    return (
        <>
            <Header />
            <Container className='register-container'>
                <Form onSubmit={handleSubmit} className='register-form'>
                    <h2 className='register-header'>Register</h2>
                    <Form.Group controlId='form-email'>
                        <Form.Control
                            type='email'
                            name='email'
                            value={registerState.email}
                            onChange={handleChange}
                            placeholder='Email'
                        />
                    </Form.Group>
                    <br />
                    <Form.Group controlId='form-username'>
                        <Form.Control
                            type='text'
                            name='username'
                            value={registerState.username}
                            onChange={handleChange}
                            placeholder='Username'
                        />
                    </Form.Group>
                    <br />
                    <Form.Group controlId='form-password'>
                        <Form.Control
                            type='password'
                            name='password'
                            value={registerState.password}
                            onChange={handleChange}
                            placeholder='Password'
                        />
                    </Form.Group>
                    <br />
                    <Form.Group controlId='form-password-confirm'>
                        <Form.Control
                            type='password'
                            name='passwordConfirm'
                            value={registerState.passwordConfirm}
                            onChange={handleChange}
                            placeholder='Confirm Password'
                        />
                    </Form.Group>
                    <Button variant='primary' type='submit' className='register-btn'>
                        Register
                    </Button>
                </Form>
            </Container>
        </>
    )
}