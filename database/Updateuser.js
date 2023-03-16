const userModel = require('./User-model');


const updatedetail = async (req, res) => {
    try {
        const { _id, fname, lname, email, password } = req.body;
        // console.log("hi updated id "+_id) 
        if (!(fname && lname && email && password)) {
            
            res.status(400).json({ message: "All inputs required" });
        }
        const user = await userModel.findOne({ _id });
        // console.log("hi"+user) 

     if(user){
       const rep = await userModel.updateOne({ _id: user._id },
            { $set: { fname:fname, lname:lname, email:email, password: password } },
            { new: true }
          );
 
            user.message="Password Updated";
            res.status(200).json(user);
            // res.redirect('/');
        } 
    } catch (err) {
        console.log(err);
        res.status(400).send({ message: "User not exist please register" });
    }
}

module.exports = {
    updatedetail
}