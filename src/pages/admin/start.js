/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { message } from 'antd'
import axios from 'axios'
import Products from '../../components/Products'

const Start = () => {

    const [products, setProducts] = useState([])

    const getProducts = () => {

        const token = sessionStorage.getItem('token')
        var config = {
            method: 'get',
            url: 'http://localhost:5000/api/admin/start',
            headers: {
                'x-auth-token-admin': token
            }
        };
        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                setProducts(response.data)
            })
            .catch(function (error) {
                let e = error.response.data.errors;
                e.forEach(function (error) {
                    message.error(error.msg)
                });
            });
    }


    useEffect(() => {
        getProducts()
    }, [])



    return (
        <>
            <Helmet>
                <title>Start Products</title>
            </Helmet>

            <div className='min-h-screen w-full'>
                <p className='text-center uppercase pt-20 font-mono text-5xl bg-green-50 pb-8 text-green-800'>Products Awaiting Start</p>
                <div className="flex flex-wrap w-4/5 mx-auto">
                    {products.length > 0 && products.map((product, index) => (
                        <Products key={index} dataOfProduct={product} name={product.name} dateOfActive={product.startDate} image={product.image} getProducts={getProducts} isStarted={product.isStarted} isAdmin={true} id={product._id} description={product.description} price={product.minBid} isApproved={product.isApproved} isSold={product.isSold} />
                    ))}
                    {products.length === 0 && (
                        <div className='w-full h-full flex justify-center items-center'>
                            <p className='text-center text-2xl font-mono text-green-800'>No Products</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default Start