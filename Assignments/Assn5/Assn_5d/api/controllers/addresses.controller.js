const mongoose = require("mongoose");
const Student = mongoose.model("Student");
const Address = mongoose.model("Address");

// Get all addresses
module.exports.addressesGetAll = function (req, res) {
  console.log("Get addresses for a student controller");
  const studentId = req.params.studentId;
  Student.findById(studentId)
    .select("address")
    .exec(function (err, student) {
      console.log("GET addresses for student with studentId ", studentId);
      res.status(200).json(student.address);
    });
};

// Get one address by Id
module.exports.addressGetOne = function (req, res) {
  console.log("Get one address for a student");
  const studentId = req.params.studentId;
  const addressId = req.params.addressId;
  Student.findById(studentId).exec(function (err, student) {
    const address = student.address.id(addressId);
    console.log(
      "GET address with " +
        addressId +
        " for student with studentId" +
        studentId
    );
    res.status(200).json(address);
  });
};

const _addAddress = function (req, res, student) {
  console.log("student " + student);
  console.log(req.body);
  student.address = student.address;
  student.address.push(req.body);
  student.save(function (err, updatedStudent) {
    const response = {
      status: 200,
      message: updatedStudent,
    };
    if (err) {
      console.log("error", err);
      response.status = 500;
      response.message = err;
    } else {
      response.status = 201;
      response.message = updatedStudent;
    }
    res.status(response.status).json(response.message);
  });
};

// Add an address
module.exports.addressAdd = function (req, res) {
  console.log("Add one address to the student");
  const studentId = req.params.studentId;
  Student.findById(studentId)
    .select("address")
    .exec(function (err, student) {
      const response = {
        status: 201,
        message: student,
      };
      if (err) {
        response.status = 500;
        response.message = err;
      } else if (!student) {
        console.log("Student is not in the database");
        response.status = 404;
        response.message = {
          message: "Student Id " + studentId + " not found.",
        };
      } else if (student) {
        _addAddress(req, res, student);
        // _addAddress();
      } else {
        res.status(response.status).json(response.message);
      }
    });
};

// Full update one address - Needs Header as well in ARC
module.exports.addressFullUpdate = function (req, res) {
  const addressId = req.params.addressId;
  Student.findById(req.params.studentId, function (err, student) {
    if (!err) {
      if (!student) {
        res.status(404).send("Student was not found");
      } else {
        student.address.id(addressId).city = req.body.city;
        student.address.id(addressId).street = req.body.street;
        student.address.id(addressId).state = req.body.state;
        student.address.id(addressId).zip = req.body.zip;
        student.save(function (saveerr, saveStudent) {
          if (!saveerr) {
            res.status(200).send(saveStudent);
          } else {
            res.status(400).send(saveerr.message);
          }
        });
      }
    } else {
      res.status(400).send(err.message);
    }
  });
};

// Partial update one address - Needs Header as well in ARC
module.exports.addressPartialUpdate = function (req, res) {
  const addressId = req.params.addressId;
  const studentId = req.params.studentId;

  Student.findById(studentId, function (err, student) {
    const addressUpdate = student.address.id(addressId);
    if (!err) {
      if (!student) {
        res.status(404).send("Student was not found");
      } else {
        if (req.body.city) {
          addressUpdate.city = req.body.city;
        }
        if (req.body.street) {
          addressUpdate.street = req.body.street;
        }
        if (req.body.state) {
          addressUpdate.state = req.body.state;
        }
        if (req.body.zip) {
          addressUpdate.zip = req.body.zip;
        }
        student.save(function (saveErr, saveStudent) {
          if (!saveErr) {
            res.status(200).send(saveStudent.address.id(addressId));
          } else {
            res.status(400).send(saveErr.message);
          }
        });
      }
    } else {
      res.status(400).send(err.message);
    }
  });
};

// Delete One Address 
module.exports.addressDelete = function (req, res) {
  const addressId = req.params.addressId;
  const studentId = req.params.studentId;

  Student.findById(studentId, function (err, student) {
    if (!err) {
      if (!student) {
        res.status(404).send("Student was not found");
      } else {
        student.address.id(addressId).remove(function (removeerr, removeStudent) {
          if (removeerr) {
            res.status(400).send(removeerr.message);
          }
        });
        student.markModified("address");
        student.save(function (saveerr, saveStudent) {
          if (!saveerr) {
            res.status(200).send({"message": "Successfully deleted"});
          } else {
            res.status(400).send(saveerr.message);
          }
        });
      }
    } else {
      res.status(400).send(err.message);
    }
  });
};
