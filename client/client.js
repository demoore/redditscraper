if (Meteor.isClient) {
  Meteor.methods({
    'getUserComments': function (userName) {
      Meteor.subscribe('comments', userName);
    },
    'getSubreddits': function (userName) {
      Meteor.subscribe('subreddits', userName);
    },
    'getBestComment': function (userName) {
      Subreddits.findOne({ author: userName }, { sort: { count: -1 }});
    }
  });
}
