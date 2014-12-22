if (Meteor.isClient) {
    Session.setDefault('orderBy', 'hours'); //On what parameter order the list by, default is descending hours 

    Template.topList.helpers({
        'topList': function () {
            var usersHours = [];
            var uniqueUsers = listUniqueUsers();
            
            //Generate row for each user
            uniqueUsers.forEach(function(user) {
                var userHours = countHoursForUser(user);
                var realUserName;
                var team;
                
                userInformation.find({_id: user}).map(function(db) {
                  realUserName = db.name;
                  team = db.team;
                })
                
                usersHours.push({id:user, hours:userHours, realName:realUserName, team: team});
            });
            
            //Return ordered list based on ordering parameter
            if (Session.get('orderBy') === "hours") {
                var sorted = _.sortBy(usersHours, 'hours');
                return sorted.reverse();
            } else if (Session.get('orderBy') === "user") {
                var sorted = _.sortBy(usersHours, 'realName');
                return sorted;//.reverse();
            } else if (Session.get('orderBy') === "team") {
                var sorted = _.sortBy(usersHours, 'team');
                return sorted;//.reverse();
            } else if (Session.get('orderBy') === "hoursReverse") {
                var sorted = _.sortBy(usersHours, 'hours');
                return sorted;//.reverse();
            } else if (Session.get('orderBy') === "userReverse") {
                var sorted = _.sortBy(usersHours, 'realName');
                return sorted.reverse();
            } else if (Session.get('orderBy') === "teamReverse") {
                var sorted = _.sortBy(usersHours, 'team');
                return sorted.reverse();
            }
        },
        //Label styles, set none, underline or overline whether item is used in ordering
        'hoursStyle': function () {
            if (Session.get('orderBy') === "hours") {
                return "orderBy";
            } else if (Session.get('orderBy') === "hoursReverse") {
                return "orderByReverse";
            }
        },
        'teamStyle': function () {
            if (Session.get('orderBy') === "team") {
                return "orderBy";
            } else if (Session.get('orderBy') === "teamReverse") {
                return "orderByReverse";
            }
        },
        'userStyle': function () {
            if (Session.get('orderBy') === "user") {
                return "orderBy";
            } else if (Session.get('orderBy') === "userReverse") {
                return "orderByReverse";
            }
        }
            
            
    });

    //Clicking on labels causes list to be reordered
    Template.topList.events({
        'click .user': function() {
            if (Session.get('orderBy') === "user") {
                Session.set('orderBy', 'userReverse');
            } else {
                Session.set('orderBy', 'user');
            }
        },
        'click .team': function() {
            if (Session.get('orderBy') === "team") {
                Session.set('orderBy', 'teamReverse');
            } else {
                Session.set('orderBy', 'team');
            }
                
        },
        'click .hours': function() {
            if (Session.get('orderBy') === "hours") {
                Session.set('orderBy', 'hoursReverse');
            } else {
                Session.set('orderBy', 'hours');
            }
        }
    
    });
    
    //Returns list of unique GH usernames from HoursList
    listUniqueUsers = function() {
        var users = [];
        HoursList.find().map(function(db) {
            if (users.indexOf(String(db.ghUserId)) === -1) {
                users.push(String(db.ghUserId));
            }
        })
        return users;
    }
  
    //Returns list of unique team names from userInformation
    listUniqueTeams = function() {
        var teams = [];
        userInformation.find().map(function(db) {
            if (teams.indexOf(String(db.team)) === -1) {
                teams.push(String(db.team));
            }
        })
        return teams;
    }
     
    //Count hours for specific user, takes GH username as parameter
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