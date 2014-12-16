if (Meteor.isClient) {

  Template.displayHours.helpers({
    'previousHours': function () {
    	var currentUserId = Meteor.userId();
      return HoursList.find({userId: currentUserId}, {sort: {start: -1} })
    },
    'formatDate': function(date) {
  	return moment(date).format('DD.MM.');
  	},
  	'formatTime': function(time) {
  	return moment.utc(time).format('HH:mm');
  	},
  	'isChecked': function () {
    return Session.get("isChecked");
  }
  });
  
  Template.displayHours.events({
  		'click .delete': function () {
  			if(confirm('You are going to delete entry. Are you sure?')) {
    			HoursList.remove(this._id);
    		}
  		},
  		'change #showDelete': function (event) {
  			Session.set("isChecked", event.target.checked);
 		}
	});

}


if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}