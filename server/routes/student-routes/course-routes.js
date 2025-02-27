const express = require("express");
const { getAllStudentViewCourses, getStudentViewcourseDetails } = require("../../controllers/student-controller/course-controller");
const router = express.Router();

router.get("/get", getAllStudentViewCourses);
router.get("/get/details/:id", getStudentViewcourseDetails);

module.exports = router;
