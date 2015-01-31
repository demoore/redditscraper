if (Meteor.isClient) {
  Template.searchBox.events({
    'keypress, change .inputs': _.debounce( function (event) {

      var searchTerm = document.getElementById('comment-search-box').value;

      Session.set('searchUsed', true);
      Session.set('commentsListUsed', false);
      Session.set('commentSearchTerm', searchTerm);
      console.log("Hey!");
//      return false;
    }, 300)

  });
}
