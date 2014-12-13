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
            
            if (current) {
                console.log("UPDATE");
                if (typeof(realName) === "undefined") {
                    realName = " ";
                    alert('Name not set in GitHub account. Please set.');
                }
                var newInfo = {name: realName};
                userInformation.update( {_id: currentUserId}, { $set: newInfo });
            } else {
                console.log("ADD");
                if (typeof(realName) === "undefined") {
                    realName = " ";
                    alert('Name not set in GitHub account. Please set.');
                }
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
