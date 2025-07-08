window.onload = async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const destination = urlParams.get("destination");
  const days = urlParams.get("days");
  const itineraryContainer = document.getElementById("itinerary-content");



  if (!destination || !days) {
    itineraryContainer.innerHTML = `<p style="color:red;">Missing destination or number of days. Please try again.</p>`;
    return;
  }



  const prompt = `
  You are a professional travel planner. Create a highly realistic and personalized ${days}-day travel itinerary for a trip to ${destination}, based on widely known and accurate information as of today.
  
  Your itinerary should include if having for ${destination}:
  - Morning, afternoon, and evening plans for each day
  - Top-rated and famous sights that are open to the public
  - Authentic local experiences (like cultural activities or markets)
  - Realistic food recommendations with well-known local dishes or popular restaurants
  - Built-in flexibility for rest or personal time
  - Local travel tips (e.g., best visiting hours, ticket info, transport options)
  
  Ensure all places and suggestions are real, publicly known, and likely to be currently operating. Do not invent attractions or restaurants. Prioritize widely available, verifiable information. Write in clear, easy-to-read English with day-by-day formatting.
  `;

  
  itineraryContainer.innerHTML = `<p>Generating your itinerary for <strong>${destination}</strong>... <br><br><i class="fas fa-spinner fa-spin"></i></p>`;

  try {
    // 🔐 Fetch API key from server
    const keyRes = await fetch('/apikey');
    const keyData = await keyRes.json();
    const apiKey = keyData.key;

    if (!apiKey) {
      throw new Error('API key not found on server.');
    }

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: apiKey,
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost"
      },
      body: JSON.stringify({
        model: "deepseek/deepseek-r1:free",
        messages: [{ role: "user", content: prompt }],
      }),
    });

    const data = await response.json();
    const itinerary = data.choices?.[0]?.message?.content || "No response received.";

    const formattedItinerary = itinerary
  .split("\n")
  .filter(line => line.trim() !== "")
  .map(line => `<div class="itinerary-card">${line}</div>`)
  .join("");

// Load and insert the image after itinerary is ready
const imageHTML = await loadDestinationImage(destination);

// Final combined HTML
itineraryContainer.innerHTML = `
  <div style="margin-bottom: 20px;">
    ${imageHTML}
  </div>
  ${formattedItinerary}
`;

  } catch (error) {
    itineraryContainer.innerHTML = `<p style="color:red;">Error: ${error.message}</p>`;
    console.error("Error fetching itinerary:", error);
  }
};

async function loadDestinationImage(destination) {
  try {
    const keyRes = await fetch('/imgapikey');
    const keyData = await keyRes.json();
    const accessKey = keyData.key;

    if (!accessKey) throw new Error("Image API key missing");

    const res = await fetch(`https://api.unsplash.com/search/photos?query=${encodeURIComponent(destination)}&client_id=${accessKey}&orientation=landscape&per_page=1`);
    const data = await res.json();

    if (data.results && data.results.length > 0) {
      const imgUrl = data.results[0].urls.regular;
     return `<img class="destination-img" src="${imgUrl}" alt="${destination}" style="width:100%; max-height:400px; object-fit:cover; border-radius:10px;" />`;
    } else {
      return `<p style="color:gray;">No image found for ${destination}</p>`;
    }
  } catch (err) {
    console.error("Image fetch error:", err);
    return `<p style="color:red;">Could not load image.</p>`;
  }
}



  const prompta = `
  You are a professional travel planner. Create a highly realistic and personalized with recommended days travel itinerary for a trip to ${destination}, based on widely known and accurate information as of today.
  
  Your itinerary should include if having for ${destination}:
  - Morning, afternoon, and evening plans for each day
  - Top-rated and famous sights that are open to the public
  - Authentic local experiences (like cultural activities or markets)
  - Realistic food recommendations with well-known local dishes or popular restaurants
  - Built-in flexibility for rest or personal time
  - Local travel tips (e.g., best visiting hours, ticket info, transport options)
  
  Ensure all places and suggestions are real, publicly known, and likely to be currently operating. Do not invent attractions or restaurants. Prioritize widely available, verifiable information. Write in clear, easy-to-read English with day-by-day formatting.
  `;