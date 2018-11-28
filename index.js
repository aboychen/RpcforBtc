const express = require('express')
const app = express()
const Client = require('bitcoin-core');
const bodyParser  =require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// const fs = require('fs');
const client = new Client({
    username: 'bitcoinN0deAccess',
    password: 'bitc0inRPCpass',
    port: 8332,
});
//   const client = new Client({ headers: true });
//  console.log( client.getInfo())
app.post('/getInfo', function (req, res) {
    client.getInfo();
    res.send(client.getInfo());
})
 
  app.post('/GetNewAddress',function(req,res){
    var accName=req.body.accountName;
    const batch = [
        { method: 'getnewaddress', parameters: [accName] }
    ]
      client.command(batch).then(([firstAddress, secondAddress]) => res.send(firstAddress, accName));
       res.end("yes");
  });

app.post('/getaccount', function (req, res) {
    var accountNo = req.query.accountNo;
    const batch = [
        { method: 'getaccount', params: [accountNo] }
    ]

    client.command(batch).then(([address, error]) => res.send(address));
});
app.post('/getaddressesbyaccount', function (req, res) {
    var accountNo = req.query.accountNo;
    const batch = [
        { method: 'getaddressesbyaccount', params: [accountNo] }
    ]

    client.command(batch).then(([address, error]) => res.send(address));
});
app.listen(3000, () => console.log("Server is running at http://localhost:3000"));

