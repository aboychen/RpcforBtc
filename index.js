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
app.post('/getAddressesByAccount1',(req,res)=>{
client.getAddressesByAccount((err,Address)=>{
var account_no=req.body.accountNo;
return res.json({
address:Address,
account:account_no

})

})
})
//getBalance
app.post('/getbalance', function (req, res) {
    var accountNo = req.query.accountNo;
    var minconf=1
    const batch = [
        { method: 'getbalance', params: [accountNo,minconf ] }
    ]

    client.command(batch).then(([address, error]) =>{

        if(error){
            console.log(error+"error");
            res.json(error)
            }
            else{
                console.log(address);
                res.json({
                    balance:address,
                    accNo:accountNo
                })
            }

    } );
});
//listtransactions

app.post('/listtransactions', function (req, res) {
    var account = req.query.accountname;
    var minconf=1
    var count=10;
    var from =0;
    const batch = [
        { method: 'listtransactions', params: [account,count,from ] }
    ]

    client.command(batch).then(([ Address,err]) =>{
console.log(err);

console.log(Address);

        if(err){
            console.log(err+"error");
            res.json(err)
            }
            else{
                console.log(Address);
                res.json({
                    balance:Address,
                    accNo:account
                })
            }

    } );
});
  

//getaccountaddress
app.post('/getaccountaddress', function (req, res) {
    var accName = req.query.accountName;
    const batch = [
        { method: 'getaccountaddress', parameters: [accName] }
    ]

    client.command(batch).then(([address,err]) => 
    {console.log(err);
        if(err){

            console.log(err);
            return res.json({
                error:err
            });
        }else{
        console.log(address);
        return res.json(address);
        }
    });
});
app.post('/getaddressesbyaccount', function (req, res) {
    var accountNo = req.query.accountNo;
    const batch = [
        { method: 'getaddressesbyaccount', params: [accountNo] }
    ]

    client.command(batch).then(([address, error]) => res.send(address));
});
app.listen(3000, () => console.log("Server is running at http://localhost:3000"));

