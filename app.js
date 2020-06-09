const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const mongoose = require("mongoose");

const app = express();
app.set("view engine", "ejs");

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(express.static("public"));

const db = "mongodb://localhost:27017/pouyansDB";
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true });

const projectSchema = new mongoose.Schema({
  _id: Number,
  name: String,
  category: Number,
  date: String,
  url: String,
  desc: String,
});
const categorySchema = new mongoose.Schema({
  _id: Number,
  name: String,
});

let page_name = "";
let message = "";
let pictures = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20"];

app.get("/", (req, res) => {
  res.render("index", {
    page_name: "index",
  });
});

app.get("/projects", (req, res) => {
  res.render("projects", {
    pictures: pictures,
    page_name: "projects",
  });
});

app.get("/project", (req, res) => {
  res.render("project");
});

app.get("/contact", (req, res) => {
  res.render("contact", {
    page_name: "contact",
    message: message,
  });
});

// Post requests
app.post("/contact", (req, res) => {
  // console.log(req.body);
  const output = `
    <p>You have a new contact message!</p>
    <h3>Contact Details</h3>
    <ul>
        <li>Name: ${req.body.name}</li>
        <li>Email: ${req.body.email}</li>
        <li>Subject: ${req.body.subject}</li>
    </ul>
    <h3>Message: </h3>
    <p>${req.body.message}</p>
    `;

  // Nodemailer
  async function main() {
    // Generate test SMTP service account from ethereal.email

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "localhost",
      port: 25,
      secure: false, // true for 465, false for other ports
      auth: none,

      tls: {
        rejectUnauthorized: false,
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: "'Contact Form' <me@elmiraalif.com", // sender address
      to: "pouyan.ajali@gmail.com", // list of receivers
      subject: "1 Message", // Subject line
      html: output, // html body
    });

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  }

  main().catch(console.error);

  res.render("contact", { message: "Thank you for contacting me! I'll reach back very soon." });
});

app.listen(3000, () => {
  console.log("Server Initialized on port 3000");
});
