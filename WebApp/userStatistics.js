if (Meteor.isClient) {

    Template.userStatistics.helpers({
        //Return percentage of hours done, goal hardcoded to 85
        percentage: function () {
            return percentageOfHours();
        },
        //Return color for progressbar, based on percentage of hours done
        color: function () {
            return getBarColor();
        },
        //Return team name for current user
        currentTeam: function () {
            var uid = Meteor.user().services.github.username;
            var team;
            //Get team name from userInformation collection
            userInformation.find({_id: uid}).map(function(db) {
                team = String(db.team);
            }) 
            return team;
        }
  });
  


  Template.userStatistics.events({
    //Fill autocomplete list when field gets focus
    'focus #autocomplete': function(){
        var teams = listUniqueTeams();
        $( "#autocomplete" ).autocomplete({
            source: teams
        });    
    },
    //Save team info when field loses focus
    'blur #autocomplete': function(){
        var newTeam = autocomplete.value;
        var newInfo = {team: newTeam};
        var currentUserId = Meteor.user().services.github.username;
        userInformation.update( {_id: currentUserId}, { $set: newInfo });
    },
  });
    //Return percentage of hours done, goal hardcoded to 85
    percentageOfHours = function() {
        var goal = 85;
        var current = totalFloat();
        var percentage = current / goal * 100;
        return Math.round(percentage);
    }  
    //Return color for progressbar, based on percentage of hours done
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
    //Progressbar
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
