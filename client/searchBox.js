if (Meteor.isClient) {
  Template.searchBox.events({
    'submit .search-form': function (event) {
      var searchTerm = document.getElementById('comment-search-box').value;

      Session.set('searchUsed', true);
      Session.set('commentsListUsed', false);
      Session.set('commentSearchTerm', searchTerm);

      return false;
    }
  });
}
