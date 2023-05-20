const mongoose = require("mongoose");
const ReportSchema = new mongoose.Schema(
  {
    userEmail: { type: String },
    userName: { type: String },
    dateReported: { type: String },
    time: { type: String },
    campusLocation: { type: String },
    status: {
      injuryOrIllness: { type: Boolean },
      unsafeCondition: { type: Boolean },
      environmentalSpill: { type: Boolean },
      fire: { type: Boolean },
      nonVehicularAccident: { type: Boolean },
      other: { type: Boolean },
    },
    otherType: { type: String },
    // Section 2
    sectionTwoType: {
      none: { type: Boolean },
      physicalInjury: { type: Boolean },
      occupationalIllness: { type: Boolean },
      potentialHarmfulExposure: { type: Boolean },
    },
    treatment: {
      none: { type: Boolean },
      firstAid: { type: Boolean },
      emergencyMedicalServices: { type: Boolean },
      personalPhysician: { type: Boolean },
      studentHealthServices: { type: Boolean },
      hospitalOutpatient: { type: Boolean },
      hospitalAdmitted: { type: Boolean },
    },
    // Section 3
    damagedOrLostItems: {
      none: { type: Boolean },
      personalProperty: { type: Boolean },
      UniversityProperty: { type: Boolean },
    },
    descriptionDamagesOrItemsLost: { type: String },
    reportCompletedBy: {
      sameAsAbove: { type: Boolean },
      otherCompletedByname: { type: String },
      otherCompletedByphone: { type: String },
      otherCompletedByemail: { type: String },
      otherCompletedBydateReported: { type: String },
    },
    closed: { type: Boolean },
  },

  { collection: "report" }
);

const model = mongoose.model("Report", ReportSchema);

module.exports = model;
