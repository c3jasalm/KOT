if (Meteor.isClient) {
  // counter starts at 0

    Template.totalHours.helpers({
   	totalHours: function () {
      var total = 0;
      HoursList.find().map(function(doc) {
        total += parseInt(doc.stop - doc.start);
        //total += doc.stop - doc.start;
          })
      var totalMinutes = total / 1000 / 60;
      var hours = parseInt(totalMinutes / 60);
      var minutes = totalMinutes % 60;    
      return hours.toString() + ":" + minutes.toString();
      }
  });

  Template.totalHours.events({
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
