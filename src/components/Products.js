/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { message } from 'antd'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Products = ({ name, price, description, isApproved, isSold, id, image, isAdmin, getProducts, isStarted, dateOfActive, dataOfProduct }) => {

    const [date, setDate] = useState('')

    const location = useLocation()
    const navigate = useNavigate()



    const approve = () => {
        const token = sessionStorage.getItem('token')
        var data = JSON.stringify({
            "startDate": date
        });
        var config = {
            method: 'put',
            url: 'https://codelinking.herokuapp.com/api/admin/nominate/' + id,
            headers: {
                'x-auth-token-admin': token,
                'Content-Type': 'application/json'
            },
            data: data
        };
        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                message.success('Product Approved')
                getProducts()
            })
            .catch(function (error) {
                let e = error.response.data.errors;
                e.forEach(function (error) {
                    message.error(error.msg)
                });
            });
    }

    const start = () => {

        const token = sessionStorage.getItem('token')

        var config = {
            method: 'put',
            url: 'https://codelinking.herokuapp.com/api/admin/start/' + id,
            headers: {
                'x-auth-token-admin': token
            }
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                message.success('Product Started')
                getProducts()
            })
            .catch(function (error) {
                let e = error.response.data.errors;
                e.forEach(function (error) {
                    message.error(error.msg)
                });
            });

    }

    const [buyerName, setBuyerName] = useState('')
    const [buyerEmail, setBuyerEmail] = useState('')

    const getBuyerDetails = () => {

        var config = {
            method: 'get',
            url: 'https://codelinking.herokuapp.com/api/users/' + dataOfProduct.userBought,
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                setBuyerName(response.data.name)
                setBuyerEmail(response.data.email)
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    useEffect(() => {
        getBuyerDetails()
    }, [])



    return (
        <div className="w-full xl:w-1/3 md:w-1/2 p-2 mb-12 flex justify-center">
            <div className='w-4/5'>
                <div className="shadow-lg hover:shadow-xl rounded-lg ">
                    <img className="bg-green-400 w-full h-64 rounded-t-lg p-4 bg-no-repeat bg-center bg-cover" alt='' src={image === "image" ? 'https://picsum.photos/600/300' : image} />
                    <div className="flex justify-between items-start px-2 pt-2">
                        <div className="p-2 flex-grow">
                            <h1 className="font-medium text-xl font-poppins">{name}</h1>
                            <p className="text-green-500 font-nunito">{description}</p>
                        </div>
                        <div className="p-2 text-right">
                            <div className=" font-semibold text-lg font-poppins">{price} Wei</div>
                        </div>
                    </div>
                    {(location.pathname === '/active' && isStarted) && <p className='pl-4 text-green-600'>Active on {dateOfActive}</p>}
                    <div className="flex justify-center items-center px-2 pb-2">
                        <div className="w-1/2 p-2">
                            {(!isAdmin && location.pathname !== '/active' && !isSold) ? (<p className="block text-center w-full bg-white border-2 px-3 py-2 rounded uppercase font-poppins font-medium">
                                {isApproved ? "Approved" : "Applied For Nomination"}
                            </p>) : (<></>)}

                            {location.pathname === '/active' && <p onClick={() => { navigate("/main", { state: { id } }) }} className="block text-center w-full bg-green-300 cursor-pointer hover:bg-green-100 border-2 px-3 py-2 rounded uppercase font-poppins font-medium">View</p>}

                            {(isAdmin && isApproved) ?
                                (<p onClick={() => { if (!isStarted) start() }} className="block text-center w-full bg-green-300 cursor-pointer hover:bg-green-100 border-2 px-3 py-2 rounded uppercase font-poppins font-medium">{isStarted ? "Active" : "Start"}</p>)
                                :
                                (isAdmin && !isApproved) ? (
                                    <div className='flex flex-col justify-center items-center'>
                                        <p className='mt-5 text-green-800 uppercase font-bold font-mono'>Select Start Date</p>
                                        <input type={"date"} value={date} className="bg-green-300 px-3 py-2 rounded mb-3" onChange={(e) => { setDate(e.target.value) }} />
                                        <p className="block text-center w-full bg-green-300 cursor-pointer hover:bg-green-100 border-2 px-3 py-2 rounded uppercase font-poppins font-medium"
                                            onClick={() => {
                                                if (date) {
                                                    approve()
                                                }
                                                else {
                                                    message.error('Please select a date')
                                                }
                                            }}
                                        >
                                            Approve
                                        </p>
                                    </div>
                                ) : (<></>)}
                        </div>
                        {isSold ? (
                            <div className='flex flex-col mx-auto justify-start break-all  items-start -ml-28 text-lg text-green-600 font-mono'>
                                <p>Sold At : {dataOfProduct.currBid} Wei</p>
                                <p>Buyer Name : {buyerName}</p>
                                <p>Buyer Email : {buyerEmail}</p>
                                <p>Buyer's Contract Address : {dataOfProduct.contractAddress}</p>
                            </div>

                        ) : (<></>)}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Products