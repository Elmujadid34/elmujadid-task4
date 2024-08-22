const hre = require("hardhat");
  const { sendSignedShieldedQuery } = require("./utils");
  const ethers = require("ethers");
  
  const PK = "go-find-it";
  const deployedContractAddress = "0xA49e2928daaa19e2aDa427BaB3F6A1AbDad214B2";
  
  async function main() {
    const PERC20 = await hre.ethers.getContractFactory("PERC20Sample");
    const perc20 = PERC20.attach(deployedContractAddress);
  
    const provider = new hre.ethers.providers.JsonRpcProvider(hre.network.config.url);
    const wallet = new hre.ethers.Wallet(PK, provider);
    // let addy2 = "0x16af037878a6cAce2Ea29d39A3757aC2F6F7aac1";
    // addy2 = ethers.utils.getAddress(addy2);
  
    let encodedFunctionData = perc20.interface.encodeFunctionData("balanceOf", [wallet.address]);
    let req = await sendSignedShieldedQuery( wallet, perc20.address, encodedFunctionData);
  
    let balance = perc20.interface.decodeFunctionResult("balanceOf", req)[0];
    console.log('Balance: ', balance.toString());
  
  }
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
