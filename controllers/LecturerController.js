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

function editCourseForm(req,res) {
    const id = req.params.id
    try {
        connection.query("SELECT * FROM course WHERE id = ?",[id], (err, result, fields) => {
            if(err){
                console.log(err);
                return res.status(400).send
            }
            res.render('lecturer/edit-course', { details: result })
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send
    }
  }

function editCourse(req, res) {
    const id = req.params.id
    const { name, course_name, description } = req.body;
    try {
      connection.query(
        "UPDATE course SET name = ?, course_name = ?, description = ? WHERE id = ?",
        [name, course_name, description, id],
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

  function deleteCourse(req, res) {
    const id = req.params.id
    const { name, course_name, description } = req.body;
    try {
      connection.query(
        "DELETE FROM course WHERE id = ?",
        [id],
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


module.exports = { createCourseForm, addCourse, editCourseForm, editCourse ,deleteCourse};
