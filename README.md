
 RESPONSE HEADER WITH SIGNATURE
---------------------------------

Simple fix is to include 2 headers in every REST response of an API.

MD5 hash of the response data
A signature that signs the above hash
If not private response, upload to IPFS and include IPFS hash
MD5 : <md5sum>
Web3Signature : <v,r,s>
IPFS : <ipfs hash>

 A MIDDLEWARE
---------------
Able to use the middleware in express.
web3api.configure(env.privateKey)
app.use(web3api)

// in routes
res.send(data, { private : IS_PRIVATE_RESPONSE })

 A SMART CONTRACT
-------------------
A resolver contract, that takes the IPFS hash and returns the data, md5 and signature
//web3api.sol

resolve(string ipfs_hash) public returns(uint request_id) 

resolve_callback(string request_id, bytes data, string md5, bytes signature) external
