if (Meteor.isClient) {
  var lastPage;

  Meteor.call('getComments', function(error, result) {
    console.log(result);
  });
}
