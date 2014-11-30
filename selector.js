if (Meteor.isClient) {
	today = new Date(); // Set current date 	
 	
 	Template.selector.helpers({
 		'today': function () {	 //Set value to date input
 		return today; 			//.toLocaleDateString(); next step is local time format
 		},
 		'dublicate': function() {
 		return Session.get('testDublicate');
 	}
	});

	Template.selector.rendered = function() {
    $('.datetimepicker').datetimepicker({maxDate: new Date(), minuteStepping:5, format: 'MM/DD/YYYY HH:mm'});
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
		var currentUserId = Meteor.userId();	 
		if ((HoursList.findOne({$and: [{userId: currentUserId}, {start: { $lte: startVar }}, {stop: { $gt: startVar}}]}))
		|| (HoursList.findOne({$and: [{userId: currentUserId}, {start: { $lte: stopVar }}, {stop: { $gte: stopVar}}]}))
		|| (HoursList.findOne({$and: [{userId: currentUserId}, {start: { $gte: startVar }}, {stop: { $lte: stopVar}}]}))) {
			Session.set('testDublicate', 'yes');
			alert('Your new entry is overlaping with some other entry');
		}	
		else {	
			Session.set('testDublicate', 'no');
		};
	
      	
            
            //Save to DB
     		HoursList.insert({
     				userId: currentUserId,
      			start: startVar,
      			stop: stopVar,
      			usedTime: usedTimeVar,
                comment: comment
    		});
    	}
  	});
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
