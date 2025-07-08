window.onload = async function () {
  const urlParams = new URLSearchParams(window.location.search);

  const latitude = urlParams.get('lat');
  const longitude = urlParams.get('lon');

  const tripType = urlParams.get('tripType');
  const budget = urlParams.get('budget');
  const days = urlParams.get('days');
  const groupType = urlParams.get('groupType');
  const travelDate = urlParams.get('travelDate');
  const notes = urlParams.get('notes');
  const scope = urlParams.get('scope') || 'India';


  let interestsRaw = decodeURIComponent(urlParams.get('interests') || '');
  let interests;
  try {
    interests = JSON.parse(interestsRaw);
    if (!Array.isArray(interests)) interests = [interests];
  } catch (e) {
    interests = [interestsRaw];
  }

  document.getElementById('userInputSummary').innerHTML = `
  <strong>Trip Type:</strong> ${tripType}<br>
  <strong>Interests:</strong> ${interests.join(', ')}<br>
  <strong>Budget:</strong> ${budget}<br>
  <strong>No. of Days:</strong> ${days}<br>
  <strong>Group Type:</strong> ${groupType}<br>
  <strong>Travel Date:</strong> ${travelDate}<br>
  <strong>Trip Scope:</strong> ${scope}<br>
  <strong>Additional Notes:</strong> ${notes || 'N/A'}<br>
`;


  document.getElementById('popup').classList.add('show');
  setTimeout(() => document.getElementById('popup').classList.remove('show'), 4000);

  const suggestionCards = document.getElementById('suggestionCards');
  suggestionCards.innerHTML = '<div class="loading-spinner"></div>';

const apiData = {
  tripType,
  interests,
  budget,
  days,
  groupType,
  travelDate,
  notes,
  scope,
  latitude,
  longitude
};



  try {
    const keyRes = await fetch('/apikey');
    const keyJson = await keyRes.json();
    const apiKey = keyJson.key;

    const imgKeyRes = await fetch('/imgapikey');
    const imgKeyJson = await imgKeyRes.json();
    const unsplashKey = imgKeyJson.key;

    if (!apiKey || !unsplashKey) throw new Error('Missing API keys.');

    fetchTravelSuggestions(apiData, apiKey, unsplashKey);
  } catch (err) {
    suggestionCards.innerHTML = `<p style="color:red;">Failed to get API keys: ${err.message}</p>`;
  }
};

async function fetchTravelSuggestions(data, apiKey, unsplashKey) {
  const responseDiv = document.getElementById('suggestionCards');
  responseDiv.innerHTML = `
    <div class="loader-wrapper">
      <span class="ultra-loader">Loading suggestions...</span>
      <span class="circle-loader"></span>
    </div>
  `;

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: apiKey,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'http://localhost'
      },
      body: JSON.stringify({
        model: 'deepseek/deepseek-r1:free',
        messages: [{
          role: 'user',
          content: data.scope === "Nearby"
  ? `I want travel recommendations within or around 500 km radius of the following coordinates:
Latitude: ${data.latitude}
Longitude: ${data.longitude}

Only return 3–4 suggestions.
For each suggestion:
1. Give the destination name.
2. Give 1–2 bullet points on what to do there.
No extra summary or greetings.

Trip Type: ${data.tripType}
Interests: ${data.interests.join(', ')}
Budget: ${data.budget}
Number of Days: ${data.days}
Group Type: ${data.groupType}
Travel Date: ${data.travelDate}
Additional Notes: ${data.notes || 'None'}`
  : `Can you recommend a trip based on the following details? Only give:
1. The name of the destination
2. 1–2 bullet points per destination on what to do there

Return only 3–4 suggestions, no explanations or summaries.

Trip Scope: ${data.scope}
Trip Type: ${data.tripType}
Interests: ${data.interests.join(', ')}
Budget: ${data.budget}
Number of Days: ${data.days}
Group Type: ${data.groupType}
Travel Date: ${data.travelDate}
Additional Notes: ${data.notes || 'None'}`


        }]
      })
    });

    const result = await response.json();
    const content = result.choices?.[0]?.message?.content?.trim() || 'No suggestions found.';
    const suggestions = content.split(/\n(?=\d\.|\-|\*|\•)/g).filter(line => line.trim());

    responseDiv.innerHTML = '';

    for (const section of suggestions) {
      const lines = section.trim().split('\n');
      const titleLine = lines[0].replace(/\*\*/g, '').replace(/^\d+\.\s*/, '').trim();
      const body = lines.slice(1).join('\n').trim();

      const imageUrl = await fetchUnsplashImage(titleLine, unsplashKey);

      const card = document.createElement('div');
      card.className = 'suggestion-card';
      card.innerHTML = `
    <div class="card-image-wrapper">
      <img src="${imageUrl}" alt="${titleLine}" class="destination-img" />
      <button class="create-itinerary-btn" onclick="createCardItinerary('${titleLine}')">Create Itinerary</button>
    </div>
    <div class="card-title">${titleLine}</div>
    <div class="card-body"><pre>${body}</pre></div>
  `;
      responseDiv.appendChild(card);
    }


  } catch (error) {
    responseDiv.innerHTML = 'Error: ' + error.message;
  }
}

async function fetchUnsplashImage(destination, accessKey) {
  try {
    const res = await fetch(`https://api.unsplash.com/search/photos?query=${encodeURIComponent(destination)}&per_page=1&orientation=landscape&client_id=${accessKey}`);
    const data = await res.json();
    return data.results?.[0]?.urls?.regular || 'https://via.placeholder.com/600x400?text=No+Image';
  } catch (err) {
    console.error('Image fetch error:', err);
    return 'https://via.placeholder.com/600x400?text=Image+Error';
  }
}
