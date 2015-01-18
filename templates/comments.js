if (Meteor.isClient) {
  Template.comments.helpers({
    commentList: function () {
      if (Session.get('sexist')){
        comments = Comments.find({sexist: true});
      } else {
        comments = Comments.find({});
      }
      return comments;
    }
  });

  Tracker.autorun(function () {
    Meteor.subscribe('comments', Session.get('userName'));
  });
}
