HoursList = new Mongo.Collection('hours');
userInformation = new Mongo.Collection('userInfo');
if (Meteor.isClient) {

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
