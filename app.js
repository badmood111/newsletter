const express = require('express');
const bodyParser = require('body-parser');
const mailchimp = require('@mailchimp/mailchimp_marketing');
 
const app = express();
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("public"));
 
mailchimp.setConfig({
  apiKey: "a85355cdfb3c9c526b2d97a712ef0e78-us8",
  server: "us8"
});
 
app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html");
})
 
app.post("/", function(req, res){
 
  const listId = "b706122d1b";
  const subscribingUser = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email
  };
 
  async function run() {
      const response = await mailchimp.lists.addListMember(listId, {
        email_address: subscribingUser.email,
        status: "subscribed",
        merge_fields: {
          FNAME: subscribingUser.firstName,
          LNAME: subscribingUser.lastName
        }
      });
 
      console.log(
        `Successfully added contact as an audience member. The contact's id is ${response.id}.`
      );
  }
 
  run();
})
 
app.listen(3000, function () {
  console.log("Server is running on port 3000")
});



//API key:
//a85355cdfb3c9c526b2d97a712ef0e78-us8

//List ID:
//b706122d1b

/*
const express = require('express');
const bodyParser = require('body-parser');
const mailchimp = require('@mailchimp/mailchimp_marketing');
 
const app = express();
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("public"));
 
mailchimp.setConfig({
  apiKey: "YOUR API-KEY",
  server: "YOUR SERVER PREFIX e.g. us7"
});
 
app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html");
})
 
app.post("/", function(req, res){
  console.log(req.body.firstName);
  console.log(req.body.lastName);
  console.log(req.body.email);
 
  const listId = "YOUR LIST-ID";
  const subscribingUser = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email
  };
 
  async function run() {
      try {
          const response = await mailchimp.lists.addListMember(listId, {
            email_address: subscribingUser.email,
            status: "subscribed",
            merge_fields: {
              FNAME: subscribingUser.firstName,
              LNAME: subscribingUser.lastName
            }
          });
 
          console.log(
            `Successfully added contact as an audience member. The contact's id is ${response.id}.`
          );
 
          res.sendFile(__dirname + "/success.html");
      } catch (e) {
          res.sendFile(__dirname + "/failure.html");
      }
  }
 
  run();
})
 
app.post("/failure", function(req, res) {
  res.redirect("/");
})
 
app.listen(3000, function () {
  console.log("Server is running on port 3000")
});
*/