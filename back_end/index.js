const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const User = require("./models/user.model");
const Report = require("./models/report.model");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
app.use(cors());

mongoose.connect(process.env.MONGO_DB_CONNECTION_STRING);
app.use(express.json());

app.get("/hello", (res) => {
  try {
    res.status(200).send("Hello!");
  } catch (err) {
    res.send("Access Denied");
  }
});

app.post("/api/register", async (req, res) => {
  try {
    const encrPassw = await bcrypt.hash(req.body.password, 10);

    const user =
      (await User.findOne({
        username: req.body.username,
      })) ||
      (await User.findOne({
        email: req.body.email,
      }));
    if (user) {
      res.status(409).json({ status: "error", message: "User already exists" });
      return;
    }
    if (!["admin", "manager", "user"].includes(req.body.role)) {
      res.status(409).json({
        status: "error",
        message: "Role not valid. Available roles: admin, manager, user",
      });
      return;
    }
    await User.create({
      username: req.body.username,
      password: encrPassw,
      email: req.body.email,
      name: req.body.name,
      role: req.body.role,
      site: req.body.site,
    });
    const token = jwt.sign(
      {
        username: req.body.username,
        email: req.body.email,
        role: req.body.role,
        name: req.body.name,
        site: req.body.site,
      },
      process.env.jwt_secret
    );
    res.status(200).json({ status: "User created succesfully", token: token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "error", message: err });
  }
});

app.post("/api/login", async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
    });
    if (!user) {
      res.status(404).json({ status: "error", message: "User not found" });
      return;
    }
    const isValid = await bcrypt.compare(req.body.password, user.password);
    if (isValid) {
      const token = jwt.sign(
        {
          username: user.username,
          email: user.email,
          role: user.role,
        },
        process.env.jwt_secret
      );
      res.status(200).json({ status: "Login succesful", token: token });
      return;
    } else {
      res.status(401).json({ status: "error", message: "Wrong Password!" });
      return;
    }
  } catch (error) {
    res.status(500).json({ status: "error", message: error });
    return;
  }
});

app.post("/api/newReport", async (req, res) => {
  try {
    if (!req.body) {
      res.status(400).json({ status: "error", message: "Empty request" });
      return;
    }
    const report = await Report.create({
      userEmail: req.body.userEmail,
      userName: req.body.userName,
      dateReported: req.body.dateReported,
      time: req.body.time,
      campusLocation: req.body.campusLocation,
      status: {
        injuryOrIllness: req.body.status.injuryOrIllness,
        unsafeCondition: req.body.status.unsafeCondition,
        environmentalSpill: req.body.status.environmentalSpill,
        fire: req.body.status.fire,
        nonVehicularAccident: req.body.status.nonVehicularAccident,
        other: req.body.status.other,
      },
      otherType: req.body.otherType,
      // Section 2
      sectionTwoType: {
        none: req.body.sectionTwoType.none,
        physicalInjury: req.body.sectionTwoType.physicalInjury,
        occupationalIllness: req.body.sectionTwoType.occupationalIllness,
        potentialHarmfulExposure:
          req.body.sectionTwoType.potentialHarmfulExposure,
      },
      treatment: {
        none: req.body.treatment.none,
        firstAid: req.body.treatment.firstAid,
        emergencyMedicalServices: req.body.treatment.emergencyMedicalServices,
        personalPhysician: req.body.treatment.personalPhysician,
        studentHealthServices: req.body.treatment.studentHealthServices,
        hospitalOutpatient: req.body.treatment.hospitalOutpatient,
        hospitalAdmitted: req.body.treatment.hospitalAdmitted,
      },
      // Section 3
      damagedOrLostItems: {
        none: req.body.damagedOrLostItems.none,
        personalProperty: req.body.damagedOrLostItems.personalProperty,
        UniversityProperty: req.body.damagedOrLostItems.UniversityProperty,
      },
      descriptionDamagesOrItemsLost: req.body.descriptionDamagesOrItemsLost,
      reportCompletedBy: {
        sameAsAbove: req.body.reportCompletedBy.sameAsAbove,
        otherCompletedByname: req.body.reportCompletedBy.otherCompletedByname,
        otherCompletedByphone: req.body.reportCompletedBy.otherCompletedByphone,
        otherCompletedByemail: req.body.reportCompletedBy.otherCompletedByemail,
        otherCompletedBydateReported:
          req.body.reportCompletedBy.otherCompletedBydateReported,
      },
      closed: false,
    });
    res.status(200).json({ status: "success", reportID: report._id });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "error", message: err });
  }
});

app.listen(5001, () => {
  console.log("Server started at port 5001");

  mongoose.connection.on("connected", () => {
    console.log("Connected to MongoDB");
  });
  mongoose.connection.on("error", (err) => {
    console.log("Error: " + err);
  });
});
