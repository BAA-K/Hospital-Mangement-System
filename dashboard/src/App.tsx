import React, { useEffect, useState } from "react"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import NavLinks from "./layout/NavLinks"
import Loading from "./components/Loading"
import Home from "./pages/Home"
import Layout from "./layout/Layout"
import { useAppContext } from "./context/AppCotext"
import Login from "./pages/Login"
import DoctorsView from "./pages/Doctors"
import AddAdmin from "./pages/AddAdmin"
import AddDoctor from "./pages/AddDoctor"
import Messages from "./pages/ViewMessages"

function App(): React.JSX.Element {
    const [isLoading, setIsLoading] = useState<boolean>(true)

    const { isLoggedIn } = useAppContext()

    const loadingHandle = () => {
        setTimeout(() => {
            setIsLoading(false)
        }, 2500)
    }

    useEffect(() => {
        window.addEventListener("load", loadingHandle)
    }, [])

    if (isLoading) {
        return (
            <Loading />
        )
    }

    const style = isLoggedIn ? "bg-primary min-vh-100 d-flex position-relative" : "min-vh-100 d-flex position-relative";

    return (
        <div className={style}>
            <Router>
                {isLoggedIn &&
                    <NavLinks />
                }
                <Routes>
                    {isLoggedIn ? (
                        <>
                            <Route path="/" element={
                                <Layout>
                                    <Home />
                                </Layout>} />
                            <Route path="/doctors" element={
                                <Layout>
                                    <DoctorsView />
                                </Layout>} />
                            <Route path="/admin/add" element={
                                <Layout>
                                    <AddAdmin />
                                </Layout>} />
                            <Route path="/doctor/add" element={
                                <Layout>
                                    <AddDoctor />
                                </Layout>} />
                            <Route path="/messages" element={
                                <Layout>
                                    <Messages />
                                </Layout>} />
                            <Route path="*" element={<Navigate to="/" />} />
                        </>
                    ) : (
                        <>
                            <Route path="/" element={
                                <Login />
                            }
                            />
                            <Route path="*" element={<Navigate to="/" />} />
                        </>
                    )}
                </Routes>
            </Router>
        </div>
    )
}

export default App
