const button = document.getElementById("downloadBtn");
const input = document.getElementById("url");
const result = document.getElementById("result");

button.addEventListener("click", downloadVideo);

async function downloadVideo() {
  const url = input.value.trim();
  if (!url) {
    alert("Masukkan link TikTok!");
    return;
  }

  result.innerHTML = "<p>Loading...</p>";

  try {
    const res = await fetch("/download", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url })
    });

    const data = await res.json();

    if (!data.status) {
      result.innerHTML = "<p>Video tidak ditemukan.</p>";
      return;
    }

    result.innerHTML = `
      <video controls>
        <source src="${data.video}" type="video/mp4">
      </video>
      <br><br>
      <a href="/download-video?url=${encodeURIComponent(data.video)}">
        <button>Download Video</button>
      </a>
    `;
  } catch (err) {
    console.error(err);
    result.innerHTML = "<p>Server error.</p>";
  }
}