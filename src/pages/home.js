/* eslint-disable no-unused-vars */
import React from 'react';
import { Helmet } from "react-helmet";
import profile_img from '../assets/profile.png';
import auction_img from '../assets/bid.png';
import sell_img from '../assets/trade.png';
import view_img from '../assets/report.png';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { Dropdown } from 'antd';


const Home = () => {

    const navigate = useNavigate();

    const [user, setUser] = React.useState("");

    const { state } = useLocation();
    const { isAdmin } = state;

    const logout = () => {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('email');
        sessionStorage.removeItem('isAdmin');
        navigate('/');
    }


    const getUserDetails = () => {

        const token = sessionStorage.getItem('token')

        var config = {
            method: 'get',
            url: 'https://codelinking.herokuapp.com/api/users',
            headers: {
                'x-auth-token': token
            }
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                setUser(response.data.name);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    React.useEffect(() => {
        getUserDetails();
    }, []);

    return (
        <>
            <Helmet>
                <title>{isAdmin ? "Admin " : ""}Home</title>
            </Helmet>
            <div className='w-full min-h-screen'>
                <div className='px-20 pt-8 pb-8 mb-28 flex justify-between items-center bg-green-50'>
                    <p className='text-5xl font-bold font-mono text-green-500'>HELLO {isAdmin ? "Admin" : user},</p>
                    <div className='flex items-center'>

                        <Dropdown overlay={
                            <p className='text-xl'>
                                Email : {sessionStorage.getItem('email')}
                            </p>
                        }>
                            <img src={profile_img} alt="" className='ml-10 h-24 cursor-pointer' />
                        </Dropdown>
                        <p className='ml-10 uppercase text-lg font-semibold text-green-200 bg-green-900 px-5 rounded-lg hover:text-green-800 hover:bg-green-100 py-1 cursor-pointer' onClick={logout}>Log Out</p>
                    </div>

                </div>
                <div className=' px-10'>
                    <p className='text-3xl mb-20 text-center text-green-800 capitalize'>
                        These are some things you can do {isAdmin ? "as an Admin" : "with this app"}.
                    </p>
                    <div className="text-gray-600 body-font">
                        <div className="container px-5 py-24 mx-auto">
                            <div className="flex lg:flex-row flex-col justify-center items-center -m-20">
                                {!isAdmin && <>
                                    <div className="lg:w-1/3 lg:mb-0 mb-6 p-4">
                                        <div className="h-full flex flex-col items-center justify-around text-center">
                                            <img alt="testimonial"
                                                className="w-28 h-28 mb-8 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100"
                                                src={sell_img} />
                                            <h2
                                                className="text-gray-900 font-medium title-font tracking-wider text-2xl">
                                                Sell Items</h2>
                                            <p className='uppercase shadow-xl text-lg font-semibold w-1/3 text-green-200 bg-green-900 px-5 rounded-lg hover:text-green-800 hover:bg-green-100 py-3 cursor-pointer'
                                                onClick={() => { navigate("/seller") }}>Sell Items</p>
                                            <span
                                                className="inline-block h-1 w-10 rounded bg-green-500 mt-6 mb-4"></span>
                                            <p className="leading-relaxed text-lg text-green-900">Clicking on the button
                                                will redirect to a screen where you can sell your items.</p>
                                        </div>
                                    </div>
                                    <div className="lg:w-1/3 lg:mb-0 mb-6 p-4">
                                        <div className="h-full flex flex-col items-center justify-between text-center">
                                            <img alt="testimonial"
                                                className="w-28 h-28 mb-8 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100"
                                                src={auction_img} />
                                            <h2
                                                className="text-gray-900 font-medium title-font tracking-wider text-2xl">
                                                Approved and Sold</h2>
                                            <p className='uppercase text-lg w-2/3 shadow-xl font-semibold text-yellow-200 bg-yellow-900 px-5 rounded-lg hover:text-yellow-800 hover:bg-yellow-100 py-3 cursor-pointer'
                                                onClick={() => { navigate("/nominated") }}>View Your Products</p>
                                            <p className='uppercase text-lg w-2/3 shadow-xl font-semibold text-green-200 bg-green-900 px-5 rounded-lg hover:text-green-800 hover:bg-green-100 py-3 cursor-pointer'
                                                onClick={() => { navigate("/Sold") }}>Products Bought</p>
                                            <span
                                                className="inline-block h-1 w-10 rounded bg-green-500 mt-6 mb-4"></span>
                                            <p className="leading-relaxed text-lg text-green-900">Clicking on these button will redirect to those screens where you can View Approved and Sold Products</p>
                                        </div>
                                    </div>
                                    <div className="lg:w-1/3 lg:mb-0 p-4">
                                        <div className="h-full flex flex-col items-center justify-around text-center">
                                            <img alt="testimonial"
                                                className="w-28 h-28 mb-8 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100"
                                                src={view_img} />
                                            <h2
                                                className="text-gray-900 font-medium title-font tracking-wider text-2xl">
                                                Join Auction</h2>
                                            <p className='uppercase text-lg w-3/5 shadow-xl font-semibold text-green-200 bg-green-900 px-5 rounded-lg hover:text-green-800 hover:bg-green-100 py-3 cursor-pointer'
                                                onClick={() => { navigate("/active") }}>View Products</p>
                                            <span
                                                className="inline-block h-1 w-10 rounded bg-green-500 mt-6 mb-4"></span>
                                            <p className="leading-relaxed text-lg text-green-900">Clicking on the button
                                                will redirect to a screen where you can view all the active products for which you can participate in Auction.</p>
                                        </div>
                                    </div>
                                </>}
                                {isAdmin && <div className="lg:w-1/3 lg:mb-0 mb-6 p-4">
                                    <div className="h-full flex flex-col items-center justify-between text-center">
                                        <img alt="testimonial"
                                            className="w-20 h-20 mb-8 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100"
                                            src={auction_img} />
                                        <h2
                                            className="text-gray-900 font-medium title-font tracking-wider text-2xl">
                                            Approve and Activate</h2>
                                        <p onClick={() => { navigate("/products") }} className='uppercase text-lg w-2/3 shadow-xl font-semibold text-yellow-200 bg-yellow-900 px-5 rounded-lg hover:text-yellow-800 hover:bg-yellow-100 py-3 cursor-pointer'>Approve Products</p>
                                        <p className='uppercase text-lg w-2/3 shadow-xl font-semibold text-green-200 bg-green-900 px-5 rounded-lg hover:text-green-800 hover:bg-green-100 py-3 cursor-pointer'
                                            onClick={() => { navigate("/start") }}>Activate Products</p>
                                        <span
                                            className="inline-block h-1 w-10 rounded bg-green-500 mt-6 mb-4"></span>
                                        <p className="leading-relaxed text-lg text-green-900">You can view all the products uploaded by the seller. You can approve those and activate the products for Auction</p>
                                    </div>
                                </div>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home