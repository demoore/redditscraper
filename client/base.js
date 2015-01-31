if (Meteor.isClient) {
  Template.comments.helpers({
    isUserSet: function () {
      if (Session.get(userName)) {
        return true;
      } else {
        return false;
      }
    }
  });
}
