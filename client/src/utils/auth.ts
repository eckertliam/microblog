/** Check whether the user has a valid session token */
export const isAuth = (): boolean => {
    const session: string | null = localStorage.getItem('session');
    // check if session is null
    if (session === null) {
        return false;
    } else {
        // TODO: check with server if session is valid
        // return true if session is valid
        return true;
    }
}