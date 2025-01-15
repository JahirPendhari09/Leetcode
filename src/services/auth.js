import axios from "axios"

const base_url = 'https://leetcode-backend-j7gg.onrender.com'
// const base_url = 'http://localhost:4600'

export const registerNewUser = (userDetails) => {
    return (
        axios.post(`${base_url}/auth/register`, userDetails)
        .then(res => res)
        .catch(err => err)
    )
}

export const loginUser = (userDetails) => {
    return (
        axios.post(`${base_url}/auth/login`, userDetails)
        .then(res => res)
        .catch(err => err)
    )
}

export const sendOtpOnEmail = (userDetails) => {
    return (
        axios.post(`${base_url}/auth/send-otp`, userDetails)
        .then(res => res)
        .catch(err => err)
    )
}

export const verifyOtpOnEmail = (userDetails) => {
    return (
        axios.post(`${base_url}/auth/verify-otp`, userDetails)
        .then(res => res)
        .catch(err => err)
    )
}