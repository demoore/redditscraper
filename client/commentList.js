if (Meteor.isClient) {
  Template.commentList.helpers({
    // OMG this needs a refactor… so terrible and hacky for now.
    allComments: function () {
      if (Session.get('sexist')) {
        comments = Comments.find({'hate.sexist': true});

      } else if (Session.get('commentFilter') && (Session.get('sort') == 'Highest')) {
        comments = Comments.find({subreddit: Session.get('commentFilter')}, {sort: {ups: -1}});

      } else if (Session.get('commentFilter') && (Session.get('sort') == 'Lowest')) {
        comments = Comments.find({subreddit: Session.get('commentFilter')}, {sort: {ups: 1}});

      } else if (Session.get('commentFilter') && (Session.get('sort') == 'Date')) {
        comments = Comments.find({subreddit: Session.get('commentFilter')}, {sort: {created: -1}});

      } else if (Session.get('commentFilter')) {
        comments = Comments.find({subreddit: Session.get('commentFilter')});

      }


      else if (Session.get('sort') == 'Highest') {
        comments = Comments.find({}, {sort: {ups: -1}});

      } else if (Session.get('sort') == 'Lowest') {
        comments = Comments.find({}, {sort: {ups: 1}});

      } else if (Session.get('sort') == 'Date') {
        comments = Comments.find({}, {sort: {created: -1}});

      }


      else {
        comments = Comments.find({});
      }
      return comments;
    }
  });

  Tracker.autorun(function () {
    Meteor.subscribe('comments', Session.get('userName'));
    var sort = Session.get("sort");
  });
}
