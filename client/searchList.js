if (Meteor.isClient) {
  Template.searchList.helpers({
    searchedComments: function () {
      var term = Session.get("commentSearchTerm");
      var search = new RegExp(term, 'i');
      return Comments.find({body: search});
    }
  });
}
