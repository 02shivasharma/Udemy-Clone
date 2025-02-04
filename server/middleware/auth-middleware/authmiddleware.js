const express = require("express");
const jwt = require("jsonwebtoken");


  const authMiddleWare = async(req, res, next)=>{
   const  authHeader  = req.headers.authorization;

   if(!authHeader){
     return res.status(401).json({
        sucess : false, 
        message : "User is not Authorized"
     })
   } 
 
   const token = authHeader.split(" ")[1];
   const payLoad = jwt.verify(token, "JWT_SECRET");

   req.user = payLoad;
   next();

}

module.exports = authMiddleWare;