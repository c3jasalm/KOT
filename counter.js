// Storage for counter state
CounterState = new Meteor.Collection('stateStore');
if (Meteor.isClient) {
	Session.setDefault('usedHours', 0);
	Session.setDefault('usedMinutes', 0);
	Session.setDefault('usedSeconds', 0); // Will be removed later
	Session.setDefault('counterSave', false);
	Session.setDefault('startStopColor', 'btn btn-success');
	Session.setDefault('submitStatus', 'disabled');
	
	Meteor.setInterval(function () {
		Session.set('counterSeconds', new Date(new Date - counterStarted).getSeconds());
		Session.set('counterMinutes', new Date(new Date - counterStarted).getMinutes());
		Session.set('counterHours', new Date(new Date - counterStarted).getUTCHours());
	},1000);
 
  Template.counter.helpers({
 	'timeStart': function () {
 		var currentUserId = Meteor.userId();
 		start = CounterState.findOne({userId: currentUserId});
 		if (start) {						// Set current counter state
 			Session.set('currentState', 'on'); 
 			Session.set('startStopColor', 'btn btn-danger');
 			Session.set('submitStatus', 'disabled');
 		} else {
 			Session.set('currentState', 'off');
 			Session.set('startStopColor', 'btn btn-success');
 		}
    	return start.previousState;
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
 	}
});

  Template.counter.events({
    'click #startStop': function (event) {
    	event.preventDefault();
    	var state = Session.get('currentState');
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
    	 Session.set('submitStatus', 'enabled');
    	} else {
    		Session.set('usedHours', 0);
		Session.set('usedMinutes', 0);
		Session.set('usedSeconds', 0); // Will be removed later
      	// Call method to set counter state
      	var currentUserId = Meteor.userId();
      	Meteor.call('setCounterState', currentUserId);
    		Session.set('currentState', 'on'); 
    		Session.set('startStopColor', 'btn btn-danger');
    		Session.set('submitStatus', 'disabled');
    		counterStarted = new Date();
    	}
    },
    'submit form': function (event) {
    	event.preventDefault();
    	var currentUserId = Meteor.userId();
    	var usedTimeVar = stopp -startp;
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
                usedTime: usedTimeVar,
                comment: comment
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
  	'setCounterState': function (user) {
  		var counterStarted = new Date();
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
