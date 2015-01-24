if (Meteor.isClient) {
  Template.commentList.helpers({
    allComments: function () {
      if (Session.get('sexist')) {
        comments = Comments.find({sexist: true});

      } else if (Session.get('commentFilter')) {
        comments = Comments.find({subreddit: Session.get('commentFilter')});
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
