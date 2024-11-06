import React from 'react';
import {Routes, Route, BrowserRouter} from 'react-router-dom';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import { PrivateRoute } from './components/PrivateRoute';

export default function App() {
    // TODO: Add Home route
    // TODO: Add Profile route
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/' element={<PrivateRoute element={<h1>Home</h1>} redirectTo='/login' />} />
                <Route path='*' element={<h1>Not Found</h1>} />
            </Routes>
        </BrowserRouter>
    );
}