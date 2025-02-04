const User = require("../../models/Users")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")

const registerUser = async(req, res)=>{
    const { userName , userEmail , role, password} = req.body;
    
   const exsistingUser = await User.findOne({$or : [{userName}, {userEmail}]
      });

      if(exsistingUser){
        return res.status(400).json({
            sucess : false,
            message : "user with this email and name is already exsist"
        })
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new  User({userName, userEmail, role, password : hashedPassword});

      await newUser.save();

      return res.status(201).json({
        success: true,
        message :  "User Created Succesfully"
      })
};

const LogIn = async(req, res) =>{
    const { userEmail, password} = req.body;
    
    const checkUser = await User.findOne({userEmail});

    if(!checkUser || !(await bcrypt.compare(password, checkUser.password)) ){
        res.status(401).json({
            success : false,
            message : "Error please enter correct credentials"
        })
    }

     const accessToken = jwt.sign(
    {
      _id: checkUser._id,
      userName: checkUser.userName,
      userEmail: checkUser.userEmail,
      role: checkUser.role,
    },
    "JWT_SECRET",
    { expiresIn: "120m" }
  );


    res.status(200).json({
    success: true,
    message: "Logged in successfully",
    data: {
      accessToken,
      user: {
        _id: checkUser._id,
        userName: checkUser.userName,
        userEmail: checkUser.userEmail,
        role: checkUser.role,
      },
    },
  });
}

module.exports = { registerUser, LogIn };