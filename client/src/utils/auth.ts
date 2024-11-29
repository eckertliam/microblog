const API_URL: string = import.meta.env.VITE_API_URL;

/**
 * Check if the user token exists in localStorage
 * @returns the session token or null if it doesn't exist
 */ 
const getSession = (): string | null => {
    return localStorage.getItem('microblog-session');
}

/** Check whether the user has a valid session token */
export const isAuth = async (): Promise<boolean> => {
    // check if session is null
    const session: string | null = getSession();
    if (session === null) {
        return false;
    } else {
        const response: Response = await fetch(`${API_URL}/session`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: session,
        });
        if (response.status === 200) {
            return true;
        } else {
            return false;
        }
    }
}