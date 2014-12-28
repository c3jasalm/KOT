HoursList = new Mongo.Collection('hours');
userInformation = new Mongo.Collection('userInfo');
if (Meteor.isClient) {
    Meteor.startup(function(){
        //Initialize Event Hooks
        Hooks.init(); 
    });
    
    //User is logging in
    Hooks.onLoggedIn = function () {
        if (Meteor.user()) {
            var currentUserId = Meteor.user().services.github.username;
            //Check if user exists
            var current = userInformation.findOne({_id: currentUserId});
            var realName = getUsersRealName();
            
            //Alert if name is not set
            if (realName === "") {
                realName = " ";
                alert('Name not set in GitHub account. Please set.');
            }
            
            //If user exists update, otherwise add
            if (current) {
                var newInfo = {name: realName};
                userInformation.update( {_id: currentUserId}, { $set: newInfo });
            } else {
                userInformation.insert({
                    _id: currentUserId,
                    name: realName,
                    team: ""
                });
            }
        }    
     }
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
    Meteor.methods({
        eventsOnHooksInit: function () {
        // Workaround for a bug in Event Hooks
        }
    });    
}
