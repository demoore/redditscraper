if (Meteor.isClient) {

  Template.subreddits.helpers({
    subredditList: function () {
      if (Session.get("sexist")) {
        subreddits = Subreddits.find({sexist: true}, { sort: { count: -1 }});
      } else {
        subreddits = Subreddits.find({}, { sort: { count: -1 }});
      }
      return subreddits;
    }
  });

  Template.subreddits.events({
    "click .subreddit-button button": function (event) {
      Session.set("sexist", false);
      console.log(event.target.value);

      if ( Session.get("commentFilter") == event.target.value ) {
        Session.set("commentFilter", false);
        $(".selected-sub-active").removeClass("selected-sub-active");
      } else {
        Session.set("commentFilter", event.target.value);
        $(".selected-sub-active").removeClass("selected-sub-active");
        $(event.target).addClass("selected-sub-active");
      }

      return false;
    }
  });

  Tracker.autorun(function () {
    Meteor.subscribe('subreddits', Session.get('userName'));
  });
}
