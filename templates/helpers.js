if (Meteor.isClient) {
  Handlebars.registerHelper('session', function (name) {
    return Session.get(name);
  });
}
