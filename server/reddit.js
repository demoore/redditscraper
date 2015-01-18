// reddit Methods go here

if (Meteor.isServer) {
  Meteor.methods({
    'getComments': function(userName){
      this.unblock();

      results =  HTTP.call('GET',
                           'https://www.reddit.com/user/' + userName + '/comments.json?limit=100',
                           { headers: { 'User-Agent': 'MeteorTest/0.1 by zardoz90'} }
                          );
      parseData(results.data.data.children);

      cursor = getNextPage(results.data.data.after);


      // Keep getting comments
      while ( cursor != null) {
        results =  HTTP.call('GET',
                             'https://www.reddit.com/user/' + userName + '/comments.json?limit=100&after=' + cursor,
                             { headers: { 'User-Agent': 'MeteorTest/0.1 by zardoz90' } }
                            );
        parseData(results.data.data.children);

        console.log("getting more: " );
        console.log(cursor);

        cursor = getNextPage(results.data.data.after);
      }
    }
  });

  var getNextPage = function(nextPage) {
    CommentCursor.insert({lastPage: nextPage, date_created: new Date()});
    cursor = CommentCursor.findOne({}, {sort: {date_created: -1}}).lastPage;

    return cursor;
  };

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
      subreddit: comment.subreddit
    });
  };

  var saveSubreddit = function ( comment ) {
    Subreddits.upsert({
      author: comment.author,
      subreddit: comment.subreddit
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
