/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { message } from 'antd';
import axios from 'axios';

const Auth = () => {

    const navigate = useNavigate();

    const [authState, setAuthState] = useState("Login")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [address, setAddress] = useState("")


    const clearAllFields = () => {
        setFirstName("")
        setLastName("")
        setEmail("")
        setPassword("")
        setConfirmPassword("")
        setAddress("")
    }

    const handleSubmit = () => {
        if (authState === "Register") {
            if (password !== confirmPassword) {
                message.error("Passwords do not match");
                return;
            }
            else {
                handleRegister();
            }
        }
        else {
            handleLogin();
        }

    }

    const handleLogin = () => {

        var data = JSON.stringify({
            "email": email,
            "password": password
        });

        var config = {
            method: 'post',
            url: 'http://localhost:5000/api/users/login',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                sessionStorage.setItem("token", response.data.token);
                sessionStorage.setItem("email", email);
                sessionStorage.setItem("isAdmin", false);
                message.success("Login Successful");
                navigate("home", { state: { isAdmin: false } })
            })
            .catch(function (error) {
                let e = error.response.data.errors;
                e.forEach(function (error) {
                    message.error(error.msg)
                });
            });


    }

    const handleRegister = () => {

        var data = JSON.stringify({
            "name": firstName + " " + lastName,
            "email": email,
            "password": password,
            "account": address
        });

        var config = {
            method: 'post',
            url: 'http://localhost:5000/api/users/register',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                sessionStorage.setItem("token", response.data.token);
                sessionStorage.setItem("email", email);
                sessionStorage.setItem("isAdmin", false);
                message.success("Registration Successful");
                navigate("home", { state: { isAdmin: false } })
            })
            .catch(function (error) {
                let e = error.response.data.errors;
                e.forEach(function (error) {
                    message.error(error.msg)
                });
            });
    }

    return (
        <>
            <Helmet>
                <title>{authState}</title>
            </Helmet>


            <div className="flex items-center h-screen w-full">
                <div className="w-full bg-green-50 rounded shadow-lg p-8 m-4 md:max-w-xl md:mx-auto">
                    <h1 className="w-full text-center text-gray-800 uppercase mb-20 text-2xl  font-semibold">{authState === "Register" ? "Sign Up" : "Sign In"}</h1>
                    <div className="mb-4 md:flex md:flex-wrap md:justify-between">
                        {authState === "Register" && <><div className="flex flex-col mb-4 md:w-1/2">
                            <label className="mb-2 uppercase tracking-wide font-bold text-lg text-gray-700">First Name</label>
                            <input className="border py-2 px-3 text-gray-700 md:mr-2 focus:outline-none" type="text" value={firstName} onChange={(e) => { setFirstName(e.target.value) }} />
                        </div>
                            <div className="flex flex-col mb-4 md:w-1/2">
                                <label className="mb-2 uppercase font-bold text-lg text-gray-700 md:ml-2">Last Name</label>
                                <input className="border py-2 px-3 text-gray-700 md:ml-2 focus:outline-none" type="text" value={lastName} onChange={(e) => { setLastName(e.target.value) }} />
                            </div>
                            <div className="flex flex-col mb-4 md:w-full">
                                <label className="mb-2 uppercase font-bold text-lg text-gray-700 md:ml-2">MetaMask Account Address</label>
                                <input className="border py-2 px-3 text-gray-700 md:ml-2 focus:outline-none" type="text" value={address} onChange={(e) => { setAddress(e.target.value) }} />
                            </div>
                        </>}
                        <div className="flex flex-col mb-4 md:w-full">
                            <label className="mb-2 uppercase font-bold text-lg text-gray-700">Email</label>
                            <input className="border py-2 px-3 text-gray-700 focus:outline-none" type="email" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                        </div>
                        <div className={`flex flex-col ${authState === "Register" ? "mb-4" : "mb-20"} md:w-full`}>
                            <label className="mb-2 uppercase font-bold text-lg text-gray-700">Password</label>
                            <input className="border py-2 px-3 text-gray-700 focus:outline-none" type="password" value={password} onChange={(e) => { setPassword(e.target.value) }} />
                        </div>
                        {authState === "Register" && <div className="flex flex-col mb-20 md:w-full">
                            <label className="mb-2 uppercase font-bold text-lg text-gray-700">Confirm Password</label>
                            <input className="border py-2 px-3 text-gray-700 focus:outline-none" type="password" value={confirmPassword} onChange={(e) => { setConfirmPassword(e.target.value) }} />
                        </div>}
                        <button onClick={handleSubmit} className="block bg-green-300 hover:bg-green-600 text-white uppercase text-lg font-semibold mx-auto p-4 rounded">{authState === "Register" ? "Create Account" : "Login"}</button>
                    </div>
                    <p className="block w-full cursor-pointer text-center text-lg text-gray-600 hover:text-gray-400" onClick={() => { authState === "Register" ? setAuthState("Login") : setAuthState("Register"); clearAllFields() }} >{authState === "Register" ? "Already Have An Account?" : "No Account?"}</p>
                </div>
            </div>
        </>
    )
}

export default Auth