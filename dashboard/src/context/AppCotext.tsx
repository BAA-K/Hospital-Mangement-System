import React, { createContext, useState, ReactNode, useContext } from "react";
import { Toast } from "../components/Toast";
import { useQuery } from "react-query";
import { fetchAdmin } from "../api-client";


type ToastMessage = {
    message: string,
    type: "SUCCESS" | "ERROR"
}
type Admin = {
    firstName: string,
    lastName: string,
}
type AppContext = {
    showToast: (toastMessage: ToastMessage) => void;
    isLoggedIn: boolean;
    admin: Admin
}

const AppContext = createContext<AppContext | undefined>(undefined)

const AppContextProvider = ({ children }: { children: ReactNode }): React.JSX.Element => {
    const [toast, setToast] = useState<ToastMessage | undefined>(undefined)

    const { isError, data } = useQuery('validateToken', fetchAdmin, {
        retry: false
    })

    return (
        <AppContext.Provider
            value={{
                showToast: (toastMessage) => {
                    setToast(toastMessage)
                },
                isLoggedIn: !isError,
                admin: data ? data.user : { firstName: "", lastName: "" }
            }}
        >
            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(undefined)}
                />
            )}
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => {
    const CONTEXT = useContext(AppContext)
    return CONTEXT as AppContext
}

export default AppContextProvider