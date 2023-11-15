import { createContext, useState } from "react";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
    const [error, setError] = useState()
    const [selectedIndex, setSelectedIndex] = useState();

    return (
        <AppContext.Provider
            value={{
                error, setError,
                selectedIndex, setSelectedIndex
            }}
        >
            {children}
        </AppContext.Provider>
    )
};