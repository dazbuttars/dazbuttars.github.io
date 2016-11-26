// Current Location Scripts
$(function () {

  var status = $('#status');

  (function getGeoLocation() {
    status.text('Getting Location...');
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        var lat = position.coords.latitude;
        var long = position.coords.longitude;

        // Call the getData function, send the lat and long
        getData(lat, long);

      });
    } else {
      status.text("Your browser doesn't support Geolocation or it is not enabled!");
    }

  })();

  // Get the data from the wunderground API
  function getData(lat, long){

    $.ajax({

        url : "https://api.wunderground.com/api/ac52a58a98171ab0/geolookup/conditions/astronomy/q/" + lat +","+ long + ".json",
        dataType: "jsonp",
        success : function(data){


            $('#titleCity').prepend(data.location.city +', '+ data.location.state + ' ')
            $('.cityDisplay').text('Current Forcast for '+data.location.city +', '+ data.location.state + ' ' +'('+ data.location.zip+')');

            $('#image').append('<img src = "'+data.current_observation.icon_url + '" alt = "Weather condition image">')

            $('.current').text(Math.round(data.current_observation.temp_f) + "\xB0" + "F");

            $('.forecast').prepend('Todays Forecast: ' + data.current_observation.weather);

            $('#percipitation').text('Percipitation: '+ data.current_observation.precip_today_in + ' inches');

            $('.wind').text('Wind: ' + data.current_observation.wind_mph+ ' mph '+data.current_observation.wind_dir + ', with gusts up to '+ data.current_observation.wind_gust_mph+ ' mph.');





          console.log('success', data);











      $("#cover").fadeOut(250);
    }
           });

  }

  // A function for changing a string to TitleCase
  function toTitleCase(str){
    return str.replace(/\w+/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  }
});
