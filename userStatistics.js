if (Meteor.isClient) {

    Template.userStatistics.helpers({
        percentage: function () {
            return percentageOfHours();
        }
  });

  Template.userStatistics.events({
  });
  
  percentageOfHours = function() {
        var goal = 85;
        var current = totalFloat();
        var percentage = current / goal * 100;
        return Math.round(percentage);
    }  
    
    Template.userStatistics.rendered = function() {
        $( "#progressbar" ).progressbar({
            value: percentageOfHours()
        });
    }    
    
  
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
