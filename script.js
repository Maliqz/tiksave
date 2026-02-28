async function downloadVideo() {

  const url = document.getElementById("url").value;
  const result = document.getElementById("result");

  if (!url) {
    result.innerHTML = "Paste link first!";
    return;
  }

  result.innerHTML = "Processing video...";

  try {

    const response = await fetch(
      "http://localhost:3000/download",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ url })
      }
    );

    const data = await response.json();

    result.innerHTML = `
      <video controls>
        <source src="${data.video}">
      </video>

      <a href="${data.video}" download class="download-btn">
        <button>Download Without Watermark</button>
      </a>
    `;

  } catch {
    result.innerHTML = "Failed to download video";
  }
}