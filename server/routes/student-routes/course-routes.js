const express = require("express");
const { getAllStudentViewCourses, getStudentViewcourseDetails, checkCoursePurchaseInfo } = require("../../controllers/student-controller/course-controller");
const router = express.Router();

router.get("/get", getAllStudentViewCourses);
router.get("/get/details/:id", getStudentViewcourseDetails);
router.get("/purchase-info/:id/:studentId", checkCoursePurchaseInfo);

module.exports = router;
