
const Course = require("../.././models/Courses");

const getAllStudentViewCourses = async (req, res)=> {
    try{
     const courseList = await Course.find({});

     if(courseList.length === 0){
        return res.status(404).json({
            success : false,
            message : "No Course found",
            data : [],
        })
     }
     res.status(200).json({
        success : true,
        data : courseList
     })
    }catch(e){
        console.log(e);
        res.status(500).json({

        })
    }
}

const getStudentViewcourseDetails = async ( req, res) => {
    try{
        const { id } = req.params;

        const courseDetails = await  Course.findById(id);
        if(!courseDetails){
            return res.status(404).json({
            success : false,
            message : "No Course details found",
            data : null,
        })
        }
         res.status(200).json({
        success : true,
        data : courseDetails
     })
    } catch(e){
        console.log(e);
        res.status(500).json({
            success : false,
            message : "Some error occured!"
        })
        
    }
}


module.exports = { getAllStudentViewCourses, getStudentViewcourseDetails}