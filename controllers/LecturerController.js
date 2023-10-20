const { connection } = require("./DBConnection");

function createCourseForm(req,res) {
  res.render("lecturer/create-course");
}

function addCourse(req, res) {
  const { name, course_name, description } = req.body;
  try {
    connection.query(
      "INSERT INTO course(name, course_name, description) VALUE(?,?,?)",
      [name, course_name, description],
      (err, result, fields) => {
        if (err) {
          console.log("insert error");
          return res.status(400).send();
        }
        return res
          .status(201)
          .json({ message: "New user created successfully" });
      }
    );
  } catch (error) {
    console.log(error);
    return res.status(500).send();
  }
}


module.exports = { createCourseForm, addCourse };
