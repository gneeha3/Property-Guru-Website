

$(init);
function init(){
  
  $("p").addClass("ui-widget")
  .addClass("ui-widget-content")
  .addClass("ui-corner-all");
  
  $(".dragMe").draggable();
  $(".dragMe1").draggable();
  $(".dragMe2").draggable();
  $(".dragMe3").draggable();
  $(".dragMe4").draggable();
  $(".dragMe5").draggable();
  $("#target").droppable();

  $("#target").bind("drop",    highlightTarget);
  $("#target").bind("dropout", resetTarget);
  $("input[type='radio']").checkboxradio();
  
  $(".dragMe").data({
	    'originalLeft': $(".dragMe").css('left'),
	    'origionalTop': $(".dragMe").css('top')
	});
  $(".dragMe1").data({
	    'originalLeft': $(".dragMe1").css('left'),
	    'origionalTop': $(".dragMe1").css('top')
	});
  $(".dragMe2").data({
	    'originalLeft': $(".dragMe2").css('left'),
	    'origionalTop': $(".dragMe2").css('top')
	});
  $(".dragMe3").data({
	    'originalLeft': $(".dragMe3").css('left'),
	    'origionalTop': $(".dragMe3").css('top')
	});
  $(".dragMe4").data({
	    'originalLeft': $(".dragMe4").css('left'),
	    'origionalTop': $(".dragMe4").css('top')
	});
  $(".dragMe5").data({
	    'originalLeft': $(".dragMe5").css('left'),
	    'origionalTop': $(".dragMe5").css('top')
	});

}

function submit(){
  
  //$("#success").show();
	//alert("Details saved successfully");
    alert('Details saved successfully !');
    $("#fname").val(' ');
    $("#lname").val(' ');
    $("#pno").val(' ');
    $("#mail").val(' ');
    
    $("#radio1").attr("checked",false).checkboxradio("refresh");
    $("#radio2").attr("checked",false).checkboxradio("refresh");
    
    $("#target").removeClass("ui-state-highlight")
    .html("Upload picture");
    $(".dragMe").css({
        'left': $(".dragMe").data('originalLeft'),
        'top': $(".dragMe").data('origionalTop')
    });
    $(".dragMe1").css({
        'left': $(".dragMe1").data('originalLeft'),
        'top': $(".dragMe1").data('origionalTop')
    });
    $(".dragMe2").css({
        'left': $(".dragMe2").data('originalLeft'),
        'top': $(".dragMe2").data('origionalTop')
    });
    $(".dragMe3").css({
        'left': $(".dragMe3").data('originalLeft'),
        'top': $(".dragMe3").data('origionalTop')
    });
    $(".dragMe4").css({
        'left': $(".dragMe4").data('originalLeft'),
        'top': $(".dragMe4").data('origionalTop')
    });    
    $(".dragMe5").css({
        'left': $(".dragMe5").data('originalLeft'),
        'top': $(".dragMe5").data('origionalTop')
    });
}

function highlightTarget(event, ui)
{
    $("#target").addClass("ui-state-highlight")
                .html("Picture uploaded ")
} 

function resetTarget(event, ui)
{
    $("#target").removeClass("ui-state-highlight")
                .html("Upload picture");
}