// enter city and pull up list of events in that city

$('#searchBtn').on('click', function(event) {
    event.preventDefault();
    let inputValue = $('#query').val();
    let ticketmasterUrl = 'https://app.ticketmaster.com/discovery/v2/events.json?city='+inputValue+'&apikey=asJ5IIkFeppppkdFCPGgBB2cJYnYkfCT'
    
    
    fetch(ticketmasterUrl)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        console.log(data._embedded.events)
        
    });
    
    
    
 // when event is clicked display the event name, venue and date of event
    // let eventDetailsUrl = 'https://app.ticketmaster.com/discovery/v2/events.json?city=atlanta&apikey=asJ5IIkFeppppkdFCPGgBB2cJYnYkfCT'
    fetch(ticketmasterUrl)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        console.log(data._embedded.events[0]._embedded.venues[0].location.latitude)
        console.log(data._embedded.events[0]._embedded.venues[0].location.longitude)
    
        let venueLong = data._embedded.events[0]._embedded.venues[0].location.longitude
        let venueLat = data._embedded.events[0]._embedded.venues[0].location.latitude


    let resturantUrl = 'https://api.documenu.com/v2/restaurants/search/geo?lat='+venueLat+'&lon='+venueLong+'&distance=5&fullmenu=true'   
        fetch(resturantUrl, {
            headers: {
                'X-API-KEY': 'b0c70c0a6e86ee22a0cd19bb00e652d6'
            }
        })
         .then(response => response.json())
         .then( data =>
            console.log(data))
    });




});

// testing the new docuManu API
// let resturantUrl = 'https://api.documenu.com/v2/restaurant/4072702673999819?key=b0c70c0a6e86ee22a0cd19bb00e652d6'

// fetch(resturantUrl)
//     .then(response => response.json())
//     .then(data => {
//         console.log(data)
//     })

// view food button clicked display resturants nearby






