let express = require('express'); //  1 >> express
let mySer = express();
mySer.use(express.urlencoded({extended:true})); 
mySer.use(express.json());


let connectDB = require('./database/config'); //  2 >> mongoDB
connectDB();

let body = require('body-parser'); //  3 >> bodyParser
// mySer.use(body.urlencoded({extended:true, limit:'50mb'}));
mySer.use(body.urlencoded({extended:true}));
// mySer.use(body.json({limit:'50mb', extended:false}));
mySer.use(body.json()); // at postman body content-type

let cors = require('cors'); //  4 >> cors

const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials
    optionSuccessStatus:200,
}

mySer.use(cors(corsOptions));

let User = require('./database/User-model'); //  5 >> schemaModel

const user = require('./database/Readuser'); // 6 >> readUser

const updateUser = require('./database/Updateuser')

mySer.get("/", async(req, res)=>{
    console.log("client connected with express js")
    res.status(201).json({message: "connected with backend"});
});

// insert
mySer.post('/register', async (req, res) => {
    let user = new User();
    
    user.fname = req.body.fname;
    user.lname = req.body.lname;
    user.email = req.body.email;
    user.password = req.body.password;
    user.confirmpassword = req.body.confirmpassword;

    let result = await user.save();
    // console.log(result);
    res.send(result);

});

// read
mySer.get('/user/showall', async (req, res) =>{
    
    let result = await User.find();
    // console.log("res-"+result)
    res.send(result);
});

mySer.post('/user/showbymail', user.showRecByMail);

mySer.post('/user/showbyid', user.showRecByid);

mySer.post('/user/reset', updateUser.updatedetail);


//Delete
mySer.delete('/user/delete',function(req,res){
    const byname = req.body.fname;
    console.log(byname+" record deletion started in backend");
    User.findOneAndDelete(
        ({fname:byname}),

// mySer.delete('/user/delete/:id',function(req,res){
//     let del = req.params.id;
//     let delbyid = del.slice(1);
//     console.log("Deletion started (from backend) of "+delbyid);

//     User.findOneAndDelete(
//         ({_id:delbyid}),
        function(err,datas){
        if(err){
            res.send("Error occured in backend")
        }
        else{
            if(datas==null){
                res.send("Record not found")
            }
            else{
                res.send("Record of \'"+ byname +"\' is deleted Sucessfully");
                // res.send("Record of "+ delbyid +" is deleted Sucessfully");
            }
        }
    })
})

mySer.listen(4444, () => {
    console.log('server is running @4444')
});



/*
// update
mySer.put("/user/update/:id", async(req,res)=>{

    let upid = req.params.id;
    let upfname = req.body.fname;
    let uplname = req.body.lname;
    let upmail = req.body.email;
    let uppassword = req.body.password;
    let upcpassword = req.body.password;
    
    User.findOneAndUpdate(
        {id:upid},
        {$set:{fname:upfname,lname:uplname,mail:upmail,password:uppassword,confirmpassword:upcpassword}},
        {new:true},
        (err,data)=>{

        if(err) {
            res.send("error")
        } else {
            if(data==null){
                res.send("nothing found")
            }else{
                res.send("Your record is Updated Sucessfully")
            }
        }
    })
})    
*/

/*
// delete
mySer.delete('/user/delete/:id',function(req,res){
    let del = req.params.id;
    let delbyname = del.slice(1);
    console.log("Deleted(from backend) name is "+delbyname);
    User.findOneAndDelete(
        ({fname:delbyname}),
        function(err,datas){
        if(err){
            res.send("Error while deletion")
        }
        else{
            if(datas==null){
                res.send("Record not available")
            }
            else{
                res.send("Your record is deleted Sucessfully");
            }
        }
    })
})
*/
