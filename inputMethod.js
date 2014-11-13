if (Meteor.isClient) {
  Session.setDefault('method', false);
  
  Template.inputMethod.helpers({
  	method: function () {
     	return Session.get('method');
     }
  });
  
  Template.inputMethod.events({
  	'click #inputSelector': function (){
    	Session.set('method', true);
   },
 	'click #inputCounter': function (){
    	Session.set('method', false);
 	}
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}