const User_Schema = require('../models/user_model');
exports.get_user = (req, res) =>{
    User_Schema.find({$or:[{user_type:{$eq:"admin"}}, {user_type:{$eq:"agent"}}]}, (err, result)=>{
        if(err)
            return res.status(404).json(err)
        else
           return  res.status(200).json(result) 
    })
}

exports.create_user =(req, res)=>{
    const {
        name, 
        phone_number,
        user_type
    }   =  req.body;
    User_Schema.findOneAndUpdate({phone_number:phone_number}, {name:name,user_type:user_type},(err, result)=>{

       if(result){
         res.status(200).json({"status":"exits"})
       }
       else{
        const addUser = new User_Schema({
            name, 
            phone_number,
            user_type
        })
        addUser.save((err, result) => {
            if(err){
              return res.status(400).json({
              error: errorHandler(err)
              })
        } else{
            res.status(200).json({"status":"success"})
        }})
       }

    })
   
}

exports.delete_user=(req, res)=>{
    const {name, 
    phone_number,
    user_type} = req.body;
    User_Schema.findOneAndUpdate({phone_number:phone_number}, {name:name,user_type:"user"},(err, result)=>{
        if(err)
            res.status(404).json({"status":"error"})
        else{
            res.status(200).json({"status":"deleted"})
          }
    })
}