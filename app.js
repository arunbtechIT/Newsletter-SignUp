const express=require("express");
const bodyParser=require("body-parser");
const request=require("body-parser");
const https=require("https");

const app=express()
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/signUp.html");

});

app.post("/",function(req,res){
  const firstname=req.body.fname;
  const lastname=req.body.lname;
  const email=req.body.email;
  console.log(firstname);
  console.log(lastname);
  console.log(email);
  const data={
    members:[{
      email_address:email,
      status:"subscribed",
      merge_fields:{
        FNAME:firstname,LNAME:lastname
      }
    }
    ]
  };
  const jsondata=JSON.stringify(data);
  const url="https://us10.api.mailchimp.com/3.0/lists/b6588d150a";
  const options={
    method:"post",
    auth:"arun:beecfc46b46ddf16f09937103e41775f-us10"
  }

  const request=https.request(url,options,function(response){
    if (response.statusCode===200){
      res.sendFile(__dirname+"/success.html");
    }
    else{
        res.sendFile(__dirname+"/failure.html");
    }
    response.on("data",function(data){
      console.log(JSON.parse(data));
    })
  })
  request.write(jsondata);
  request.end();
});

app.post("/failure",function(req,res){
  res.redirect("/");
})
app.listen(process.env.PORT || 3000,function(){
    console.log("server is running on port 3000");
});
