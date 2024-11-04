import React from 'react';
import {Routes, Route, BrowserRouter} from 'react-router-dom';
import Login from './components/Login/Login';
import { PrivateRoute } from './components/PrivateRoute';

export default function App() {
    // TODO: Add Register route
    // TODO: Add Home route
    // TODO: Add Profile route
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/login' Component={Login} />
            </Routes>
        </BrowserRouter>
    );
}