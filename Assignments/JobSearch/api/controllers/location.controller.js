const mongoose = require("mongoose");
const Job = mongoose.model("Job");

module.exports.locationGet = function (req, res) {
    console.log("Get location for a job");
    const jobId = req.params.jobId;
    Job.findById(jobId)
        .select("location")
        .exec(function (err, job) {
            console.log("GET location for job with jobId ", jobId);
            res.status(200).json(job.location);
        });
};

const _addLocation = function (req, res, job) {
    console.log(req.body);
    job.Location = {
        city: req.body.city,
        state: req.body.state,
        zip: parseInt(req.body.zip)
    };

    Job.create(newLocation, function (err, job) {
        const response = {
            status: 200,
            message: "",
        };
        if (err) {
            console.log("error", err);
            response = {
                status: 500,
                message: err,
            };
        } else {
            response = {
                status: 201,
                message: job,
            };
        }
        res.status(response.status).json(response.message);
    });
};

module.exports.locationAdd = function (req, res) {
    console.log("Add location to the job");
    const jobId = req.params.jobId;
    Job.findById(jobId)
        .select("location")
        .exec(function (err, job) {
            const response = {
                status: 201,
                message: job,
            };
            if (err) {
                response.status = 500;
                response.message = err;
            } else if (!job) {
                console.log("Job is not in the database");
                response.status = 404;
                response.message = { message: "Job Id " + jobId + " not found." };
            } else if (job) {
                _addLocation(req, res, job);
            } else {
                res.status(response.status).json(response.message);
            }
        });
};

const _updateLocation = function (req, res, job) {
    // job.location.name = req.body.name;
    // job.location.address = req.body.address;
    job.location = {
        city: req.body.city,
        state: req.body.state,
        zip: parseInt(req.body.zip)
    };
    job.save(function (err, updatedJob) {
        const response = {
            status: 204,
            message: "Success",
        };
        if (err) {
            console.log("error", err);
            response.status = 500;
            response.message = err;
        } else {
            response.status = 204;
            response.message = updatedJob;
        }
        res.status(response.status).json(response.message);
    });
};

module.exports.locationFullUpdate = function (req, res) {
    console.log("Update location for a job");
    const jobId = req.params.jobId;
    Job.findById(jobId)
        .select("location")
        .exec(function (err, job) {
            console.log("Update location for job with jobId ", jobId);
            const response = {
                status: 204,
                message: "Success",
            };
            if (err) {
                response.status = 500;
                response.message = err;
            } else if (!job) {
                console.log("Job is not in the database");
                response.status = 404;
                response.message = { message: "Job Id " + jobId + " not found." };
            }
            if (response.status !== 204) {
                res.status(response.status).json(response.message);
            } else {
                _updateLocation(req, res, job);
            }
        });
};

const _partialUpdateLocation = function (req, res, job) {
    if (req.body.city) {
        job.location.city = req.body.city;
    }
    if (req.body.state) {
        job.location.state = req.body.state;
    }
    if (req.body.zip) {
        job.location.zip = parseInt(req.body.zip);
    }
    job.save(function (err, updatedJob) {
        const response = {
            status: 204,
            message: "Success",
        };
        if (err) {
            console.log("error", err);
            response.status = 500;
            response.message = err;
        } else {
            response.status = 204;
            response.message = updatedJob;
        }
        res.status(response.status).json(response.message);
    });
};

module.exports.locationPartialUpdate = function (req, res) {
    console.log("Update location partially for a job");
    const jobId = req.params.jobId;
    Job.findById(jobId)
        .select("location")
        .exec(function (err, job) {
            console.log("Update location for job with jobId ", jobId);
            const response = {
                status: 204,
                message: "Success",
            };
            if (err) {
                response.status = 500;
                response.message = err;
            } else if (!job) {
                console.log("Job is not in the database");
                response.status = 404;
                response.message = { message: "Job Id " + jobId + " not found." };
            }
            if (response.status !== 204) {
                res.status(response.status).json(response.message);
            } else {
                _partialUpdateLocation(req, res, job);
            }
        });
};

const _deleteLocation = function (req, res, job) {
    job.location.remove();
    job.save(function (err, deletedJob) {
        const response = {
            status: 204,
            message: "Success",
        };
        if (err) {
            console.log("error", err);
            response.status = 500;
            response.message = err;
        } else {
            response.status = 204;
            response.message = "Successfully Deleted.";
        }
        res.status(response.status).json(response.message);
    });
};

module.exports.locationDelete = function (req, res) {
    console.log("Update location for a job");
    const jobId = req.params.jobId;
    Job.findById(jobId)
        .select("location")
        .exec(function (err, job) {
            console.log("Delete location for job with jobId ", jobId);
            const response = {
                status: 204,
                message: "Success",
            };
            if (err) {
                response.status = 500;
                response.message = err;
            } else if (!job) {
                console.log("Job is not in the database");
                response.status = 404;
                response.message = { message: "Job Id " + jobId + " not found." };
            }
            if (response.status !== 204) {
                res.status(response.status).json(response.message);
            } else {
                _deleteLocation(req, res, job);
            }
        });
};