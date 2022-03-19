import { LocationProvider, Router, useLocation } from '@reach/router';
import React from 'react';
import { useAnalytics } from './hooks';
import Home from './scenes/Home';
import Match from './scenes/Match';
import { useMoralis } from "react-moralis";


export default function App(): React.ReactElement {
    const { authenticate, isAuthenticated, isAuthenticating, user, account, logout } = useMoralis();

    const login = async () => {
      if (!isAuthenticated) {

        await authenticate({signingMessage: "Log in using Moralis" })
          .then(function (user) {
            console.log("logged in user:", user!.get("ethAddress"));
            window.localStorage.setItem("connectorId", user!.get("ethAddress"));
            console.log();
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    }

    const logOut = async () => {
      await logout();
      console.log("logged out");
    }

    return (
        <LocationProvider>

    <div>
      <button onClick={login}>Moralis Metamask Login</button>
      <button onClick={logOut} disabled={isAuthenticating}>Logout</button>
    </div>

            <RoutedApp />
        </LocationProvider>
    );
}

function RoutedApp(): React.ReactElement {
    const { pathname } = useLocation();
    const analytics = useAnalytics();

    /**
     * Initialize analytics.
     */
    React.useEffect(() => {
        analytics.init();
    }, [analytics]);

    /**
     * Listen to page changes.
     */
    React.useEffect(() => {
        analytics.page(pathname);
    }, [analytics, pathname]);

    return (
        <Router>
            <Home default path="/" />
            <Match path="/:roomId" />
        </Router>
    );
}
