const express = require("express");
const cors = require("cors");
const axios = require("axios");
const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// TEST API
app.get("/api", (req, res) => {
  res.send("TikSave API Running 🚀");
});

// DOWNLOAD VIDEO API (ambil link TikTok)
app.post("/download", async (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ status: false, error: "URL tidak ditemukan" });

  try {
    const response = await axios.get(`https://tikwm.com/api/?url=${url}`);
    res.json({
      status: true,
      video: response.data.data.play
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ status: false, error: "Gagal mengambil video" });
  }
});

// DOWNLOAD VIDEO VIA SERVER (AUTO DOWNLOAD)
app.get("/download-video", async (req, res) => {
  const videoUrl = req.query.url;
  if (!videoUrl) return res.status(400).send("URL video tidak ditemukan");

  try {
    const response = await axios({
      url: videoUrl,
      method: "GET",
      responseType: "stream"
    });

    res.setHeader("Content-Disposition", 'attachment; filename="tiktok.mp4"');
    response.data.pipe(res);
  } catch (err) {
    res.status(500).send("Download gagal");
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));