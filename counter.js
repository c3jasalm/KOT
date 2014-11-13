// Storage for counter state
CounterState = new Meteor.Collection('stateStore');
if (Meteor.isClient) {
	Session.setDefault('usedHours', 0);
	Session.setDefault('usedMinutes', 0);
	Session.setDefault('usedSeconds', 0); // Will be removed later
 
  Template.counter.helpers({
 	'timeStart': function () {
 		start = CounterState.findOne();
 		if (start) {										// Set current counter state
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
      
      // Save used hours
      //var usedTimeVar = stopp -start.previousState; 
      //if(usedTimeVar >= 60000)
      //{
      //    HoursList.insert({
      //        start: start.previousState,
      //        stop: stopp,
      //        usedTime: usedTimeVar
      //    });
      //}    
      // Call server to reset counter state
      Meteor.call('clearCounterState');
    		Session.set('currentState', 'off'); 
    	} else {
    		Session.set('usedHours', 0);
			Session.set('usedMinutes', 0);
			Session.set('usedSeconds', 0); // Will be removed later
      	// Call method to set counter state
      	Meteor.call('setCounterState');
    		Session.set('currentState', 'on'); 
    	}
    },
    'submit form': function (event) {
    	event.preventDefault();
    	var usedTimeVar = stopp -startp;
    	var comment = event.target.comment.value;
    	HoursList.insert({
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
  	'setCounterState': function () {
  		var counterStarted = new Date();
  		CounterState.insert({previousState: counterStarted});
  	},
  	// Reset counter state
  	'clearCounterState': function () {
  		CounterState.remove({});
  	}
  });
}
