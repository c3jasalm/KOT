if (Meteor.isClient) {

    Template.userStatistics.helpers({
        percentage: function () {
            return percentageOfHours();
        },
        color: function () {
            return getBarColor();
        },
        currentTeam: function () {
            var uid = Meteor.user().services.github.username;
            console.log("Call current team " + uid);
            var team;
            userInformation.find({_id: uid}).map(function(db) {
                console.log("Get team: " + String(db.team));
                team = String(db.team);
            }) 
            console.log("Return team: " + team);
            return team;
        }
  });
  


  Template.userStatistics.events({
    'focus #autocomplete': function(){
        console.log("GOT FOCUS!");
        $( "#autocomplete" ).autocomplete({
            source: [ "KOT", "Nakkikone", "NoToDo" ]
        });    
    },
    'blur #autocomplete': function(){
        console.log("LOST FOCUS!");
        var newTeam = autocomplete.value;
        console.log("TEAM: " + newTeam);
        var newInfo = {team: newTeam};
        var currentUserId = Meteor.user().services.github.username;
        userInformation.update( {_id: currentUserId}, { $set: newInfo });
    },
  });
  
    percentageOfHours = function() {
        var goal = 85;
        var current = totalFloat();
        var percentage = current / goal * 100;
        return Math.round(percentage);
    }  
    
    getBarColor = function() {
        var percentage = percentageOfHours();
        if (percentage < 25) {
            return "progress-bar-danger";
        } else if (percentage < 75) {
            return "progress-bar-warning";
        } else {
            return "progress-bar-success";
        }
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
