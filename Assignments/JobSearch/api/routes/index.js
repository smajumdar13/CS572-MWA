const express = require("express");
const router = express.Router();
const controllerJobs = require("../controllers/jobs.controller");
const controllerLocation = require("../controllers/location.controller");

router
  .route("/jobs")
  .get(controllerJobs.jobsGetAll)
  .post(controllerJobs.jobsAddOne);
// .post(function(req, res){console.log(req.body); return null;});

router
  .route("/jobs/:jobId")
  .get(controllerJobs.jobsGetOne)
  .put(controllerJobs.jobsFullUpdateOne)
  .patch(controllerJobs.jobsPartialUpdateOne)
  .delete(controllerJobs.jobsDeleteOne);

router
  .route("/jobs/:jobId/location")
  .get(controllerLocation.locationGet)
  .post(controllerLocation.locationAdd)
  .put(controllerLocation.locationFullUpdate)
  .patch(controllerLocation.locationPartialUpdate)
  .delete(controllerLocation.locationDelete);

module.exports = router;
