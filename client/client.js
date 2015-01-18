if (Meteor.isClient) {
  Meteor.methods({
    'getUserComments': function (userName) {
      Meteor.subscribe('comments', userName);
    }
  });
}
