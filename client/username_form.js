if (Meteor.isClient) {
  Template.userForm.events({
    'submit .user-input': function (event) {
      var userName = document.getElementById('user-name').value.trim();

      Session.set('userName', userName);
      Session.set('commentsListUsed', true);
      Meteor.call('getComments', userName);

      return false;
    }
  });
}
