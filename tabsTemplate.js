
if (Meteor.isClient) {

/*
  Template.displayHours.helpers({

  });

  Template.selector.events({
  }); */
   $(function() {
    $( "#tabs" ).tabs();
    });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
