// enter city and pull up list of events in that city


$('#searchBtn').on('click', function(event) {
    event.preventDefault();
    let inputValue = $('#query').val();
    let dateInputValue =$('#datepicker').val();
   
    dateInputValue = dateInputValue + 'T00:00:00Z'
    let ticketmasterUrl = 'https://app.ticketmaster.com/discovery/v2/events.json?city='+inputValue+'&startDateTime='+dateInputValue+'&apikey=asJ5IIkFeppppkdFCPGgBB2cJYnYkfCT'
    console.log(dateInputValue)
    fetch(ticketmasterUrl)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        console.log(data._embedded.events)
        let events = [0, 1, 2, 3, 4,];
        let eventsContainer = $('#eventsContainer')
        eventsContainer.empty()

// forEach to cycle through eachnew event and display the correct properties to HTML
        events.forEach(function(i) {
            let newEvent = data._embedded.events[i].name;
            eventsContainer.append("<div class='col customCard'>" +
                                   "<h5>" + newEvent + "</h5>" + 
                                   "<p>" + data._embedded.events[i].dates.start.localDate + "</p>" + 
                                   "<p>" + data._embedded.events[i].dates.start.localTime + "</p>" + 
                                   "<p>" + data._embedded.events[i]._embedded.venues[0].name + "</p>" + 
                                   "<button>" + "Find Local Restaraunts" + "</button>")
        })

        
    });

    
    
 // when event is clicked display the event name, venue and date of event
    
    fetch(ticketmasterUrl)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        console.log(data._embedded.events[0]._embedded.venues[0].location.latitude)
        console.log(data._embedded.events[0]._embedded.venues[0].location.longitude)
    
        let venueLong = data._embedded.events[0]._embedded.venues[0].location.longitude
        let venueLat = data._embedded.events[0]._embedded.venues[0].location.latitude


    // let resturantUrl = 'https://api.documenu.com/v2/restaurants/search/geo?lat='+venueLat+'&lon='+venueLong+'&distance=5&fullmenu=true'   
    //     fetch(resturantUrl, {
    //         headers: {
    //             'X-API-KEY': 'b0c70c0a6e86ee22a0cd19bb00e652d6'
    //         }
    //     })
    //      .then(response => response.json())
    //      .then( data =>
    //         console.log(data));
    });




});

// Datepicker widget
$(function () {
    $('#datepicker').datepicker({
      changeMonth: true,
      changeYear: true,
      dateFormat: 'yy-mm-dd'
    });
  });

