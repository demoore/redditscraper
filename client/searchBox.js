if (Meteor.isClient) {
  Template.searchBox.events({
    'keypress, change .comment-search-box': _.debounce(function (event) {
      var searchTerm = document.getElementById('comment-search-box').value;

      Session.set('searchUsed', true);
      Session.set('commentsListUsed', false);
      Session.set('commentSearchTerm', searchTerm);

//      return false;
    }, 300)
  });
}
