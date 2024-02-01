//* added API ids and response for events
const eventId = "Mzk2NjkwMTZ8MTcwNjU3NDExNS40OTM3MDc"
const wikiId = "2798ba09d7fab878ba7c6d67fc1ac123"

//'https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch={artist}&format=json'


let city = "tbilisi"

function displayEventsByCity() {
  let eventCityUrl = 'https://api.seatgeek.com/2/events?venue.city=' + city + '&taxonomies.name=concert=&client_id=' + eventId
  fetch(eventCityUrl)
  .then(function(response) {
    return response.json()
  }).then(function(locationData) {
   
    console.log(locationData) 
   } 
    
  ) 
}

  let button = document.querySelector('.search-button')
  let searchedCity = document.querySelector('.city-name')
    button.addEventListener("click", function (event) {
    event.preventDefault();

    city = searchedCity.value;
    displayEventsByCity(city)

    
});


