
if (Meteor.isClient) {
Template.tabit.rendered = function() {
    $(function() {
        $( "#tabs" ).tabs();
    });
}
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
