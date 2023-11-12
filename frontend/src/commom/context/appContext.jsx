import { createContext, useContext, useState } from "react";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
    const [error, setError] = useState()

    return (
        <AppContext.Provider
            value={{
                error, setError
            }}
        >
            {children}
        </AppContext.Provider>
    )
};