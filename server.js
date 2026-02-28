const express = require("express");
const cors = require("cors");
const axios = require("axios");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

// ✅ tampilkan frontend
app.use(express.static(__dirname));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// ✅ API DOWNLOAD
app.post("/download", async (req, res) => {

  const { url } = req.body;

  if (!url) {
    return res.status(400).json({
      error: "URL tidak ada"
    });
  }

  try {

    const response = await axios.get(
      `https://tikwm.com/api/?url=${url}`
    );

    res.json({
      video: response.data.data.play
    });

  } catch (err) {
    res.status(500).json({
      error: "Gagal mengambil video"
    });
  }

});

// ✅ PORT RAILWAY
const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log("TikSave running on port " + PORT);
});