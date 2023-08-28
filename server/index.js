const express = require("express")
const app = express();
const port = 5000;
var cors = require('cors')
const { MongoClient } = require('mongodb');
const  bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

app.use(express.json())

app.use(cors());
const uri = "mongodb+srv://mydbuser1:2cKuKzwaTjiLcbcl@cluster0.5d0ua.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });



async function main() {

    try 
    {

        await client.connect()
        const database = client.db("user");
        console.log(database)
        const coll = database.collection("user_data")
        console.log(coll)

//This is Registration System
        app.post("/register", async (req, res) => {

            // const newUser = req.body;
const hashPassword= await bcrypt.hash(req.body.password,10)
            const newUser={
                name:req.body.name,
                email:req.body.email,
                password:hashPassword
            }
            // console.log(newUser)

            const result = await coll.insertOne(newUser)


            res.json(result)

        })

       
        //This is login system
app.post("/login", async (req,res)=>{

    const {email,password}=req.body
const user= await coll.findOne({
    email:req.body.email,
   
})
console.log(user)

if(user){
    res.json("exist")
}else{
    res.json("not exist")
}


})
    }


    finally {
        // await client.close();
    }
}

main().catch(console.error);


app.get("/", (req, res) => {

    res.send("Heloo world this is send ")
    
})

// app.post("/register",(req,res)=>{
// console.log(req.body)

// res.json({status:"ok"})

// })


app.listen(port, () => {

    console.log(`server is running ${port}`)
})


//  user_name =user
//  user_pwd=VfUmoBVL16N3jv7H



// app.js
// ...

// Dashboard route
app.get('/dashboard', (req, res) => {
    // Add authentication check here to ensure only authenticated users can access the dashboard.
    res.sendFile(__dirname + '/public/dashboard.html');
  });
  