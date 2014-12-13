HoursList = new Mongo.Collection('hours');
userInformation = new Mongo.Collection('userInfo');
if (Meteor.isClient) {
    Meteor.startup(function(){
        Hooks.init();
    });
    
     Hooks.onLoggedIn = function () {
        if (Meteor.user()) {
            console.log("SET USER INFO");
            var currentUserId = Meteor.user().services.github.username;
            //Check if user exists
            var current = userInformation.findOne({_id: currentUserId});
            var realName = getUsersRealName();
            console.log("REAL: " + realName);
            
            //Alert if name is not set
            if (typeof(realName) === "undefined") {
                realName = " ";
                alert('Name not set in GitHub account. Please set.');
            }
            
            //If user exists update, otherwise add
            if (current) {
                console.log("UPDATE");
                var newInfo = {name: realName};
                userInformation.update( {_id: currentUserId}, { $set: newInfo });
            } else {
                console.log("ADD");
                userInformation.insert({
                    _id: currentUserId,
                    name: realName
                });
            }
        }    
     }
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
