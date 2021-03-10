// enter city and pull up list of events in that city


$('#searchBtn').on('click', function(event) {
    event.preventDefault();
    let inputValue = $('#query').val();
    let dateInputValue =$('#datepicker').val();
   
    dateInputValue = dateInputValue + 'T00:00:00Z'
    let ticketmasterUrl = 'https://app.ticketmaster.com/discovery/v2/events.json?size=50&city='+inputValue+'&startDateTime='+dateInputValue+'&sort=date,asc&apikey=asJ5IIkFeppppkdFCPGgBB2cJYnYkfCT'
    console.log(dateInputValue)
    fetch(ticketmasterUrl)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        // console.log(data._embedded.events)
            
            let events = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
            let eventsContainer = $('#eventsContainer')
            let scrollBtn = $('.scrollBtn')
            eventsContainer.empty()
            
            // forEach to cycle through eachnew event and display the correct properties to HTML
            events.forEach(function(i) {
                let newEvent = data._embedded.events[i].name;
                let venueLong = data._embedded.events[i]._embedded.venues[0].location.longitude
                let venueLat = data._embedded.events[i]._embedded.venues[0].location.latitude
                eventsContainer.append("<div class='col customCard'>" +
                "<h5>" + newEvent + "</h5>" + 
                "<p>" + data._embedded.events[i].dates.start.localDate + "</p>" + 
                "<p>" + data._embedded.events[i].dates.start.localTime + "</p>" + 
                "<p>" + data._embedded.events[i]._embedded.venues[0].name + "</p>" + 
                "<button class='eventBtn' data-lat="+venueLat+" data-long="+venueLong+"> Find Local Restaraunts" + "</button>")
                
            })
            scrollBtn.append("<button id='previous'> <-- Previous </button>" +
            "<button id='next'> Next --> </button>")                     
            
                       
    
            
    });
    

    
});
    
 
    
$('#eventsContainer').on('click','.eventBtn', function() {
    let dataLat = $(this).attr("data-lat");
    let dataLong = $(this).attr("data-long")
    console.log(dataLat)
    console.log(dataLong)


    renderRestaraunts(dataLat, dataLong);
})
       

function renderRestaraunts(dataLat, dataLong) {
    let resturantUrl = 'https://api.documenu.com/v2/restaurants/search/geo?lat='+dataLat+'&lon='+dataLong+'&distance=5&fullmenu=true'   
    fetch(resturantUrl, {
        headers: {
            'X-API-KEY': 'b0c70c0a6e86ee22a0cd19bb00e652d6'
        }
    })
    .then(response => response.json())
    .then( data => {
        console.log(data);
        let eventsContainer = $('#eventsContainer')
        eventsContainer.empty()
            let restaraunts = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
            

            

        // forEach to render the restaraunts in a 5 mile radius of the event venue
            restaraunts.forEach(function(i) {
                let restarauntName = data.data[i].restaurant_name;
                let address = data.data[i].address.formatted;
                let phoneNumber = data.data[i].restaurant_phone;
                eventsContainer.append("<div class='col customCard'>" +
                    "<h5>" + restarauntName + "</h5>" + 
                    "<p>" + address + "</p>" + 
                    "<p>" + phoneNumber + "</p>")
            })
        

    })
    

}   


// Datepicker widget
$(function () {
    $('#datepicker').datepicker({
      changeMonth: true,
      changeYear: true,
      dateFormat: 'yy-mm-dd'
    });
  });



// foor loop for the next and previous buttons to render the next 10 objects
// let variable = 0
// for( let i = variable: i <= variable + 10: i++)
// variable = variable + 10

// let variable = 0
// for( let i = variable: i <= variable + 10: i--)
// variable = variable - 10