if (Meteor.isClient) {

  Template.userForm.events({
    'submit .user-input': function(event) {
      var userName = document.getElementById('user-name').value;

      Session.set('userName', userName);
      Meteor.call('getComments', userName);

      return false;
    }
  });
}
