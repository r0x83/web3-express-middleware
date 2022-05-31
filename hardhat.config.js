/**
 * @type import('hardhat/config').HardhatUserConfig
 * 
 */
 require('@nomiclabs/hardhat-ethers');
//  require("@nomiclabs/hardhat-etherscan");

 const { key, url,etherscanApiKey } = require('./secrets.json');


module.exports = {
  solidity: "0.8.4",
  networks: {
           mainnet: {
           url: url,
           accounts: [key],
        }
      }
};