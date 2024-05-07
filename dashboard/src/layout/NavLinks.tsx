import React, { useState } from "react";
import { IoMdHome, IoMdSettings } from "react-icons/io";
import { FaSignOutAlt, FaUserPlus } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";
import { BsShieldFillPlus } from "react-icons/bs";
import { AiFillMessage } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import { logout } from "../api-client";
import { useAppContext } from "../context/AppCotext";

const NavLinks = (): React.JSX.Element => {
    const [toggleMenu, setToggleMenu] = useState<boolean>(false)

    const { showToast } = useAppContext()
    const queryClient = useQueryClient()

    const mutation = useMutation(logout, {
        onSuccess: async (res) => {
            showToast({ message: res.message, type: "SUCCESS" })
            await queryClient.invalidateQueries("validateToken")
        },
        onError: (err: Error) => {
            showToast({ message: err.message, type: "ERROR" })
        }
    })

    const handleGetOut = () => {
        mutation.mutate()
    }

    const sidebarStyle = toggleMenu ? "sidebar active" : "sidebar";

    return (
        <ul className={sidebarStyle}>
            <button className="setting-toggle" onClick={() => setToggleMenu(!toggleMenu)}>
                <IoMdSettings />
            </button>
            <li>
                <Link to={"/"}>
                    <IoMdHome />
                    <p>Home</p>
                </Link>
            </li>
            <li>
                <Link to={"/doctors"}>
                    <FaUserDoctor />
                    <p>Doctors</p>
                </Link>
            </li>
            <li>
                <Link to={"/admin/add"}>
                    <BsShieldFillPlus />
                    <p>Add Admin</p>
                </Link>
            </li>
            <li>
                <Link to={"/doctor/add"}>
                    <FaUserPlus />
                    <p>Add Doctor</p>
                </Link>
            </li>
            <li>
                <Link to={"/messages"}>
                    <AiFillMessage />
                    <p>Messages</p>
                </Link>
            </li>
            <li>
                <div className="my-btn" onClick={handleGetOut}>
                    <FaSignOutAlt />
                    <p>Logout</p>
                </div>
            </li>
        </ul>
    )
}

export default NavLinks;