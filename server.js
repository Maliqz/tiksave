const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("TikSave API Running 🚀");
});

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

const PORT = process.env.PORT;

app.listen(PORT, "0.0.0.0", () => {
  console.log("TikSave running on port " + PORT);
});