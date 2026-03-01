const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

// IMPORTANT FOR RAILWAY PORT
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// ✅ INI YANG KAMU TANYA
// supaya index.html kebuka otomatis
app.use(express.static("public"));


// TEST API
app.get("/api", (req, res) => {
  res.send("TikSave API Running 🚀");
});


// DOWNLOAD API
app.post("/download", async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({
      error: "URL tidak ditemukan"
    });
  }

  try {
    const response = await axios.get(
      `https://tikwm.com/api/?url=${url}`
    );

    res.json({
  status: true,
  video: response.data.data.play
});

  } catch (error) {
    console.log(error.message);

    res.status(500).json({
      error: "Gagal mengambil video"
    });
  }
});


// START SERVER
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});