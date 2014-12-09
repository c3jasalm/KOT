if (Meteor.isClient) {
	today = new Date(); // Set current date 	
 	
 	Template.selector.helpers({
	});

	Template.selector.rendered = function() {
    $('.datetimepicker').datetimepicker({maxDate: new Date(), minuteStepping:5, format: 'MM/DD/YYYY HH:mm', defaultDate: new Date()});
    };
    
  	Template.selector.events({
	
	'submit form': function (event) {
    		event.preventDefault();
    		var currentUserId = Meteor.userId();
    		var todayVar = Date.parse(event.target.dtPicker.value); //Get value from input. Will be replaced with datepicker
    		var startVar = new Date(todayVar); // Will be replaced with datepicker
            
		//Get minutes
		var stopMinutes = event.target.timeSelector.value;
            
          //Set used time
    		var stopVar = new Date(startVar.getTime() + (stopMinutes*60000)); 
    		var usedTimeVar = stopVar - startVar;
            
		//Comment
		var comment = event.target.comment.value;
          
          // Check if entry is overlaping with other entry	 
		if ((HoursList.findOne({$and: [{userId: currentUserId}, {start: { $lte: startVar }}, {stop: { $gt: startVar}}]}))
		|| (HoursList.findOne({$and: [{userId: currentUserId}, {start: { $lte: stopVar }}, {stop: { $gte: stopVar}}]}))
		|| (HoursList.findOne({$and: [{userId: currentUserId}, {start: { $gte: startVar }}, {stop: { $lte: stopVar}}]}))) {
			// Display alert if there is overlaping
			alert('Your new entry is overlaping with some other entry');
		}	
		else {	
			//Save to DB if no overlaping
     		HoursList.insert({
     			userId: currentUserId,
                ghUserId: Meteor.user().services.github.username,
      			start: startVar,
      			stop: stopVar,
      			usedTime: usedTimeVar,
                comment: comment
    		});
		};
    	}
  	});
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
