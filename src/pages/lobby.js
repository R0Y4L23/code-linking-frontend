import React from 'react'
import { Helmet } from 'react-helmet';


const Lobby = () => {
    return (
        <>
            <Helmet>
                <title>Lobby</title>
            </Helmet>

            <div class="flex justify-center items-center bg-gray-500 min-h-screen">
                <div class="card h-[470px] w-[330px] overflow-hidden md:w-[780px] lg:w-[900px] bg-white rounded-lg">
                    <div class="form flex h-full w-full">
                        <div class="left-side w-2/5 h-full bg-blue-700">
                            <p class="text-center mt-5 text-2xl font-semibold text-white">Profile</p>
                            <div class="flex justify-center items-center mt-6"> <span class="h-32 w-32 overflow-hidden rounded-full "><img class="object-cover" alt='' src="https://imgur.com/tkcorXW.jpg" /></span> </div>
                            <div class="mt-5 relative px-3"> <input placeholder="Daria Nikitina" type="text" class="h-16 w-full px-2 outline-none rounded-lg border-0" /> <span class="absolute left-5 text-gray-500 top-0 font-semibold">Your Name</span> </div>
                            <div class="mt-5 relative px-3"> <select class="h-16 cursor-pointer font-semibold w-full px-2 outline-none rounded-lg border-0">
                                <option class="bg-white hidden">Available</option>
                                <option>Not Available</option>
                                <option>Busy</option>
                                <option>Calls Only</option>
                            </select> <span class="absolute left-5 text-gray-500 top-0 font-semibold">Status</span> </div>
                            <div class="mt-10 h-16 px-3 bg-blue-300 flex justify-center items-center text-xl gap-16"> <i class="hover:text-yellow-500 cursor-pointer fa fa-comment-o"></i> <i class="hover:text-yellow-500 cursor-pointer fa fa-user-o"></i> <i class="hover:text-yellow-500 cursor-pointer fa fa-cog"></i> </div>
                        </div>
                        <div class="right_side w-3/5 h-full bg-gray-200">
                            <div class="h-20 bg-white flex items-center gap-4 "> <span class=" ml-3 h-12 w-12 flex overflow-hidden rounded-full "><img class="object-cover" alt='' src="https://imgur.com/tkcorXW.jpg" height="100%" width="100%" /></span>
                                <p class="text-center text-2xl font-semibold">Daria Nikitina</p>
                            </div>
                            <div class="mt-4 px-3 flex items-center gap-3"> <span class="h-10 justify-center items-center text-sm rounded-tr-xl	rounded-tl-xl rounded-br-xl	w-52 flex bg-white">Hi, Mary how do you feel?</span>
                                <p class="text-sm font-semibold text-gray-800">10:00</p>
                            </div>
                            <div class="mt-4 px-3 flex justify-end items-center gap-3"> <span class="px-2 h-10 justify-center items-center text-sm rounded-tr-xl	rounded-tl-xl rounded-bl-xl w-96 flex bg-blue-600 text-white">Hi, Daniel i am OK but a bit bored! What about you?</span>
                                <p class="text-sm font-semibold text-gray-800">10:02</p>
                            </div>
                            <div class="mt-4 px-4 flex items-center gap-3"> <span class="px-2 h-10 justify-center items-center text-sm rounded-tr-xl	rounded-tl-xl rounded-br-xl	w-80 flex bg-white">I am trying to deal with my job in isolation.</span>
                                <p class="text-sm font-semibold text-gray-800">10:03</p>
                            </div>
                            <div class="mt-4 px-4 flex items-center gap-3"> <span class="px-2 h-10 justify-center items-center text-sm rounded-tr-xl	rounded-tl-xl rounded-br-xl	w-90 flex bg-white">You know I have got an interesting news for you.</span>
                                <p class="text-sm font-semibold text-gray-800">10:03</p>
                            </div>
                            <div class="mt-4 px-3 flex justify-end items-center gap-3"> <span class="px-2 h-10 justify-center items-center text-sm rounded-tr-xl	rounded-tl-xl rounded-bl-xl w-24 flex bg-blue-600 text-white">Hmmm</span>
                                <p class="text-sm font-semibold text-gray-800">10:04</p>
                            </div>
                            <div class="mt-[52px] h-16 px-3 bg-white flex justify-center items-center gap-3 text-xl"> <i class="fa fa-smile-o"></i> <input placeholder="Can't imagine what!" type="text" class="h-10 -mt-1 w-full text-sm px-2 outline-none rounded-lg border" /> <i class="fa fa-arrow-circle-o-up"></i> </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Lobby