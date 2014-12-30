if (Meteor.isClient) {
	today = new Date(); // Set current date 	
	rounding = 1000 * 60 * 15;
 	
 	Template.selector.helpers({
	});

	// DateTimePicker for selecting task start date and time
	Template.selector.rendered = function() {
		$('.datetimepicker').datetimepicker({maxDate: new Date(), minuteStepping:15, format: 'DD.MM.YYYY HH:mm', defaultDate: new Date(Math.round(today / rounding) * rounding)});
    };
    
  	Template.selector.events({
	
	'submit form': function (event) {
    		event.preventDefault();
    		var currentUserId = Meteor.userId();
    		var todayVar = moment(event.target.dtPicker.value, 'DD.MM.YYYY HH:mm'); //Get value from datepicker
    		var startVar = new Date(todayVar); 
            
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
               comment: comment,
					inputType: true
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
