import {createContext, useContext, useEffect, useMemo, useState} from "react";
import {useApi} from "@/contexts/Api";

export type UserInfo = {
    accountNumber: string;
    balance: string;
    branchName: string;
    resoniteUserId: string;
    role: string;
}

type ApplicationContextType = {
    appReady: boolean;
    loggedIn: boolean;

    userInfo: UserInfo | null;

    logout: () => void;
}

const ApplicationContext = createContext<ApplicationContextType | undefined>(undefined);

export const ApplicationProvider = ({children}: { children: React.ReactNode }) => {
    const api = useApi()
    const [appReady, setAppReady] = useState(false)
    const [loggedIn, setLoggedIn] = useState(false)

    const [userInfo, setUserInfo] = useState<UserInfo | null>(null)

    const logout = () => {
        // cookie connect.sid を消す
        api.logout().then((result) => {
            if (result) {
                setLoggedIn(false)
            }
        })
    }

    useEffect(() => {
        if (!api) {
            console.log('api is not initialized');
        }

        api.getUserInfo().then((userInfo) => {
            console.log(userInfo)
            if (userInfo) {
                setLoggedIn(true)
                setUserInfo(userInfo)
            } else {
                setLoggedIn(false)
            }

            setAppReady(true)
        }).catch((e) => {
            setLoggedIn(false)
            setAppReady(true)
        })
    }, [api]);

    const value = useMemo(() => {
        return {
            appReady,
            loggedIn,
            logout,
            userInfo
        }
    }, [appReady, loggedIn, userInfo]);

    return (
        <ApplicationContext.Provider value={value}>
            {children}
        </ApplicationContext.Provider>
    );
}

export const useApplication = () => {
    const context = useContext(ApplicationContext);
    if (context === undefined) {
        throw new Error('useApplicationContext must be used within a ApplicationProvider');
    }
    return context;
}