import React, { useState, useEffect } from 'react'
import Products from '../components/Products';
import { Helmet } from "react-helmet";
import axios from 'axios';
import { message } from 'antd';

const Active = () => {


    const [products, setProducts] = useState([])


    const getAuctionProducts = () => {

        const token = sessionStorage.getItem('token')
        var config = {
            method: 'get',
            url: 'https://codelinking.herokuapp.com/api/users/nominate',
            headers: {
                'x-auth-token': token
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
        getAuctionProducts()
    }, [])

    return (
        <>
            <Helmet>
                <title>Auction Lobby</title>
            </Helmet>

            <div className='min-h-screen w-full'>
                <p className='text-center uppercase pt-20 font-mono text-5xl bg-green-50 pb-8 text-green-800'>Auction Lobby</p>
                <div className="flex flex-wrap w-4/5 mx-auto">
                    {products.length > 0 && products.map((product, index) => (
                        <Products getProducts={() => { }} dataOfProduct={product} dateOfActive={product.startDate} key={index} name={product.name} id={product._id} isAdmin={false} image={product.image} product description={product.description} price={product.minBid} isStarted={product.isStarted} isApproved={product.isApproved} isSold={product.isSold} />
                    ))}
                    {products.length === 0 && (
                        <div className='w-full h-full flex justify-center items-center'>
                            <p className='text-center text-2xl font-mono text-green-800'>No Products Applied For Nomination</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default Active