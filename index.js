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
   app.post('/GetNewAddress',function(req,res){
    var accName=req.body.accountName;
    const batch = [
        { method: 'getNewAddress', parameters: [accName] }
    ]
   client.command(batch).then(([ address,error]) => {
    if(error){
    console.log(error+"error");
    res.json(error)
    }
    else{
        console.log(address);
        res.json({
            account:address,
            name:accName
        })
    }

   });


       
  });

  //get new address
  app.post('/test', (req, res) => {
      client.getNewAddress((err, Address) => {
          var account_name = req.body.account_name;

          return res.json({
              address: Address,
              Name: account_name
          }),
          console.log(account_name);
      })
  })

  //getAddressesByAccount
app.post('/getAddressesByAccount1',(req,res=>{
client.getAddressesByAccount((err,Address)=>{
var account_no=req.body.accountNo;
return res.send(Address);

})
}));


//getaccount
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

