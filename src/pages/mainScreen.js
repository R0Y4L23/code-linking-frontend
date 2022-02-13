/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import io from 'socket.io-client';
import axios from 'axios';
import { message } from 'antd';
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import { Helmet } from "react-helmet";
import Factory from '../eth/Factory';
import Web3 from 'web3';



const MainScreen = (props) => {

    const { state } = useLocation();
    const { id } = state;

    const [details, setDetails] = React.useState({});

    const navigate = useNavigate();



    const [bid, setBid] = React.useState(0);
    const [currentBid, setCurrentBid] = React.useState(0);
    const [bidder, setBidder] = React.useState('');
    const [userId, setUserId] = React.useState('');
    const [highestBidderName, setHighestBidderName] = useState('');
    const [userName, setUserName] = React.useState('');
    const [hasAuctionStarted, setHasAuctionStarted] = useState(false);

    const [hasAuctionEnded, setHasAuctionEnded] = useState(false);

    const [seconds, setSecond] = useState(30);

    const [addressOfEth, setAddressOfEth] = useState("")



    const socketRef = useRef();


    useEffect(() => {
        socketRef.current = io('https://codelinking.herokuapp.com');
        socketRef.current.emit('bid', id, '30');

        socketRef.current.on('receive-changes', (bid, user, name, sec) => {
            ZYZ(Number(sec))
            setHasAuctionStarted(true);
            setCurrentBid(bid);
            setBidder(user);
            setHighestBidderName(name);

        })

        console.log(socketRef.current);
        return () => {
            socketRef.current.disconnect();
        };
    }, []);


    const getDeatils = () => {
        const token = sessionStorage.getItem('token')
        var config = {
            method: 'get',
            url: 'https://codelinking.herokuapp.com/api/users/nominate/' + id,
            headers: {
                'x-auth-token': token
            }
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                setDetails(response.data);
                setCurrentBid(response.data.currBid);
                if (response.data.currBid > 0) {
                    setHasAuctionEnded(true);
                }

                if (response.data._id !== response.data.userBought)
                    getHigestBidderDetails(response.data.userBought);

                setBidder(response.data.userBought);
            })
            .catch(function (error) {
                console.log(error);
            });
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


                setUserId(response.data._id);
                setUserName(response.data.name);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const getHigestBidderDetails = (uid) => {
        var config = {
            method: 'get',
            url: 'https://codelinking.herokuapp.com/api/users/' + uid,
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                setHighestBidderName(response.data.name);
            })
            .catch(function (error) {
                console.log(error);
            });
    }


    useEffect(() => {
        getUserDetails();
        getDeatils()
    }, [])


    const handleSubmit = () => {


        setHasAuctionStarted(true);

        console.log("Bid submitted");
        socketRef.current.emit('bid-submit', bid, userId, userName);

        let c = currentBid;
        socketRef.current.emit('win', c, userId);

        setCurrentBid(bid);
        setBidder(userId);
        setBid(0);
        message.success('Bid submitted');


    }
    useEffect(() => {
        // const ethereum = window.ethereum
        // if (ethereum) {
        //     ethereum.on("accountsChanged", (accounts) => {
        //         console.log(accounts[0])
        //         setAddressOfEth(accounts[0])
        //     })
        // }

        const web3 = new Web3(window.ethereum)
        window.ethereum.enable().then((a) => {
            console.log(a, "########")
            setAddressOfEth(a[0])

        }).catch(error => {
            // User denied account access
            console.log(error)
        })
    }, [])

    const Buy = async () => {
        try {
            // const accounts = web3.eth.getAccounts()
            await Factory.methods.buy(details.name, details.image, currentBid, details.account, userId, details.user).send({
                from: addressOfEth,
                value: Number(currentBid)
            });

            const accountsId = await Factory.methods.get().call();

            const token = sessionStorage.getItem('token')

            var data = JSON.stringify({
                "contractAddress": accountsId,
            });

            var config = {
                method: 'put',
                url: 'https://codelinking.herokuapp.com/api/users/buy/' + details._id,
                headers: {
                    'x-auth-token': token,
                    'Content-Type': 'application/json'
                },
                data: data
            };

            axios(config)
                .then(function (response) {
                    console.log(JSON.stringify(response.data));
                    message.success('Bought successfully');
                    navigate("/home", { state: { isAdmin: false } })
                })
                .catch(function (error) {
                    console.log(error);
                    message.error('Error');
                });


        } catch (error) {
            console.log(error);
            message.error('Error in buying');
        }
    }

    const ZYZ = ({ sec }) => {
        return (
            <CountdownCircleTimer
                isPlaying={hasAuctionStarted}
                duration={sec}
                colors={['#004777', '#F7B801', '#A30000', '#A30000']}
                colorsTime={[7, 5, 2, 0]}
                size={100}
                onUpdate={(state) => {
                    console.log(state);
                    setSecond(state.timeLeft);
                }}
                onComplete={() => {
                    setHasAuctionEnded(true);
                    if (bidder === userId) {
                        message.success("You have won the auction");
                        let c = currentBid;
                        socketRef.current.emit('win', c, userId);
                    }
                    else {
                        message.error("You have lost the auction");
                    }
                }}
            >
                {({ remainingTime }) => remainingTime}
            </CountdownCircleTimer>
        )
    }




    return (
        <>
            <Helmet>
                <title>Bid HERE</title>
            </Helmet>
            <div className='min-h-screen w-full'>
                <div className='text-center uppercase pt-10 font-mono text-5xl bg-green-50 pb-8 text-green-800 flex justify-around items-center'>
                    <p>Bid Here </p>
                    {!hasAuctionEnded && <ZYZ sec={30} />}
                </div>
                <section class="body-font overflow-hidden">
                    <div class="container shadow-xl bg-green-50 mt-10 rounded-lg px-5 py-24 mx-auto">
                        <div class="lg:w-4/5 mx-auto flex flex-wrap">
                            <img alt="ecommerce" class="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" src={details.image} />
                            <div class="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                                <h2 class="text-sm title-font text-green-500 tracking-widest">ITEM NAME</h2>
                                <h1 class="text-green-900 text-3xl title-font font-medium mb-1">{details.name}</h1>
                                <p class="leading-relaxed">{details.description}</p>
                                <div class="flex my-3">
                                    <span class="title-font font-medium text-lg text-green-600">Minimum Bid : {details.minBid} Wei</span>
                                </div>
                                <div class="flex my-5">
                                    <span class="title-font font-medium text-2xl text-green-900">Current Bid : {currentBid} Wei</span>
                                </div>
                                <div class="flex my-5">
                                    <span class="title-font font-medium text-3xl text-green-900">Higest Bidder : {bidder ? bidder === userId ? "You have higest Bid" : highestBidderName || "No Bidder" : "No one has Bid Yet"}</span>
                                </div>
                                {!hasAuctionEnded && <div className='flex justify-between items-center mt-10'>
                                    <input value={bid} className="p-3 shadow-xl my-3 h-10 bg-green-50 focus:outline-none border-2 focus:border-green-500" onChange={(e) => { if (!isNaN(e.target.value)) setBid(e.target.value); }} placeholder="Bid Amount..." />
                                    <button
                                        onClick={() => {
                                            if (bidder === userId) {
                                                message.error("You have already bidded");
                                            }
                                            else {
                                                console.log(bid, currentBid);
                                                let b = Number(bid);
                                                let c = Number(currentBid);
                                                if (b <= c) {
                                                    message.error("Bid is less than current bid");
                                                }
                                                else {
                                                    handleSubmit();
                                                }
                                            }
                                        }}
                                        class="flex ml-auto text-green-100 bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded">Bid</button>
                                </div>}
                                {hasAuctionEnded && userId === bidder && <div className='flex justify-between items-center mt-10'>
                                    <span className="text-green-900 font-medium">You have won the auction</span>
                                    <button class="flex ml-auto text-green-100 bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded" onClick={Buy}>Buy Now</button>
                                </div>}
                                {hasAuctionEnded && userId !== bidder && <div className='flex justify-between items-center mt-10'>
                                    <span className="text-green-900 font-medium">You have lost the auction</span>
                                </div>}
                            </div>
                        </div>
                    </div>
                </section>
            </div>

        </>

    )
}

export default MainScreen