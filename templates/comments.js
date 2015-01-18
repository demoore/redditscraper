if (Meteor.isClient) {
  Template.comments.events({
    'submit .user-input': function(event) {
      var userName = document.getElementById('user-name').value;

      Session.set('userName', userName);

      console.log("userName:" + Session.get('userName'));

      Meteor.call('getComments', userName);

      console.log("Click!");
      return false;
    }
  });

  Template.comments.helpers({
    commentList: function () {
      comments = Comments.find({});
      console.log(comments);
      return comments;
    }
  });

  Tracker.autorun(function () {
    Meteor.subscribe('comments', Session.get('userName'));
  });
}
