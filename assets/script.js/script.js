

const wikiId = "2798ba09d7fab878ba7c6d67fc1ac123";
const eventId = "Mzk2NjkwMTZ8MTcwNjU3NDExNS40OTM3MDc";
let city = ""

function searchEventsByCity() {
    const eventCityUrl = 'https://api.seatgeek.com/2/events?venue.city=' + city + '&taxonomies.name=concert=&client_id=' + eventId
    fetch(eventCityUrl)
        .then(function (response) {
            return response.json()
        }).then(function (locationData) {
            if (locationData.events.length === 0) {
                console.error("No events found in " + city);
                return;
            }

        }

        )
}

const button = document.getElementById('search-btn')
const searchedCity = document.getElementById('search-input')
button.addEventListener("click", function (event) {
    event.preventDefault();

    city = searchedCity.value;
    searchEventsByCity()
    displayEvents(city)



});

const cards = document.querySelectorAll(".card");

function displayEvents(city) {
    const requestUrl = 'https://api.seatgeek.com/2/events?venue.city=' + city + '&taxonomies.name=concert=&client_id=' + eventId
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
                const address = document.createElement("p");
                const date = document.createElement("p")
                const dateFormat = dayjs().format('D MMMM')
                console.log(dateFormat)


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
                    data.events[index].venue.name;
                address.textContent = data.events[index].venue.address;
                date.textContent = data.events[index].datetime_local
                date.textContent = dateFormat

                // Append user details to the card

                flexColumn.append(userName);
                flexColumn.append(address);
                flexColumn.append(date);

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



const showMoreBtn = document.querySelectorAll(".btn")

showMoreBtn.forEach((button) => {
    button.addEventListener("click", seeMore);
});

function seeMore() {
    cards.forEach((card) => {
        card.style.display = "none";
        const seeMoreUrl = 'https://api.seatgeek.com/2/events?venue.city=' + city + '&taxonomies.name=concert=&client_id=' + eventId
        fetch(seeMoreUrl)
            .then(function (response) {
                return response.json()
            }).then(function (sameDataForNow) {
// more info goes here
                
            }

            )
        
    });
}




