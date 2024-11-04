import React, { useState } from 'react';
import './Login.css';

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
        <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username:</label>
            <input
                type="text"
                name="username"
                id="username"
                value={loginState.username}
                onChange={handleChange}
            />
            <label htmlFor="password">Password:</label>
            <input
                type="password"
                name="password"
                id="password"
                value={loginState.password}
                onChange={handleChange}
            />
            <button type="submit">Login</button>
        </form>
    )
}