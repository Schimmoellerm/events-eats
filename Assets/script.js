// enter city and pull up list of events in that city
let events = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
let restaraunts = [0, 1, 2, 3, 4]
//Search Button Click Event
$('#searchBtn').on('click', function(event) {
    event.preventDefault();
    let inputValue = $('#query').val();
    let dateInputValue =$('#datepicker').val();
   
    dateInputValue = dateInputValue + 'T00:00:00Z'
    let ticketmasterUrl = 'https://app.ticketmaster.com/discovery/v2/events.json?size=50&city='+inputValue+'&startDateTime='+dateInputValue+'&sort=date,asc&apikey=asJ5IIkFeppppkdFCPGgBB2cJYnYkfCT'
    console.log(dateInputValue)
    if(inputValue === "" || dateInputValue === 'T00:00:00Z') {
        $( function() {
            $( "#dialog" ).dialog();
          } );
    } else {

        //fetch request for ticketmaster API
        fetch(ticketmasterUrl)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            
                
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
                
                //Appends next and previous buttons to HTML
                scrollBtn.append("<button class='previous'> <-- Previous </button>" +
                "<button class='next'> Next --> </button>")      
                
                $('.scrollBtn').on('click', '.next', function() {
                    if(events[9] !== 49) {

                        getNextEvents(data);

                    } 
                })

                $('.scrollBtn').on('click', '.previous', function() {
                    if(events[0] !== 0) {

                        getPreviousEvents(data);
                    }
                })      
        });   
    }  
});

//get next ten events button
function getNextEvents(data) {
    events = events.map(event => event + 10)
    let eventsContainer = $('#eventsContainer')
    eventsContainer.empty()
    let scrollBtn = $('.scrollBtn')
    // scrollBtn.empty()
    
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
    console.log(events)
    console.log(data)
}

//get previous 10 events button
function getPreviousEvents(data) {
    events = events.map(event => event - 10)
    let eventsContainer = $('#eventsContainer')
    eventsContainer.empty()
    let scrollBtn = $('.scrollBtn')
    // scrollBtn.empty()
    
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
    console.log(events)
    console.log(data)
}

//button click for resturaunts pull
$('#eventsContainer').on('click','.eventBtn', function() {
    let dataLat = $(this).attr("data-lat");
    let dataLong = $(this).attr("data-long")
    console.log(dataLat)
    console.log(dataLong)

    renderRestaraunts(dataLat, dataLong);
})
       
//Resturant Pull from DocuMenu Function
function renderRestaraunts(dataLat, dataLong) {
    let resturantUrl = 'https://api.documenu.com/v2/restaurants/search/geo?lat='+dataLat+'&lon='+dataLong+'&size=50&distance=5&fullmenu=true'   
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
            let restarauntBtn = $('.restarauntBtn');
            let scrollBtn = $('.scrollBtn');
            scrollBtn.empty();
            //Appends next and previous buttons to HTML
            restarauntBtn.append("<button id='restarauntPrev' class='previous'> <-- Previous </button>" +
            "<button id='restarauntNext' class='next'> Next --> </button>")      
            
            $('.restarauntBtn').on('click', '.next', function() {
                if(restaraunts[4] !== 24) {
                    console.log("hello")
                    getNextRestaraunts(data);
    
                } 
            })
    
            $('.restarauntBtn').on('click', '.previous', function() {
                if(restaraunts[0] !== 0) {
                    console.log('goodbye')
                    getPreviousRestaraunts(data);
                }
            })      
        });   
    };

    function getPreviousRestaraunts(data) {
        restaraunts = restaraunts.map(restaraunts => restaraunts - 5)
        let eventsContainer = $('#eventsContainer')
        eventsContainer.empty()
        
        restaraunts.forEach(function(i) {
            let restarauntName = data.data[i].restaurant_name;
            let address = data.data[i].address.formatted;
            let phoneNumber = data.data[i].restaurant_phone;
            eventsContainer.append("<div class='col customCard'>" +
                "<h5>" + restarauntName + "</h5>" + 
                "<p>" + address + "</p>" + 
                "<p>" + phoneNumber + "</p>")
        })
    }
    
    function getNextRestaraunts(data) {
        restaraunts = restaraunts.map(restaraunts => restaraunts + 5)
        let eventsContainer = $('#eventsContainer')
        eventsContainer.empty()
        
        restaraunts.forEach(function(i) {
            let restarauntName = data.data[i].restaurant_name;
            let address = data.data[i].address.formatted;
            let phoneNumber = data.data[i].restaurant_phone;
            eventsContainer.append("<div class='col customCard'>" +
                "<h5>" + restarauntName + "</h5>" + 
                "<p>" + address + "</p>" + 
                "<p>" + phoneNumber + "</p>")
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

