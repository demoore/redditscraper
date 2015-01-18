// reddit Methods go here

if (Meteor.isServer) {
  Meteor.methods({
    'getComments': function(userName){
      this.unblock();

      results =  HTTP.call('GET', 'https://www.reddit.com/user/' + userName + '/comments.json?limit=100');
      saveComments(results.data.data.children);

      cursor = getNextPage(results.data.data.after);


      // Keep getting comments
      while ( cursor != null) {
        results =  HTTP.call('GET', 'https://www.reddit.com/user/' + userName + '/comments.json?limit=100&after=' + cursor);
        saveComments(results.data.data.children);

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

  var saveComments = function (comments) {
    comments.forEach(function(comment){
      if (Comments.find({id: comment.data.name}).count()) {
        //        console.log("Comment exists!");
      } else {

        Comments.insert({
          author: comment.data.author,
          body: comment.data.body,
          created: comment.data.created,
          html: decodeHtml(comment.data.body_html),
          id: comment.data.name,
          ups: comment.data.ups,
          subreddit: comment.data.subreddit
        });

        Subreddits.upsert({
          author: comment.data.author,
          subreddit: comment.data.subreddit
        },
                          {$inc: {count: 1}});
      };
    });
  };




  var decodeHtml = function (html) {
    return html.replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#039;/g, "'");
  };

  Meteor.publish('comments', function (userName) {
    return Comments.find({author: userName});
  });

  Meteor.publish('subreddits', function(userName) {
    return Subreddits.find({author: userName});
  });
}
