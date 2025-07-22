//import express from "express";
//var express = require("express");
//var app = express();
import app from "./server/express.js";
import router from "./server/assets-router.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//const assetsRouter = require("./server/assets-router");
app.use("/src", router);

// API routes would go here
app.use("/api", function (req, res) {
  res.send("Welcome to User application API");
});

// Serve React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/dist/index.html'));
});

app.listen(3000);
console.log("Server running at http://localhost:3000/");
//module.exports = app;
export default app;
