import { MessageType } from "./components/MessageForm";
import { AppointmentType } from "./components/AppointmentForm";
import { patientData } from "./pages/Register";
import { loginData } from "./pages/Login";

const MAIN_APP_API = "http://localhost:4000";

export const validateToken = async () => {
    const response = await fetch(`${MAIN_APP_API}/api/v1/user/validate-token-patient`, {
        method: "GET",
        credentials: "include",
    });

    if (!response.ok) throw new Error("Token Invalid");

    return response.json();
};

export const sendMessage = async (formData: MessageType) => {
    const response = await fetch(`${MAIN_APP_API}/api/v1/message/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
    });

    const responseBody = await response.json();

    if (!response.ok) throw new Error(responseBody.message);

    return responseBody;
};

export const getAppointment = async (formData: AppointmentType) => {
    const response = await fetch(`${MAIN_APP_API}/api/v1/appointment/post`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
    });

    const responseBody = await response.json();

    if (!response.ok) throw new Error(responseBody.message);

    return responseBody;
};

export const fetchDoctors = async () => {
    const response = await fetch(`${MAIN_APP_API}/api/v1/user/doctors`, {
        method: "GET",
    });

    const responseBody = await response.json();

    if (!response.ok) throw new Error(responseBody.message);

    return responseBody;
};

export const registerPatient = async (formData: patientData) => {
    const response = await fetch(
        `${MAIN_APP_API}/api/v1/user/patient/register`,
        {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        }
    );

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

export const logoutPatient = async () => {
    const response = await fetch(`${MAIN_APP_API}/api/v1/user/patient/logout`, {
        method: "GET",
        credentials: "include",
    });

    const responseBody = await response.json();

    if (!response.ok) throw new Error(responseBody.message);

    return responseBody;
};
