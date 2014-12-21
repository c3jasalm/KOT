if (Meteor.isClient) {
    Session.setDefault('orderBy', 'hours');

    Template.topList.helpers({
        'topList': function () {
            var usersHours = [];
            var uniqueUsers = listUniqueUsers();
            
            uniqueUsers.forEach(function(user) {
                console.log("CountFor: " + user);
                var userHours = countHoursForUser(user);
                var realUserName;
                var team;
                
                userInformation.find({_id: user}).map(function(db) {
                  realUserName = db.name;
                  team = db.team;
                })
                
                usersHours.push({id:user, hours:userHours, realName:realUserName, team: team});
            });
            console.log("Array: " + usersHours[0]["id"]);
            
            if (Session.get('orderBy') === "hours") {
                var sorted = _.sortBy(usersHours, 'hours');
                return sorted.reverse();
            } else if (Session.get('orderBy') === "user") {
                var sorted = _.sortBy(usersHours, 'realName');
                return sorted;//.reverse();
            } else if (Session.get('orderBy') === "team") {
                var sorted = _.sortBy(usersHours, 'team');
                return sorted;//.reverse();
            }
        },
        'hoursStyle': function () {
            if (Session.get('orderBy') === "hours") {
                return "orderBy";
            }
        },
        'teamStyle': function () {
            if (Session.get('orderBy') === "team") {
                return "orderBy";
            }
        },
        'userStyle': function () {
            if (Session.get('orderBy') === "user") {
                return "orderBy";
            }
        }
            
            
    });
  
    Template.topList.events({
        'click .user': function() {
            Session.set('orderBy', 'user');
        },
        'click .team': function() {
            Session.set('orderBy', 'team');
        },
        'click .hours': function() {
            Session.set('orderBy', 'hours');
        }
    
    });
  
    listUniqueUsers = function() {
        var users = [];
        HoursList.find().map(function(db) {
            if (users.indexOf(String(db.ghUserId)) === -1) {
                users.push(String(db.ghUserId));
            }
        })
        console.log(users.toString());
        return users;
    }
  
    listUniqueTeams = function() {
        var teams = [];
        userInformation.find().map(function(db) {
            if (teams.indexOf(String(db.team)) === -1) {
                teams.push(String(db.team));
            }
        })
        console.log(teams.toString());
        return teams;
    }
     
    countHoursForUser = function(userName) {
        var total = 0;
          
        HoursList.find({ghUserId: userName}).map(function(db) {
          total += parseInt(db.usedTime);
        })
           
        var totalMinutes = total / 1000 / 60;
        var hours = totalMinutes / 60;

        return Math.round(hours * 100) / 100;
    }
}

if (Meteor.isServer) {
    Meteor.startup(function () {
        // code to run on server at startup
    });
}