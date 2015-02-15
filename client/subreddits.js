if (Meteor.isClient) {

  Template.subreddits.helpers({
    subredditList: function () {
      if (Session.get('sexist')) {
        subreddits = Subreddits.find({sexist: true}, { sort: { count: -1 }});
      } else {
        subreddits = Subreddits.find({}, { sort: { count: -1 }});
      }
      return subreddits;
    },

    commentTotal: function() {
      return Comments.find({}).count();
    }
  });

  Template.subreddits.events({
    'click .subreddit-button button': function (event) {
      Session.set('sexist', false);

      // turn below into function
      Session.set('searchUsed', false);
      Session.set('commentsListUsed', true);
      //

      if ( Session.get('commentFilter') == event.target.value ) {
        Session.set('commentFilter', false);
        $('.selected-sub-active').removeClass('selected-sub-active');
        $(event.target).addClass('selected-sub');

      } else {
        Session.set('commentFilter', event.target.value);

        // Remove others
        $('.selected-sub-active').addClass('selected-sub');
        $('.selected-sub-active').removeClass('selected-sub-active');

        // add class, remove others
        $(event.target).addClass('selected-sub-active');
        $(event.target).removeClass('selected-sub');
      }

      return false;
    }
  });

  Tracker.autorun(function () {
    Meteor.subscribe('subreddits', Session.get('userName'));
  });
}
