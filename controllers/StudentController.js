const { connection } = require("./DBConnection");

function showCourseList(req,res) {
    try {
        connection.query("SELECT * FROM course", (err, result, fields) => {
            if(err){
                console.log(err);
                return res.status(400).send
            }
            res.render('student/course-list', { courses: result })
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send
    }
}

function openCourse(req, res) {
    res.render('student/open-course')
}

module.exports = { showCourseList };
