const express = require ('express')
const app = express()
const Client = require('bitcoin-core');
//const client = new Client({ network: 'regtest' });
// const client_c = new Client({ port: 8332 });
// //127.0.0.1
// const fs = require('fs');
const client = new Client({
    username:'bitcoinN0deAccess',
      password:'bitc0inRPCpass',
      port: 8332,
  });
//   const client = new Client({ headers: true });
//  console.log( client.getInfo())
app.post('/getInfo',function(req,res){
 client.getInfo();
    res.send(client.getInfo());
  })
app.post('/getbalance')
const getbalance=(req,res)=>{
console.log('getbalance');
 console.log( client.getbalance());

 }

 app.post('/GetNewAddress',function(req,res){
const body=req.body
    const batch = [
        { method: 'getnewaddress', params: [body.accountname] }
      ]
        
       client.command(batch).then(([address, error]) =>res.send(address) );

 });

 app.listen(3000,()=> console.log("Server is running at http://localhost:3000"));

