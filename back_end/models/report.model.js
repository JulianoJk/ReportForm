const mongoose = require("mongoose");
const UserSchema = require("./user.model");
const ReportSchema = new mongoose.Schema(
  {
    userEmail: { type: String, required: true },
    userName: { type: String, required: true },
    dateReported: { type: String, required: true },
    time: { type: String, required: true },
    campusLocation: { type: String, required: true },
    status: {
      injuryOrIllness: { type: Boolean, required: true },
      unsafeCondition: { type: Boolean, required: true },
      environmentalSpill: { type: Boolean, required: true },
      fire: { type: Boolean, required: true },
      nonVehicularAccident: { type: Boolean, required: true },
      other: { type: Boolean, required: true },
    },
    otherType: { type: String },
    // Section 2
    sectionTwoType: {
      none: { type: Boolean, required: true },
      physicalInjury: { type: Boolean, required: true },
      occupationalIllness: { type: Boolean, required: true },
      potentialHarmfulExposure: { type: Boolean, required: true },
    },
    treatment: {
      none: { type: Boolean, required: true },
      firstAid: { type: Boolean, required: true },
      emergencyMedicalServices: { type: Boolean, required: true },
      personalPhysician: { type: Boolean, required: true },
      studentHealthServices: { type: Boolean, required: true },
      hospitalOutpatient: { type: Boolean, required: true },
      hospitalAdmitted: { type: Boolean, required: true },
    },
  },

  { collection: "report" }
);

const model = mongoose.model("Report", ReportSchema);

module.exports = model;
