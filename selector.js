if (Meteor.isClient) {
 
  Template.selector.helpers({
 	
});

  Template.selector.events({
    'submit form': function (event) {
    	event.preventDefault();
    	var startVar = new Date(); 
    	var stopVar = new Date(startVar.getTime() + (event.target.minutesSelector.value*60000) + (event.target.hoursSelector.value*3600000)); 
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