if (Meteor.isClient) {
  Template.intro.events({
    'submit .user-input': function (event) {
      var userName = document.getElementById('username-search').value;

      Session.set('userName', userName);

      return false;
    }
  });
}
