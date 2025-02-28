
const Course = require("../.././models/Courses");
const StudentCourses = require("../../models/StudentCourses");

const getAllStudentViewCourses = async (req, res) => {
  try {
    const {
      category = "",
      level = "",
      primaryLanguage = "",
      sortBy = "price-lowtohigh",
    } = req.query;

    console.log(req.query, "req.query");
let filters = {};
if (category && category.trim() !== "") {
  filters.category = { $in: category.split(",") };
}
if (level && level.trim() !== "") {
  filters.level = { $in: level.split(",") };
}
if (primaryLanguage && primaryLanguage.trim() !== "") {
  filters.primaryLanguage = { $in: primaryLanguage.split(",") };
}
console.log("Filters", filters);

    let sortParam = {};
    switch (sortBy) {
      case "price-lowtohigh":
        sortParam.pricing = 1;

        break;
      case "price-hightolow":
        sortParam.pricing = -1;

        break;
      case "title-atoz":
        sortParam.title = 1;

        break;
      case "title-ztoa":
        sortParam.title = -1;

        break;

      default:
        sortParam.pricing = 1;
        break;
    }

    const coursesList = await Course.find(filters).sort(sortParam);
   
    res.status(200).json({
      success: true,
      data: coursesList,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

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

const checkCoursePurchaseInfo = async (req, res ) => {
  const { id, studentId } =  req.params;
   try{
    const studentCourses = await StudentCourses.findOne({
         userId : studentId
    })
    console.log("studentCourses", studentCourses);

     if (!studentCourses) {
      return res.status(200).json({
        success: true,
        data: false, // Student hasn't purchased any courses yet
      });
    }

     const ifStudentAlreadyBoughtCurrentCourse =
      studentCourses.courses.findIndex((item) => item.courseId === id) > -1;
      console.log(ifStudentAlreadyBoughtCurrentCourse);
      
    res.status(200).json({
      success: true,
      data: ifStudentAlreadyBoughtCurrentCourse,
    }); 
    }catch(e){
       console.log(e);
       res.status(500).json({
        success : false, 
        message : "Some error occured"
       })
    }
  }

module.exports = { getAllStudentViewCourses, getStudentViewcourseDetails, checkCoursePurchaseInfo}