const mongoose = require("mongoose");
const Job = mongoose.model("Job");

// module.exports.jobsGetAll = function (req, res) {
//   console.log("Get all jobs");
//   console.log(req.query);

//   Job.find().exec(function (err, jobs) {
//     if (err) {
//       console.log("Error: ", err);
//       res.status(500).json(err);
//     } else {
//       console.log("Found jobs", jobs.length);
//       res.status(200).json(jobs);
//     }
//   });
// };

module.exports.jobsGetAll = function (req, res) {
  console.log("Get the list of Jobs");
  console.log(req.query);

  // let offset = 0;
  // let count = 5;
  // const maxCount = 10;

  // if (req.query && req.query.offset) {
  //   offset = parseInt(req.query.offset);
  // }
  // if (req.query && req.query.count) {
  //   count = parseInt(req.query.count);
  // }

  // if (isNaN(offset) || isNaN(count)) {
  //   res
  //     .status(400)
  //     .json({ message: "QueryString Offset and Count must be a number" });
  //   return;
  // }
  // if (count > maxCount) {
  //   res
  //     .status(400)
  //     .json({ message: "QueryString Count must not exceed " + maxCount });
  // } else {
  Job.find()
    // .skip(offset)
    // .limit(count)
    .exec(function (err, jobs) {
      if (err) {
        console.log("Error: ", err);
        res.status(500).json(err);
      } else {
        console.log("Found jobs", jobs.length);
        res.status(200).json(jobs);
      }
    });
  // }
};

module.exports.jobsGetOne = function (req, res) {
  const jobId = req.params.jobId;
  Job.findById(jobId).exec(function (err, job) {
    const response = {
      status: 200,
      message: job,
    };
    if (err) {
      console.log("Error finding job: " + jobId);
      response.status = 500;
      response.message = err;
    } else if (!job) {
      response.status = 404;
      response.message = "Job ID not found";
    }
    res.status(response.status).json(response.message);
  });
};

module.exports.jobsAddOne = function (req, res) {
  console.log("Add new job");
  console.log(req.body);

  if (req.body && req.body.title && req.body.description && req.body.experience
    && req.body.skills && req.body.salary && req.body.postDate) {

    const newJob = {
      title: req.body.title,
      description: req.body.description,
      experience: req.body.experience,
      skills: req.body.skills,
      salary: parseFloat(req.body.salary),
      postDate: req.body.postDate,
    };

    Job.create(newJob, function (err, job) {
      let response = {
        status: 204,
        message: "",
      };
      if (err) {
        response = {
          status: 400,
          message: err,
        };
      } else {
        response = {
          status: 200,
          message: job,
        };
      }
      res.status(response.status).json(response.message);
    });
  }

};

module.exports.jobsFullUpdateOne = function (req, res) {
  const jobId = req.params.jobId;
  Job.findById(jobId).exec(function (err, job) {
    const response = {
      status: 204,
      message: job,
    };
    if (err) {
      console.log("Error finding job: " + jobId);
      response.status = 500;
      response.message = err;
    } else if (!job) {
      response.status = 404;
      response.message = { message: "Job ID not found" };
    }
    if (response.status !== 204) {
      res.status(response.status).json(response.message);
    } else {
      job.title = req.body.title;
      job.salary = parseFloat(req.body.salary);
      job.description = req.body.description;
      job.experience = req.body.experience;
      job.skills = req.body.skills;
      job.postDate = req.body.postDate;
      job.save(function (err, updatedJob) {
        if (err) {
          response.status = 500;
          response.message = err;
        } else {
          response.status = 204;
          response.message = updatedJob;
        }
        res.status(response.status).json(response.message);
      });
    }
  });
};

module.exports.jobsPartialUpdateOne = function (req, res) {
  const jobId = req.params.jobId;
  Job.findById(jobId).exec(function (err, job) {
    const response = {
      status: 204,
      message: job,
    };
    if (err) {
      console.log("Error finding job: " + jobId);
      response.status = 500;
      response.message = err;
    } else if (!job) {
      response.status = 404;
      response.message = { message: "Job ID not found" };
    }
    if (response.status !== 204) {
      res.status(response.status).json(response.message);
    } else {
      if (req.body.title) {
        job.title = req.body.title;
      }
      if (req.body.salary) {
        job.salary = req.body.salary;
      }
      if (req.body.description) {
        job.description = req.body.description;
      }
      if (req.body.experience) {
        job.experience = req.body.experience;
      }
      if (req.body.postDate) {
        job.postDate = req.body.postDate;
      }
      job.save(function (err, updatedJob) {
        if (err) {
          response.status = 500;
          response.message = err;
        } else {
          response.status = 204;
          response.message = updatedJob;
        }
        res.status(response.status).json(response.message);
      });
    }
  });
};

module.exports.jobsDeleteOne = function (req, res) {
  console.log("Delete a job controller reached.");
  const jobId = req.params.jobId;

  Job.findByIdAndDelete(jobId).exec(function (err, deletedJob) {
    let response = {
      status: 204,
      message: "Successfully deleted",
    };
    if (err) {
      console.log("Error finding job: " + jobId);
      response = {
        status: 500,
        message: err
      };
    } else if (!deletedJob) {
      response = {
        status: 404,
        message: "Job not found"
      };
    }
    res.status(response.status).json(response.message);
  });
};