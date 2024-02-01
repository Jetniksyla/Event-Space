// SeatGeek API credentials
const wikiId = "2798ba09d7fab878ba7c6d67fc1ac123";
const eventId = "Mzk2NjkwMTZ8MTcwNjU3NDExNS40OTM3MDc";

// DOM elements
const fetchButton = document.getElementById("search-btn");
const cards = document.querySelectorAll(".card");

// Function to explore events in a city
const exploreCity = (event) => {
  const cityName = event.target.textContent;
  const seatGeek_API_URL = "https://api.seatgeek.com/2/events?q=" + cityName;

  // Fetch events data from SeatGeek API
  fetch(seatGeek_API_URL)
    .then((res) => res.json())
    .then((data) => {
      if (!data.events || data.events.length === 0) {
        console.error("No events found in " + cityName);
        return;
      }

      const events = data.events;
      console.log(events);
    })
    .catch((error) => {
      console.error("Error fetching events: " + error);
    });
};

// Event listeners for each search button
const fetchButtons = document.querySelectorAll(".search-btn");
fetchButtons.forEach((button) => {
  button.addEventListener("click", exploreCity);
});

// Function to fetch data from SeatGeek API and update the UI
function getApi() {
  const requestUrl = "https://api.seatgeek.com/2/events/?client_id=" + eventId;

  // Fetch data from SeatGeek API
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);

      // Update each card with performer details
      cards.forEach((card, index) => {
        const userName = document.createElement("h5");
        const userUrl = document.createElement("p");

        const flexColumn = card.querySelector(".flex-column");
        flexColumn.innerHTML = "";

        // Iterate through performers and create elements
        data.events[index].performers.forEach((performer) => {
          const performerElement = document.createElement("h5");
          performerElement.textContent = performer.name;

          // Append performer element to the card
          flexColumn.appendChild(performerElement);
        });

        userName.textContent =
          "Performer: " + data.events[index].performers[0].name;
        userUrl.textContent = "Event ID: " + data.events[index].id;

        // Append user details to the card
        flexColumn.append(userName);
        flexColumn.append(userUrl);

        // Update existing image element with performer image
        const performerImageURL = data.events[index].performers[0].image;
        if (performerImageURL) {
          const cardImage = card.querySelector("img");
          cardImage.src = performerImageURL;
          cardImage.alt = "Performer Image";
        }
      });
    })
    .catch(function (error) {
      console.error("Error fetching data:", error);
    });
}

// Event listener for the main fetch button
fetchButton.addEventListener("click", getApi);
