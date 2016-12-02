var returned;

$('#query').keyup(function () {
    // All code will be inside of this block
    var value = $('#query').val();
    var rExp = new RegExp(value, "i");

    $.getJSON("http://autocomplete.wunderground.com/aq?query=" + value + "&cb=?", function (data) {

        console.log(data);
        // test for JSON received
        // Begin building output
        returned = data
        var output = '<ol>';
        $.each(data.RESULTS, function (key, val) {
            if (val.name.search(rExp) != -1) {
                output += '<li>';
                output += '<a href="http://www.wunderground.com' + val.l + '" title="See results for ' + val.name + '">' + val.name + '</a>';
                output += '</li>';

            }
        }); // end each
        output += '</ol>';
        $("#searchResults").html(output); // send results to the page
    }); // end getJSON
}); // end onkeyup


$('#searchResults').on('click', 'a', function(event) {
    event.preventDefault();
    index = $(this).index("a");
    getData(returned.RESULTS[index].lat, returned.RESULTS[index].lon);
    $('#searchResults').toggle();
});



// Get the data from the wunderground API
function getData(lat, long) {

    $.ajax({

        url: "https://api.wunderground.com/api/ac52a58a98171ab0/geolookup/conditions/astronomy/q/" + lat + "," + long + ".json",
        dataType: "jsonp",
        success: function (data) {
            console.log('success', data);

            $('#titleCity').text(data.location.city + ', ' + data.location.state + ' ')
            $('.cityDisplay').text('Current Forcast for ' + data.location.city + ', ' + data.location.state + ' ' + '(' + data.location.zip + ')');

            $('#image').html('<img src = "' + data.current_observation.icon_url + '" alt = "Weather condition image">');

            $('.lat').text('Latitude: ' + data.location.lat);

            $('.lon').text('Longitude: ' + data.location.lon);

            $('.current').text(Math.round(data.current_observation.temp_f) + "\xB0" + "F");

            $('.forecast').text('Todays Forecast: ' + data.current_observation.weather);

            $('#percipitation').text('Percipitation: ' + data.current_observation.precip_today_in + ' inches');

            $('.wind').text('Wind: ' + data.current_observation.wind_mph + ' mph ' + data.current_observation.wind_dir + ', with gusts up to ' + data.current_observation.wind_gust_mph + ' mph.');



            console.log('success', data);






        }
    });

}

// A function for changing a string to TitleCase
function toTitleCase(str){
    return str.replace(/\w+/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}






