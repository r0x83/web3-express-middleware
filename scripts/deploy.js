// scripts/deploy.js
async function main () {
    // We get the contract to deploy
    const Web3 = await ethers.getContractFactory('web3Api');
    console.log('Deploying Contract...');
    const web3 = await Web3.deploy();
    await web3.deployed();
    console.log('Contract deployed to:', web3.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error);
      process.exit(1);
    });

    