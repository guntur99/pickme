import React, { createContext, useState, useEffect, useContext } from 'react';
import { AuthClient } from "@dfinity/auth-client";
import { createActor, canisterId } from 'declarations/pickme_backend';
import { canisterId as internetIdentityCanisterId } from "declarations/internet_identity";
 
const days = BigInt(1); // One day
const hours = BigInt(24);  
const nanoseconds = BigInt(3600000000000); 
const AuthContext = createContext();
const defaultOptions = {
    createOptions: {
        idleOptions: {
            disableIdle: true,
        }
    },
    loginOptions: {
        maxTimeToLive: days * hours * nanoseconds,
        identityProvider: process.env.DFX_NETWORK === "local"
            ? `http://${internetIdentityCanisterId}.localhost:4943/`
            : 'https://identity.ic0.app/#authorize',
    }
}

export const useAuthClient = (options = defaultOptions) => {
    const [isAuth, setIsAuth] = useState(false);
    const [authUser, setAuthUser] = useState(null);
    const [identity, setIdentity] = useState(null);
    const [principal, setPrincipal] = useState(null);
    const [callFunction, setCallFunction] = useState(null);

    useEffect(() => {
        AuthClient.create(options.createOptions).then(async (client) => {
            updateClient(client);
        });
    },[]);

    async function updateClient(client){

        const isAuthenticated = await client.isAuthenticated();
        setIsAuth(isAuthenticated);

        const identity = client.getIdentity();
        setIdentity(identity);

        const principal = identity.getPrincipal();
        setPrincipal(principal);

        setAuthUser(client);

        const actor = createActor(canisterId, {
            agentOptions: {
                identity,
            },
        });

        setCallFunction(actor);
    }

    const login = () => {
        authUser.login({
            ...options.loginOptions,
            onSuccess: () => {
                localStorage.setItem('logged', true);
                updateClient(authUser);
                window.location.reload();
            }
        })
    }

    async function logout(){
        localStorage.removeItem('logged');
        await authUser?.logout();
        await updateClient(authUser);
        window.location.reload();
    }

    return {
        isAuth,
        login,
        logout,
        authUser,
        identity,
        principal,
        callFunction,
    }
}

export const AuthProvider = ({children}) => {

    const auth = useAuthClient();

    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext);