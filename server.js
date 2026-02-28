const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(cors());
app.use(express.json());

// TEST SERVER
app.get("/", (req, res) => {
  res.send("Server TikTok Downloader aktif 🚀");
});

// API DOWNLOAD
app.post("/download", async (req, res) => {
  const { url } = req.body;

  try {
    const response = await axios.get(
      `https://tikwm.com/api/?url=${url}`
    );

    res.json({
      video: response.data.data.play
    });

  } catch (error) {
    res.status(500).json({
      error: "Gagal mengambil video"
    });
  }
});

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});