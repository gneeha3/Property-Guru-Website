

$( function() {
  var handle = $( "#custom-handle" );
  $( "#slider" ).slider({
    create: function() {
      handle.text( $( this ).slider( "value" ) );
    },
    min: 0,
    max: 10,
    step: 0.5,
    slide: function( event, ui ) {
      handle.text( ui.value );
    }
  });
} );

$(init);
function init(){
  $("#slider").slider().bind("slide");
  $("#resize").resizable();
  $("p").addClass("ui-widget")
  .addClass("ui-widget-content")
  .addClass("ui-corner-all");
}

function submit(){
  
  alert("Review submitted successfully");
  $("#resize").val("");
  $('#slider').slider("value", 0);
  var handle = $( "#custom-handle" );
  handle.text(0);
}
