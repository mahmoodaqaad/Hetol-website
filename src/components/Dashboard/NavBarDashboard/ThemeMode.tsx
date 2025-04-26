"use client"

import { ModeContext } from "@/Context/ModeContext"
import { useContext } from "react"
import { CiSun } from "react-icons/ci"
import { FaMoon } from "react-icons/fa6"

const ThemeMode = () => {
    const context = useContext(ModeContext)
    if (!context) {

        throw new Error("mode error")
    }
    const { setDarkMode, isDarkmode } = context

    return (
        <div className='text-3xl text-black  dark:text-white cursor-pointer hover:scale-125 transition-all'
            onClick={() => {
                document.documentElement.classList.toggle("dark")
                setDarkMode(!isDarkmode)

            }}
        >


            {
                isDarkmode ?
                    < CiSun /> :
                    <FaMoon />
            }

        </div>
    )
}

export default ThemeMode
