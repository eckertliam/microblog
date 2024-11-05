import React, { useState } from 'react';
import './Login.css';

interface LoginState {
    username: string;
    password: string;
    showPassword?: boolean;
}

export default function Login(): JSX.Element {
    const [loginState, setLoginState] = useState<LoginState>({
        username: '',
        password: '',
        showPassword: false
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
            <input
                type="text"
                name="username"
                id="username"
                value={loginState.username}
                onChange={handleChange}
                placeholder="Username"
            />
            <br />
            <div>
                <input
                    type={loginState.showPassword ? 'password' : 'text'}
                    name="password"
                    id="password"
                    value={loginState.password}
                    onChange={handleChange}
                    placeholder="Password"
                />
                <button type="button" onClick={() => setLoginState({ ...loginState, showPassword: !loginState.showPassword })}>
                    {loginState.showPassword ? 'Hide' : 'Show'}
                </button>
            </div>
            <br />
            <button type="submit">Login</button>
        </form>
    )
}