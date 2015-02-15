if (Meteor.isClient) {

  Template.status.events({
    "change .show-sexism input": function (event) {
      Session.set('sexist', event.target.checked);
      Session.set('commentFilter', false);
    },

    "change select": function (event) {
      Session.set('sort', event.target.value);
      return false;
    }
  });

  Template.status.helpers({
    sexismPercent: function () {

      var sexist = Comments.find({ "hate.sexist" : true}).count();
      var allSubs = Comments.find({}).count();

      var percentage = (sexist/allSubs * 100).toFixed(1);

      return percentage;
    },

    racismPercent: function() {
      var racist = Comments.find({ "hate.racist" : true}).count();
      var allSubs = Comments.find({}).count();

      var percentage = (racist/allSubs * 100).toFixed(1);

      return percentage;
    },

    highestComment: function() {
      return Comments.find({}, { sort: {ups: -1}}).fetch()[0];
    },
    lowestComment: function() {
      return Comments.find({}, { sort: {ups: 1}}).fetch()[0];
    }
  });
}
