require('dotenv').config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRouter = require("./routes/auth-routes");
const mediaRoutes = require("./routes/instructor-routes/media-route");
const instructorCourseRoutes = require("./routes/instructor-routes/course-route");



const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL;

app.use(cors({
    origin: process.env.CLIENT_URL,
    methods : ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: ["Content-Type", "Authorization"]
}))

app.use(express.json());

mongoose.connect(MONGO_URL).then(()=>console.log("mongodb is connected "))
.catch((e)=> console.log(e));

app.use("/auth", authRouter);
app.use("/media", mediaRoutes);
app.use("/instructor/course", instructorCourseRoutes);

app.use((err, req, res, next)=>{
    console.log(err.stack);
    res.status(500).json({
        success : false,
        message : 'Something went wrong'
    })
})

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})