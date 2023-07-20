const User = require('../moduls/usermodule');
const bcrypt  = require ("bcryptjs")
exports.getAllUsers = async(req, res, next) => {
 let users;
 try {
    users = await User.find();

 } catch (error) {
    console.log(err)
 }
  if (!users){
    return res.status(404).json({message: "No Users Found"})
  }
    return res.status(200).json({users})
}


exports.getSingleUser = async(req,res,next) => {
   const id = req.params.id;
   let user;
   try{
     user = await User.findById(id);
   }catch (err) {
     return console.log(err);
   }
   if(!user){
     return res.status(404).json({message: "No user This Id"})
   }
   return res.status(200).json({user})
 }
 

exports.signup = async (req, res, next) => {
   const {name, email, password} = req.body;

   let existingUser;
   try {
      existingUser = await User.findOne({email})

   } catch (error) {
     return console.log(error)
   }
   if(existingUser){
      return  res.status(409).json({message: "User Already Exists! Login Instead"})
   }
   const hashedpassword = bcrypt.hashSync(password);

   const user = new User({
      name, 
      email, 
      password: hashedpassword,
      blogs:[]
   });

   try{
     await user.save();

   }catch(err) {
     return console.log(err)
   }
   return res.status(201).json({user})
}




exports.login = async(req, res, next)  => {
   const {email, password} = req.body;
   let existingUser;
   try {
      existingUser = await User.findOne({email});
   } catch (err) {
      return console.log(err)

   }
   if(!existingUser){
      return res.status(403).json({message: "Couldnt find User By This Email"});
   }

   const ispasswordCorrect = bcrypt.compareSync(password, existingUser.password);
    if(!ispasswordCorrect){
      return res.status(400).json({message: "Incorrect password"})
    }
    return res.status(200).json({message: "Login successfull"})
}