// enter city and pull up list of events in that city

const citySelect = $('citySelect');


const ticketmasterUrl = 'https://app.ticketmaster.com/discovery/v2/events.json?city=atlanta&apikey=asJ5IIkFeppppkdFCPGgBB2cJYnYkfCT'

fetch(ticketmasterUrl)
.then(response => response.json())
.then(data => {
    console.log(data);
    console.log(data._embedded.events)
    const eventDetails = data._embedded.events
});


// when event is clicked display the event name, venue and date of event
const eventDetailsUrl = 'https://app.ticketmaster.com/discovery/v2/events.json?city=atlanta&apikey=asJ5IIkFeppppkdFCPGgBB2cJYnYkfCT'
fetch(ticketmasterUrl)
.then(response => response.json())
.then(data => {
    console.log(data);
    console.log(data._embedded.events[0]._embedded.venues[0].location.latitude)
    console.log(data._embedded.events[0]._embedded.venues[0].location.longitude)

    const venueLong = data._embedded.events[0]._embedded.venues[0].location.longitude
    const venueLat = data._embedded.events[0]._embedded.venues[0].location.latitude
});


// view food button clicked display resturants nearby


