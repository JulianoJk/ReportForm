const mongoose = require("mongoose");

const ReportSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    dateReported: { type: String, required: true },
    status: {
      faculty: { type: Boolean, required: true },
      staff: { type: Boolean, required: true },
      student: { type: Boolean, required: true },
      visitor: { type: Boolean, required: true },
      contractor: { type: Boolean, required: true },
    },
  },

  { collection: "report" }
);

const model = mongoose.model("Report", ReportSchema);

module.exports = model;
