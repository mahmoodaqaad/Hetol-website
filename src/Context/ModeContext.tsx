"use client"

import React, { useState } from 'react'
import { createContext } from 'react'
interface ModeContextProviderType {
    isDarkmode: boolean
    setDarkMode: React.Dispatch<React.SetStateAction<boolean>>

}

export const ModeContext = createContext<ModeContextProviderType | undefined>(undefined)

const ModeContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [isDarkmode, setDarkMode] = useState(!document.documentElement.classList.contains("dark"))

    return (
        <ModeContext.Provider value={{ isDarkmode, setDarkMode }}>
            {children}
        </ModeContext.Provider>
    )
}

export default ModeContextProvider
