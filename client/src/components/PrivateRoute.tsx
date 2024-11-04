import { Navigate } from 'react-router-dom';
import { isAuth } from '../utils/auth';

interface PrivateRouteProps {
    element: JSX.Element;
    redirectTo: string;
}

export function PrivateRoute({element, redirectTo }: PrivateRouteProps): JSX.Element {
    if (isAuth()) {
        return element
    } else {
        return <Navigate to={redirectTo} />;
    }
}