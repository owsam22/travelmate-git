let userLocation = null;

function getLocation() {
  if (!navigator.geolocation) {
    alert("Geolocation is not supported by your browser.");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      userLocation = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      };
      console.log("User location:", userLocation);
      // Optional: display message to user
    },
    (error) => {
      alert("Unable to retrieve your location.");
      console.error("Geolocation error:", error);
    }
  );
}


const interestsInput = document.getElementById("interestsInput");
const selectedTagsContainer = document.getElementById("selectedTags");
let selectedTags = [];

interestsInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter" && interestsInput.value.trim() !== "") {
    e.preventDefault();
    addTag(interestsInput.value.trim());
    interestsInput.value = "";
  }
});

interestsInput.addEventListener("change", function () {
  if (interestsInput.value.trim() !== "") {
    addTag(interestsInput.value.trim());
    interestsInput.value = "";
  }
});

function addTag(tag) {
  if (!selectedTags.includes(tag.toLowerCase())) {
    selectedTags.push(tag.toLowerCase());
    const tagElement = document.createElement("div");
    tagElement.className = "tag";
    tagElement.innerHTML = `${tag} <i class="fas fa-times" onclick="removeTag(this, '${tag.toLowerCase()}')"></i>`;
    selectedTagsContainer.appendChild(tagElement);
  }
}

function removeTag(el, tag) {
  selectedTags = selectedTags.filter(t => t !== tag);
  el.parentElement.remove();
}

document.getElementById('tripForm').addEventListener('submit', function(event) {
  event.preventDefault();

  // Get user input
  const tripType = document.getElementById('tripType').value;
  const interests = selectedTags.join(',');
  const budget = document.getElementById('budget').value;
  const days = document.getElementById('days').value;
  const groupType = document.getElementById('groupType').value;
  const travelDate = document.getElementById('travelDate').value;
  const notes = document.getElementById('notes').value;

  // ✅ Get selected radio value
  const scope = document.querySelector('input[name="scope"]:checked').value;

  // Construct query string
  let queryString = `?tripType=${tripType}&interests=${interests}&budget=${budget}&days=${days}&groupType=${groupType}&travelDate=${travelDate}&notes=${notes}&scope=${scope}`;

  if (scope === "Nearby" && userLocation) {
    queryString += `&lat=${userLocation.latitude}&lon=${userLocation.longitude}`;
  }
  // Redirect to s.html with query parameters
  window.location.href = 's.html' + queryString;
});

