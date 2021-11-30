const Users = require('../modules/users/users_controller');
const Track = require('../modules/tracks/tracks_controller');
const Post = require('../modules/posts/posts_controller');

module.exports = function(app) {
  
  app.get("/", function(req, res) {
    res.send("********");
  });

  //user Register
  app.post('/api/user/create', Users.userRegister());

  //user Login
  app.post('/api/user/login', Users.userLogin());

  //validate user token
  app.post('/api/validate/token', Users.validateToken());

  //reset user password
  app.post('/api/reset/password', Users.sentResetPassLink());

  //save new password
  app.post('/api/reset/password/change', Users.saveResetPass());

  //update profile
  app.post('/api/user/update', Users.profileUpdate());

  //get user profile
  app.get('/api/user/:id', Users.getProfileById());

  //create track
  app.post('/api/track/create', Track.createTrack());

  //list track
  app.get('/api/track/list', Track.tracksList());
  
  //list track
  app.get('/api/track/:id/list', Track.trackListSpecificUser());

  //delete ctrack 
  app.delete('/api/track/delete', Track.trackDelete());

  //get track by id
  app.get('/api/track/:id/specific', Track.getTrackById());

  //update track
  app.post('/api/track/update', Track.updateTrack());

  //create post
  app.post('/api/post/create', Post.createPost());
  
  //delete post
  app.delete('/api/post/delete', Post.postDelete());

  //list post by id
  app.get('/api/post/:id/list', Post.postListById());

  //timeline
  app.get('/api/timeline/list', Post.getTimeline());

};