// reddit Methods go here
HEADERS = { headers: { 'User-Agent': 'RedditUserScraper/0.3 by zardoz90'} };
if (Meteor.isServer) {
  Meteor.methods({
    'getComments': function(userName){
      this.unblock();

      upsertAndIncUser(userName);

      // Get the inital set of comments
      console.log("Getting comments for: " + userName);
      results =  HTTP.call('GET',
                           'https://www.reddit.com/user/' + userName + '/comments.json?limit=100',
                           HEADERS
                          );


      parseData(results.data.data.children);

      cursor = results.data.data.after;

      // Keep getting comments
      rateLimitGetNextComments( userName, cursor, results);
    }
  });

  var getNextComments = function( userName, cursor, results ) {
    console.log("Getting logs for: " + userName + " @ " + cursor);
    while ( cursor != null) {
      results =  HTTP.call('GET',
                           'https://www.reddit.com/user/' + userName + '/comments.json?limit=100&after=' + cursor,
                           HEADERS
                          );
      parseData(results.data.data.children);

      cursor = results.data.data.after;
    }
  };

  var rateLimitGetNextComments = rateLimit(getNextComments, 2000);

  // // Going to need a better solution here
  // var getNextPage = function(nextPage, userName) {
  //   CommentCursor.insert({lastPage: nextPage, date_created: new Date(), user: userName});
  //   cursor = CommentCursor.findOne({user:userName}, {sort: {date_created: -1}}).lastPage;

  //   return cursor;
  // };

  var parseData = function ( comments ) {
    comments.forEach( function ( comment ) {
      if (Comments.find({id: comment.data.name}).count()) {
        // don't want nothin'
        // so janky _._
      } else {
        saveData( comment );
      }
    });
  };

  var saveData = function ( comment ) {

    saveComment(comment.data);
    saveSubreddit(comment.data);
  };

  var saveComment = function ( comment ) {

    Comments.insert({
      author: comment.author,
      body: comment.body,
      created: comment.created,
      html: decodeHtml(comment.body_html),
      id: comment.name,
      ups: comment.ups,
      link: comment.link_url,
      link_id: (comment.link_id).substring(3),
      comment_id: comment.id,
      subreddit: comment.subreddit,
      sexist: checkForHate(comment.subreddit)
    });
  };

  var saveSubreddit = function ( comment ) {
    Subreddits.upsert({
      author: comment.author,
      subreddit: comment.subreddit,
      sexist: checkForHate(comment.subreddit)
    },
                      {$inc: {count: 1}
                      });
  };

  var decodeHtml = function (html) {
    return html.replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#039;/g, "'");
  };

  var upsertAndIncUser = function (userName) {
    var user = UserLookups.findOne({user: userName}) || 1;
    if (user == 1) {
      UserLookups.insert({user: userName, count: 1});
    } else {
      UserLookups.update({user: userName}, {$inc: {count: 1}});
    }
  };

  var checkForHate = function (subreddit) {
    return sexist.indexOf(subreddit) > -1;
  };

  Meteor.publish('comments', function (userName) {
    return Comments.find({author: userName});
  });

  Meteor.publish('subreddits', function(userName) {
    return Subreddits.find({author: userName});
  });


}
