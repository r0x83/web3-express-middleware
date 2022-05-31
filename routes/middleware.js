const Web3 = require('web3')
const md5 = require('md5');
const { create } = require('ipfs-http-client');
const { is } = require('express/lib/request');
var web3 = new Web3();

var private_key;
var ipfs;

function accessLog(req, res, next) {
  const { hostname, method, path, ip, protocol } = req;
  console.log(`ACCESS: ${method} ${protocol}://${hostname}${path} - ${ip}`);
  next();
}


function web3api(options){
    return async (req, res, next) => {
        const md5 = generateMD5Hash(res);
        const sign = signMD5Hash(md5);
        res.setHeader('MD5Hash', md5);
        res.setHeader('Web3Signature', sign); 

        if(!(options?.isPrivate)){
            const cid = await uploadToIPFS(md5)
            res.setHeader('IPFS-CID', cid);
        }
        next()
    }
}

function configureWeb3(privateKey, ipfsGateway){
    private_key = privateKey;
    ipfs = create(ipfsGateway);
}


function generateMD5Hash(response){
    return md5(response);
}

function signMD5Hash(data){
    var signature;
    if(private_key != null){
        const output = web3.eth.accounts.sign(data, private_key);
        signature = output.signature;
    } else {
        res.status(500).send({status: 'server-error', message: 'express-web3 is not correctly configured'})
    }
    return signature
}

async function uploadToIPFS(data){
    var cid;
    try {
        const id  = ipfs.id()
        const output = await ipfs.add(data); 
        cid = output.cid;
    } catch (err) {
        console.error('Upload to IPFS failed', err);
    }
    return cid
}

module.exports = { accessLog, errorLog, web3api, configureWeb3 };