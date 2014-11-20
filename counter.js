// Storage for counter state
CounterState = new Meteor.Collection('stateStore');
if (Meteor.isClient) {
	Session.setDefault('usedHours', 0);
	Session.setDefault('usedMinutes', 0);
	Session.setDefault('usedSeconds', 0); // Will be removed later
 
  Template.counter.helpers({
 	'timeStart': function () {
 		var currentUserId = Meteor.userId();
 		start = CounterState.findOne({userId: currentUserId});
 		if (start) {						// Set current counter state
 			Session.set('currentState', 'on'); 
 		} else {
 			Session.set('currentState', 'off');
 		}
    	return start.previousState;
 	},
 	'timeStop': function () {
 		return Session.get('stop');
 	},
 	'timeHours': function () {
 		return Session.get('usedHours');
 	},
 	'timeMinutes': function () {
 		return Session.get('usedMinutes');
 	},
 	'timeSeconds': function () {				// Will be removed later
 		return Session.get('usedSeconds');
 	},
 	'currentState': function () {
 			return Session.get('currentState');
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
    	} else {
    		Session.set('usedHours', 0);
		Session.set('usedMinutes', 0);
		Session.set('usedSeconds', 0); // Will be removed later
      	// Call method to set counter state
      	var currentUserId = Meteor.userId();
      	Meteor.call('setCounterState', currentUserId);
    		Session.set('currentState', 'on'); 
    	}
    },
    'submit form': function (event) {
    	event.preventDefault();
    	var currentUserId = Meteor.userId();
    	var usedTimeVar = stopp -startp;
    	var comment = event.target.comment.value;
    	HoursList.insert({
    				userId: currentUserId, 
      			start: startp,
      			stop: stopp,
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
