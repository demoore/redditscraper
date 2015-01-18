if (Meteor.isClient) {

  Template.subreddits.helpers({
    subredditList: function () {
      subreddits = Subreddits.find({}, { sort: { count: -1 }});

      return subreddits;
    }
  });

  Tracker.autorun(function () {
    Meteor.subscribe('subreddits', Session.get('userName'));
  });
}
