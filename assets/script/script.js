

const headers = new Headers({
  "Content-Type": "application/json",
  "x-api-key": "DEMO-API-KEY"
});

var requestOptions = {
  method: 'GET',
  headers: headers,
  redirect: 'follow'
};

fetch("https://api.thecatapi.com/v1/images/search?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=0&limit=1", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));        

  const eventId = "Mzk2NjkwMTZ8MTcwNjU3NDExNS40OTM3MDc"
  const wikiId = "2798ba09d7fab878ba7c6d67fc1ac123"
  
  fetch('https://api.seatgeek.com/2/events/?client_id=' + eventId)
  .then(function(response) {
    return response.json()
  }).then(function(eventData) {
    console.log(eventData)
  })