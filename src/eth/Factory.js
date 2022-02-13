import web3 from "./web3";
import createCamp from "./build/Factory.json"

const address='0x6236042ee595e0f410FfC8A4264F31A055A56116'
const abi=createCamp.abi;

export default new web3.eth.Contract(abi,address)
