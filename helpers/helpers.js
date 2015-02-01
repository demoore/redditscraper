
UI.registerHelper('formatCommentDate', function(timestamp) {
  console.log(timestamp);
  return moment(timestamp*1000).format('MM-DD-YYYY');
});
