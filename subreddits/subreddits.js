if (Meteor.isClient) {

  Template.subreddits.helpers({
    subredditList: function () {
      if (Session.get("sexist")) {
        subreddits = Subreddits.find({sexist: true}, { sort: { count: -1 }});
      } else {
        subreddits = Subreddits.find({}, { sort: { count: -1 }});
      }
      return subreddits;
    }
  });

  Tracker.autorun(function () {
    Meteor.subscribe('subreddits', Session.get('userName'));
  });
}
