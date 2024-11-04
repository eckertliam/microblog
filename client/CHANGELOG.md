# CLIENT CHANGELOG

## 0.0.1

- Initial release
- Setup react router 
- Created a basic login page currently with no functionality
- Created PrivateRoute component to protect routes that require authentication. Redirects to login page if user is not authenticated
- Session token is stored in local storage. auth.ts contains function isAuth to check if user is authenticated. Function currently only checks if storage contains token. In the future it will need to check if token is valid with the server.
