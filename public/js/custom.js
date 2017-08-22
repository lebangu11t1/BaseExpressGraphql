$(document).ready(function(){
  	$(".talk-to").tooltip({
    	content: function(){ 
        	return $(this).parent().find('.tooltip-content').html(); 
    	},
    	tooltipClass: "custom-tooltip-styling",
  	});
});