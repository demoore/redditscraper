
UI.registerHelper('formatCommentDate', function(timestamp) {
  return moment(timestamp*1000).format('MM-DD-YYYY');
});
