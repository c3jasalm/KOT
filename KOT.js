Tasks = new Mongo.Collection("tasks");
if (Meteor.isClient) {
    // This code only runs on the client
    Template.body.helpers({
    tasks: function () {
    // Show newest tasks first
    return Tasks.find({}, {sort: {createdAt: -1}});
  }
});
Template.body.events({
  "submit .new-task": function (event) {
      // This function is called when the new task form is submitted
      var text = event.target.text.value;
      var comment = event.target.comment.value;
      Tasks.insert({
      text: text,
      comment: comment,
      createdAt: new Date() // current time
    });
      // Clear form
      event.target.text.value = "";
      event.target.comment.value = "";
      // Prevent default form submit
      return false;
    }
  });
}