/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { Helmet } from "react-helmet";
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { create } from "ipfs-http-client";

const client = create("https://ipfs.infura.io:5001/api/v0");

const Seller = () => {

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [seller, setSeller] = useState("")
    const [address, setAddress] = useState("")

    const [image, setImage] = useState("");
    const [file, setFile] = useState(null);

    const navigate = useNavigate();

    const captureFile = (e) => {
        console.log("File");
        const data = e.target.files[0];
        const reader = new window.FileReader();
        reader.readAsArrayBuffer(data);

        reader.onloadend = () => {
            setFile(Buffer(reader.result));
            console.log(Buffer(reader.result))

        };

    }


    const nominate = async () => {

        const token = sessionStorage.getItem("token");

        let url;

        try {
            const created = await client.add(file);
            url = `https://ipfs.infura.io/ipfs/${created.path}`;
            setImage(url)
        } catch (error) {
            console.log(error.message);
        }


        var data = JSON.stringify({
            "seller": seller,
            "account": address,
            "name": name,
            "description": description,
            "image": url,
            "minBid": price
        });

        var config = {
            method: 'post',
            url: 'http://localhost:5000/api/users/nominate',
            headers: {
                'x-auth-token': token,
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                message.success("Nomination Successful");
                navigate("/home", { state: { isAdmin: false } });

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
                <title>Seller</title>
            </Helmet>
            <div className='min-h-screen w-full'>
                <p className='text-center uppercase pt-20 font-mono text-5xl bg-green-50 pb-8 text-green-800'>Sell Your Items</p>
                <div className='flex justify-between w-4/5 mx-auto pt-24'>
                    <div className='flex flex-col w-1/2 mx-auto'>
                        <input value={name} onChange={(e) => { setName(e.target.value) }} placeholder='Item Name...' className='p-3 shadow-xl my-3 h-10 bg-green-50 focus:outline-none border-2 focus:border-green-500' />
                        <textarea value={description} onChange={(e) => { setDescription(e.target.value) }} placeholder='Item Description' className='p-3 shadow-xl my-3 h-60 bg-green-50 focus:outline-none border-2 focus:border-green-500'></textarea>
                        <input value={price} onChange={(e) => { if (!isNaN(e.target.value)) setPrice(e.target.value) }} placeholder='Minimum Bidding Amount...' className='p-3 shadow-xl my-3 h-10 bg-green-50 focus:outline-none border-2 focus:border-green-500' />
                        <input value={seller} onChange={(e) => { setSeller(e.target.value) }} placeholder='Seller...' className='p-3 shadow-xl my-3 h-10 bg-green-50 focus:outline-none border-2 focus:border-green-500' />
                        <input value={address} onChange={(e) => { setAddress(e.target.value) }} placeholder='Address...' className='p-3 shadow-xl my-3 h-10 bg-green-50 focus:outline-none border-2 focus:border-green-500' />
                        <div className="flex justify-center pb-5">
                            <input type="file" title='Select Image' className="w-full px-4 py-2 text-green-500 bg-green-200 rounded shadow-xl" onChange={captureFile} />
                        </div>
                        <button onClick={nominate} className="px-4 py-2 text-green-500 uppercase text-lg bg-green-200 rounded shadow-xl w-1/3">Apply For Nomination</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Seller