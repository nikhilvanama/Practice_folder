const form = document.querySelector(".generate-form");
const generateButton = form.querySelector(".generate-btn");
const gallery = document.querySelector(".image-gallery");

const API_KEY = "YOUR-OPENAI-API-KEY-HERE"; // Replace with your API key
let isLoading = false;

// Function to update each image card with the generated AI image
let showImages = (imageDataList) => {
  imageDataList.forEach((imageData, i) => {
    let card = gallery.querySelectorAll(".img-card")[i];
    let img = card.querySelector("img");
    let downloadLink = card.querySelector(".download-btn");

    let base64Image = `data:image/jpeg;base64,${imageData.b64_json}`;
    img.src = base64Image;

    img.onload = () => {
      card.classList.remove("loading");
      downloadLink.setAttribute("href", base64Image);
      downloadLink.setAttribute("download", `${new Date().getTime()}.jpg`);
    };
  });
};

// Function to generate AI images using OpenAI API
let getAIImages = async (prompt, quantity) => {
  try {
    let response = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        prompt: prompt,
        n: quantity,
        size: "512x512",
        response_format: "b64_json"
      }),
    });

    if (!response.ok) {
      throw new Error("Could not generate images. Check your API key.");
    }

    let result = await response.json();
    showImages(result.data);
  } catch (err) {
    alert(err.message);
  } finally {
    generateButton.removeAttribute("disabled");
    generateButton.innerText = "Generate";
    isLoading = false;
  }
};

// When the form is submitted
form.addEventListener("submit", function (e) {
  e.preventDefault();
  if (isLoading) return;

  let promptText = e.target[0].value;
  let imgCount = parseInt(e.target[1].value);

  // Set loading state and update UI
  generateButton.setAttribute("disabled", true);
  generateButton.innerText = "Generating";
  isLoading = true;

  // Add loading image cards
  let cards = Array.from({ length: imgCount }, () => `
    <div class="img-card loading">
      <img src="images/loader.svg" alt="loading image" />
      <a class="download-btn" href="#">
        <img src="images/download.svg" alt="download icon" />
      </a>
    </div>
  `).join("");

  gallery.innerHTML = cards;

  // Call the API
  getAIImages(promptText, imgCount);
});
