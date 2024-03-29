const wikiId = "2798ba09d7fab878ba7c6d67fc1ac123";
const eventId = "Mzk2NjkwMTZ8MTcwNjU3NDExNS40OTM3MDc";
const showMoreButton = document.querySelector(".displayBlock");
let city = "new york" || "";
let currentPage = 1;
let totalEvents = 0; // Track the total number of events
let artist = "";
let getEventsUrl = [];

let prevArtist = "";

function searchEventsByCity(page = 1) {
  // Check if the search input has content
  if (!city) {
    console.error("Please enter a city in the search input.");
    return;
  }

  const eventCityUrl =
    "https://api.seatgeek.com/2/events?venue.city=" +
    city +
    "&taxonomies.name=concert&taxonomies.name=dance_performance_tour&client_id=" +
    eventId +
    "&page=" +
    page;

  fetch(eventCityUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (locationData) {
      console.log(locationData);

      if (locationData.events.length === 0) {
        console.error("No events found in " + city);
        return;
      }

      // Update totalEvents
      totalEvents = locationData.meta.total;

      // Display the "Show More" button
      showMoreButton.style.display = "block";
      showMoreButton.style.marginTop = "50px";
      showMoreButton.style.borderRadius = "15px";
      showMoreButton.style.padding = "15px 40px 15px 40px";

      // Increment the currentPage after successfully fetching data
      currentPage = page + 1;

      // Call displayEvents to update cards
      displayEvents(locationData.events);
      return eventCityUrl;
    });
}

const button = document.getElementById("search-btn");
const searchedCity = document.getElementById("search-input");
button.addEventListener("click", function (event) {
  event.preventDefault();

  city = searchedCity.value;

  // Check if the search input has content before proceeding
  if (!city) {
    console.error("Please enter a city in the search input.");
    return;
  }
  const hidePage = document.querySelector(".second-page");
  hidePage.style.display = "none";
  cards.forEach((card) => {
    showMoreButton.style.display = "none";
    card.style.display = "flex";
  });

  searchEventsByCity();
  displayEvents([]); // Display an initial empty array of events
});
function displayEvents(events) {
  // Update each card with performer details
  if (events.length === 0) {
    return;
  }
  getEventsUrl = []
  cards.forEach((card, index) => {
    const userName = document.createElement("h6");
    const address = document.createElement("p");
    const date = document.createElement("p");
    const dateFormat = dayjs().format("D MMMM");

    const flexColumn = card.querySelector(".flex-column");
    flexColumn.innerHTML = "";
    getEventsUrl.push(events[index].url);

    // Check if events[index] and events[index].performers exist
    if (events[index] && events[index].performers) {
      // Iterate through performers and create elements
      events[index].performers.forEach((performer) => {
        const performerElement = document.createElement("h5");
        performerElement.textContent = performer.name;
        artist = performer.name; // Update the artist variable

        // pushing event url to global array to use it in function

        // Store the current artist in a data attribute on the card element

        card.dataset.artist = artist;

        // Append performer element to the card
        flexColumn.appendChild(performerElement);
      });
    }

    // Check if events[index] and other properties exist before accessing them
    if (events[index] && events[index].venue && events[index].datetime_local) {
      userName.textContent = events[index].venue.name;
      address.textContent = events[index].venue.address;
      date.textContent = events[index].datetime_local;
      date.textContent = dateFormat;
    }

    // Append user details to the card
    flexColumn.append(userName);
    flexColumn.append(address);
    flexColumn.append(date);

    // Check if events[index].performers exist before accessing the first performer's image URL
    const performerImageURL =
      events[index] &&
      events[index].performers &&
      events[index].performers[0] &&
      events[index].performers[0].image;

    if (performerImageURL) {
      const cardImage = card.querySelector("img");
      cardImage.src = performerImageURL;
      cardImage.alt = "Performer Image";
    }
  });
}
searchEventsByCity();

// Select all buttons with the class "btn"
const seeMoreBtn = document.querySelectorAll(".btn");

// Attach click event listeners to each button
seeMoreBtn.forEach((button, index) => {
  button.addEventListener("click", function () {
    // Find the closest parent element with the class "card"
    const card = button.closest(".card");
    // Retrieve the artist's name from the dataset
    const artist = card.dataset.artist;

    // added events url for a link and localstorage
    const url = getEventsUrl[index];
    const addEventsUrl = document.querySelector(".card-link-2");
    addEventsUrl.href = url;
    addEventsUrl.target = "_blank";
    localStorage.setItem("url", url);
    console.log(localStorage);

    // If artist exists, call the seeMore function
    if (artist) {
      seeMore(artist);
    }
  });
});

// Add click event listener to the "show more" button
showMoreButton.addEventListener("click", function () {
  // Check if the current artist is the same as the previous one
  if (artist === prevArtist) {
    console.log("Same artist as previous research. Skipping API call.");
    return;
  }

  // Load the next page of events
  searchEventsByCity(currentPage);

  // Check if the current artist is the same as the previous one
  prevArtist = artist;
});

// Select all elements with the class "card"
const cards = document.querySelectorAll(".card");

// Function to fetch additional information about an artist
function seeMore(artist) {
  // Use the provided artist parameter in the Wikipedia API request
  let wikiUrl =
    "https://en.wikipedia.org/api/rest_v1/page/summary/" +
    artist +
    "?redirect=false";

  fetch(wikiUrl)
    .then(function (response) {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Network response was not ok.");
      }
    })
    .then(function (wikiData) {
      const cardTitle = document.querySelector(".card-title");
      const cardText = document.querySelector(".description");
      const secondPage = document.querySelector(".second-page");
      const infoImage = document.querySelector(".card-img-top");
      const wikiUrl = document.querySelector(".card-link");
      const historyList = document.querySelector(".history-list");

      // Hide cards and display the second page
      cards.forEach((card) => {
        showMoreButton.style.display = "none";
        historyList.style.display = "none";
        card.style.display = "none";
        secondPage.style.display = "flex";
        secondPage.style.justifyContent = "center";
        secondPage.style.flexDirection = "row";
      });

      // Update elements with retrieved Wikipedia data
      if (artist && wikiData.title) {
        infoImage.src = wikiData.thumbnail.source;
        cardTitle.textContent = wikiData.title;
        cardText.textContent = wikiData.extract;
        wikiUrl.href = wikiData.content_urls.desktop.page;
        wikiUrl.target = "_blank";
      }
    })

    .catch(function (error) {
      // Handle errors
      console.log("Error:", error);
      const cardTitle = document.querySelector(".card-title");
      const cardText = document.querySelector(".description");
      const secondPage = document.querySelector(".second-page");
      const infoImage = document.querySelector(".card-img-top");
      const wikiUrl = document.querySelector(".card-link");
      const historyList = document.querySelector(".history-list");

      // Hide cards and display error message
      cards.forEach((card) => {
        card.style.display = "none";
        historyList.style.display = "none";
        secondPage.style.display = "flex";
        secondPage.style.justifyContent = "center";
        secondPage.style.flexDirection = "row";
      });

      // Update elements with error message
      infoImage.src =
        "https://media.istockphoto.com/id/513231275/photo/depressed-3d-man-sitting-on-white.jpg?s=1024x1024&w=is&k=20&c=miBuE4k99U1SYY_Y-bA4es5gLdduCLAAT2VWE63CbdE=";
      showMoreButton.style.display = "none";
      cardTitle.textContent = "No match found";
      cardText.textContent =
        "We are sorry, we don't have more information about the artist.";
      wikiUrl.textContent = "No information about artist";
    });
}
// Add click event listener to a button with the class "history-list"
const historyButton = document.querySelector(".history-list");
historyButton.addEventListener("click", function () {
  // Retrieve URL from local storage and open it in a new tab
  const storedUrl = localStorage.getItem("url");
  console.log(storedUrl);
  historyButton.href = storedUrl;
  historyButton.target = "_blank";
});
