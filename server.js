const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");
const { pipeline } = require("stream");

const app = express();
app.use(cors());

app.get("/radio", async (req, res) => {
  try {
    const radioResponse = await fetch("http://juventudpalabramiel.org:8000/radio.mp3");

    if (!radioResponse.ok) {
      return res.status(500).send("Error al obtener el stream");
    }

    res.setHeader("Content-Type", "audio/mpeg");

    pipeline(radioResponse.body, res, (err) => {
      if (err) {
        console.error("Pipeline error:", err);
        res.status(500).end();
      }
    });

  } catch (err) {
    console.error("Fetch error:", err);
    res.status(500).send("Error interno del servidor");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Proxy running on port " + PORT));
