const wikiId = "2798ba09d7fab878ba7c6d67fc1ac123";
const eventId = "Mzk2NjkwMTZ8MTcwNjU3NDExNS40OTM3MDc";
const showMoreButton = document.querySelector(".displayBlock");
let city = "";
let currentPage = 1;
let totalEvents = 0; // Track the total number of events

function searchEventsByCity(page = 1) {
  // Check if the search input has content
  if (!city) {
    console.error("Please enter a city in the search input.");
    return;
  }

  const eventCityUrl =
    "https://api.seatgeek.com/2/events?venue.city=" +
    city +
    "&taxonomies.name=concert=&client_id=" +
    eventId +
    "&page=" +
    page;

  fetch(eventCityUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (locationData) {
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
      showMoreButton.style.padding = "15px 40px 15px 55px";

      // Increment the currentPage after successfully fetching data
      currentPage = page + 1;

      // Call displayEvents to update cards
      displayEvents(locationData.events);
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

  searchEventsByCity();
  displayEvents([]); // Display an initial empty array of events
});

showMoreButton.addEventListener("click", function () {
  // Load the next page of events
  searchEventsByCity(currentPage);
});

const cards = document.querySelectorAll(".card");

function displayEvents(events) {
  // Update each card with performer details
  cards.forEach((card, index) => {
    const userName = document.createElement("h6");
    const address = document.createElement("p");
    const date = document.createElement("p");
    const dateFormat = dayjs().format("D MMMM");

    const flexColumn = card.querySelector(".flex-column");
    flexColumn.innerHTML = "";

    // Check if events[index] and events[index].performers exist
    if (events[index] && events[index].performers) {
      // Iterate through performers and create elements
      events[index].performers.forEach((performer) => {
        const performerElement = document.createElement("h5");
        performerElement.textContent = performer.name;

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


















// document.querySelector('.btn-info').addEventListener('click', function() {
//     const userName = "";

//     // Call the seeMore function with the user name
//     seeMore(userName);
//   });
// function seeMore(userName) {
//     const cards = document.querySelectorAll('.your-card-class'); // Replace with your actual card class or selector
//     cards.forEach((card) => {
//       card.style.display = "none";
//       const seeMoreUrl =
//         "https://en.wikipedia.org/w/rest.php/v1/search/page?q=" +
//         userName +
//         "&limit=10";
//       fetch(seeMoreUrl)
//         .then(function (response) {
//           return response.json();
//         })
//         .then(function (data) {
//           const docArray = data.response.docs;
//           for (let i = 0; i < docArray.length; i++) {
//             card.style.display = "block";
//             const listItem = document.createElement("li");
//             listItem.textContent = docArray[i].description;
//             card.appendChild(listItem); // Assuming card is a container where you want to append the list items
//           }
//         })
//         .catch(function (error) {
//           console.log(error);
//         });
//     });
//   }
