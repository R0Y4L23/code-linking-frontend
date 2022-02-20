
# Hack-A-Web Problem Statement - 3

Auctioning is one of the most prominent activities in this world, but due to more virtual events, not all auctions
can occur offline; hence, there is a need to make auctions available virtually, which will be more user-friendly and easier
to use. 

# Solution 

- All user can NOMINATE Items for Auction
- Admin Manager will approve by providing specified date
- Admin Manager will start the auction for the day.
- Buyers can participate in the started auctions
- The Bidding Mechanism is in RealTime. 
 * Updating of Bidding Amount at low latency
 * as, any bid is placed the TIMMER reset's
 * at the end to TIMMER the higgest BIDDER wins the Auction

# Secure System

- All the Images of the Auction is stored in IPFS-network
- All the payment transactions are done in ETHEREUM BLOCKCHAIN
- Once the item is sold the record get's written in the BlockChain 
 * providing an unalterable selling records.
 * and safe payment methods by Smart Contract to remove Frauds. 
    
# Admin Functionalities

- Admin can approve and activate the product for Auction
- Admin can monitor the products

## Tech Stack

**Client:** React, TailwindCSS, Socket.io Client

**Server:** Node.Js, Express.Js, Socket.io, MongoDB

**BlockChain** Solidity, Ethereum, IPFS-network

# Site
https://ecstatic-curran-043ca0.netlify.app/

# Video Demo

https://user-images.githubusercontent.com/81407181/154105714-0dda3c22-bf7d-4a22-8a1a-c4362dcee30c.mp4


## Demo

- Install packages - npm install.

**Client**

- cd client
- Start : npm run Start 


- Route : '/' - normal user
- '/admin' - admin

**Backend**

- Start : npm run Start
- Dev Mode : npm run server

**Ethereum**

- cd ethereum
- npm install
- node compile.js
- node deploy.js
- provide the deployed address in Factory.js address


# Authors

- [@Nirmalya-Saha96](https://github.com/Nirmalya-Saha96)
        * Developed the Ethereum Smart Contract and the Backned
- [@R0Y4L23](https://github.com/R0Y4L23)
        * Developed the Frontend
- [@bhaumikankan](https://github.com/bhaumikankan)
        * Developed the Ethereum Smart Contract and the Backned

