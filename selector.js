if (Meteor.isClient) {
	today = new Date(); // Set current date 	
 	
 	Template.selector.helpers({
 		'today': function () {	 //Set value to date input
 		return today; 			//.toLocaleDateString(); next step is local time format
 		}
	});

  	Template.selector.events({
	'click #datepicker': function(event) {
		event.datepicker().val(new Date().asString());
		event.preventDefault();
	},
	'submit form': function (event) {
    		event.preventDefault();
    		var todayVar = Date.parse(event.target.datepicker.value); //Get value from input. Will be replaced with datepicker
    		var startVar = new Date(todayVar); // Will be replaced with datepicker
    		var stopVar = new Date(startVar.getTime() + 				(event.target.minutesSelector.value*60000) + 				(event.target.hoursSelector.value*3600000)); 
    		var usedTimeVar = stopVar - startVar;
     		HoursList.insert({
      			start: startVar,
      			stop: stopVar,
      			usedTime: usedTimeVar
    		});
    	}
  	});
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
