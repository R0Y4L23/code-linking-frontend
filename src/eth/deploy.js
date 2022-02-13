const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const compiledcreatecamp=require("./build/Factory.json");

const mnemonicPhrase = "drift virus toss perfect wheel stove tiger sustain barrel school cake object"; // 12 word mnemonic
let provider = new HDWalletProvider(mnemonicPhrase,"https://rinkeby.infura.io/v3/c418d4eba8b84ff092648af21a3e7e6f");

const web3= new Web3(provider);

let address;

const deploy=async()=>{
    //get all address;
    address=await web3.eth.getAccounts();
    //instance of deployble contract;
    const campaignInstance=new web3.eth.Contract(compiledcreatecamp.abi);
    //deploy contract to rinckby net work
    const campaign=await campaignInstance.deploy({data:compiledcreatecamp.evm.bytecode.object}).send({
        from: address[0],
        gass:'1000000'
    });
    
    
    console.log(campaign.options.address)
    //0xfD9a190b6220BA74e85fd0514d37b64EE22f9980
}

deploy();