// Storage for counter state
CounterState = new Meteor.Collection('stateStore');

if (Meteor.isClient) {
	Session.setDefault('usedHours', 0);
	Session.setDefault('usedMinutes', 0);
	Session.setDefault('usedSeconds', 0); // Will be removed later
	Session.setDefault('counterSave', false);
	Session.setDefault('startStopColor', 'btn btn-success');
	Session.setDefault('submitStatus', 'disabled');
	Session.set('glyphicon', 'glyphicon glyphicon-play');
	
	// If counter is on refresh used time once in every second	
	Meteor.setInterval(function () {
		var state = Session.get('currentState');
		if (state == 'on') {
			Session.set('counterSeconds', new Date(new Date - counterStarted).getSeconds());
			Session.set('counterMinutes', new Date(new Date - counterStarted).getMinutes());
			Session.set('counterHours', new Date(new Date - counterStarted).getUTCHours());
			// After 6 hours stop clock and give alert
			if (Session.get('counterHours') >= 6) {
						startp = new Date(start.previousState);
						stopp = new Date(startp.getTime() + 1000 * 60 * 60 * 6);
						usedTime = new Date(stopp.getTime() - start.previousState.getTime());
						Session.set('stop', stopp);
						Session.set('usedHours', 6);
						Session.set('usedMinutes', 0);
						Session.set('usedSeconds', 0);    
						// Call server to reset counter state
						var currentUserId = Meteor.userId();
						Meteor.call('clearCounterState', currentUserId);
						Session.set('currentState', 'off'); 
						Session.set('counterSave', true);
						Session.set('startStopColor', 'btn btn-success');
						var minValue = Session.get('usedMinutes');
						var hourValue = Session.get('usedHours');
						Session.set('submitStatus', 'enabled');
						Session.set('glyphicon', 'glyphicon glyphicon-play');
						alert('You have worked now 6 hours. Clock is stopped and you must rest. Save task!');
			}
		}
	},1000);
 
  Template.counter.helpers({
 	'timeStart': function () {
 		var currentUserId = Meteor.userId();
 		start = CounterState.findOne({userId: currentUserId});
 		if (start) {						// Set current counter state
 			Session.set('currentState', 'on'); 
 			Session.set('startStopColor', 'btn btn-danger');
 			Session.set('glyphicon', 'glyphicon glyphicon-stop');
 			Session.set('submitStatus', 'disabled');
 			counterStarted = new Date(start.previousState);
 		} else {
 			Session.set('currentState', 'off');
 			Session.set('startStopColor', 'btn btn-success');
 			Session.set('glyphicon', 'glyphicon glyphicon-play');
 		}

        try {
            return moment(start.previousState).format('DD.MM.YYYY HH:mm');
        }
        catch(err) {
            console.log("start.previousState not defined");
        }
 	},
 	'timeStop': function () {
 		return Session.get('stop');
 	},
 	'timeHours': function () {
 		var state = Session.get('currentState');
 		if (state == 'on') {
 			return Session.get('counterHours');
 			} else {
 				return Session.get('usedHours');
 			}
 	},
 	'timeMinutes': function () {
 		var state = Session.get('currentState');
 		if (state == 'on') {
 			return Session.get('counterMinutes');
 			} else {
 				return Session.get('usedMinutes');
 			}
 	},
 	'timeSeconds': function () {				// Will be removed later
 		var state = Session.get('currentState');
 		if (state == 'on') {
 			return Session.get('counterSeconds');
 			} else {
 				return Session.get('usedSeconds');
 		}
 	},
 	'currentState': function () {
 			return Session.get('currentState');
 	},
 	'startStopColor': function () {
 			return Session.get('startStopColor');
 	},
 	'submitStatus': function () {
 			return Session.get('submitStatus');
 	},
 	'glyphicon': function () {
 			return Session.get('glyphicon');
 	},
 	'formatDate': function(date) {
  	return moment(date).format('DD.MM.YYYY HH:mm');
  	}
});

	Template.counter.events({
		// Starts clock if it is off, or stops clock if it is on.
		'click #startStop': function (event) {
    		event.preventDefault();
			counter: {    	
				var state = Session.get('currentState');
				var minValue = Session.get('counterMinutes');
				var hourValue = Session.get('counterHours');
					if (minValue < 15 && hourValue < 1 && state == 'on') { //Alert about too short time
						if(!confirm('Times shorter than 15 mins cannot be saved. Are you sure that you want stop clock?')) {
							break counter;}
					}
					if (state === 'on') {
						stopp = new Date();
						startp = new Date(start.previousState);
						usedTime = new Date(stopp.getTime() - start.previousState.getTime());
						Session.set('stop', stopp);
						Session.set('usedHours', usedTime.getUTCHours());
						Session.set('usedMinutes', usedTime.getMinutes());
						Session.set('usedSeconds', usedTime.getSeconds());    
						// Call server to reset counter state
						var currentUserId = Meteor.userId();
						Meteor.call('clearCounterState', currentUserId);
						Session.set('currentState', 'off'); 
						Session.set('counterSave', true);
						Session.set('startStopColor', 'btn btn-success');
						var minValue = Session.get('usedMinutes');
						var hourValue = Session.get('usedHours');
						if (minValue >= 15 || hourValue >= 1) { //Times shorter than 15 mins cannot be saved
							Session.set('submitStatus', 'enabled');
						}
						Session.set('glyphicon', 'glyphicon glyphicon-play');
    					} else {
    						counterStarted = new Date();
    						var currentUserId = Meteor.userId();
    						// Check if there is overlapping with some previous entry
    						if (HoursList.findOne({$and: [{userId: currentUserId}, {start: { $lte: counterStarted}}, {stop: { $gt: counterStarted}}]})) {
								// Display alert if there is overlaping and do not start clock
								alert('Your new entry is overlapping with previous task: ' +
								HoursList.findOne({$and: [{userId: currentUserId}, {start: { $lte: counterStarted}}, {stop: { $gt: counterStarted}}]}).comment);
								break counter;
							} 
							Session.set('usedHours', 0);
							Session.set('usedMinutes', 0);
							Session.set('usedSeconds', 0); // Will be removed later
      					// Call method to set counter state
							var currentUserId = Meteor.userId();
							var counterStart = new Date();
							Meteor.call('setCounterState', currentUserId, counterStart);
							Session.set('currentState', 'on'); 
							Session.set('startStopColor', 'btn btn-danger');
							Session.set('submitStatus', 'disabled');
							Session.set('glyphicon', 'glyphicon glyphicon-stop');
    						}
    					}
    },
    'submit form': function (event) {
    	event.preventDefault();
    	var currentUserId = Meteor.userId();
    	var usedTimeVar = stopp -startp;
    	var quarter = 1000 * 60 * 15; // 15 minutes
    	var usedMinutesVar = new Date(usedTimeVar).getMinutes();
    	// Rounds used time to nearest 15 minutes, max 5 mins down or 10 mins up.
    	if (usedMinutesVar <= 5
    		|| usedMinutesVar >= 15 && usedMinutesVar <= 20
    		|| usedMinutesVar >= 30 && usedMinutesVar <= 35
    		|| usedMinutesVar >= 45 && usedMinutesVar <= 50) {
    		var roundedTime =  (Math.floor(usedTimeVar / quarter) * quarter);
    	} else {
    			var roundedTime =  (Math.ceil(usedTimeVar / quarter) * quarter);
    		}
    	var comment = event.target.comment.value;
    	if (Session.get('counterSave')){
    	// Check if entry is overlaping with other entry	 
    		if ((HoursList.findOne({$and: [{userId: currentUserId}, {start: { $lte: startp }}, {stop: { $gt: startp}}]}))
			|| (HoursList.findOne({$and: [{userId: currentUserId}, {start: { $lte: stopp}}, {stop: { $gte: stopp}}]}))
			|| (HoursList.findOne({$and: [{userId: currentUserId}, {start: { $gte: startp}}, {stop: { $lte: stopp}}]}))) {
				// Display alert if there is overlaping
				alert('Your new entry is overlaping with some other entry');
		} 
    	else {
    		HoursList.insert({
                userId: currentUserId, 
                ghUserId: Meteor.user().services.github.username,
                start: startp,
                stop: stopp,
                usedTime: roundedTime,
                comment: comment,
                inputType: false
    		});		
    	}
    	Session.set('counterSave', false);
    	Session.set('submitStatus', 'disabled');
    }
    }    
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
  Meteor.methods({
  	// Set counter state
  	'setCounterState': function (user, start) {
  		var counterStarted = start;
  		var currentUserId = user; 
  		CounterState.insert({userId: currentUserId, previousState: counterStarted});
  	},
  	// Reset counter state
  	'clearCounterState': function (user) {
  		var currentUserId = user;
  		CounterState.remove({userId: currentUserId});
  	}
  });
}
