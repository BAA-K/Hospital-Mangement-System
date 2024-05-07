import { Admin } from "./pages/AddAdmin";
import { Status } from "./pages/Home";
import { loginData } from "./pages/Login";

const MAIN_APP_API = "http://localhost:4000";

export const fetchAdmin = async () => {
    const response = await fetch(`${MAIN_APP_API}/api/v1/user/admin/me`, {
        method: "GET",
        credentials: "include",
    });

    const responseBody = await response.json();

    if (!response.ok) throw new Error(responseBody.message);

    return responseBody;
};

export const login = async (formData: loginData) => {
    const response = await fetch(`${MAIN_APP_API}/api/v1/user/login`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
    });

    const responseBody = await response.json();

    if (!response.ok) throw new Error(responseBody.message);

    return responseBody;
};

export const fetchAllDoctors = async () => {
    const response = await fetch(`${MAIN_APP_API}/api/v1/user/doctors`, {
        method: "GET",
        credentials: "include",
    });

    const responseBody = await response.json();

    if (!response.ok) throw new Error(responseBody.message);

    return responseBody;
};

export const fetchAllAppointments = async () => {
    const response = await fetch(`${MAIN_APP_API}/api/v1/appointment/getall`, {
        method: "GET",
        credentials: "include",
    });

    const responseBody = await response.json();

    if (!response.ok) throw new Error(responseBody.message);

    return responseBody;
};

export const updateStatus = async (data: { id: number; status: Status }) => {
    const response = await fetch(
        `${MAIN_APP_API}/api/v1/appointment/update/${data.id}`,
        {
            method: "PUT",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: data.status }),
        }
    );

    const responseBody = await response.json();

    if (!response.ok) throw new Error(responseBody.message);

    return responseBody;
};

export const logout = async () => {
    const response = await fetch(`${MAIN_APP_API}/api/v1/user/admin/logout`, {
        method: "GET",
        credentials: "include",
    });

    const responseBody = await response.json();

    if (!response.ok) throw new Error(responseBody.message);

    return responseBody;
};

export const addNewAdmin = async (formData: Admin) => {
    const response = await fetch(`${MAIN_APP_API}/api/v1/user/admin/addnew`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
    });

    const responseBody = await response.json();

    if (!response.ok) throw new Error(responseBody.message);

    return responseBody;
};

export const addNewDoctor = async (formData: FormData) => {
    const response = await fetch(`${MAIN_APP_API}/api/v1/user/doctor/addnew`, {
        method: "POST",
        credentials: "include",
        // headers: { "Content-Type": "application/json" },
        body: formData,
    });

    const responseBody = await response.json();

    if (!response.ok) throw new Error(responseBody.message);

    return responseBody;
};

export const fetchMessages = async () => {
    const response = await fetch(`${MAIN_APP_API}/api/v1/message/getall`, {
        method: "GET",
        credentials: "include",
    });

    const responseBody = await response.json();

    if (!response.ok) throw new Error(responseBody.message);

    return responseBody;
};
