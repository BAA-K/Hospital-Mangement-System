import Footer from "./components/Footer"
import Header from "./components/Header"
import Home from "./pages/Home"
import { useState, useEffect } from "react"
import Loading from "./components/Loading"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import Appointment from "./pages/Appointment"
import Login from "./pages/Login"
import Register from "./pages/Register"
import About from "./pages/About"

function App() {
    const [isLoading, setIsLoading] = useState<boolean>(true)

    const loadingHandle = () => {
        setTimeout(() => {
            setIsLoading(false)
        }, 2000)
    }

    useEffect(() => {
        window.addEventListener("load", loadingHandle)
    }, [])

    if (isLoading) {
        return (
            <Loading />
        )
    }

    return (
        <>
            <Router>
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/appointment" element={<Appointment />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/about" element={<About />} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
                <Footer />
            </Router>
        </>
    )
}

export default App
