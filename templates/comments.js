if (Meteor.isClient) {
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
