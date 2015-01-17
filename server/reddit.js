// reddit Methods go here

if (Meteor.isServer) {
  Meteor.methods({
    'getComments': function(){
      this.unblock();

      results =  HTTP.call('GET', 'https://www.reddit.com/user/zardoz90/comments.json?limit=100');
      saveComments(results.data.data.children);

      CommentCursor.insert({lastPage: results.data.data.after, date_created: new Date()});
      cursor = CommentCursor.findOne({}, {sort: {date_created: -1}}).lastPage;

      while ( cursor != null) {
        results =  HTTP.call('GET', 'https://www.reddit.com/user/rutabaga5/comments.json?limit=100&after=' + cursor);
        saveComments(results.data.data.children);

        console.log(cursor);
        console.log("getting more");

        CommentCursor.insert({lastPage: results.data.after, date_created: new Date()});
        cursor = CommentCursor.findOne({}, {sort: {date_created: -1}}).lastPage;
      }

    }
  });

  var saveComments = function (comments) {
    comments.forEach(function(comment){
      if (Comments.find({id: comment.data.name}).count()) {
//        console.log("Comment exists!");
      } else {
        Comments.insert({
          id: comment.data.name,
          body: comment.data.body,
          created: comment.data.created,
          html: comment.data.body_html,
          ups: comment.data.ups
        });
      }
    });
  };
}
