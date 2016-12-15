$.getJSON( "webpage/scripts/price.json", function(data){
    var items = [];
    $.each( data, function( key, val ) {
        console.log(data)
    });

    $( "<ul/>", {
        "class": "my-new-list",
        html: items.join( "" )
    }).appendTo( "body" );
});
