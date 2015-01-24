if (Meteor.isClient) {
  Template.comments.helpers({
    isSearch: function () {
      return Session.equals('searchUsed', true);
    },

    isCommentList: function () {
      return Session.equals('commentsListUsed', true);
    }
  });
}
