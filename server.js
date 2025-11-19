const express = require("express");
const cors = require("cors");
const request = require("request");

const app = express();
app.use(cors());

app.get("/radio", (req, res) => {
  request("http://juventudpalabramiel.org:8000/radio").pipe(res);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Proxy running on port " + PORT));
